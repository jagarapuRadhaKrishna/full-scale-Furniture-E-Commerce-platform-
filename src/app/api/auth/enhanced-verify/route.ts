// Enhanced OTP Verification API

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { User, OTPVerification, UserSession } from '@/lib/enhanced-auth-types'
import { 
  generateUserId,
  generateSessionId,
  generateJWTToken,
  extractDeviceInfo
} from '@/lib/auth-utils'
import { sendWelcomeEmail } from '@/lib/enhanced-email-service'

// POST /api/auth/enhanced-verify - Enhanced OTP verification
export async function POST(request: NextRequest) {
  try {
    const { otpId, otp, identifier, name } = await request.json()
    
    if (!otpId || !otp || !identifier) {
      return NextResponse.json(
        { success: false, message: 'OTP ID, OTP, and identifier are required' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    
    // Find OTP verification record
    const otpRecord = await db
      .collection('otp_verifications')
      .findOne({ id: otpId, identifier }) as OTPVerification | null

    if (!otpRecord) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP request' },
        { status: 400 }
      )
    }

    // Check if OTP is expired
    if (new Date() > otpRecord.expiresAt) {
      await db.collection('otp_verifications').deleteOne({ id: otpId })
      return NextResponse.json(
        { success: false, message: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Check if OTP is already used
    if (otpRecord.isUsed) {
      return NextResponse.json(
        { success: false, message: 'OTP has already been used' },
        { status: 400 }
      )
    }

    // Check max attempts
    if (otpRecord.attempts >= otpRecord.maxAttempts) {
      await db.collection('otp_verifications').deleteOne({ id: otpId })
      return NextResponse.json(
        { success: false, message: 'Maximum OTP attempts exceeded. Please request a new OTP.' },
        { status: 400 }
      )
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      // Increment attempts
      await db.collection('otp_verifications').updateOne(
        { id: otpId },
        { $inc: { attempts: 1 } }
      )
      
      const remainingAttempts = otpRecord.maxAttempts - (otpRecord.attempts + 1)
      return NextResponse.json(
        { 
          success: false, 
          message: `Invalid OTP. ${remainingAttempts} attempts remaining.` 
        },
        { status: 400 }
      )
    }

    // Mark OTP as used
    await db.collection('otp_verifications').updateOne(
      { id: otpId },
      { $set: { isUsed: true } }
    )

    const deviceInfo = extractDeviceInfo(request)
    let user: User

    if (otpRecord.purpose === 'signup') {
      // Create new user
      if (!name) {
        return NextResponse.json(
          { success: false, message: 'Name is required for signup' },
          { status: 400 }
        )
      }

      const newUser: User = {
        id: generateUserId(),
        [otpRecord.type]: identifier,
        name,
        isVerified: true,
        loginMethod: otpRecord.type,
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.collection('users').insertOne(newUser)
      user = newUser

      // Send welcome email if email signup
      if (otpRecord.type === 'email') {
        await sendWelcomeEmail(identifier, name)
      }

      // Log signup event
      await db.collection('security_logs').insertOne({
        userId: user.id,
        action: 'account_created',
        ip: deviceInfo.ip,
        userAgent: deviceInfo.userAgent,
        success: true,
        details: { method: 'otp', type: otpRecord.type },
        timestamp: new Date()
      })

    } else {
      // Login existing user
      const existingUser = await db
        .collection('users')
        .findOne({ [otpRecord.type]: identifier }) as User | null

      if (!existingUser) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        )
      }

      // Update last login
      await db.collection('users').updateOne(
        { id: existingUser.id },
        { 
          $set: { 
            lastLogin: new Date(),
            updatedAt: new Date(),
            isActive: true
          }
        }
      )

      user = { ...existingUser, lastLogin: new Date(), updatedAt: new Date() }

      // Log login event
      await db.collection('security_logs').insertOne({
        userId: user.id,
        action: 'login',
        ip: deviceInfo.ip,
        userAgent: deviceInfo.userAgent,
        success: true,
        details: { method: 'otp', type: otpRecord.type },
        timestamp: new Date()
      })
    }

    // Create session
    const sessionId = generateSessionId()
    const token = generateJWTToken({
      userId: user.id,
      email: user.email,
      phone: user.phone,
      userType: 'user'
    })

    const session: UserSession = {
      id: sessionId,
      userId: user.id,
      token,
      userType: 'user',
      deviceInfo,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      isActive: true,
      createdAt: new Date(),
      lastUsed: new Date()
    }

    await db.collection('user_sessions').insertOne(session)

    // Clean up old sessions (keep only last 5)
    const userSessions = await db
      .collection('user_sessions')
      .find({ userId: user.id, isActive: true })
      .sort({ createdAt: -1 })
      .toArray()

    if (userSessions.length > 5) {
      const sessionsToDeactivate = userSessions.slice(5)
      await db.collection('user_sessions').updateMany(
        { 
          id: { $in: sessionsToDeactivate.map(s => s.id) }
        },
        { $set: { isActive: false } }
      )
    }

    return NextResponse.json({
      success: true,
      message: otpRecord.purpose === 'signup' ? 'Account created successfully' : 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified,
        loginMethod: user.loginMethod,
        avatar: user.avatar
      },
      token,
      userType: 'user'
    })

  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/auth/enhanced-verify - Test endpoint
export async function GET() {
  return NextResponse.json({
    message: 'Enhanced OTP Verification API is running',
    endpoint: 'POST',
    description: 'Verify OTP for login/signup completion'
  })
}