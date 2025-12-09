'use client'

import { useState, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StarIcon, HeartIcon, ShoppingCartIcon, EyeIcon, CheckIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { CartContext } from '@/contexts/CartContext'
import { WishlistContext } from '@/contexts/WishlistContext'
import ImageModal from '@/components/ImageModal'

interface ProductCardProps {
  id: number | string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image?: string
  colors?: string[]
  sizes?: string[]
  material?: string
  features?: string[]
  isNew?: boolean
  isBestSeller?: boolean
  category?: string
  href?: string
  onAddToCart?: () => void
  onAddToWishlist?: () => void
  className?: string
  colorScheme?: 'amber' | 'blue' | 'purple' | 'green' | 'red'
}

const colorSchemes = {
  amber: {
    gradient: 'from-amber-600 to-orange-600',
    hoverGradient: 'from-amber-700 to-orange-700',
    accent: 'amber',
    badge: 'bg-amber-500'
  },
  blue: {
    gradient: 'from-blue-600 to-indigo-600',
    hoverGradient: 'from-blue-700 to-indigo-700',
    accent: 'blue',
    badge: 'bg-blue-500'
  },
  purple: {
    gradient: 'from-purple-600 to-pink-600',
    hoverGradient: 'from-purple-700 to-pink-700',
    accent: 'purple',
    badge: 'bg-purple-500'
  },
  green: {
    gradient: 'from-green-600 to-teal-600',
    hoverGradient: 'from-green-700 to-teal-700',
    accent: 'green',
    badge: 'bg-green-500'
  },
  red: {
    gradient: 'from-red-600 to-pink-600',
    hoverGradient: 'from-red-700 to-pink-700',
    accent: 'red',
    badge: 'bg-red-500'
  }
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  colors = [],
  sizes = [],
  material,
  features = [],
  isNew = false,
  isBestSeller = false,
  category = '',
  href,
  onAddToCart,
  onAddToWishlist,
  className = '',
  colorScheme = 'amber'
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  
  const cart = useContext(CartContext)
  const wishlist = useContext(WishlistContext)
  const scheme = colorSchemes[colorScheme]
  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  const productHref = href || `/products/${category ? `${category}-` : ''}${id}`
  const isInCart = cart?.isItemInCart(id) || false
  const isInWishlist = wishlist?.isItemInWishlist(id) || false

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!wishlist) return
    
    if (isInWishlist) {
      wishlist.removeFromWishlist(id)
    } else {
      wishlist.addToWishlist({
        id,
        name,
        price,
        originalPrice,
        image: image || '/images/default-furniture.jpg',
        category: category || 'Furniture',
        rating,
        reviews
      })
    }
    
    setIsWishlisted(!isWishlisted)
    onAddToWishlist?.()
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!cart) return
    
    setIsAddingToCart(true)
    
    // Add to cart with proper product data
    cart.addToCart({
      id,
      name,
      price,
      originalPrice,
      image: image || '/images/default-furniture.jpg',
      category: category || 'Furniture'
    })
    
    // Show success feedback
    setJustAdded(true)
    setTimeout(() => {
      setJustAdded(false)
      setIsAddingToCart(false)
    }, 1500)
    
    onAddToCart?.()
  }

  return (
    <div className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-${scheme.accent}-200 transform hover:scale-105 ${className}`}>
      <div className="relative">
        {/* Image Container */}
        <div 
          className="aspect-w-4 aspect-h-3 bg-gray-200 overflow-hidden cursor-pointer group/image"
          onClick={() => setShowImageModal(true)}
        >
          {image ? (
            <>
              <Image
                src={image}
                alt={name}
                fill
                className={`object-cover transition-all duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'} group-hover/image:scale-110`}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/image:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <EyeIcon className="w-8 h-8 text-white opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
              </div>
            </>
          ) : (
            <div className={`w-full h-64 bg-gradient-to-br from-${scheme.accent}-100 to-${scheme.accent}-200 flex items-center justify-center cursor-pointer`}>
              <div className={`w-16 h-16 bg-gradient-to-br ${scheme.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-white text-2xl">🛋️</span>
              </div>
            </div>
          )}
          
          {/* Loading Skeleton */}
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              NEW
            </span>
          )}
          {isBestSeller && (
            <span className={`${scheme.badge} text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg`}>
              BESTSELLER
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleWishlistClick}
            className="p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-colors duration-200"
          >
            {isInWishlist ? (
              <HeartIconSolid className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500" />
            )}
          </button>
          <Link
            href={productHref}
            className="p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-colors duration-200"
          >
            <EyeIcon className={`w-5 h-5 text-gray-600 hover:text-${scheme.accent}-600`} />
          </Link>
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              {discountPercentage}% OFF
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIconSolid
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({reviews})</span>
        </div>
        
        {/* Product Name */}
        <Link href={productHref}>
          <h3 className={`text-lg font-semibold text-gray-900 mb-3 group-hover:text-${scheme.accent}-700 transition-colors duration-200 line-clamp-2`}>
            {name}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold text-gray-900">₹{price.toLocaleString()}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-lg text-gray-500 line-through ml-2">₹{originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Material */}
        {material && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <span className="font-medium">Material:</span>
            <span className="ml-2">{material}</span>
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-700 mb-2 block">Features:</span>
            <div className="flex flex-wrap gap-1">
              {features.slice(0, 2).map((feature, index) => (
                <span 
                  key={index} 
                  className={`text-xs bg-${scheme.accent}-100 text-${scheme.accent}-700 px-2 py-1 rounded-full`}
                >
                  {feature}
                </span>
              ))}
              {features.length > 2 && (
                <span className="text-xs text-gray-500">+{features.length - 2} more</span>
              )}
            </div>
          </div>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <div className="flex items-center mb-4">
            <span className="text-sm font-medium text-gray-700 mr-2">Colors:</span>
            <div className="flex gap-1">
              {colors.slice(0, 4).map((color, index) => (
                <div 
                  key={color} 
                  className="w-6 h-6 rounded-full border-2 border-gray-300 bg-gradient-to-br from-gray-200 to-gray-300"
                  title={color}
                ></div>
              ))}
              {colors.length > 4 && (
                <span className="text-xs text-gray-500 ml-1">+{colors.length - 4}</span>
              )}
            </div>
          </div>
        )}

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="flex items-center mb-6">
            <span className="text-sm font-medium text-gray-700 mr-2">Sizes:</span>
            <div className="flex gap-1 flex-wrap">
              {sizes.slice(0, 3).map((size) => (
                <span key={size} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {size}
                </span>
              ))}
              {sizes.length > 3 && (
                <span className="text-xs text-gray-500">+{sizes.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || isInCart}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center
              ${isInCart 
                ? 'bg-green-600 text-white cursor-default' 
                : justAdded 
                  ? 'bg-green-600 text-white' 
                  : `bg-gradient-to-r ${scheme.gradient} text-white hover:${scheme.hoverGradient}`
              }
              ${isAddingToCart ? 'opacity-75 cursor-wait' : ''}
            `}
          >
            {isAddingToCart ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Adding...
              </>
            ) : isInCart || justAdded ? (
              <>
                <CheckIcon className="w-5 h-5 mr-2" />
                {justAdded ? 'Added!' : 'In Cart'}
              </>
            ) : (
              <>
                <ShoppingCartIcon className="w-5 h-5 mr-2" />
                Add to Cart
              </>
            )}
          </button>
          <Link
            href={productHref}
            className="bg-gray-100 text-gray-800 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center min-w-[100px]"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        images={[image || '/images/default-furniture.jpg']}
        currentIndex={0}
        title={name}
      />
    </div>
  )
}