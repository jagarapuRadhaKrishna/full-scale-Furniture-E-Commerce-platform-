'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowPathIcon, HeartIcon as HeartOutline, EyeIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { categoryProducts } from '@/data/massive-products'
import ModuleHeader from '@/components/shared/ModuleHeader'
import AddToCartButton from '@/components/cart/AddToCartButton'

const bedroomProducts = categoryProducts.Bedroom

export default function BedroomPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const open360View = (product: any) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex(prev => 
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex(prev => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      )
    }
  }

  return (
    <div className="h-full bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8] overflow-auto w-full">
      {/* Back Navigation */}
      <ModuleHeader 
        title="Bedroom Furniture Collection"
        subtitle="Transform your bedroom into a peaceful sanctuary with our premium furniture collection"
        backUrl="/categories"
      />

      {/* Hero Section */}
      <div className="relative bg-furniture-brown text-white py-16 w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Elegant Modern Bedroom with Luxury Furniture and Warm Lighting"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-furniture-brown opacity-70"></div>
        </div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Premium Bedroom Collection
            </h1>
            <p className="text-xl text-furniture-light-brown max-w-2xl mx-auto">
              Every piece features 360° viewing and FREE home demo service.
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Inner Categories Navigation */}
        <div className="mb-12 w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <Link 
              href="/categories/bedroom/beds"
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 text-center group"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-300">
                <span className="text-2xl">🛏️</span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-amber-700">Beds</h3>
              <p className="text-sm text-gray-600 mt-1">King, Queen, Single</p>
            </Link>
            
            <Link 
              href="/categories/bedroom/wardrobes"
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 text-center group"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-300">
                <span className="text-2xl">👕</span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-amber-700">Wardrobes</h3>
              <p className="text-sm text-gray-600 mt-1">Storage Solutions</p>
            </Link>
            
            <Link 
              href="/categories/bedroom/dressers"
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 text-center group"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-300">
                <span className="text-2xl">🪞</span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-amber-700">Dressers</h3>
              <p className="text-sm text-gray-600 mt-1">With Mirrors</p>
            </Link>
            
            <Link 
              href="/categories/bedroom/nightstands"
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 text-center group"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-300">
                <span className="text-2xl">🛏️</span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-amber-700">Nightstands</h3>
              <p className="text-sm text-gray-600 mt-1">Bedside Tables</p>
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8 w-full">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Bedroom Products</h2>
            <p className="text-gray-600">{bedroomProducts.length} items available</p>
          </div>
          <Link 
            href="/book-demo?category=bedroom"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-200"
          >
            Book FREE Demo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {bedroomProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="relative group">
                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-300 hover:opacity-95"
                  />
                </Link>
                
                {/* Product Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      NEW
                    </span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Product Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                  >
                    {favorites.includes(product.id) ? (
                      <HeartSolid className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartOutline className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  
                  {product.has360View && (
                    <button
                      onClick={() => open360View(product)}
                      className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                    >
                      <ArrowPathIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                {/* Category and Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-furniture-brown bg-furniture-cream px-2 py-1 rounded">
                    {product.subCategory}
                  </span>
                  <div className="flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price */}
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

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 transition duration-200 text-center"
                  >
                    View Details
                  </Link>
                  <div className="flex-1">
                    <AddToCartButton 
                      product={{
                        id: product.id,
                        name: product.name,
                        price: typeof product.price === 'string' ? parseInt(product.price.replace(/[₹,]/g, '')) : product.price,
                        originalPrice: product.originalPrice ? (typeof product.originalPrice === 'string' ? parseInt(product.originalPrice.replace(/[₹,]/g, '')) : product.originalPrice) : undefined,
                        image: product.images[0],
                        category: 'Bedroom'
                      }}
                      className="w-full"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 360 View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  360 View - {selectedProduct.name}
                </h3>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="relative">
                <img
                  src={selectedProduct.images[currentImageIndex]}
                  alt={selectedProduct.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
                >
                  <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md"
                >
                  <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {selectedProduct.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {selectedProduct.name}
                </h4>
                <p className="text-gray-600 mb-4">
                  {selectedProduct.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-furniture-brown">
                    {selectedProduct.price}
                  </span>
                  <div className="flex space-x-3">
                    <Link
                      href={`/products/${selectedProduct.id}`}
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition duration-200"
                    >
                      View Details
                    </Link>
                    <AddToCartButton 
                      product={{
                        id: selectedProduct.id,
                        name: selectedProduct.name,
                        price: selectedProduct.price,
                        originalPrice: selectedProduct.originalPrice,
                        image: selectedProduct.images[0],
                        category: 'Bedroom'
                      }}
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
