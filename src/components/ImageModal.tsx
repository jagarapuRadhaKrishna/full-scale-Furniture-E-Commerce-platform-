'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  currentIndex: number
  title?: string
}

export default function ImageModal({ isOpen, onClose, images, currentIndex, title }: ImageModalProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex)

  useEffect(() => {
    setActiveIndex(currentIndex)
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, activeIndex])

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <XMarkIcon className="w-6 h-6 text-gray-800" />
      </button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-800" />
          </button>
        </>
      )}

      {/* Main image */}
      <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
        <Image
          src={images[activeIndex]}
          alt={title || `Image ${activeIndex + 1}`}
          width={1200}
          height={800}
          className="max-w-full max-h-full object-contain rounded-lg"
          priority
        />
      </div>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
          {activeIndex + 1} / {images.length}
        </div>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black bg-opacity-50 p-2 rounded-lg max-w-md overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden cursor-pointer ${
                index === activeIndex ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10 cursor-pointer"
        onClick={onClose}
      />
    </div>
  )
}