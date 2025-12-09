// Authentication API - Login/Signup initiation

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { User, OTPVerification } from '@/lib/auth-types'
import { validateIdentifier, generateOTP, generateOTPId, generateUserId } from '@/lib/auth-utils'
import { sendEmailOTP } from '@/lib/email-service'
import { sendSMSOTP } from '@/lib/sms-service'

// POST /api/auth/initiate - Initiate login or signup
export async function POST(request: NextRequest) {
  try {
    const { identifier, purpose = 'login' } = await request.json()
    
    if (!identifier) {
      return NextResponse.json(
        { success: false, message: 'Email or phone number is required' },
        { status: 400 }
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
      })

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
      purpose,
      expiresAt,
      isUsed: false,
      attempts: 0,
      createdAt: new Date()
    }

    await db.collection('otp_verifications').insertOne(otpVerification)

    // Send OTP
    let otpSent = false
    if (validation.type === 'email') {
      const result = await sendEmailOTP(formattedIdentifier, otp, purpose)
      otpSent = result.success
    } else {
      const result = await sendSMSOTP(formattedIdentifier, otp, purpose)
      otpSent = result.success
    }

    if (!otpSent) {
      return NextResponse.json(
        { success: false, message: 'Failed to send OTP. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `OTP sent to your ${validation.type}`,
      otpId,
      type: validation.type,
      maskedIdentifier: validation.type === 'email' 
        ? formattedIdentifier.replace(/(.{2}).*(@.*)/, '$1***$2')
        : formattedIdentifier.replace(/(\+91)(\d{2})(\d{6})(\d{2})/, '$1$2******$4')
    })

  } catch (error) {
    console.error('Auth initiation error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}