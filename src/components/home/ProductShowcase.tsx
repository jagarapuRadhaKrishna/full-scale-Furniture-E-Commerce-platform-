'use client'

import { useState } from 'react'
import { ArrowPathIcon, MagnifyingGlassIcon, ShareIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'

interface Product {
  id: number
  name: string
  category: string
  price: string
  originalPrice?: string
  images: string[]
  has360View: boolean
  has3DView: boolean
  description: string
  features: string[]
  rating: number
  reviews: number
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Premium L-Shaped Sectional Sofa',
    category: 'Living Room',
    price: '₹85,000',
    originalPrice: '₹95,000',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    has360View: true,
    has3DView: true,
    description: 'Luxurious L-shaped sectional sofa with premium fabric upholstery and solid wood frame.',
    features: ['Premium Fabric', 'Solid Wood Frame', 'Removable Cushions', 'Storage Compartment'],
    rating: 4.8,
    reviews: 156
  },
  {
    id: 2,
    name: 'Executive Wooden Dining Set',
    category: 'Dining',
    price: '₹65,000',
    originalPrice: '₹75,000',
    images: [
      'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    has360View: true,
    has3DView: true,
    description: 'Elegant 6-seater dining set crafted from premium teak wood with comfortable cushioned chairs.',
    features: ['Teak Wood', '6 Seater', 'Cushioned Chairs', 'Expandable Table'],
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: 'King Size Platform Bed',
    category: 'Bedroom',
    price: '₹55,000',
    originalPrice: '₹65,000',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    has360View: true,
    has3DView: true,
    description: 'Modern king-size platform bed with built-in side tables and LED lighting.',
    features: ['King Size', 'Built-in Tables', 'LED Lighting', 'Storage Drawers'],
    rating: 4.7,
    reviews: 203
  }
]

export default function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])
  const [is360ViewActive, setIs360ViewActive] = useState(false)

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const open360View = (product: Product) => {
    setSelectedProduct(product)
    setIs360ViewActive(true)
    setSelectedImageIndex(0)
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setIs360ViewActive(false)
    setSelectedImageIndex(0)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Products with 360° & 3D View
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience our furniture like never before with immersive 360-degree views and 3D visualization.
            See every detail before you buy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="relative group">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                />
                
                {/* 360° and 3D View Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  {product.has360View && (
                    <button
                      onClick={() => open360View(product)}
                      className="bg-black bg-opacity-80 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 hover:bg-opacity-100 transition duration-200"
                    >
                      <ArrowPathIcon className="h-3 w-3" />
                      <span>360° View</span>
                    </button>
                  )}
                  {product.has3DView && (
                    <div className="bg-blue-600 bg-opacity-90 text-white px-3 py-1 rounded-full text-xs font-medium">
                      3D View
                    </div>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition duration-200"
                >
                  {favorites.includes(product.id) ? (
                    <HeartSolid className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-gray-600" />
                  )}
                </button>

                {/* Quick Actions */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition duration-200">
                  <div className="flex space-x-2">
                    <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition duration-200">
                      <MagnifyingGlassIcon className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition duration-200">
                      <ShareIcon className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-furniture-brown bg-furniture-cream px-2 py-1 rounded">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl font-bold text-furniture-brown">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 transition duration-200">
                    Book Demo
                  </button>
                  <button className="flex-1 bg-furniture-brown text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-furniture-dark-wood transition duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 360° View Modal */}
        {selectedProduct && is360ViewActive && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    360° View - {selectedProduct.name}
                  </h3>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="relative mb-4">
                  <img
                    src={selectedProduct.images[selectedImageIndex]}
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
                      <ArrowPathIcon className="h-6 w-6 animate-spin" />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 mb-4">
                  {selectedProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 rounded-md overflow-hidden ${
                        selectedImageIndex === index ? 'ring-2 ring-primary-600' : ''
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-furniture-cream text-furniture-brown px-3 py-1 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition duration-200">
                      Book FREE Demo
                    </button>
                    <button className="flex-1 bg-furniture-brown text-white py-3 px-6 rounded-lg font-semibold hover:bg-furniture-dark-wood transition duration-200">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <button className="bg-furniture-brown text-white px-8 py-3 rounded-lg font-semibold hover:bg-furniture-dark-wood transition duration-200">
            View All Products with 360° View
          </button>
        </div>
      </div>
    </section>
  )
}