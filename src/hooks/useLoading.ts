'use client'

import { useState, useEffect } from 'react'

interface UseAsyncLoadingOptions {
  initialLoading?: boolean
  minLoadingTime?: number
}

export function useAsyncLoading(
  asyncFunction: () => Promise<any>,
  dependencies: any[] = [],
  options: UseAsyncLoadingOptions = {}
) {
  const { initialLoading = true, minLoadingTime = 500 } = options
  const [isLoading, setIsLoading] = useState(initialLoading)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    let isMounted = true
    const startTime = Date.now()

    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const result = await asyncFunction()
        
        // Ensure minimum loading time for smooth UX
        const elapsedTime = Date.now() - startTime
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime)
        
        await new Promise(resolve => setTimeout(resolve, remainingTime))
        
        if (isMounted) {
          setData(result)
          setIsLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error)
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, dependencies)

  return { isLoading, error, data }
}

// Hook for page transitions
export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  useEffect(() => {
    // Auto-stop loading after 5 seconds as a safeguard
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  return { isLoading, startLoading, stopLoading }
}

// Hook for delayed loading state (prevents flash of loading for fast operations)
export function useDelayedLoading(delay = 300) {
  const [isLoading, setIsLoading] = useState(false)
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowLoading(true)
      }, delay)
      return () => clearTimeout(timer)
    } else {
      setShowLoading(false)
    }
  }, [isLoading, delay])

  return { isLoading, setIsLoading, showLoading }
}
