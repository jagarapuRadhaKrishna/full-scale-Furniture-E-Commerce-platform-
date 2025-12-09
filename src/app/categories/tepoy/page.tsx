'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowPathIcon, HeartIcon as HeartOutline, EyeIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import BackNavigation from '@/components/layout/BackNavigation'
import AddToCartButton from '@/components/cart/AddToCartButton'

const tepoys = [
  {
    id: 401,
    name: 'Traditional Round Tepoy',
    price: 8999,
    originalPrice: 11999,
    images: [
      '/images/tepoy/traditional-round-1.jpg',
      '/images/tepoy/traditional-round-2.jpg',
      '/images/tepoy/traditional-round-3.jpg',
      '/images/tepoy/traditional-round-4.jpg'
    ],
    rating: 4.6,
    reviews: 123,
    description: 'Handcrafted traditional tepoy with intricate brass work and storage space.',
    features: ['Brass Inlay Work', 'Storage Space', 'Handcrafted', 'Traditional Design'],
    material: 'Sheesham Wood',
    style: 'Traditional',
    dimensions: '60cm x 60cm x 45cm',
    storage: 'Yes',
    colors: ['Dark Brown', 'Natural Wood', 'Antique Finish']
  },
  {
    id: 402,
    name: 'Modern Oval Tepoy',
    price: 12999,
    originalPrice: 15999,
    images: [
      '/images/tepoy/modern-oval-1.jpg',
      '/images/tepoy/modern-oval-2.jpg',
      '/images/tepoy/modern-oval-3.jpg',
      '/images/tepoy/modern-oval-4.jpg'
    ],
    rating: 4.7,
    reviews: 89,
    description: 'Contemporary oval tepoy with sleek design and hidden storage compartment.',
    features: ['Modern Design', 'Hidden Storage', 'Smooth Finish', 'Oval Shape'],
    material: 'Engineered Wood',
    style: 'Modern',
    dimensions: '80cm x 50cm x 40cm',
    storage: 'Yes',
    colors: ['White', 'Black', 'Walnut', 'Oak']
  },
  {
    id: 403,
    name: 'Antique Carved Tepoy',
    price: 18999,
    originalPrice: 23999,
    images: [
      '/images/tepoy/antique-carved-1.jpg',
      '/images/tepoy/antique-carved-2.jpg',
      '/images/tepoy/antique-carved-3.jpg',
      '/images/tepoy/antique-carved-4.jpg'
    ],
    rating: 4.8,
    reviews: 67,
    description: 'Exquisite antique-style tepoy with detailed hand carvings and brass hardware.',
    features: ['Hand Carved', 'Brass Hardware', 'Antique Finish', 'Premium Quality'],
    material: 'Solid Mango Wood',
    style: 'Antique',
    dimensions: '70cm x 70cm x 50cm',
    storage: 'Yes',
    colors: ['Antique Brown', 'Dark Walnut']
  },
  {
    id: 404,
    name: 'Glass Top Tepoy',
    price: 14999,
    originalPrice: 18999,
    images: [
      '/images/tepoy/glass-top-1.jpg',
      '/images/tepoy/glass-top-2.jpg',
      '/images/tepoy/glass-top-3.jpg',
      '/images/tepoy/glass-top-4.jpg'
    ],
    rating: 4.5,
    reviews: 112,
    description: 'Elegant tepoy with tempered glass top and wooden base with storage.',
    features: ['Tempered Glass Top', 'Wooden Base', 'Easy to Clean', 'Contemporary Style'],
    material: 'Wood + Glass',
    style: 'Contemporary',
    dimensions: '75cm x 45cm x 42cm',
    storage: 'Yes',
    colors: ['Natural + Clear Glass', 'Dark Wood + Clear Glass', 'White + Clear Glass']
  },
  {
    id: 405,
    name: 'Multi-Level Tepoy',
    price: 16999,
    originalPrice: 20999,
    images: [
      '/images/tepoy/multi-level-1.jpg',
      '/images/tepoy/multi-level-2.jpg',
      '/images/tepoy/multi-level-3.jpg',
      '/images/tepoy/multi-level-4.jpg'
    ],
    rating: 4.4,
    reviews: 95,
    description: 'Innovative multi-level tepoy with multiple compartments and adjustable shelves.',
    features: ['Multiple Levels', 'Adjustable Shelves', 'Large Storage', 'Modern Design'],
    material: 'Engineered Wood',
    style: 'Modern',
    dimensions: '65cm x 65cm x 55cm',
    storage: 'Yes',
    colors: ['Walnut', 'White', 'Black', 'Oak']
  },
  {
    id: 406,
    name: 'Rustic Farmhouse Tepoy',
    price: 11999,
    originalPrice: 14999,
    images: [
      '/images/tepoy/rustic-farmhouse-1.jpg',
      '/images/tepoy/rustic-farmhouse-2.jpg',
      '/images/tepoy/rustic-farmhouse-3.jpg',
      '/images/tepoy/rustic-farmhouse-4.jpg'
    ],
    rating: 4.6,
    reviews: 78,
    description: 'Rustic farmhouse-style tepoy with distressed finish and metal accents.',
    features: ['Rustic Design', 'Distressed Finish', 'Metal Accents', 'Vintage Look'],
    material: 'Reclaimed Wood',
    style: 'Rustic',
    dimensions: '70cm x 50cm x 45cm',
    storage: 'Yes',
    colors: ['Rustic Brown', 'Gray Wash', 'Natural Distressed']
  },
  {
    id: 407,
    name: 'Marble Top Tepoy',
    price: 24999,
    originalPrice: 29999,
    images: [
      '/images/tepoy/marble-top-1.jpg',
      '/images/tepoy/marble-top-2.jpg',
      '/images/tepoy/marble-top-3.jpg',
      '/images/tepoy/marble-top-4.jpg'
    ],
    rating: 4.9,
    reviews: 54,
    description: 'Luxurious tepoy with genuine marble top and solid wood base.',
    features: ['Genuine Marble Top', 'Solid Wood Base', 'Luxury Design', 'Heat Resistant'],
    material: 'Marble + Solid Wood',
    style: 'Luxury',
    dimensions: '80cm x 55cm x 48cm',
    storage: 'Yes',
    colors: ['White Marble + Dark Wood', 'Black Marble + Walnut']
  },
  {
    id: 408,
    name: 'Compact Square Tepoy',
    price: 6999,
    originalPrice: 8999,
    images: [
      '/images/tepoy/compact-square-1.jpg',
      '/images/tepoy/compact-square-2.jpg',
      '/images/tepoy/compact-square-3.jpg',
      '/images/tepoy/compact-square-4.jpg'
    ],
    rating: 4.3,
    reviews: 145,
    description: 'Space-saving compact square tepoy perfect for small living spaces.',
    features: ['Compact Design', 'Space Saving', 'Lightweight', 'Affordable'],
    material: 'Engineered Wood',
    style: 'Modern',
    dimensions: '50cm x 50cm x 40cm',
    storage: 'Yes',
    colors: ['White', 'Black', 'Natural', 'Gray']
  }
]

