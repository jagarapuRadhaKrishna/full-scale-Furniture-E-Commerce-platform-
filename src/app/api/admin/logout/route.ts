// Admin Logout API

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { verifyJWTToken, extractDeviceInfo } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
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

    if (!payload || payload.userType !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired admin token' },
        { status: 401 }
      )
    }

    const { db } = await connectToDatabase()
    const deviceInfo = extractDeviceInfo(request)

    // Deactivate admin session if exists
    await db.collection('admin_sessions').updateMany(
      { 
        adminId: payload.adminId,
        token 
      },
      { 
        $set: { 
          isActive: false,
          loggedOutAt: new Date()
        } 
      }
    )

    // Log logout event
    await db.collection('security_logs').insertOne({
      adminId: payload.adminId,
      action: 'logout',
      ip: deviceInfo.ip,
      userAgent: deviceInfo.userAgent,
      success: true,
      details: { userType: 'admin' },
      timestamp: new Date()
    })

    return NextResponse.json({
      success: true,
      message: 'Admin logout successful'
    })

  } catch (error) {
    console.error('Admin logout error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Admin Logout API',
    method: 'POST',
    description: 'Logout admin and invalidate session'
  })
}