'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface LoadingAnimationProps {
  fullScreen?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  message?: string
}

export default function LoadingAnimation({ 
  fullScreen = false, 
  size = 'lg',
  message = 'Loading...'
}: LoadingAnimationProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  }

  const containerClass = fullScreen 
    ? 'fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-100 z-[9999]'
    : 'flex flex-col items-center justify-center p-8'

  return (
    <div className={containerClass}>
      <div className="relative">
        {/* Pulsing circles */}
        <div className={`${sizeClasses[size]} relative`}>
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-amber-200 animate-ping opacity-20"></div>
          
          {/* Middle ring */}
          <div className="absolute inset-2 rounded-full border-4 border-amber-300 animate-pulse"></div>
          
          {/* Inner ring with rotation */}
          <div className="absolute inset-4 rounded-full border-4 border-t-amber-600 border-r-amber-500 border-b-amber-400 border-l-transparent animate-spin"></div>
          
          {/* Logo container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-3/4 h-3/4 animate-pulse">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Circle background */}
                <circle cx="50" cy="50" r="45" fill="#78350f" opacity="0.1"/>
                
                {/* DFW Letters */}
                <text 
                  x="50" 
                  y="45" 
                  fontSize="24" 
                  fontWeight="bold" 
                  fill="#78350f" 
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Arial, sans-serif"
                >
                  DFW
                </text>
                
                {/* DIVYA text */}
                <text 
                  x="50" 
                  y="65" 
                  fontSize="10" 
                  fontWeight="600" 
                  fill="#92400e" 
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Arial, sans-serif"
                >
                  DIVYA
                </text>
                
                {/* Furniture World text */}
                <text 
                  x="50" 
                  y="75" 
                  fontSize="7" 
                  fill="#b45309" 
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Arial, sans-serif"
                >
                  FURNITURE WORLD
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="mt-6 text-center">
        <p className="text-amber-900 font-semibold text-lg animate-pulse">
          {message}
        </p>
        <div className="flex items-center justify-center space-x-1 mt-2">
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}

// Simplified inline loader for smaller contexts
export function InlineLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <div className="relative w-5 h-5">
        <div className="absolute inset-0 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <span className="text-amber-900 text-sm">Loading...</span>
    </div>
  )
}
