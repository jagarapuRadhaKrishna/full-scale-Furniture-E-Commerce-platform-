'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowPathIcon, HeartIcon as HeartOutline, EyeIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { categoryProducts } from '@/data/massive-products'
import ModuleHeader from '@/components/shared/ModuleHeader'

const lShapedSofas = categoryProducts['Living Room']?.filter(product => 
  product.name.toLowerCase().includes('l-shaped') || 
  product.name.toLowerCase().includes('corner') ||
  product.subcategory?.toLowerCase().includes('l-shaped')
) || []

export default function LShapedSofasPage() {
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
    if (selectedProduct && selectedProduct.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProduct && selectedProduct.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <ModuleHeader 
        title="L-Shaped Sofas"
        description="Premium L-shaped sofas perfect for modern living rooms with spacious seating arrangements"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: 'Living Room', href: '/categories/living-room' },
          { label: 'L-Shaped Sofas', href: '/categories/living-room/sofas-l-shaped' }
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {lShapedSofas.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl text-gray-600 mb-4">L-Shaped Sofas Collection Coming Soon</h3>
            <p className="text-gray-500 mb-6">We're curating the perfect collection of L-shaped sofas for you.</p>
            <Link 
              href="/categories/living-room" 
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Explore All Living Room Furniture
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lShapedSofas.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      {favorites.includes(product.id) ? (
                        <HeartSolid className="w-5 h-5 text-red-500" />
                      ) : (
                        <HeartOutline className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => open360View(product)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <EyeIcon className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  
                  {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  
                  {product.rating && (
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link 
                      href={`/products/${product.id}`}
                      className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-center text-sm font-medium"
                    >
                      View Details
                    </Link>
                    <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                      <ArrowPathIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 360° View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="relative p-6">
              <img 
                src={selectedProduct.images ? selectedProduct.images[currentImageIndex] : selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-96 object-contain rounded-lg"
              />
              
              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={nextImage}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <div className="flex justify-center mt-4 space-x-2">
                    {selectedProduct.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}