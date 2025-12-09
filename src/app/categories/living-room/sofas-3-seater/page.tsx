'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowPathIcon, HeartIcon as HeartOutline, EyeIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { categoryProducts } from '@/data/massive-products'
import ModuleHeader from '@/components/shared/ModuleHeader'

const threeSeaterSofas = categoryProducts['Living Room']?.filter(product => 
  product.name.toLowerCase().includes('3-seater') || 
  product.name.toLowerCase().includes('three seater') ||
  product.subcategory?.toLowerCase().includes('3-seater')
) || []

export default function ThreeSeaterSofasPage() {
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
        title="3-Seater Sofas"
        description="Comfortable 3-seater sofas perfect for family gatherings and relaxation"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: 'Living Room', href: '/categories/living-room' },
          { label: '3-Seater Sofas', href: '/categories/living-room/sofas-3-seater' }
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {threeSeaterSofas.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl text-gray-600 mb-4">3-Seater Sofas Collection Coming Soon</h3>
            <p className="text-gray-500 mb-6">We're curating the perfect collection of 3-seater sofas for you.</p>
            <Link 
              href="/categories/living-room" 
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Explore All Living Room Furniture
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {threeSeaterSofas.map((product) => (
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
    </div>
  )
}