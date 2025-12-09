// Authentication types and interfaces

import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  id: string
  email?: string
  phone?: string
  name: string
  isVerified: boolean
  loginMethod: 'email' | 'phone'
  lastLogin: Date
  createdAt: Date
  updatedAt: Date
}

export interface OTPVerification {
  _id?: ObjectId
  id: string
  identifier: string // email or phone
  otp: string
  type: 'email' | 'phone'
  purpose: 'login' | 'signup' | 'password_reset'
  expiresAt: Date
  isUsed: boolean
  attempts: number
  createdAt: Date
}

export interface Session {
  _id?: ObjectId
  id: string
  userId: string
  token: string
  expiresAt: Date
  createdAt: Date
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  token?: string
  requiresOTP?: boolean
  otpId?: string
  type?: 'email' | 'phone'
  maskedIdentifier?: string
}

export interface LoginRequest {
  identifier: string // email or phone
  type: 'email' | 'phone'
}

export interface OTPVerifyRequest {
  otpId: string
  otp: string
  identifier: string
}

export interface SignupRequest {
  name: string
  identifier: string // email or phone
  type: 'email' | 'phone'
}