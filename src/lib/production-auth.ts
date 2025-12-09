// Enhanced Authentication System for Production
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

interface User {
  id: number
  email: string
  phone?: string
  name: string
  role: 'customer' | 'admin' | 'staff'
  isVerified: boolean
  createdAt: Date
}

interface AuthTokens {
  accessToken: string
  refreshToken: string
}

interface LoginCredentials {
  email?: string
  phone?: string
  password?: string
  otp?: string
}

export class ProductionAuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
  private readonly JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key'
  private readonly ACCESS_TOKEN_EXPIRY = '15m'
  private readonly REFRESH_TOKEN_EXPIRY = '7d'
  private readonly OTP_EXPIRY = 5 * 60 * 1000 // 5 minutes

  // Store OTPs temporarily (use Redis in production)
  private otpStore = new Map<string, { otp: string; expiresAt: Date; attempts: number }>()

  /**
   * Generate OTP for phone/email verification
   */
  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  /**
   * Send OTP via SMS/Email (implement actual service)
   */
  async sendOTP(contact: string, type: 'sms' | 'email'): Promise<{ success: boolean; message: string }> {
    const otp = this.generateOTP()
    const expiresAt = new Date(Date.now() + this.OTP_EXPIRY)

    // Store OTP
    this.otpStore.set(contact, { otp, expiresAt, attempts: 0 })

    // In production, integrate with:
    // - SMS: Twilio, AWS SNS, or local SMS gateway
    // - Email: SendGrid, AWS SES, or SMTP service

    if (type === 'sms') {
      // SMS Integration (placeholder)
      console.log(`📱 SMS OTP for ${contact}: ${otp}`)
      // await smsService.send(contact, `Your DFW verification code: ${otp}`)
    } else {
      // Email Integration (placeholder)
      console.log(`📧 Email OTP for ${contact}: ${otp}`)
      // await emailService.send(contact, 'DFW Verification', `Your code: ${otp}`)
    }

    return {
      success: true,
      message: `OTP sent to ${contact}`
    }
  }

  /**
   * Verify OTP
   */
  verifyOTP(contact: string, otp: string): boolean {
    const stored = this.otpStore.get(contact)
    
    if (!stored) return false
    if (stored.expiresAt < new Date()) {
      this.otpStore.delete(contact)
      return false
    }
    if (stored.attempts >= 3) {
      this.otpStore.delete(contact)
      return false
    }

    stored.attempts++

    if (stored.otp === otp) {
      this.otpStore.delete(contact)
      return true
    }

    return false
  }

  /**
   * Hash password
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  /**
   * Verify password
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  /**
   * Generate JWT tokens
   */
  generateTokens(user: User): AuthTokens {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    }

    const accessToken = jwt.sign(payload, this.JWT_SECRET, { 
      expiresIn: this.ACCESS_TOKEN_EXPIRY 
    })

    const refreshToken = jwt.sign(
      { id: user.id }, 
      this.JWT_REFRESH_SECRET, 
      { expiresIn: this.REFRESH_TOKEN_EXPIRY }
    )

    return { accessToken, refreshToken }
  }

  /**
   * Verify access token
   */
  verifyAccessToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET)
    } catch (error) {
      throw new Error('Invalid or expired token')
    }
  }

  /**
   * Verify refresh token
   */
  verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_REFRESH_SECRET)
    } catch (error) {
      throw new Error('Invalid refresh token')
    }
  }

  /**
   * Generate secure API key
   */
  generateApiKey(): string {
    return crypto.randomBytes(32).toString('hex')
  }

  /**
   * Create session token for admin
   */
  createAdminSession(adminId: number): string {
    return jwt.sign(
      { 
        adminId, 
        type: 'admin-session',
        createdAt: Date.now() 
      },
      this.JWT_SECRET,
      { expiresIn: '8h' }
    )
  }

  /**
   * Middleware for protecting routes
   */
  requireAuth = (requiredRole?: string) => {
    return (req: any, res: any, next: any) => {
      try {
        const authHeader = req.headers.authorization
        if (!authHeader?.startsWith('Bearer ')) {
          return res.status(401).json({ error: 'No token provided' })
        }

        const token = authHeader.substring(7)
        const decoded = this.verifyAccessToken(token)

        if (requiredRole && decoded.role !== requiredRole) {
          return res.status(403).json({ error: 'Insufficient permissions' })
        }

        req.user = decoded
        next()
      } catch (error) {
        return res.status(401).json({ error: 'Invalid token' })
      }
    }
  }

  /**
   * Rate limiting for authentication attempts
   */
  private attemptStore = new Map<string, { attempts: number; lastAttempt: Date }>()

  checkRateLimit(identifier: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
    const now = new Date()
    const record = this.attemptStore.get(identifier)

    if (!record) {
      this.attemptStore.set(identifier, { attempts: 1, lastAttempt: now })
      return true
    }

    if (now.getTime() - record.lastAttempt.getTime() > windowMs) {
      // Reset window
      this.attemptStore.set(identifier, { attempts: 1, lastAttempt: now })
      return true
    }

    if (record.attempts >= maxAttempts) {
      return false
    }

    record.attempts++
    record.lastAttempt = now
    return true
  }

  /**
   * Generate password reset token
   */
  generateResetToken(userId: number): string {
    return jwt.sign(
      { 
        userId, 
        type: 'password-reset',
        createdAt: Date.now() 
      },
      this.JWT_SECRET,
      { expiresIn: '1h' }
    )
  }

  /**
   * Verify password reset token
   */
  verifyResetToken(token: string): { userId: number } {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as any
      if (decoded.type !== 'password-reset') {
        throw new Error('Invalid token type')
      }
      return { userId: decoded.userId }
    } catch (error) {
      throw new Error('Invalid or expired reset token')
    }
  }
}

// Export singleton instance
export const authService = new ProductionAuthService()

// Export types
export type { User, AuthTokens, LoginCredentials }