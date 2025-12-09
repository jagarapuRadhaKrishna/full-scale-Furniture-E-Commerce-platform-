import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { verifyJWTToken, extractDeviceInfo } from '@/lib/auth-utils'
import { User } from '@/lib/enhanced-auth-types'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const payload = verifyJWTToken(token)

    if (!payload || payload.userType !== 'user') {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    const { db } = await connectToDatabase()
    
    const user = await db.collection('users').findOne({ 
      id: payload.userId,
      isActive: true 
    }) as User | null

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified,
        loginMethod: user.loginMethod,
        avatar: user.avatar,
        addresses: user.addresses || [],
        preferences: user.preferences || {},
        createdAt: user.createdAt
      }
    })

  } catch (error) {
    console.error('Get user profile error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const payload = verifyJWTToken(token)

    if (!payload || payload.userType !== 'user') {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    const { name, preferences, addresses } = await request.json()

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'Name must be at least 2 characters long' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    
    const updateData: any = {
      name: name.trim(),
      updatedAt: new Date()
    }

    if (preferences) {
      updateData.preferences = preferences
    }

    if (addresses) {
      updateData.addresses = addresses
    }

    const result = await db.collection('users').updateOne(
      { id: payload.userId, isActive: true },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    const updatedUser = await db.collection('users').findOne({ 
      id: payload.userId 
    }) as User | null

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'Failed to retrieve updated user' },
        { status: 500 }
      )
    }

    const deviceInfo = extractDeviceInfo(request)
    await db.collection('security_logs').insertOne({
      userId: payload.userId,
      action: 'profile_update',
      ip: deviceInfo.ip,
      userAgent: deviceInfo.userAgent,
      success: true,
      details: { fields: Object.keys(updateData) },
      timestamp: new Date()
    })

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        isVerified: updatedUser.isVerified,
        loginMethod: updatedUser.loginMethod,
        avatar: updatedUser.avatar,
        addresses: updatedUser.addresses || [],
        preferences: updatedUser.preferences || {},
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
      }
    })

  } catch (error) {
    console.error('Update user profile error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}