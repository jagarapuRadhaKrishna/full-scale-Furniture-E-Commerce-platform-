'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StarIcon, HeartIcon, ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import ColorVariantSelector from '@/components/products/ColorVariantSelector'
import { getProductColorVariants } from '@/data/productColorVariants'
import BackNavigation from '@/components/layout/BackNavigation'
import AddToCartButton from '@/components/cart/AddToCartButton'

// This would typically come from your catalog data
const sampleProduct = {
  id: "DFW-LSL-001",
  name: "Voyage Peak L-Shaped Sofa",
  category: "Living Room",
  subcategory: "Sofas - L-Shaped",
  price: 13000,
  originalPrice: 16000,
  material: "Leather",
  dimensions: {
    width: 254,
    height: 90,
    depth: 216
  },
  colorOptions: ["Brown", "Beige", "Gray", "Black", "White"],
  stock: 66,
  rating: 4.4,
  warranty: "2 years",
  delivery: "7-10 business days",
  customization: true,
  description: "Voyage Peak L-Shaped Sofa leverages leather craftsmanship to withstand daily use in the living room. Supports effortless lounging for families and guests. A refined sofas - l-shaped silhouette keeps the look polished and versatile.",
  features: [
    "Premium Leather Upholstery",
    "Solid Wood Frame",
    "High-Density Foam Cushions",
    "Removable Cushion Covers",
    "Anti-Sag Spring System"
  ]
}

export default function ProductDetailWithColors() {
  const [selectedColor, setSelectedColor] = useState('Brown')
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const colorVariants = getProductColorVariants(sampleProduct.id)

  useEffect(() => {
    if (colorVariants.length > 0) {
      const defaultVariant = colorVariants.find(v => v.color === selectedColor) || colorVariants[0]
      setSelectedImages(defaultVariant.images)
    }
  }, [colorVariants, selectedColor])

  const handleColorChange = (color: string, images: string[]) => {
    setSelectedColor(color)
    setSelectedImages(images)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedImages.length - 1 : prev - 1
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackNavigation />
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images Section */}
            <div className="p-6">
              {/* Main Image */}
              <div className="relative aspect-square mb-4 bg-gray-100 rounded-xl overflow-hidden group">
                {selectedImages.length > 0 && (
                  <Image
                    src={selectedImages[currentImageIndex]}
                    alt={`${sampleProduct.name} - ${selectedColor}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
                
                {/* Image Navigation */}
                {selectedImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* 360 View Button */}
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  title="360° View"
                >
                  <EyeIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnail Images */}
              {selectedImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {selectedImages.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index 
                          ? 'border-blue-500 scale-105' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${sampleProduct.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12.5vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="p-6 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600 font-medium">{sampleProduct.category}</span>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {isFavorite ? (
                      <HeartSolid className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{sampleProduct.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(sampleProduct.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({sampleProduct.rating})</span>
                  </div>
                  <span className="text-sm text-gray-500">Stock: {sampleProduct.stock}</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">₹{sampleProduct.price.toLocaleString()}</span>
                  {sampleProduct.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">₹{sampleProduct.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <p className="text-sm text-green-600">✓ Free delivery • {sampleProduct.delivery}</p>
              </div>

              {/* Color Selection */}
              <div>
                <ColorVariantSelector
                  productId={sampleProduct.id}
                  productName={sampleProduct.name}
                  colorVariants={colorVariants}
                  onColorChange={handleColorChange}
                />
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Details</h3>
                  <p className="text-gray-600 leading-relaxed">{sampleProduct.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Material</span>
                    <p className="text-gray-900">{sampleProduct.material}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Warranty</span>
                    <p className="text-gray-900">{sampleProduct.warranty}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Dimensions</span>
                    <p className="text-gray-900">
                      {sampleProduct.dimensions.width} × {sampleProduct.dimensions.height} × {sampleProduct.dimensions.depth} cm
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Customization</span>
                    <p className="text-gray-900">{sampleProduct.customization ? 'Available' : 'Not Available'}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Features</h3>
                <ul className="space-y-2">
                  {sampleProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6 border-t">
                <AddToCartButton
                  product={{
                    ...sampleProduct,
                    selectedColor,
                    image: selectedImages[0] || ''
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
                />
                <Link
                  href="/book-demo"
                  className="block w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 py-3 px-6 rounded-xl font-semibold text-center transition-colors"
                >
                  Book Free Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}