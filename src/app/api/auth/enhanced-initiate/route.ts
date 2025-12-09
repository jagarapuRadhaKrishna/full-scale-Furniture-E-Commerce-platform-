// Enhanced Authentication API - Google OAuth + OTP Login

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { User, OTPVerification, UserSession } from '@/lib/enhanced-auth-types'
import { 
  validateIdentifier, 
  generateOTP, 
  generateOTPId, 
  generateUserId,
  generateSessionId,
  generateJWTToken,
  extractDeviceInfo
} from '@/lib/auth-utils'
import { sendEmailOTP } from '@/lib/enhanced-email-service'
import { sendSMSOTP } from '@/lib/enhanced-sms-service'
import { authenticateWithGoogle } from '@/lib/google-auth'

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(identifier: string, maxAttempts = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const key = `auth:${identifier}`
  const current = rateLimitStore.get(key)

  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (current.count >= maxAttempts) {
    return false
  }

  current.count++
  return true
}

// POST /api/auth/enhanced-initiate - Enhanced login/signup initiation
export async function POST(request: NextRequest) {
  try {
    const { identifier, purpose = 'login', loginMethod = 'otp', googleToken, name } = await request.json()
    
    // Handle Google OAuth
    if (loginMethod === 'google' && googleToken) {
      const deviceInfo = extractDeviceInfo(request)
      return NextResponse.json(await authenticateWithGoogle(googleToken, deviceInfo))
    }

    // Validate input
    if (!identifier) {
      return NextResponse.json(
        { success: false, message: 'Email or phone number is required' },
        { status: 400 }
      )
    }

    // Rate limiting
    if (!checkRateLimit(identifier)) {
      return NextResponse.json(
        { success: false, message: 'Too many attempts. Please try again in 15 minutes.' },
        { status: 429 }
      )
    }

    const validation = validateIdentifier(identifier)
    
    if (!validation.type) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email or phone number' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    const formattedIdentifier = validation.formatted
    
    // Check if user exists
    const existingUser = await db
      .collection('users')
      .findOne({
        [validation.type]: formattedIdentifier
      }) as User | null

    // For login, user must exist
    if (purpose === 'login' && !existingUser) {
      return NextResponse.json(
        { success: false, message: 'Account not found. Please sign up first.' },
        { status: 404 }
      )
    }

    // For signup, user must not exist
    if (purpose === 'signup' && existingUser) {
      return NextResponse.json(
        { success: false, message: 'Account already exists. Please login instead.' },
        { status: 409 }
      )
    }

    // For signup, name is required
    if (purpose === 'signup' && !name) {
      return NextResponse.json(
        { success: false, message: 'Name is required for signup' },
        { status: 400 }
      )
    }

    // Generate OTP
    const otp = generateOTP()
    const otpId = generateOTPId()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Save OTP to database
    const otpVerification: OTPVerification = {
      id: otpId,
      identifier: formattedIdentifier,
      otp,
      type: validation.type,
      purpose: purpose as 'login' | 'signup',
      expiresAt,
      isUsed: false,
      attempts: 0,
      maxAttempts: 3,
      createdAt: new Date()
    }

    await db.collection('otp_verifications').insertOne(otpVerification)

    // Send OTP
    let otpSent = false
    let error = ''

    if (validation.type === 'email') {
      const result = await sendEmailOTP(formattedIdentifier, otp, purpose)
      otpSent = result.success
      error = result.error || ''
    } else {
      const result = await sendSMSOTP(formattedIdentifier, otp, purpose)
      otpSent = result.success
      error = result.error || ''
    }

    if (!otpSent) {
      // Clean up the OTP record if sending failed
      await db.collection('otp_verifications').deleteOne({ id: otpId })
      
      return NextResponse.json(
        { success: false, message: error || 'Failed to send OTP. Please try again.' },
        { status: 500 }
      )
    }

    // Log security event
    await db.collection('security_logs').insertOne({
      userId: existingUser?.id,
      action: purpose === 'login' ? 'login' : 'account_created',
      ip: extractDeviceInfo(request).ip,
      userAgent: extractDeviceInfo(request).userAgent,
      success: true,
      details: { method: 'otp', type: validation.type },
      timestamp: new Date()
    })

    return NextResponse.json({
      success: true,
      message: `OTP sent to your ${validation.type}`,
      otpId,
      type: validation.type,
      maskedIdentifier: validation.type === 'email' 
        ? formattedIdentifier.replace(/(.{2}).*(@.*)/, '$1***$2')
        : formattedIdentifier.replace(/(\+91)(.{2})(.*)(.{2})/, '$1$2***$4'),
      requiresOTP: true
    })

  } catch (error) {
    console.error('Auth initiation error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/auth/enhanced-initiate - Test endpoint
export async function GET() {
  return NextResponse.json({
    message: 'Enhanced Auth API is running',
    endpoints: {
      POST: 'Initiate login/signup with OTP or Google OAuth',
      methods: ['otp', 'google'],
      rateLimit: '5 attempts per 15 minutes'
    }
  })
}