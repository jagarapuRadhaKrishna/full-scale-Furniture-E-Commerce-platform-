// Authentication utilities

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { UserJWTPayload, AdminJWTPayload } from '@/lib/enhanced-auth-types'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret'

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' })
}

export function generateJWTToken(payload: { userId: string; email?: string; userType: 'user' | 'admin'; [key: string]: any }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function generateRefreshToken(userId: string, userType: 'user' | 'admin'): string {
  return jwt.sign({ userId, userType }, JWT_REFRESH_SECRET, { expiresIn: '30d' })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch {
    return null
  }
}

export function verifyJWTToken(token: string): UserJWTPayload | AdminJWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserJWTPayload | AdminJWTPayload
  } catch {
    return null
  }
}

export function verifyRefreshToken(token: string): { userId: string; userType: 'user' | 'admin' } | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string; userType: 'user' | 'admin' }
  } catch {
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateUserId(): string {
  return uuidv4()
}

export function generateOTPId(): string {
  return uuidv4()
}

export function generateSessionId(): string {
  return uuidv4()
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  // Support Indian phone numbers (+91) and international formats
  const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function formatPhone(phone: string): string {
  // Normalize phone number format
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `+91${cleaned}`
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+${cleaned}`
  }
  return phone
}

export function validateIdentifier(identifier: string): { type: 'email' | 'phone' | null; formatted: string } {
  if (isValidEmail(identifier)) {
    return { type: 'email', formatted: identifier.toLowerCase().trim() }
  } else if (isValidPhone(identifier)) {
    return { type: 'phone', formatted: formatPhone(identifier) }
  }
  return { type: null, formatted: identifier }
}

// Device info extraction
export function extractDeviceInfo(request: Request): {
  userAgent: string
  ip: string
  browser?: string
  os?: string
  device?: string
} {
  const userAgent = request.headers.get('user-agent') || 'Unknown'
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'Unknown'

  return {
    userAgent,
    ip,
    browser: extractBrowser(userAgent),
    os: extractOS(userAgent),
    device: extractDevice(userAgent)
  }
}

function extractBrowser(userAgent: string): string {
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Safari')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  return 'Unknown'
}

function extractOS(userAgent: string): string {
  if (userAgent.includes('Windows')) return 'Windows'
  if (userAgent.includes('Mac')) return 'macOS'
  if (userAgent.includes('Linux')) return 'Linux'
  if (userAgent.includes('Android')) return 'Android'
  if (userAgent.includes('iOS')) return 'iOS'
  return 'Unknown'
}

function extractDevice(userAgent: string): string {
  if (userAgent.includes('Mobile')) return 'Mobile'
  if (userAgent.includes('Tablet')) return 'Tablet'
  return 'Desktop'
}