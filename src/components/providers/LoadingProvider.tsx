'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import LoadingAnimation from '@/components/shared/LoadingAnimation'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  showLoading: (message?: string) => void
  hideLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
  initialLoading?: boolean
}

export function LoadingProvider({ children, initialLoading = true }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(initialLoading)
  const [loadingMessage, setLoadingMessage] = useState('Loading...')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Simulate initial page load
    if (initialLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [initialLoading])

  const showLoading = (message = 'Loading...') => {
    setLoadingMessage(message)
    setIsLoading(true)
  }

  const hideLoading = () => {
    setIsLoading(false)
  }

  if (!mounted) {
    return <LoadingAnimation fullScreen message="Initializing..." />
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, showLoading, hideLoading }}>
      {isLoading && <LoadingAnimation fullScreen message={loadingMessage} />}
      {children}
    </LoadingContext.Provider>
  )
}
