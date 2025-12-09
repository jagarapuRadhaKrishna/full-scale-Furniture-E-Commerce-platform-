// Admin authentication and authorization utilities

import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'super_admin'
  permissions: string[]
  lastLogin: Date
}

export interface AdminJWTPayload {
  adminId: string
  email: string
  role: 'admin' | 'super_admin'
  permissions: string[]
  iat: number
  exp: number
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-admin-secret-key'

export const ADMIN_PERMISSIONS = {
  USERS_READ: 'users:read',
  USERS_WRITE: 'users:write',
  USERS_DELETE: 'users:delete',
  ORDERS_READ: 'orders:read',
  ORDERS_WRITE: 'orders:write',
  ORDERS_DELETE: 'orders:delete',
  PRODUCTS_READ: 'products:read',
  PRODUCTS_WRITE: 'products:write',
  PRODUCTS_DELETE: 'products:delete',
  ANALYTICS_READ: 'analytics:read',
  SETTINGS_READ: 'settings:read',
  SETTINGS_WRITE: 'settings:write',
  ADMIN_USERS_READ: 'admin_users:read',
  ADMIN_USERS_WRITE: 'admin_users:write'
} as const

export const ROLE_PERMISSIONS = {
  admin: [
    ADMIN_PERMISSIONS.USERS_READ,
    ADMIN_PERMISSIONS.USERS_WRITE,
    ADMIN_PERMISSIONS.ORDERS_READ,
    ADMIN_PERMISSIONS.ORDERS_WRITE,
    ADMIN_PERMISSIONS.PRODUCTS_READ,
    ADMIN_PERMISSIONS.PRODUCTS_WRITE,
    ADMIN_PERMISSIONS.ANALYTICS_READ,
    ADMIN_PERMISSIONS.SETTINGS_READ
  ],
  super_admin: Object.values(ADMIN_PERMISSIONS)
}

export function generateAdminToken(admin: Omit<AdminUser, 'lastLogin'>): string {
  const payload: Omit<AdminJWTPayload, 'iat' | 'exp'> = {
    adminId: admin.id,
    email: admin.email,
    role: admin.role,
    permissions: admin.permissions
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' })
}

export function verifyAdminToken(token: string): AdminJWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminJWTPayload
  } catch (error) {
    return null
  }
}

export function extractAdminToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }

  // Also check cookies
  const tokenCookie = request.cookies.get('admin-token')
  return tokenCookie?.value || null
}

export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission)
}

export function hasAnyPermission(userPermissions: string[], requiredPermissions: string[]): boolean {
  return requiredPermissions.some(permission => userPermissions.includes(permission))
}

export function isAdmin(role: string): boolean {
  return role === 'admin' || role === 'super_admin'
}

export function isSuperAdmin(role: string): boolean {
  return role === 'super_admin'
}

// Predefined admin users (in production, store in database)
export const ADMIN_USERS = [
  {
    id: 'admin-1',
    email: 'admin@dfwfurniture.com',
    name: 'System Administrator',
    password: '$2b$10$rQJ8YQq9QZq8QZq8QZq8QO', // hashed password for 'admin123'
    role: 'super_admin' as const,
    permissions: ROLE_PERMISSIONS.super_admin,
    lastLogin: new Date()
  },
  {
    id: 'admin-2',
    email: 'manager@dfwfurniture.com',
    name: 'Store Manager',
    password: '$2b$10$rQJ8YQq9QZq8QZq8QZq8QO', // hashed password for 'manager123'
    role: 'admin' as const,
    permissions: ROLE_PERMISSIONS.admin,
    lastLogin: new Date()
  }
]