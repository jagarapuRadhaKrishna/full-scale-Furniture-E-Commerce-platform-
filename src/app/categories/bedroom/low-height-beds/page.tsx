'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowPathIcon, HeartIcon as HeartOutline, EyeIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { categoryProducts } from '@/data/massive-products'
import ModuleHeader from '@/components/shared/ModuleHeader'

const lowHeightBeds = categoryProducts['Bedroom']?.filter(product => 
  product.name.toLowerCase().includes('low') || 
  product.name.toLowerCase().includes('platform') ||
  product.subCategory?.toLowerCase().includes('low')
) || []

export default function LowHeightBedsPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8]">
      <ModuleHeader 
        title="Low Height Beds"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: 'Bedroom', href: '/categories/bedroom' },
          { label: 'Low Height Beds', href: '/categories/bedroom/low-height-beds' }
        ]}
      />

      {/* Rich Banner Image */}
      <div className="container mx-auto px-4 py-8">
        <section className="relative h-72 mb-8 rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1920&q=80"
            alt="Low Height Beds Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h2 className="text-4xl font-bold mb-3 drop-shadow-lg">Premium Low Height Beds Collection</h2>
              <p className="text-xl opacity-95 drop-shadow">Discover our curated selection of modern platform beds</p>
            </div>
          </div>
        </section>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {lowHeightBeds.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl text-gray-600 mb-4">Low Height Beds Collection Coming Soon</h3>
            <p className="text-gray-500 mb-6">We're curating the perfect collection of low height beds for you.</p>
            <Link 
              href="/categories/bedroom" 
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Explore All Bedroom Furniture
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lowHeightBeds.map((product) => (
              <Link 
                key={product.id} 
                href={`/product/${product.productId || product.id}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group block"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.images[0]} 
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
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold group-hover:from-orange-600 group-hover:to-orange-700 transition-all">
                      <span>View Details</span>
                      <ArrowPathIcon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}