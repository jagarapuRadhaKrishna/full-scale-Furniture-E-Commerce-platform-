// API Key Authentication Middleware
// src/middleware/apiKeyAuth.ts

import { NextRequest, NextResponse } from 'next/server'

export function verifyApiKey(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }

  const apiKey = authHeader.replace('Bearer ', '')
  const validApiKey = process.env.ADMIN_API_KEY

  return apiKey === validApiKey
}

export function withApiKey(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    if (!verifyApiKey(request)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized - Invalid API Key' },
        { status: 401 }
      )
    }

    return handler(request)
  }
}

// Usage in API routes:
// export const PUT = withApiKey(async (request: NextRequest) => {
//   // Your protected API logic here
// })
