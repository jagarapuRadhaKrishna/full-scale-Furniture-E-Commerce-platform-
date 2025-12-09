// Authentication API - OTP verification

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { User } from '@/lib/auth-types'
import { generateToken, generateUserId } from '@/lib/auth-utils'

// POST /api/auth/verify - Verify OTP and complete authentication
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
    const otpVerification = await db
      .collection('otp_verifications')
      .findOne({ id: otpId })

    if (!otpVerification) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP session. Please request a new OTP.' },
        { status: 404 }
      )
    }

    // Check if OTP is expired
    if (new Date() > otpVerification.expiresAt) {
      return NextResponse.json(
        { success: false, message: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Check if OTP is already used
    if (otpVerification.isUsed) {
      return NextResponse.json(
        { success: false, message: 'OTP has already been used. Please request a new one.' },
        { status: 400 }
      )
    }

    // Check if too many attempts
    if (otpVerification.attempts >= 3) {
      return NextResponse.json(
        { success: false, message: 'Too many failed attempts. Please request a new OTP.' },
        { status: 429 }
      )
    }

    // Verify OTP
    if (otpVerification.otp !== otp) {
      // Increment attempts
      await db.collection('otp_verifications').updateOne(
        { id: otpId },
        { $inc: { attempts: 1 } }
      )
      
      return NextResponse.json(
        { success: false, message: 'Invalid OTP. Please try again.' },
        { status: 400 }
      )
    }

    // Mark OTP as used
    await db.collection('otp_verifications').updateOne(
      { id: otpId },
      { $set: { isUsed: true } }
    )

    let user: User | null = null

    if (otpVerification.purpose === 'signup') {
      // Create new user
      if (!name) {
        return NextResponse.json(
          { success: false, message: 'Name is required for signup' },
          { status: 400 }
        )
      }

      const newUser: User = {
        id: generateUserId(),
        [otpVerification.type]: otpVerification.identifier,
        name,
        isVerified: true,
        loginMethod: otpVerification.type,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.collection('users').insertOne(newUser)
      user = newUser
    } else {
      // Update existing user's last login
      const existingUser = await db
        .collection('users')
        .findOneAndUpdate(
          { [otpVerification.type]: otpVerification.identifier },
          { 
            $set: { 
              lastLogin: new Date(),
              updatedAt: new Date(),
              isVerified: true
            }
          },
          { returnDocument: 'after' }
        )

      user = existingUser as User
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Authentication failed. Please try again.' },
        { status: 500 }
      )
    }

    // Generate JWT token
    const token = generateToken(user.id)

    // Create session
    await db.collection('sessions').insertOne({
      id: generateUserId(),
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      createdAt: new Date()
    })

    // Remove sensitive data
    const { _id, ...userResponse } = user

    return NextResponse.json({
      success: true,
      message: otpVerification.purpose === 'signup' 
        ? 'Account created successfully!' 
        : 'Login successful!',
      user: userResponse,
      token
    })

  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}