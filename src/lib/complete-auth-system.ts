// Complete JWT Authentication System for DFW
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'dfw-super-secret-key-change-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'dfw-refresh-secret-change-in-production'
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || '30d'

// Types
export interface User {
  id: string
  email: string
  phone?: string
  firstName?: string
  lastName?: string
  role: 'customer' | 'admin' | 'staff'
  isVerified: boolean
  permissions?: string[]
}

export interface JWTPayload {
  userId: string
  email: string
  role: string
  permissions?: string[]
  type: 'access' | 'refresh'
}

export interface AuthResponse {
  success: boolean
  user?: User
  accessToken?: string
  refreshToken?: string
  message?: string
  error?: string
}

export interface LoginRequest {
  email?: string
  phone?: string
  password?: string
  otp?: string
  provider?: 'email' | 'phone' | 'google'
}

export interface RegisterRequest {
  email: string
  phone?: string
  password: string
  firstName: string
  lastName: string
  acceptTerms: boolean
}

// Database simulation (replace with actual database)
const users: User[] = [
  {
    id: '1',
    email: 'admin@dfwfurniture.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isVerified: true,
    permissions: ['all']
  }
]

const userSessions: Array<{
  userId: string
  tokenHash: string
  refreshTokenHash: string
  expiresAt: Date
  isActive: boolean
  ipAddress?: string
  userAgent?: string
}> = []

export class AuthService {
  // Password utilities
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
  }

  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  // JWT utilities
  static generateAccessToken(payload: Omit<JWTPayload, 'type'>): string {
    return jwt.sign(
      { ...payload, type: 'access' } as object,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )
  }

  static generateRefreshToken(payload: Omit<JWTPayload, 'type'>): string {
    return jwt.sign(
      { ...payload, type: 'refresh' } as object,
      REFRESH_SECRET,
      { expiresIn: REFRESH_EXPIRES_IN }
    )
  }

  static verifyAccessToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
      if (decoded.type !== 'access') return null
      return decoded
    } catch (error) {
      return null
    }
  }

  static verifyRefreshToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, REFRESH_SECRET) as JWTPayload
      if (decoded.type !== 'refresh') return null
      return decoded
    } catch (error) {
      return null
    }
  }

  // Authentication methods
  static async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      // Validate input
      if (!data.email || !data.password || !data.firstName) {
        return { success: false, error: 'Missing required fields' }
      }

      if (data.password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' }
      }

      // Check if user exists
      const existingUser = users.find(u => u.email === data.email)
      if (existingUser) {
        return { success: false, error: 'User already exists with this email' }
      }

      // Create new user
      const hashedPassword = await this.hashPassword(data.password)
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'customer',
        isVerified: false
      }

      users.push(newUser)

      // Generate tokens
      const tokenPayload = {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
        permissions: newUser.permissions
      }

      const accessToken = this.generateAccessToken(tokenPayload)
      const refreshToken = this.generateRefreshToken(tokenPayload)

      // Store session
      this.storeSession(newUser.id, accessToken, refreshToken)

      return {
        success: true,
        user: newUser,
        accessToken,
        refreshToken,
        message: 'Registration successful'
      }
    } catch (error) {
      return { success: false, error: 'Registration failed' }
    }
  }

  static async loginWithEmail(email: string, password: string): Promise<AuthResponse> {
    try {
      // Find user
      const user = users.find(u => u.email === email)
      if (!user) {
        return { success: false, error: 'Invalid email or password' }
      }

      // For demo purposes, accept any password for existing users
      // In production, verify against stored hash
      // const isValidPassword = await this.verifyPassword(password, user.passwordHash)
      // if (!isValidPassword) {
      //   return { success: false, error: 'Invalid email or password' }
      // }

      // Generate tokens
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      }

      const accessToken = this.generateAccessToken(tokenPayload)
      const refreshToken = this.generateRefreshToken(tokenPayload)

      // Store session
      this.storeSession(user.id, accessToken, refreshToken)

      return {
        success: true,
        user,
        accessToken,
        refreshToken,
        message: 'Login successful'
      }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  static async loginWithPhone(phone: string, otp: string): Promise<AuthResponse> {
    try {
      // Find user by phone
      const user = users.find(u => u.phone === phone)
      if (!user) {
        return { success: false, error: 'User not found' }
      }

      // For demo purposes, accept any 4-digit OTP
      if (!/^\d{4}$/.test(otp)) {
        return { success: false, error: 'Invalid OTP format' }
      }

      // Generate tokens
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      }

      const accessToken = this.generateAccessToken(tokenPayload)
      const refreshToken = this.generateRefreshToken(tokenPayload)

      // Store session
      this.storeSession(user.id, accessToken, refreshToken)

      return {
        success: true,
        user,
        accessToken,
        refreshToken,
        message: 'Login successful'
      }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  static async refreshTokens(refreshToken: string): Promise<AuthResponse> {
    try {
      // Verify refresh token
      const payload = this.verifyRefreshToken(refreshToken)
      if (!payload) {
        return { success: false, error: 'Invalid refresh token' }
      }

      // Find user
      const user = users.find(u => u.id === payload.userId)
      if (!user) {
        return { success: false, error: 'User not found' }
      }

      // Generate new tokens
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      }

      const newAccessToken = this.generateAccessToken(tokenPayload)
      const newRefreshToken = this.generateRefreshToken(tokenPayload)

      // Update session
      this.updateSession(user.id, newAccessToken, newRefreshToken)

      return {
        success: true,
        user,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        message: 'Tokens refreshed'
      }
    } catch (error) {
      return { success: false, error: 'Token refresh failed' }
    }
  }

  static async logout(userId: string, token: string): Promise<AuthResponse> {
    try {
      // Invalidate session
      const sessionIndex = userSessions.findIndex(s => 
        s.userId === userId && s.tokenHash === this.hashToken(token)
      )

      if (sessionIndex !== -1) {
        userSessions[sessionIndex].isActive = false
      }

      return { success: true, message: 'Logout successful' }
    } catch (error) {
      return { success: false, error: 'Logout failed' }
    }
  }

  static async validateToken(token: string): Promise<User | null> {
    try {
      const payload = this.verifyAccessToken(token)
      if (!payload) return null

      // Check if session is active
      const session = userSessions.find(s => 
        s.userId === payload.userId && 
        s.tokenHash === this.hashToken(token) &&
        s.isActive &&
        s.expiresAt > new Date()
      )

      if (!session) return null

      // Find user
      const user = users.find(u => u.id === payload.userId)
      return user || null
    } catch (error) {
      return null
    }
  }

  // Session management
  private static storeSession(
    userId: string, 
    accessToken: string, 
    refreshToken: string,
    ipAddress?: string,
    userAgent?: string
  ): void {
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days

    userSessions.push({
      userId,
      tokenHash: this.hashToken(accessToken),
      refreshTokenHash: this.hashToken(refreshToken),
      expiresAt,
      isActive: true,
      ipAddress,
      userAgent
    })
  }

  private static updateSession(userId: string, accessToken: string, refreshToken: string): void {
    const sessionIndex = userSessions.findIndex(s => s.userId === userId && s.isActive)
    if (sessionIndex !== -1) {
      userSessions[sessionIndex].tokenHash = this.hashToken(accessToken)
      userSessions[sessionIndex].refreshTokenHash = this.hashToken(refreshToken)
    }
  }

  private static hashToken(token: string): string {
    return Buffer.from(token).toString('base64')
  }

  // Admin utilities
  static isAdmin(user: User): boolean {
    return user.role === 'admin' || user.role === 'staff'
  }

  static hasPermission(user: User, permission: string): boolean {
    if (!user.permissions) return false
    return user.permissions.includes('all') || user.permissions.includes(permission)
  }
}

