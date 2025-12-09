// User Signup Page

'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthModal from '@/components/auth/AuthModal'

export default function SignupPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showModal, setShowModal] = useState(true)
  
  // Get redirect URL from query params
  const redirectTo = searchParams.get('redirect') || '/dashboard'

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, router, redirectTo])

  const handleClose = () => {
    setShowModal(false)
    router.push('/')
  }

  const handleSuccess = () => {
    router.push(redirectTo)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
              >
                DFW Furniture
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => router.push('/login')}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join DFW Furniture
            </h1>
            <p className="text-gray-600">
              Create your account and start shopping for premium furniture
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Why Join DFW Furniture?
            </h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <strong className="text-green-600 mr-1">10% off</strong> your first order
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <strong className="text-green-600 mr-1">Free delivery</strong> on orders above ₹25,000
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <strong className="text-green-600 mr-1">Exclusive access</strong> to new collections
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <strong className="text-green-600 mr-1">Priority support</strong> from design experts
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <strong className="text-green-600 mr-1">Easy returns</strong> and exchanges
              </li>
            </ul>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Secure & Simple Signup
                </h3>
                <div className="mt-1 text-sm text-blue-700">
                  <p>
                    No passwords required! We use secure OTP verification via email or phone number.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showModal}
        onClose={handleClose}
        defaultMode="signup"
      />
    </div>
  )
}