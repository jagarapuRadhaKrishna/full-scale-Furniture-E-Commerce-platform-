'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { StarIcon, HeartIcon as HeartOutline, ArrowPathIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { categoryProducts } from '@/data/massive-products'
import BackNavigation from '@/components/layout/BackNavigation'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = parseInt(params.id as string)
  const [product, setProduct] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find product across all categories
    let foundProduct = null
    for (const category of Object.values(categoryProducts)) {
      foundProduct = category.find((p: any) => p.id === productId)
      if (foundProduct) break
    }
    
    setProduct(foundProduct)
    setLoading(false)
  }, [productId])

  const nextImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  if (loading) {
    return (
      <div className="h-full bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8] overflow-auto flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="h-full bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8] overflow-auto">
        <div className="bg-white border-b border-orange-100 px-4 sm:px-6 lg:px-8 py-4">
          <BackNavigation label="Back" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8]">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 w-full">
        <BackNavigation label="Back" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden aspect-square">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                  >
                    <ArrowPathIcon className="w-5 h-5 transform rotate-180" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                  >
                    <ArrowPathIcon className="w-5 h-5" />
                  </button>
                </>
              )}
              
              {/* Image Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {product.images.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-amber-600' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-amber-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({product.rating})</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">{product.reviews} reviews</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  {isFavorite ? (
                    <HeartSolid className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartOutline className="w-6 h-6" />
                  )}
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">{product.description}</p>
                
                {product.features && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {product.features.map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900">Material:</span>
                    <span className="ml-2 text-gray-600">{product.material || 'Premium Wood'}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Color:</span>
                    <span className="ml-2 text-gray-600">{product.color || 'Natural'}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Dimensions:</span>
                    <span className="ml-2 text-gray-600">{product.dimensions || 'Standard'}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Warranty:</span>
                    <span className="ml-2 text-gray-600">2 Years</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <button className="w-full bg-amber-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-amber-700 transition duration-200">
                  Add to Cart
                </button>
                <button className="w-full bg-gray-800 text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-900 transition duration-200">
                  Book FREE Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}