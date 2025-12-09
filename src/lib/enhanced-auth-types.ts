// Enhanced Authentication types with Admin/User separation

import { ObjectId } from 'mongodb'

// User Types (Customers)
export interface User {
  _id?: ObjectId
  id: string
  email?: string
  phone?: string
  name: string
  isVerified: boolean
  loginMethod: 'email' | 'phone' | 'google'
  googleId?: string
  avatar?: string
  addresses?: Address[]
  preferences?: UserPreferences
  lastLogin: Date
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

// Admin Types (Staff/Management)
export interface AdminUser {
  _id?: ObjectId
  id: string
  email: string
  name: string
  role: 'admin' | 'super_admin' | 'moderator'
  permissions: AdminPermission[]
  avatar?: string
  department?: string
  isActive: boolean
  lastLogin: Date
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export interface Address {
  id: string
  type: 'home' | 'office' | 'other'
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface UserPreferences {
  newsletter: boolean
  smsNotifications: boolean
  emailNotifications: boolean
  favoriteCategories: string[]
  currency: string
  language: string
}

export type AdminPermission = 
  | 'users:read' | 'users:write' | 'users:delete'
  | 'products:read' | 'products:write' | 'products:delete'
  | 'orders:read' | 'orders:write' | 'orders:delete'
  | 'categories:read' | 'categories:write' | 'categories:delete'
  | 'analytics:read' | 'reports:read'
  | 'settings:read' | 'settings:write'
  | 'admin:read' | 'admin:write'

export interface OTPVerification {
  _id?: ObjectId
  id: string
  identifier: string // email or phone
  otp: string
  type: 'email' | 'phone'
  purpose: 'login' | 'signup' | 'password_reset' | 'phone_verification'
  expiresAt: Date
  isUsed: boolean
  attempts: number
  maxAttempts: number
  createdAt: Date
}

export interface UserSession {
  _id?: ObjectId
  id: string
  userId: string
  token: string
  userType: 'user' | 'admin'
  deviceInfo?: DeviceInfo
  expiresAt: Date
  isActive: boolean
  createdAt: Date
  lastUsed: Date
}

export interface DeviceInfo {
  userAgent: string
  ip: string
  browser?: string
  os?: string
  device?: string
}

// Auth Response Types
export interface AuthResponse {
  success: boolean
  message: string
  user?: User | AdminUser
  token?: string
  refreshToken?: string
  requiresOTP?: boolean
  otpId?: string
  type?: 'email' | 'phone'
  maskedIdentifier?: string
  userType?: 'user' | 'admin'
}

// Request Types
export interface LoginRequest {
  identifier: string // email or phone
  type: 'email' | 'phone'
  loginMethod?: 'otp' | 'google'
}

export interface GoogleLoginRequest {
  googleToken: string
  userType: 'user' | 'admin'
}

export interface OTPVerifyRequest {
  otpId: string
  otp: string
  identifier: string
  name?: string // For signup
}

export interface SignupRequest {
  name: string
  identifier: string // email or phone
  type: 'email' | 'phone'
  loginMethod: 'otp' | 'google'
  googleToken?: string
}

export interface AdminLoginRequest {
  email: string
  password: string
}

export interface AdminCreateRequest {
  email: string
  name: string
  role: 'admin' | 'moderator'
  permissions: AdminPermission[]
  department?: string
  temporaryPassword: string
}

// JWT Payload Types
export interface UserJWTPayload {
  userId: string
  email?: string
  phone?: string
  userType: 'user'
  iat: number
  exp: number
}

export interface AdminJWTPayload {
  adminId: string
  email: string
  role: 'admin' | 'super_admin' | 'moderator'
  permissions: AdminPermission[]
  userType: 'admin'
  iat: number
  exp: number
}

// Error Types
export interface AuthError {
  code: 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'USER_EXISTS' | 'OTP_EXPIRED' | 'OTP_INVALID' | 'UNAUTHORIZED' | 'FORBIDDEN'
  message: string
  details?: any
}

// Security Types
export interface SecurityLog {
  _id?: ObjectId
  userId?: string
  adminId?: string
  action: 'login' | 'logout' | 'failed_login' | 'password_change' | 'account_created' | 'account_deleted'
  ip: string
  userAgent: string
  success: boolean
  details?: any
  timestamp: Date
}

export interface RateLimitInfo {
  identifier: string
  attempts: number
  windowStart: Date
  isBlocked: boolean
  blockUntil?: Date
}