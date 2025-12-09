// User Login Page

'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthModal from '@/components/auth/AuthModal'

export default function LoginPage() {
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
              Don't have an account?{' '}
              <button
                onClick={() => router.push('/signup')}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Sign Up
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
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to your DFW Furniture account
            </p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Access Your Account
            </h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                View your orders and track deliveries
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Manage your saved furniture and wishlist
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Access exclusive deals and offers
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Quick checkout for faster shopping
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showModal}
        onClose={handleClose}
        defaultMode="login"
      />
    </div>
  )
}