'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowPathIcon, HeartIcon as HeartOutline, EyeIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import ModuleHeader from '@/components/shared/ModuleHeader'

// Sample bed sheets data
const bedSheetsProducts = [
  {
    id: 1001,
    name: "Premium Cotton Bed Sheet Set - King Size",
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    rating: 4.5,
    image: "/images/textiles/bed-sheet-1.jpg",
    features: ["100% Cotton", "Thread Count 400", "Machine Washable"],
    colors: ["White", "Cream", "Light Blue", "Sage Green"]
  },
  {
    id: 1002,
    name: "Bamboo Fiber Bed Sheet Set - Queen Size",
    price: 4999,
    originalPrice: 7999,
    discount: 37,
    rating: 4.7,
    image: "/images/textiles/bed-sheet-2.jpg",
    features: ["Bamboo Fiber", "Antibacterial", "Moisture Wicking"],
    colors: ["Natural", "Charcoal", "Dusty Rose"]
  },
  {
    id: 1003,
    name: "Microfiber Bed Sheet Set - Double Size",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    rating: 4.3,
    image: "/images/textiles/bed-sheet-3.jpg",
    features: ["Microfiber", "Wrinkle Resistant", "Quick Dry"],
    colors: ["White", "Grey", "Navy Blue", "Burgundy"]
  }
]

export default function BedSheetsPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <ModuleHeader 
        title="Premium Bed Sheets"
        description="High-quality bed sheets made from the finest materials for ultimate comfort"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: 'Textiles', href: '/textiles' },
          { label: 'Bed Sheets', href: '/categories/textiles/bed-sheets' }
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter by:</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500">
                <option>All Sizes</option>
                <option>Single</option>
                <option>Double</option>
                <option>Queen</option>
                <option>King</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500">
                <option>All Materials</option>
                <option>Cotton</option>
                <option>Bamboo</option>
                <option>Microfiber</option>
                <option>Linen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500">
                <option>All Prices</option>
                <option>₹1,000 - ₹3,000</option>
                <option>₹3,000 - ₹5,000</option>
                <option>₹5,000 - ₹8,000</option>
                <option>Above ₹8,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thread Count</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500">
                <option>All Thread Counts</option>
                <option>200-300</option>
                <option>300-400</option>
                <option>400-600</option>
                <option>600+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bedSheetsProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">Bed Sheet Image</p>
                  </div>
                </div>
                
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
                
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.features.map((feature, index) => (
                      <span key={index} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {product.colors.map((color, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                
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

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h3>
            <p className="mb-6">Get personalized recommendations and special offers on bed sheets</p>
            <Link 
              href="/book-demo"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Book Free Home Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
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
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">Product Image</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : ''}`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 ml-2">({selectedProduct.rating})</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl font-bold text-gray-900">₹{selectedProduct.price.toLocaleString()}</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.features.map((feature: string, index: number) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Available Colors:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map((color: string, index: number) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link 
                      href={`/products/${selectedProduct.id}`}
                      className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors text-center font-medium"
                    >
                      View Full Details
                    </Link>
                    <Link 
                      href="/book-demo"
                      className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                    >
                      Book Demo
                    </Link>
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