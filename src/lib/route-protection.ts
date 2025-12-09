// Route Protection Middleware for Next.js App Router

import { NextRequest, NextResponse } from 'next/server'
import { verifyJWTToken } from '@/lib/auth-utils'
import { AdminJWTPayload, UserJWTPayload, AdminPermission } from '@/lib/enhanced-auth-types'

export interface RouteProtectionOptions {
  requireAuth?: boolean
  requireAdmin?: boolean
  requiredPermission?: AdminPermission
  allowedRoles?: Array<'admin' | 'super_admin' | 'moderator'>
}

export function createProtectedRoute(handler: Function, options: RouteProtectionOptions = {}) {
  return async function protectedHandler(request: NextRequest, context?: any) {
    const {
      requireAuth = true,
      requireAdmin = false,
      requiredPermission,
      allowedRoles
    } = options

    // Skip protection if not required
    if (!requireAuth && !requireAdmin) {
      return handler(request, context)
    }

    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication token required' },
        { status: 401 }
      )
    }

    // Verify token
    const payload = verifyJWTToken(token)
    
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Check if admin access is required
    if (requireAdmin && payload.userType !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      )
    }

    // Check specific permission for admin users
    if (requiredPermission && payload.userType === 'admin') {
      const adminPayload = payload as AdminJWTPayload
      
      if (!adminPayload.permissions?.includes(requiredPermission)) {
        return NextResponse.json(
          { success: false, message: 'Insufficient permissions' },
          { status: 403 }
        )
      }
    }

    // Check allowed roles for admin users
    if (allowedRoles && payload.userType === 'admin') {
      const adminPayload = payload as AdminJWTPayload
      
      if (!allowedRoles.includes(adminPayload.role)) {
        return NextResponse.json(
          { success: false, message: 'Role not authorized for this action' },
          { status: 403 }
        )
      }
    }

    // Add user/admin info to request headers for use in the handler
    const requestHeaders = new Headers(request.headers)
    
    if (payload.userType === 'admin') {
      const adminPayload = payload as AdminJWTPayload
      requestHeaders.set('x-admin-id', adminPayload.adminId)
      requestHeaders.set('x-admin-email', adminPayload.email)
      requestHeaders.set('x-admin-role', adminPayload.role)
      requestHeaders.set('x-user-type', 'admin')
    } else {
      const userPayload = payload as UserJWTPayload
      requestHeaders.set('x-user-id', userPayload.userId)
      requestHeaders.set('x-user-email', userPayload.email || '')
      requestHeaders.set('x-user-type', 'user')
    }

    // Create new request with updated headers
    const protectedRequest = new NextRequest(request.url, {
      method: request.method,
      headers: requestHeaders,
      body: request.body,
    })

    return handler(protectedRequest, context)
  }
}

// Convenience functions for common protection patterns
export const protectUserRoute = (handler: Function) => 
  createProtectedRoute(handler, { requireAuth: true })

export const protectAdminRoute = (handler: Function) => 
  createProtectedRoute(handler, { requireAdmin: true })

export const protectAdminRouteWithPermission = (handler: Function, permission: AdminPermission) => 
  createProtectedRoute(handler, { requireAdmin: true, requiredPermission: permission })

export const protectSuperAdminRoute = (handler: Function) => 
  createProtectedRoute(handler, { requireAdmin: true, allowedRoles: ['super_admin'] })

// Middleware for Next.js middleware.ts file
export function createAuthMiddleware() {
  return function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Define protected routes
    const adminRoutes = ['/admin/dashboard', '/admin/users', '/admin/orders', '/admin/analytics', '/admin/settings']
    const userRoutes = ['/dashboard', '/orders', '/profile']
    const publicRoutes = ['/', '/products', '/categories', '/book-demo', '/support']

    // Check if route needs protection
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
    const isUserRoute = userRoutes.some(route => pathname.startsWith(route))
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route))

    // Allow public routes
    if (isPublicRoute && !isAdminRoute && !isUserRoute) {
      return NextResponse.next()
    }

    // Get token from cookie or Authorization header
    const token = request.cookies.get('auth_token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      // Redirect to appropriate login page
      if (isAdminRoute) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      } else if (isUserRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      
      return NextResponse.next()
    }

    // Verify token
    const payload = verifyJWTToken(token)
    
    if (!payload) {
      // Invalid token, redirect to login
      if (isAdminRoute) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      } else if (isUserRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      
      return NextResponse.next()
    }

    // Check admin routes
    if (isAdminRoute && payload.userType !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Check user routes (admin can access user routes)
    if (isUserRoute && payload.userType === 'user' && !(payload as UserJWTPayload).userId) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  }
}

// Helper to extract user info from protected request
export function getUserFromRequest(request: NextRequest): {
  userId?: string
  adminId?: string
  email?: string
  userType: 'user' | 'admin'
  role?: string
} {
  const userType = request.headers.get('x-user-type') as 'user' | 'admin'
  
  if (userType === 'admin') {
    return {
      adminId: request.headers.get('x-admin-id') || undefined,
      email: request.headers.get('x-admin-email') || undefined,
      userType: 'admin',
      role: request.headers.get('x-admin-role') || undefined
    }
  } else {
    return {
      userId: request.headers.get('x-user-id') || undefined,
      email: request.headers.get('x-user-email') || undefined,
      userType: 'user'
    }
  }
}