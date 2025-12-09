'use client'

import LoadingAnimation, { InlineLoader } from './LoadingAnimation'

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-gradient-to-br from-amber-100 to-amber-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-amber-200 rounded w-3/4"></div>
        <div className="h-3 bg-amber-100 rounded w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-amber-300 rounded w-24"></div>
          <div className="h-8 bg-amber-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  )
}

// Section Loader (for lazy-loaded sections)
export function SectionLoader({ message = 'Loading section...' }: { message?: string }) {
  return (
    <div className="w-full py-16 flex justify-center items-center">
      <LoadingAnimation size="md" message={message} />
    </div>
  )
}

// Grid Skeleton (for product grids)
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Hero Section Skeleton
export function HeroSkeleton() {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <LoadingAnimation size="xl" message="Loading amazing furniture..." />
      </div>
    </div>
  )
}

// Table Skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-4 items-center">
          <div className="h-12 bg-amber-100 rounded w-full"></div>
        </div>
      ))}
    </div>
  )
}

// Form Skeleton
export function FormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-amber-100 rounded w-full"></div>
      <div className="h-10 bg-amber-100 rounded w-full"></div>
      <div className="h-32 bg-amber-100 rounded w-full"></div>
      <div className="h-10 bg-amber-200 rounded w-32"></div>
    </div>
  )
}

// Button Loading State
export function ButtonLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <span className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>{text}</span>
    </span>
  )
}

// Image Loader Placeholder
export function ImagePlaceholder({ aspectRatio = '16/9' }: { aspectRatio?: string }) {
  return (
    <div 
      className="w-full bg-gradient-to-br from-amber-100 to-amber-200 animate-pulse flex items-center justify-center"
      style={{ aspectRatio }}
    >
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-50">
          <circle cx="50" cy="50" r="48" fill="#78350f" opacity="0.1"/>
          <text 
            x="50" 
            y="50" 
            fontSize="32" 
            fontWeight="bold" 
            fill="#78350f" 
            textAnchor="middle"
            dominantBaseline="middle"
          >
            DFW
          </text>
        </svg>
      </div>
    </div>
  )
}

export { InlineLoader }
