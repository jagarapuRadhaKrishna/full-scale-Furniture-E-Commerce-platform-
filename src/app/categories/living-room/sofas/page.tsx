'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowPathIcon, HeartIcon as HeartOutline, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import BackNavigation from '@/components/layout/BackNavigation'

const sofaProducts = [
  {
    id: 301,
    name: 'L-Shaped Sectional Sofa',
    price: 85000,
    originalPrice: 105000,
    rating: 4.9,
    reviews: 256,
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0f29bbef2a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Premium Fabric & Foam',
    color: 'Charcoal Grey',
    dimensions: '108" L x 72" W x 36" H',
    features: ['Reversible Chaise', 'Removable Cushions', 'High-Density Foam', 'Easy Maintenance']
  },
  {
    id: 302,
    name: '3-Seater Leather Sofa',
    price: 72000,
    originalPrice: 88000,
    rating: 4.8,
    reviews: 189,
    images: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594736797933-d0f29bbef2a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Genuine Leather',
    color: 'Rich Brown',
    dimensions: '84" L x 36" W x 32" H',
    features: ['Top-Grain Leather', 'Hardwood Frame', 'Classic Design', 'Easy Care']
  },
  {
    id: 303,
    name: 'Modular Sofa Set',
    price: 95000,
    originalPrice: 115000,
    rating: 4.7,
    reviews: 167,
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0f29bbef2a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Mixed Fabric',
    color: 'Modern Beige',
    dimensions: 'Configurable Design',
    features: ['Modular Pieces', 'Custom Configuration', 'Storage Ottoman', 'Contemporary Style']
  }
]

export default function SofasPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const open360View = (product: any) => {
    setSelectedProduct(product)
  }

  const close360View = () => {
    setSelectedProduct(null)
  }

  return (
    <div className="w-full bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 w-full">
        <BackNavigation label="Back to Living Room" />
      </div>

      {/* Hero Section */}
      <div className="bg-amber-900 text-white py-16 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Sofas Collection
            </h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Comfort meets style in our premium sofa collection.
              Perfect for family gatherings and relaxation.
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8 w-full">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Sofas</h2>
            <p className="text-gray-600">{sofaProducts.length} items available</p>
          </div>
          <Link 
            href="/book-demo?category=sofas"
            className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-200"
          >
            Book FREE Demo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {sofaProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="relative">
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover hover:opacity-95 transition-opacity duration-200"
                  />
                </Link>
                
                {/* Favorite Button */}
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-white transition-all duration-200"
                >
                  {favorites.includes(product.id) ? (
                    <HeartSolid className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartOutline className="h-5 w-5 text-gray-600" />
                  )}
                </button>
                
                {/* 360 View Button */}
                <button 
                  onClick={() => open360View(product)}
                  className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-full text-xs font-medium flex items-center space-x-1 hover:bg-opacity-90 transition duration-200"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                  <span>360° View</span>
                </button>
                
                {/* Discount Badge */}
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>
                
                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-amber-700">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                
                {/* Features */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 space-y-1">
                    <div><strong>Material:</strong> {product.material}</div>
                    <div><strong>Color:</strong> {product.color}</div>
                    <div><strong>Dimensions:</strong> {product.dimensions}</div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-amber-700 transition duration-200 text-center"
                  >
                    View Details
                  </Link>
                  <button className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-900 transition duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 360 View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-full overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{selectedProduct.name} - 360° View</h3>
              <button 
                onClick={close360View}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="relative">
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}