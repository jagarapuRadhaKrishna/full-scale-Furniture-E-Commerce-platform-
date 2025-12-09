'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowPathIcon, HeartIcon as HeartOutline, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import BackNavigation from '@/components/layout/BackNavigation'

const wardrobeProducts = [
  {
    id: 201,
    name: '4-Door Modern Wardrobe',
    price: 65000,
    originalPrice: 78000,
    rating: 4.9,
    reviews: 198,
    images: [
      'https://images.unsplash.com/photo-1571898123604-061673c69d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Solid Wood & Mirror',
    color: 'Walnut Brown',
    dimensions: '96" H x 72" W x 24" D',
    features: ['Mirror Doors', 'Multiple Compartments', 'Soft-Close Hinges', 'LED Lighting']
  },
  {
    id: 202,
    name: '3-Door Sliding Wardrobe',
    price: 52000,
    originalPrice: 62000,
    rating: 4.7,
    reviews: 134,
    images: [
      'https://images.unsplash.com/photo-1574634534894-89d7576c8259?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571898123604-061673c69d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Laminated Wood',
    color: 'White & Grey',
    dimensions: '84" H x 60" W x 22" D',
    features: ['Sliding Doors', 'Space Efficient', 'Internal Organizers', 'Modern Design']
  },
  {
    id: 203,
    name: 'Corner Wardrobe Unit',
    price: 45000,
    originalPrice: 55000,
    rating: 4.6,
    reviews: 89,
    images: [
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574634534894-89d7576c8259?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    material: 'Engineered Wood',
    color: 'Teak Finish',
    dimensions: '90" H x 48" W x 48" D',
    features: ['Corner Design', 'Space Optimization', 'Multiple Shelves', 'Hanging Rod']
  }
]

export default function WardrobesPage() {
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

  const close360View = () => {
    setSelectedProduct(null)
    setCurrentImageIndex(0)
  }

  return (
    <div className="w-full bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 w-full">
        <BackNavigation label="Back to Bedroom" />
      </div>

      {/* Hero Section */}
      <div className="bg-amber-800 text-white py-16 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Wardrobes Collection
            </h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Organize your space with our premium wardrobe collection.
              Custom designs available with FREE home consultation.
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8 w-full">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Wardrobes</h2>
            <p className="text-gray-600">{wardrobeProducts.length} items available</p>
          </div>
          <Link 
            href="/book-demo?category=wardrobes"
            className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-200"
          >
            Book FREE Demo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {wardrobeProducts.map((product) => (
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
                src={selectedProduct.images[currentImageIndex]}
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