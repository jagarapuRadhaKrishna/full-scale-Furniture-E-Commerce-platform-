// Admin profile and verification API

import { NextRequest, NextResponse } from 'next/server'
import { extractAdminToken, verifyAdminToken, ADMIN_USERS } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  try {
    const token = extractAdminToken(request)
    if (!token) {
      return NextResponse.json(
        { error: 'Admin authentication required' },
        { status: 401 }
      )
    }

    const payload = verifyAdminToken(token)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid admin token' },
        { status: 401 }
      )
    }

    // Find admin user
    const adminUser = ADMIN_USERS.find(user => user.id === payload.adminId)
    if (!adminUser) {
      return NextResponse.json(
        { error: 'Admin user not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      admin: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
        permissions: adminUser.permissions,
        lastLogin: adminUser.lastLogin
      }
    })
  } catch (error) {
    console.error('Admin profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}