// Next.js Middleware for Route Protection
// This file should be placed at the root of your project (same level as package.json)

import { NextRequest } from 'next/server'
import { createAuthMiddleware } from '@/lib/route-protection'

// Create the middleware function
const authMiddleware = createAuthMiddleware()

export function middleware(request: NextRequest) {
  return authMiddleware(request)
}

// Configure which routes should be processed by middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) - handled by individual route protection
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
}