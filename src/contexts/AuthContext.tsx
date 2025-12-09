// Authentication context for frontend state management

'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@/lib/auth-types'

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing auth on app start (client-side only)
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }

    try {
      const savedToken = localStorage.getItem('dfw_auth_token')
      const savedUser = localStorage.getItem('dfw_user')

      if (savedToken && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser)
          setToken(savedToken)
          setUser(parsedUser)
          
          // Verify token with server
          verifyTokenWithServer(savedToken)
        } catch (error) {
          console.error('Error parsing saved user data:', error)
          localStorage.removeItem('dfw_auth_token')
          localStorage.removeItem('dfw_user')
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
    }
    
    setIsLoading(false)
  }, [])

  const verifyTokenWithServer = async (authToken: string) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        // Token is invalid, clear auth
        logout()
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      logout()
    }
  }

  const login = (authToken: string, userData: User) => {
    setToken(authToken)
    setUser(userData)
    localStorage.setItem('dfw_auth_token', authToken)
    localStorage.setItem('dfw_user', JSON.stringify(userData))
  }

  const logout = async () => {
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } catch (error) {
        console.error('Logout API call failed:', error)
      }
    }

    setToken(null)
    setUser(null)
    localStorage.removeItem('dfw_auth_token')
    localStorage.removeItem('dfw_user')
  }

  const updateUser = (userData: User) => {
    setUser(userData)
    localStorage.setItem('dfw_user', JSON.stringify(userData))
  }

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    logout,
    updateUser
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