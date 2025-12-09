'use client'

import React, { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { CheckIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'

interface Product {
  id: string | number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
}

interface AddToCartButtonProps {
  product: Product
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
}

export default function AddToCartButton({ 
  product, 
  className = '', 
  size = 'md',
  variant = 'primary' 
}: AddToCartButtonProps) {
  const { addToCart, isItemInCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    // Add to cart
    addToCart(product)
    
    // Show loading animation
    setTimeout(() => {
      setIsAdding(false)
      setJustAdded(true)
      
      // Show success state for 2 seconds
      setTimeout(() => {
        setJustAdded(false)
      }, 2000)
    }, 500)
  }

  const isInCart = isItemInCart(product.id)

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-1 px-3 text-sm'
      case 'lg':
        return 'py-3 px-8 text-lg'
      default:
        return 'py-2 px-4 text-base'
    }
  }

  const getVariantClasses = () => {
    if (variant === 'secondary') {
      return 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
    }
    return 'bg-furniture-brown text-white hover:bg-furniture-dark-wood'
  }

  const baseClasses = `
    relative overflow-hidden font-medium rounded-lg transition-all duration-300 
    transform hover:scale-105 cursor-pointer select-none
    ${getSizeClasses()} 
    ${getVariantClasses()}
    ${className}
  `

  if (justAdded) {
    return (
      <button 
        className={`${baseClasses} bg-green-600 hover:bg-green-700 text-white`}
        disabled
      >
        <div className="flex items-center justify-center space-x-2">
          <CheckIcon className="h-5 w-5 animate-pulse" />
          <span>Added!</span>
        </div>
      </button>
    )
  }

  if (isAdding) {
    return (
      <button 
        className={`${baseClasses} bg-amber-600 hover:bg-amber-700 text-white`}
        disabled
      >
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Adding...</span>
        </div>
      </button>
    )
  }

  return (
    <button 
      onClick={handleAddToCart}
      className={baseClasses}
    >
      <div className="flex items-center justify-center space-x-2">
        <ShoppingCartIcon className="h-5 w-5" />
        <span>
          {isInCart ? 'Add More' : 'Add to Cart'}
        </span>
      </div>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 bg-white bg-opacity-20 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
    </button>
  )
}