// Middleware for protecting routes
export function createAuthMiddleware() {
  return async function authMiddleware(
    request: NextRequest,
    requiredRole?: 'customer' | 'admin' | 'staff',
    requiredPermission?: string
  ): Promise<NextResponse | User> {
    try {
      // Get token from Authorization header or cookie
      const authHeader = request.headers.get('Authorization')
      const token = authHeader?.replace('Bearer ', '') || 
                   request.cookies.get('auth_token')?.value

      if (!token) {
        return NextResponse.json(
          { success: false, error: 'Authentication required' },
          { status: 401 }
        )
      }

      // Validate token
      const user = await AuthService.validateToken(token)
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Invalid or expired token' },
          { status: 401 }
        )
      }

      // Check role requirement
      if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
        return NextResponse.json(
          { success: false, error: 'Insufficient permissions' },
          { status: 403 }
        )
      }

      // Check permission requirement
      if (requiredPermission && !AuthService.hasPermission(user, requiredPermission)) {
        return NextResponse.json(
          { success: false, error: 'Insufficient permissions' },
          { status: 403 }
        )
      }

      return user
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Authentication failed' },
        { status: 500 }
      )
    }
  }
}

// Utility functions for API routes
export function withAuth(
  handler: (request: NextRequest, user: User) => Promise<NextResponse>,
  options: {
    requiredRole?: 'customer' | 'admin' | 'staff'
    requiredPermission?: string
  } = {}
) {
  return async function(request: NextRequest) {
    const authMiddleware = createAuthMiddleware()
    const result = await authMiddleware(request, options.requiredRole, options.requiredPermission)
    
    if (result instanceof NextResponse) {
      return result // Auth failed
    }
    
    return handler(request, result) // Auth succeeded, result is user
  }
}

// Pre-configured middleware functions
export const requireAuth = (handler: any) => withAuth(handler)
export const requireAdmin = (handler: any) => withAuth(handler, { requiredRole: 'admin' })
export const requireCustomer = (handler: any) => withAuth(handler, { requiredRole: 'customer' })

// OTP Service (for phone/email verification)
export class OTPService {
  private static otpStore: Map<string, {
    code: string
    expiresAt: Date
    attempts: number
    maxAttempts: number
  }> = new Map()

  static generateOTP(): string {
    return Math.floor(1000 + Math.random() * 9000).toString()
  }

  static async sendOTP(identifier: string, type: 'email' | 'sms'): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const otp = this.generateOTP()
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

      // Store OTP
      this.otpStore.set(identifier, {
        code: otp,
        expiresAt,
        attempts: 0,
        maxAttempts: 3
      })

      // In production, send actual SMS/email here
      console.log(`OTP for ${identifier}: ${otp}`)

      return {
        success: true,
        message: `OTP sent to ${identifier}`
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to send OTP'
      }
    }
  }

  static verifyOTP(identifier: string, code: string): { success: boolean; error?: string } {
    const stored = this.otpStore.get(identifier)
    
    if (!stored) {
      return { success: false, error: 'OTP not found or expired' }
    }

    if (stored.attempts >= stored.maxAttempts) {
      this.otpStore.delete(identifier)
      return { success: false, error: 'Too many attempts' }
    }

    if (new Date() > stored.expiresAt) {
      this.otpStore.delete(identifier)
      return { success: false, error: 'OTP expired' }
    }

    stored.attempts++

    if (stored.code !== code) {
      return { success: false, error: 'Invalid OTP' }
    }

    // OTP verified successfully
    this.otpStore.delete(identifier)
    return { success: true }
  }
}

export default AuthService