export default function TepoyPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedStyle, setSelectedStyle] = useState('All Styles')
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials')
  const [priceRange, setPriceRange] = useState('All Prices')

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

  const filteredTepoys = tepoys.filter(tepoy => {
    if (selectedStyle !== 'All Styles' && tepoy.style !== selectedStyle) return false
    if (selectedMaterial !== 'All Materials' && !tepoy.material.includes(selectedMaterial)) return false
    if (priceRange !== 'All Prices') {
      const price = tepoy.price
      switch (priceRange) {
        case 'Under ₹10,000':
          if (price >= 10000) return false
          break
        case '₹10,000 - ₹20,000':
          if (price < 10000 || price > 20000) return false
          break
        case 'Above ₹20,000':
          if (price <= 20000) return false
          break
      }
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackNavigation />
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tepoy Collection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our exquisite range of tepoys - traditional Indian coffee tables perfect for 
            your living room. From classic to contemporary designs with storage solutions.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <select 
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-furniture-brown"
          >
            <option>All Styles</option>
            <option>Traditional</option>
            <option>Modern</option>
            <option>Antique</option>
            <option>Contemporary</option>
            <option>Rustic</option>
            <option>Luxury</option>
          </select>
          
          <select 
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-furniture-brown"
          >
            <option>All Materials</option>
            <option>Wood</option>
            <option>Glass</option>
            <option>Marble</option>
            <option>Engineered</option>
          </select>

          <select 
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-furniture-brown"
          >
            <option>All Prices</option>
            <option>Under ₹10,000</option>
            <option>₹10,000 - ₹20,000</option>
            <option>Above ₹20,000</option>
          </select>

          <button className="px-6 py-2 bg-furniture-brown text-white rounded-full hover:bg-furniture-dark-wood transition duration-200">
            With Storage
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTepoys.map((tepoy) => (
            <div key={tepoy.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
              {/* Product Image */}
              <div className="relative group">
                <img
                  src={tepoy.images[0]}
                  alt={tepoy.name}
                  className="w-full h-64 object-cover"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center space-x-4">
                  <button 
                    onClick={() => handle360View(tepoy)}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    <ArrowPathIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => toggleFavorite(tepoy.id)}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    {favorites.includes(tepoy.id) ? (
                      <HeartSolid className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartOutline className="h-5 w-5" />
                    )}
                  </button>
                  <Link
                    href={`/products/${tepoy.id}`}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </Link>
                </div>

                {/* Sale Badge */}
                {tepoy.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {Math.round(((tepoy.originalPrice - tepoy.price) / tepoy.originalPrice) * 100)}% OFF
                  </div>
                )}

                {/* Style Badge */}
                <div className="absolute top-4 right-4 bg-furniture-brown text-white px-3 py-1 rounded-full text-sm">
                  {tepoy.style}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tepoy.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(tepoy.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({tepoy.reviews} reviews)</span>
                </div>

                {/* Material and Dimensions */}
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Material: {tepoy.material}</span>
                  {tepoy.storage === 'Yes' && (
                    <span className="text-furniture-brown font-medium">With Storage</span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  Dimensions: {tepoy.dimensions}
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-furniture-brown">
                    ₹{tepoy.price.toLocaleString()}
                  </span>
                  {tepoy.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{tepoy.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Color Options */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-600">Colors:</span>
                  <div className="flex space-x-1">
                    {tepoy.colors.slice(0, 2).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.toLowerCase().includes('white') ? '#ffffff' : 
                                                   color.toLowerCase().includes('black') ? '#000000' :
                                                   color.toLowerCase().includes('brown') ? '#8B4513' :
                                                   color.toLowerCase().includes('walnut') ? '#5D4037' :
                                                   color.toLowerCase().includes('gray') ? '#9E9E9E' : '#DEB887' }}
                        title={color}
                      />
                    ))}
                    {tepoy.colors.length > 2 && (
                      <span className="text-xs text-gray-500">+{tepoy.colors.length - 2}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    href={`/products/${tepoy.id}`}
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 transition duration-200 text-center"
                  >
                    View Details
                  </Link>
                  <div className="flex-1">
                    <AddToCartButton 
                      product={{
                        id: tepoy.id,
                        name: tepoy.name,
                        price: tepoy.price,
                        originalPrice: tepoy.originalPrice,
                        image: tepoy.images[0],
                        category: 'Tepoy'
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
            Load More Tepoys
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
                    <p className="text-furniture-brown font-medium">{selectedProduct.style} Style</p>
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
                    <span className="font-semibold">Style:</span> {selectedProduct.style}
                  </div>
                  <div>
                    <span className="font-semibold">Dimensions:</span> {selectedProduct.dimensions}
                  </div>
                  <div>
                    <span className="font-semibold">Storage:</span> {selectedProduct.storage}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="font-semibold">Features:</span>
                  <ul className="list-disc list-inside mt-1 text-gray-600">
                    {selectedProduct.features.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <span className="font-semibold">Available Colors:</span>
                  <div className="mt-2">
                    {selectedProduct.colors.map((color: string, index: number) => (
                      <span key={index} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm mr-2 mb-1">
                        {color}
                      </span>
                    ))}
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
                      category: 'Tepoy'
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