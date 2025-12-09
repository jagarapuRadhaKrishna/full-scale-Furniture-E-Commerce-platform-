// Google OAuth Authentication Service

import { connectToDatabase } from '@/lib/db'
import { User, UserSession, AuthResponse } from '@/lib/enhanced-auth-types'
import { generateUserId, generateSessionId, generateJWTToken } from '@/lib/auth-utils'

// For now, we'll use a simpler approach without google-auth-library
// This will be updated when the package is installed

export interface GoogleUserInfo {
  id: string
  email: string
  name: string
  picture?: string
  email_verified: boolean
}

export async function verifyGoogleToken(token: string): Promise<GoogleUserInfo | null> {
  try {
    // For development, we'll simulate Google token verification
    // In production, this should use Google's verification endpoint
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
    
    if (!response.ok) {
      return null
    }
    
    const payload = await response.json()
    
    if (!payload.email || !payload.email_verified) {
      return null
    }

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      email_verified: payload.email_verified === 'true'
    }
  } catch (error) {
    console.error('Google token verification failed:', error)
    return null
  }
}

export async function authenticateWithGoogle(googleToken: string, deviceInfo: any): Promise<AuthResponse> {
  try {
    const googleUser = await verifyGoogleToken(googleToken)
    
    if (!googleUser || !googleUser.email_verified) {
      return {
        success: false,
        message: 'Invalid Google token or email not verified'
      }
    }

    const { db } = await connectToDatabase()
    
    // Check if user exists
    let existingUser = await db.collection('users').findOne({ email: googleUser.email }) as User | null
    let user: User
    
    if (!existingUser) {
      // Create new user
      const newUser: User = {
        id: generateUserId(),
        email: googleUser.email,
        name: googleUser.name,
        isVerified: true,
        loginMethod: 'google',
        googleId: googleUser.id,
        avatar: googleUser.picture,
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      const result = await db.collection('users').insertOne(newUser)
      user = { ...newUser, _id: result.insertedId }
    } else {
      // Update existing user
      await db.collection('users').updateOne(
        { _id: existingUser._id },
        {
          $set: {
            googleId: googleUser.id,
            avatar: googleUser.picture,
            lastLogin: new Date(),
            updatedAt: new Date(),
            isActive: true
          }
        }
      )
      user = {
        ...existingUser,
        googleId: googleUser.id,
        avatar: googleUser.picture,
        lastLogin: new Date(),
        updatedAt: new Date()
      }
    }

    // Create session
    const sessionId = generateSessionId()
    const token = generateJWTToken({
      userId: user.id,
      email: user.email,
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

    // Log security event
    await db.collection('security_logs').insertOne({
      userId: user.id,
      action: 'login',
      ip: deviceInfo.ip,
      userAgent: deviceInfo.userAgent,
      success: true,
      details: { method: 'google' },
      timestamp: new Date()
    })

    return {
      success: true,
      message: 'Login successful',
      user,
      token,
      userType: 'user'
    }
  } catch (error) {
    console.error('Google authentication error:', error)
    return {
      success: false,
      message: 'Authentication failed'
    }
  }
}

export async function linkGoogleAccount(userId: string, googleToken: string): Promise<AuthResponse> {
  try {
    const googleUser = await verifyGoogleToken(googleToken)
    
    if (!googleUser || !googleUser.email_verified) {
      return {
        success: false,
        message: 'Invalid Google token or email not verified'
      }
    }

    const { db } = await connectToDatabase()
    
    // Check if Google account is already linked to another user
    const existingUser = await db.collection('users').findOne({ 
      googleId: googleUser.id,
      id: { $ne: userId }
    })
    
    if (existingUser) {
      return {
        success: false,
        message: 'This Google account is already linked to another user'
      }
    }

    // Update user with Google info
    await db.collection('users').updateOne(
      { id: userId },
      {
        $set: {
          googleId: googleUser.id,
          avatar: googleUser.picture,
          updatedAt: new Date()
        }
      }
    )

    return {
      success: true,
      message: 'Google account linked successfully'
    }
  } catch (error) {
    console.error('Google account linking error:', error)
    return {
      success: false,
      message: 'Failed to link Google account'
    }
  }
}