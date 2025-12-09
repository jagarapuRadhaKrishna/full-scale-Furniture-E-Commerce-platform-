'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface DynamicImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fallbackSrc?: string
  onError?: () => void
  placeholder?: 'blur' | 'empty'
}

/**
 * Dynamic Image Component for External URLs
 * Handles loading, errors, and fallbacks for images from Excel dataset
 */
export default function DynamicImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  fallbackSrc = '/images/placeholder-furniture.jpg',
  onError,
  placeholder = 'empty'
}: DynamicImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setImageSrc(src)
    setIsLoading(true)
    setHasError(false)
  }, [src])

  const handleError = () => {
    console.warn(`Failed to load image: ${imageSrc}`)
    setHasError(true)
    setIsLoading(false)
    
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc)
    }
    
    onError?.()
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}

      {/* Error State */}
      {hasError && imageSrc === fallbackSrc && (
        <div 
          className="absolute inset-0 bg-gray-100 flex items-center justify-center border border-gray-200"
          style={{ width, height }}
        >
          <div className="text-center text-gray-500 text-sm">
            <div className="mb-2">📷</div>
            <div>Image unavailable</div>
          </div>
        </div>
      )}

      {/* Actual Image */}
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
        priority={priority}
        placeholder={placeholder}
        unoptimized={!imageSrc.startsWith('/') && !imageSrc.startsWith('/_next')} // Disable optimization for external URLs
      />
    </div>
  )
}

/**
 * Product Image Gallery Component
 * Specifically designed for products with multiple image URLs from Excel
 */
interface ProductImageGalleryProps {
  images: string[]
  productName: string
  className?: string
}

export function ProductImageGallery({ 
  images, 
  productName, 
  className = '' 
}: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [validImages, setValidImages] = useState<string[]>([])

  useEffect(() => {
    // Filter out empty or invalid URLs
    const filtered = images.filter(url => 
      url && 
      url.trim() !== '' && 
      (url.startsWith('http') || url.startsWith('/'))
    )
    setValidImages(filtered)
    setCurrentImage(0)
  }, [images])

  if (validImages.length === 0) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">🪑</div>
          <div>No images available</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image Display */}
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-md">
        <DynamicImage
          src={validImages[currentImage]}
          alt={`${productName} - Image ${currentImage + 1}`}
          width={500}
          height={500}
          className="w-full h-full object-cover"
          priority={currentImage === 0}
        />
        
        {/* Image Counter */}
        {validImages.length > 1 && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {currentImage + 1} / {validImages.length}
          </div>
        )}

        {/* Navigation Arrows */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImage(prev => 
                prev === 0 ? validImages.length - 1 : prev - 1
              )}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentImage(prev => 
                prev === validImages.length - 1 ? 0 : prev + 1
              )}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {validImages.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                currentImage === index 
                  ? 'border-blue-500 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <DynamicImage
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* 360° View Indicator */}
      {validImages.length >= 3 && (
        <div className="text-center text-sm text-blue-600 font-medium">
          🔄 360° View Available
        </div>
      )}
    </div>
  )
}