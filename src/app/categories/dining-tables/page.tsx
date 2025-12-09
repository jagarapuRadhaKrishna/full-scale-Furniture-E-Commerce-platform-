'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowPathIcon, HeartIcon as HeartOutline, EyeIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import BackNavigation from '@/components/layout/BackNavigation'
import AddToCartButton from '@/components/cart/AddToCartButton'

const diningTables = [
  {
    id: 101,
    name: 'Premium Wooden Dining Table',
    price: 45999,
    originalPrice: 55999,
    images: [
      '/images/dining-tables/wooden-table-1.jpg',
      '/images/dining-tables/wooden-table-2.jpg',
      '/images/dining-tables/wooden-table-3.jpg',
      '/images/dining-tables/wooden-table-4.jpg'
    ],
    rating: 4.8,
    reviews: 124,
    description: 'Solid wood dining table with elegant finish. Perfect for family gatherings.',
    features: ['Solid Wood', '6 Seater', 'Scratch Resistant', 'Easy Assembly'],
    material: 'Teak Wood',
    dimensions: '6ft x 3ft x 2.5ft',
    warranty: '5 Years'
  },
  {
    id: 102,
    name: 'Modern Glass Dining Table',
    price: 35999,
    originalPrice: 42999,
    images: [
      '/images/dining-tables/glass-table-1.jpg',
      '/images/dining-tables/glass-table-2.jpg',
      '/images/dining-tables/glass-table-3.jpg',
      '/images/dining-tables/glass-table-4.jpg'
    ],
    rating: 4.6,
    reviews: 89,
    description: 'Contemporary glass dining table with metal legs. Adds modern touch to your dining room.',
    features: ['Tempered Glass', '4 Seater', 'Easy to Clean', 'Modern Design'],
    material: 'Tempered Glass & Steel',
    dimensions: '4ft x 3ft x 2.5ft',
    warranty: '3 Years'
  },
  {
    id: 103,
    name: 'Rustic Farmhouse Dining Table',
    price: 52999,
    originalPrice: 62999,
    images: [
      '/images/dining-tables/farmhouse-table-1.jpg',
      '/images/dining-tables/farmhouse-table-2.jpg',
      '/images/dining-tables/farmhouse-table-3.jpg',
      '/images/dining-tables/farmhouse-table-4.jpg'
    ],
    rating: 4.9,
    reviews: 156,
    description: 'Rustic farmhouse style dining table with distressed finish. Perfect for large families.',
    features: ['Reclaimed Wood', '8 Seater', 'Handcrafted', 'Unique Grain Pattern'],
    material: 'Reclaimed Oak Wood',
    dimensions: '8ft x 3.5ft x 2.5ft',
    warranty: '7 Years'
  },
  {
    id: 104,
    name: 'Marble Top Dining Table',
    price: 67999,
    originalPrice: 79999,
    images: [
      '/images/dining-tables/marble-table-1.jpg',
      '/images/dining-tables/marble-table-2.jpg',
      '/images/dining-tables/marble-table-3.jpg',
      '/images/dining-tables/marble-table-4.jpg'
    ],
    rating: 4.7,
    reviews: 92,
    description: 'Luxurious marble top dining table with brass legs. Ultimate in elegance and style.',
    features: ['Italian Marble', '6 Seater', 'Heat Resistant', 'Luxury Finish'],
    material: 'Italian Marble & Brass',
    dimensions: '6ft x 3.5ft x 2.5ft',
    warranty: '5 Years'
  },
  {
    id: 105,
    name: 'Extendable Dining Table',
    price: 48999,
    originalPrice: 58999,
    images: [
      '/images/dining-tables/extendable-table-1.jpg',
      '/images/dining-tables/extendable-table-2.jpg',
      '/images/dining-tables/extendable-table-3.jpg',
      '/images/dining-tables/extendable-table-4.jpg'
    ],
    rating: 4.8,
    reviews: 134,
    description: 'Smart extendable dining table. Adjusts from 4 to 8 seater as needed.',
    features: ['Extendable Design', '4-8 Seater', 'Space Saving', 'Smooth Mechanism'],
    material: 'Engineered Wood',
    dimensions: '4-7ft x 3ft x 2.5ft',
    warranty: '4 Years'
  },
  {
    id: 106,
    name: 'Round Dining Table',
    price: 38999,
    originalPrice: 46999,
    images: [
      '/images/dining-tables/round-table-1.jpg',
      '/images/dining-tables/round-table-2.jpg',
      '/images/dining-tables/round-table-3.jpg',
      '/images/dining-tables/round-table-4.jpg'
    ],
    rating: 4.5,
    reviews: 78,
    description: 'Elegant round dining table perfect for intimate dining experiences.',
    features: ['Round Design', '4 Seater', 'Space Efficient', 'Pedestal Base'],
    material: 'Solid Wood',
    dimensions: '4ft Diameter x 2.5ft Height',
    warranty: '3 Years'
  }
]

export default function DiningTablesPage() {
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

  const handle360View = (product: any) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackNavigation />
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dining Tables</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our exquisite collection of dining tables. From modern glass designs to rustic farmhouse styles, 
            find the perfect centerpiece for your dining room.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button className="px-6 py-2 bg-furniture-brown text-white rounded-full hover:bg-furniture-dark-wood transition duration-200">
            All Tables
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-200">
            Wood
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-200">
            Glass
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-200">
            Marble
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-200">
            Extendable
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diningTables.map((table) => (
            <div key={table.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
              {/* Product Image */}
              <div className="relative group">
                <img
                  src={table.images[0]}
                  alt={table.name}
                  className="w-full h-64 object-cover"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center space-x-4">
                  <button 
                    onClick={() => handle360View(table)}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    <ArrowPathIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => toggleFavorite(table.id)}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    {favorites.includes(table.id) ? (
                      <HeartSolid className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartOutline className="h-5 w-5" />
                    )}
                  </button>
                  <Link
                    href={`/products/${table.id}`}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </Link>
                </div>

                {/* Sale Badge */}
                {table.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Save ₹{(table.originalPrice - table.price).toLocaleString()}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{table.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(table.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({table.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-furniture-brown">
                    ₹{table.price.toLocaleString()}
                  </span>
                  {table.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{table.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {table.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    href={`/products/${table.id}`}
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 transition duration-200 text-center"
                  >
                    View Details
                  </Link>
                  <div className="flex-1">
                    <AddToCartButton 
                      product={{
                        id: table.id,
                        name: table.name,
                        price: table.price,
                        originalPrice: table.originalPrice,
                        image: table.images[0],
                        category: 'Dining Tables'
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

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-furniture-brown text-white px-8 py-3 rounded-lg font-semibold hover:bg-furniture-dark-wood transition duration-200">
            Load More Tables
          </button>
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
              </div>

              {/* Product Info */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold">{selectedProduct.name}</h4>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">({selectedProduct.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-furniture-brown">
                      ₹{selectedProduct.price.toLocaleString()}
                    </div>
                    {selectedProduct.originalPrice && (
                      <div className="text-lg text-gray-500 line-through">
                        ₹{selectedProduct.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="font-semibold">Material:</span> {selectedProduct.material}
                  </div>
                  <div>
                    <span className="font-semibold">Dimensions:</span> {selectedProduct.dimensions}
                  </div>
                  <div>
                    <span className="font-semibold">Warranty:</span> {selectedProduct.warranty}
                  </div>
                </div>

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
                      category: 'Dining Tables'
                    }}
                    size="md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}