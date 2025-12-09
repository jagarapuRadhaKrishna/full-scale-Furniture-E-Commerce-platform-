// Enhanced Admin authentication API endpoint

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { AdminPermission } from '@/lib/enhanced-auth-types'
import { 
  hashPassword, 
  comparePassword, 
  generateJWTToken, 
  verifyJWTToken,
  extractDeviceInfo,
  generateUserId
} from '@/lib/auth-utils'

export const ADMIN_PERMISSIONS = {
  // User Management
  USERS_READ: 'users:read' as AdminPermission,
  USERS_WRITE: 'users:write' as AdminPermission,
  USERS_DELETE: 'users:delete' as AdminPermission,
  
  // Product Management
  PRODUCTS_READ: 'products:read' as AdminPermission,
  PRODUCTS_WRITE: 'products:write' as AdminPermission,
  PRODUCTS_DELETE: 'products:delete' as AdminPermission,
  
  // Order Management
  ORDERS_READ: 'orders:read' as AdminPermission,
  ORDERS_WRITE: 'orders:write' as AdminPermission,
  ORDERS_DELETE: 'orders:delete' as AdminPermission,
  
  // Category Management
  CATEGORIES_READ: 'categories:read' as AdminPermission,
  CATEGORIES_WRITE: 'categories:write' as AdminPermission,
  CATEGORIES_DELETE: 'categories:delete' as AdminPermission,
  
  // Analytics & Reports
  ANALYTICS_READ: 'analytics:read' as AdminPermission,
  REPORTS_READ: 'reports:read' as AdminPermission,
  
  // Settings
  SETTINGS_READ: 'settings:read' as AdminPermission,
  SETTINGS_WRITE: 'settings:write' as AdminPermission,
  
  // Admin Management
  ADMIN_READ: 'admin:read' as AdminPermission,
  ADMIN_WRITE: 'admin:write' as AdminPermission
}

export const ROLE_PERMISSIONS = {
  moderator: [
    ADMIN_PERMISSIONS.USERS_READ,
    ADMIN_PERMISSIONS.PRODUCTS_READ,
    ADMIN_PERMISSIONS.ORDERS_READ,
    ADMIN_PERMISSIONS.CATEGORIES_READ
  ],
  admin: [
    ADMIN_PERMISSIONS.USERS_READ,
    ADMIN_PERMISSIONS.USERS_WRITE,
    ADMIN_PERMISSIONS.PRODUCTS_READ,
    ADMIN_PERMISSIONS.PRODUCTS_WRITE,
    ADMIN_PERMISSIONS.ORDERS_READ,
    ADMIN_PERMISSIONS.ORDERS_WRITE,
    ADMIN_PERMISSIONS.CATEGORIES_READ,
    ADMIN_PERMISSIONS.CATEGORIES_WRITE,
    ADMIN_PERMISSIONS.ANALYTICS_READ,
    ADMIN_PERMISSIONS.REPORTS_READ,
    ADMIN_PERMISSIONS.SETTINGS_READ
  ],
  super_admin: Object.values(ADMIN_PERMISSIONS)
}

interface AdminUserWithPassword {
  _id?: any
  id: string
  email: string
  name: string
  role: 'admin' | 'super_admin' | 'moderator'
  permissions: AdminPermission[]
  password?: string
  avatar?: string
  department?: string
  isActive: boolean
  lastLogin: Date
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    
    // Initialize default admin if none exists
    await initializeDefaultAdminIfNeeded(db)
    
    // Find admin user
    const admin = await db.collection('admin_users').findOne({ 
      email: email.toLowerCase(),
      isActive: true 
    }) as AdminUserWithPassword | null

    if (!admin) {
      // Log failed login attempt
      await db.collection('security_logs').insertOne({
        action: 'failed_login',
        ip: extractDeviceInfo(request).ip,
        userAgent: extractDeviceInfo(request).userAgent,
        success: false,
        details: { email, reason: 'user_not_found', userType: 'admin' },
        timestamp: new Date()
      })

      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = admin.password 
      ? await comparePassword(password, admin.password)
      : password === 'DFWAdmin123!' // Fallback for initial setup

    if (!isValidPassword) {
      // Log failed login attempt
      await db.collection('security_logs').insertOne({
        adminId: admin.id,
        action: 'failed_login',
        ip: extractDeviceInfo(request).ip,
        userAgent: extractDeviceInfo(request).userAgent,
        success: false,
        details: { email, reason: 'invalid_password', userType: 'admin' },
        timestamp: new Date()
      })

      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Update last login
    await db.collection('admin_users').updateOne(
      { id: admin.id },
      { $set: { lastLogin: new Date() } }
    )

    // Generate JWT token
    const token = generateJWTToken({
      userId: admin.id, // Use userId to match the interface
      adminId: admin.id,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions,
      userType: 'admin'
    })

    // Log successful login
    await db.collection('security_logs').insertOne({
      adminId: admin.id,
      action: 'login',
      ip: extractDeviceInfo(request).ip,
      userAgent: extractDeviceInfo(request).userAgent,
      success: true,
      details: { userType: 'admin' },
      timestamp: new Date()
    })

    return NextResponse.json({
      success: true,
      message: 'Admin login successful',
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        permissions: admin.permissions,
        department: admin.department
      },
      token,
      userType: 'admin'
    })

  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token required' },
        { status: 401 }
      )
    }

    const payload = verifyJWTToken(token)
    
    if (!payload || payload.userType !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    const { db } = await connectToDatabase()
    const admin = await db.collection('admin_users').findOne({ 
      id: payload.adminId,
      isActive: true 
    }) as AdminUserWithPassword | null

    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Admin not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        permissions: admin.permissions,
        department: admin.department
      }
    })

  } catch (error) {
    console.error('Admin token verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Initialize default admin user if none exists
async function initializeDefaultAdminIfNeeded(db: any) {
  try {
    const existingAdmin = await db.collection('admin_users').findOne({ 
      role: 'super_admin' 
    })

    if (!existingAdmin) {
      const defaultAdmin: AdminUserWithPassword = {
        id: generateUserId(),
        email: 'admin@dfwfurniture.com',
        name: 'Super Administrator',
        role: 'super_admin',
        permissions: ROLE_PERMISSIONS.super_admin,
        password: await hashPassword('DFWAdmin123!'),
        department: 'Management',
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system'
      }

      await db.collection('admin_users').insertOne(defaultAdmin)
      console.log('Default admin user created:', defaultAdmin.email)
      console.log('Default password: DFWAdmin123!')
    }
  } catch (error) {
    console.error('Failed to initialize default admin:', error)
  }
}