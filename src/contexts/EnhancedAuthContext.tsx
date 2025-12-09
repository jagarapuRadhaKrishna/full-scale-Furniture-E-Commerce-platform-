// Enhanced Authentication Context with Google OAuth and Role-based Access

'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, AdminUser, AuthResponse } from '@/lib/enhanced-auth-types'

interface AuthContextType {
  // User state
  user: User | AdminUser | null
  isAuthenticated: boolean
  isLoading: boolean
  userType: 'user' | 'admin' | null
  
  // Authentication methods
  loginWithOTP: (identifier: string, type: 'email' | 'phone') => Promise<AuthResponse>
  loginWithGoogle: (googleToken: string) => Promise<AuthResponse>
  verifyOTP: (otpId: string, otp: string, identifier: string, name?: string) => Promise<AuthResponse>
  adminLogin: (email: string, password: string) => Promise<AuthResponse>
  logout: () => Promise<void>
  
  // User management
  updateProfile: (data: { name: string }) => Promise<AuthResponse>
  refreshToken: () => Promise<boolean>
  
  // Admin permissions
  hasPermission: (permission: string) => boolean
  isAdmin: boolean
  isSuperAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userType, setUserType] = useState<'user' | 'admin' | null>(null)

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const savedUserType = localStorage.getItem('user_type') as 'user' | 'admin' | null
      
      if (!token || !savedUserType) {
        setIsLoading(false)
        return
      }

      // Verify token with appropriate endpoint
      const endpoint = savedUserType === 'admin' ? '/api/admin/auth' : '/api/auth/me'
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setUser(savedUserType === 'admin' ? data.admin : data.user)
          setUserType(savedUserType)
        } else {
          // Invalid token, clear storage
          localStorage.removeItem('auth_token')
          localStorage.removeItem('user_type')
        }
      }
    } catch (error) {
      console.error('Auth status check failed:', error)
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_type')
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithOTP = async (identifier: string, type: 'email' | 'phone'): Promise<AuthResponse> => {
    try {
      const response = await fetch('/api/auth/enhanced-initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier,
          type,
          purpose: 'login',
          loginMethod: 'otp'
        })
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error('OTP login initiation failed:', error)
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.'
      }
    }
  }

  const loginWithGoogle = async (googleToken: string): Promise<AuthResponse> => {
    try {
      const response = await fetch('/api/auth/enhanced-initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          loginMethod: 'google',
          googleToken
        })
      })

      const result = await response.json()
      
      if (result.success && result.token) {
        localStorage.setItem('auth_token', result.token)
        localStorage.setItem('user_type', 'user')
        setUser(result.user)
        setUserType('user')
      }

      return result
    } catch (error) {
      console.error('Google login failed:', error)
      return {
        success: false,
        message: 'Google login failed. Please try again.'
      }
    }
  }

  const verifyOTP = async (
    otpId: string, 
    otp: string, 
    identifier: string, 
    name?: string
  ): Promise<AuthResponse> => {
    try {
      const response = await fetch('/api/auth/enhanced-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          otpId,
          otp,
          identifier,
          name
        })
      })

      const result = await response.json()
      
      if (result.success && result.token) {
        localStorage.setItem('auth_token', result.token)
        localStorage.setItem('user_type', 'user')
        setUser(result.user)
        setUserType('user')
      }

      return result
    } catch (error) {
      console.error('OTP verification failed:', error)
      return {
        success: false,
        message: 'OTP verification failed. Please try again.'
      }
    }
  }

  const adminLogin = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const result = await response.json()
      
      if (result.success && result.token) {
        localStorage.setItem('auth_token', result.token)
        localStorage.setItem('user_type', 'admin')
        setUser(result.admin)
        setUserType('admin')
      }

      return result
    } catch (error) {
      console.error('Admin login failed:', error)
      return {
        success: false,
        message: 'Admin login failed. Please try again.'
      }
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      
      if (token) {
        // Notify server about logout
        const endpoint = userType === 'admin' ? '/api/admin/logout' : '/api/auth/logout'
        await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }
    } catch (error) {
      console.error('Logout request failed:', error)
    } finally {
      // Clear local state regardless of server response
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_type')
      setUser(null)
      setUserType(null)
    }
  }

  const updateProfile = async (data: { name: string }): Promise<AuthResponse> => {
    try {
      const token = localStorage.getItem('auth_token')
      
      if (!token) {
        return {
          success: false,
          message: 'Not authenticated'
        }
      }

      const response = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      
      if (result.success && result.user) {
        setUser(result.user)
      }

      return result
    } catch (error) {
      console.error('Profile update failed:', error)
      return {
        success: false,
        message: 'Profile update failed. Please try again.'
      }
    }
  }

  const refreshToken = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('auth_token')
      
      if (!token) return false

      const endpoint = userType === 'admin' ? '/api/admin/auth' : '/api/auth/me'
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setUser(userType === 'admin' ? data.admin : data.user)
          return true
        }
      }

      // Token invalid, logout
      await logout()
      return false
    } catch (error) {
      console.error('Token refresh failed:', error)
      await logout()
      return false
    }
  }

  const hasPermission = (permission: string): boolean => {
    if (!user || userType !== 'admin') return false
    
    const adminUser = user as AdminUser
    return adminUser.permissions?.includes(permission as any) || false
  }

  const isAdmin = userType === 'admin'
  const isSuperAdmin = isAdmin && (user as AdminUser)?.role === 'super_admin'
  const isAuthenticated = !!user

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    userType,
    loginWithOTP,
    loginWithGoogle,
    verifyOTP,
    adminLogin,
    logout,
    updateProfile,
    refreshToken,
    hasPermission,
    isAdmin,
    isSuperAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// HOC for protecting routes
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: {
    requireAuth?: boolean
    requireAdmin?: boolean
    requiredPermission?: string
    redirectTo?: string
  } = {}
) {
  const {
    requireAuth = true,
    requireAdmin = false,
    requiredPermission,
    redirectTo = '/login'
  } = options

  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading, isAdmin, hasPermission, userType } = useAuth()

    useEffect(() => {
      if (!isLoading) {
        if (requireAuth && !isAuthenticated) {
          window.location.href = redirectTo
          return
        }

        if (requireAdmin && !isAdmin) {
          window.location.href = '/admin/login'
          return
        }

        if (requiredPermission && !hasPermission(requiredPermission)) {
          window.location.href = '/admin/unauthorized'
          return
        }
      }
    }, [isAuthenticated, isLoading, isAdmin])

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
        </div>
      )
    }

    if (requireAuth && !isAuthenticated) {
      return null
    }

    if (requireAdmin && !isAdmin) {
      return null
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}