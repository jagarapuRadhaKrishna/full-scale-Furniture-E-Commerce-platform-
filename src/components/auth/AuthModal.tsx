// Authentication modal component

'use client'

import React, { useState, useEffect } from 'react'
import { X, Mail, Phone, ArrowLeft, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { authService } from '@/lib/auth-service'
import { validateIdentifier } from '@/lib/auth-utils'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'login' | 'signup'
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>(defaultMode)
  const [identifier, setIdentifier] = useState('')
  const [name, setName] = useState('')
  const [otp, setOtp] = useState('')
  const [otpId, setOtpId] = useState('')
  const [identifierType, setIdentifierType] = useState<'email' | 'phone' | null>(null)
  const [maskedIdentifier, setMaskedIdentifier] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [timer, setTimer] = useState(0)

  const { login } = useAuth()

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode)
      resetForm()
    }
  }, [isOpen, defaultMode])

  const resetForm = () => {
    setIdentifier('')
    setName('')
    setOtp('')
    setOtpId('')
    setIdentifierType(null)
    setMaskedIdentifier('')
    setError('')
    setSuccess('')
    setTimer(0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      // Demo mode - simple authentication for testing
      if (mode === 'login') {
        await handleDemoLogin()
      } else if (mode === 'signup') {
        await handleDemoSignup()
      } else {
        await handleOTPVerification()
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    if (!identifier.trim()) {
      setError('Please enter your email or phone number')
      return
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Demo user data
    const demoUser = {
      id: '1',
      name: 'Demo User',
      email: identifier.includes('@') ? identifier : 'demo@example.com',
      phone: identifier.includes('@') ? '+91 9876543210' : identifier,
      isVerified: true,
      loginMethod: identifier.includes('@') ? 'email' as const : 'phone' as const,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const demoToken = 'demo-token-' + Date.now()

    login(demoToken, demoUser)
    setSuccess('Login successful!')
    setTimeout(() => {
      onClose()
      resetForm()
    }, 1000)
  }

  const handleDemoSignup = async () => {
    if (!identifier.trim()) {
      setError('Please enter your email or phone number')
      return
    }

    if (!name.trim()) {
      setError('Please enter your name')
      return
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Demo user data
    const demoUser = {
      id: '2',
      name: name.trim(),
      email: identifier.includes('@') ? identifier : 'demo@example.com',
      phone: identifier.includes('@') ? '+91 9876543210' : identifier,
      isVerified: true,
      loginMethod: identifier.includes('@') ? 'email' as const : 'phone' as const,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const demoToken = 'demo-token-' + Date.now()

    login(demoToken, demoUser)
    setSuccess('Account created successfully!')
    setTimeout(() => {
      onClose()
      resetForm()
    }, 1000)
  }

  const handleInitiateAuth = async () => {
    if (!identifier.trim()) {
      setError('Please enter your email or phone number')
      return
    }

    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your name')
      return
    }

    const validation = validateIdentifier(identifier)
    if (!validation.type) {
      setError('Please enter a valid email or phone number')
      return
    }

    const data = mode === 'signup' 
      ? { name: name.trim(), identifier: validation.formatted, type: validation.type }
      : { identifier: validation.formatted, type: validation.type }

    const response = await authService.initiateAuth(data)

    if (response.success) {
      setOtpId(response.otpId!)
      setIdentifierType(validation.type)
      setMaskedIdentifier(response.maskedIdentifier!)
      setMode('otp')
      setTimer(600) // 10 minutes
      setSuccess(response.message)
    } else {
      setError(response.message)
    }
  }

  const handleOTPVerification = async () => {
    if (!otp.trim()) {
      setError('Please enter the OTP')
      return
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 digits')
      return
    }

    const response = await authService.verifyOTP({
      otpId,
      otp: otp.trim(),
      identifier,
      name: mode === 'signup' ? name : undefined
    })

    if (response.success && response.user && response.token) {
      login(response.token, response.user)
      setSuccess(response.message)
      setTimeout(() => {
        onClose()
        resetForm()
      }, 1000)
    } else {
      setError(response.message)
    }
  }

  const handleResendOTP = async () => {
    setError('')
    setIsLoading(true)

    try {
      const validation = validateIdentifier(identifier)
      const data = mode === 'signup' 
        ? { name: name.trim(), identifier: validation.formatted, type: validation.type! }
        : { identifier: validation.formatted, type: validation.type! }

      const response = await authService.initiateAuth(data)

      if (response.success) {
        setOtpId(response.otpId!)
        setTimer(600)
        setSuccess('OTP resent successfully')
        setOtp('')
      } else {
        setError(response.message)
      }
    } catch (error) {
      setError('Failed to resend OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    setMode(defaultMode)
    setOtp('')
    setError('')
    setSuccess('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            {mode === 'otp' && (
              <button
                onClick={handleBack}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isLoading}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-xl font-semibold text-gray-800">
              {mode === 'login' && 'Login to DFW Furniture'}
              {mode === 'signup' && 'Join DFW Furniture'}
              {mode === 'otp' && 'Verify OTP'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode !== 'otp' ? (
              <>
                {mode === 'signup' && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      disabled={isLoading}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-2">
                    Email or Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="identifier"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter email or phone number"
                      disabled={isLoading}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      {identifier && validateIdentifier(identifier).type === 'email' && (
                        <Mail className="w-4 h-4 text-gray-400" />
                      )}
                      {identifier && validateIdentifier(identifier).type === 'phone' && (
                        <Phone className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-4">
                  <p className="text-gray-600">
                    We've sent a 6-digit OTP to
                  </p>
                  <p className="font-medium text-gray-800">
                    {maskedIdentifier}
                  </p>
                </div>

                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-lg font-mono tracking-wider"
                    placeholder="000000"
                    disabled={isLoading}
                    maxLength={6}
                  />
                </div>

                <div className="text-center">
                  {timer > 0 ? (
                    <p className="text-sm text-gray-600">
                      Resend OTP in {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                      disabled={isLoading}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === 'login' && 'Send Login OTP'}
              {mode === 'signup' && 'Send Signup OTP'}
              {mode === 'otp' && 'Verify OTP'}
            </button>
          </form>

          {mode !== 'otp' && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="ml-1 text-orange-600 hover:text-orange-700 font-medium"
                  disabled={isLoading}
                >
                  {mode === 'login' ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}