'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowPathIcon, HeartIcon as HeartOutline, EyeIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import BackNavigation from '@/components/layout/BackNavigation'
import AddToCartButton from '@/components/cart/AddToCartButton'

const wardrobes = [
  {
    id: 601,
    name: '3-Door Sliding Wardrobe',
    price: 45999,
    originalPrice: 55999,
    images: [
      '/images/wardrobes/sliding-3door-1.jpg',
      '/images/wardrobes/sliding-3door-2.jpg',
      '/images/wardrobes/sliding-3door-3.jpg',
      '/images/wardrobes/sliding-3door-4.jpg'
    ],
    rating: 4.8,
    reviews: 156,
    description: 'Modern 3-door sliding wardrobe with mirror and spacious storage compartments.',
    features: ['Sliding Doors', 'Mirror Panel', 'Multiple Compartments', 'Soft Close'],
    material: 'Engineered Wood',
    type: 'Sliding Door',
    dimensions: '180cm x 60cm x 220cm',
    doors: '3 Doors',
    colors: ['White', 'Walnut', 'Dark Brown', 'Oak']
  },
  {
    id: 602,
    name: '2-Door Hinged Wardrobe',
    price: 32999,
    originalPrice: 39999,
    images: [
      '/images/wardrobes/hinged-2door-1.jpg',
      '/images/wardrobes/hinged-2door-2.jpg',
      '/images/wardrobes/hinged-2door-3.jpg',
      '/images/wardrobes/hinged-2door-4.jpg'
    ],
    rating: 4.6,
    reviews: 234,
    description: 'Classic 2-door hinged wardrobe with hanging space and drawers.',
    features: ['Hinged Doors', 'Hanging Rod', 'Storage Drawers', 'Classic Design'],
    material: 'Solid Wood',
    type: 'Hinged Door',
    dimensions: '120cm x 55cm x 200cm',
    doors: '2 Doors',
    colors: ['Natural Wood', 'Dark Brown', 'White', 'Cherry']
  },
  {
    id: 603,
    name: 'Walk-in Closet System',
    price: 125999,
    originalPrice: 149999,
    images: [
      '/images/wardrobes/walk-in-closet-1.jpg',
      '/images/wardrobes/walk-in-closet-2.jpg',
      '/images/wardrobes/walk-in-closet-3.jpg',
      '/images/wardrobes/walk-in-closet-4.jpg'
    ],
    rating: 4.9,
    reviews: 87,
    description: 'Luxury walk-in closet system with organized storage and premium finishing.',
    features: ['Walk-in Design', 'Premium Finishing', 'LED Lighting', 'Custom Organization'],
    material: 'Premium Wood',
    type: 'Walk-in Closet',
    dimensions: '300cm x 250cm x 250cm',
    doors: 'Open System',
    colors: ['White', 'Dark Walnut', 'Light Oak']
  },
  {
    id: 604,
    name: 'Modular Wardrobe Set',
    price: 67999,
    originalPrice: 79999,
    images: [
      '/images/wardrobes/modular-set-1.jpg',
      '/images/wardrobes/modular-set-2.jpg',
      '/images/wardrobes/modular-set-3.jpg',
      '/images/wardrobes/modular-set-4.jpg'
    ],
    rating: 4.7,
    reviews: 123,
    description: 'Customizable modular wardrobe system that adapts to your space.',
    features: ['Modular Design', 'Customizable', 'Easy Assembly', 'Expandable'],
    material: 'Engineered Wood',
    type: 'Modular',
    dimensions: 'Customizable',
    doors: 'Variable',
    colors: ['White', 'Gray', 'Beige', 'Black']
  },
  {
    id: 605,
    name: '4-Door Mirror Wardrobe',
    price: 58999,
    originalPrice: 69999,
    images: [
      '/images/wardrobes/mirror-4door-1.jpg',
      '/images/wardrobes/mirror-4door-2.jpg',
      '/images/wardrobes/mirror-4door-3.jpg',
      '/images/wardrobes/mirror-4door-4.jpg'
    ],
    rating: 4.5,
    reviews: 178,
    description: '4-door wardrobe with full-length mirrors and organized storage.',
    features: ['Full Length Mirrors', 'Organized Storage', 'Hinged Doors', 'Spacious Interior'],
    material: 'Engineered Wood',
    type: 'Mirror Wardrobe',
    dimensions: '200cm x 60cm x 220cm',
    doors: '4 Doors',
    colors: ['White + Mirror', 'Walnut + Mirror', 'Black + Mirror']
  },
  {
    id: 606,
    name: 'Corner Wardrobe Unit',
    price: 42999,
    originalPrice: 52999,
    images: [
      '/images/wardrobes/corner-unit-1.jpg',
      '/images/wardrobes/corner-unit-2.jpg',
      '/images/wardrobes/corner-unit-3.jpg',
      '/images/wardrobes/corner-unit-4.jpg'
    ],
    rating: 4.4,
    reviews: 145,
    description: 'Space-efficient corner wardrobe unit perfect for room corners.',
    features: ['Corner Design', 'Space Efficient', 'Curved Doors', 'Maximum Storage'],
    material: 'Engineered Wood',
    type: 'Corner Unit',
    dimensions: '100cm x 100cm x 220cm',
    doors: '2 Curved Doors',
    colors: ['White', 'Oak', 'Walnut', 'Gray']
  },
  {
    id: 607,
    name: 'Vintage Wooden Wardrobe',
    price: 78999,
    originalPrice: 94999,
    images: [
      '/images/wardrobes/vintage-wooden-1.jpg',
      '/images/wardrobes/vintage-wooden-2.jpg',
      '/images/wardrobes/vintage-wooden-3.jpg',
      '/images/wardrobes/vintage-wooden-4.jpg'
    ],
    rating: 4.8,
    reviews: 98,
    description: 'Handcrafted vintage wooden wardrobe with intricate detailing.',
    features: ['Hand Crafted', 'Vintage Design', 'Solid Wood', 'Brass Hardware'],
    material: 'Solid Teak Wood',
    type: 'Vintage',
    dimensions: '150cm x 65cm x 210cm',
    doors: '2 Doors',
    colors: ['Antique Brown', 'Dark Walnut', 'Natural Teak']
  },
  {
    id: 608,
    name: 'Kids Colorful Wardrobe',
    price: 28999,
    originalPrice: 34999,
    images: [
      '/images/wardrobes/kids-colorful-1.jpg',
      '/images/wardrobes/kids-colorful-2.jpg',
      '/images/wardrobes/kids-colorful-3.jpg',
      '/images/wardrobes/kids-colorful-4.jpg'
    ],
    rating: 4.6,
    reviews: 167,
    description: 'Bright and colorful wardrobe designed specifically for children.',
    features: ['Child Safe', 'Colorful Design', 'Easy Access', 'Fun Themes'],
    material: 'Engineered Wood',
    type: 'Kids Wardrobe',
    dimensions: '100cm x 50cm x 180cm',
    doors: '2 Doors',
    colors: ['Rainbow', 'Pink & White', 'Blue & White', 'Green & Yellow']
  },
  {
    id: 609,
    name: 'Built-in Wardrobe System',
    price: 89999,
    originalPrice: 109999,
    images: [
      '/images/wardrobes/built-in-system-1.jpg',
      '/images/wardrobes/built-in-system-2.jpg',
      '/images/wardrobes/built-in-system-3.jpg',
      '/images/wardrobes/built-in-system-4.jpg'
    ],
    rating: 4.7,
    reviews: 112,
    description: 'Custom built-in wardrobe system designed to fit your space perfectly.',
    features: ['Built-in Design', 'Custom Fit', 'Sliding Doors', 'Maximum Space Utilization'],
    material: 'Premium Engineered Wood',
    type: 'Built-in',
    dimensions: 'Wall to Wall',
    doors: 'Sliding Panels',
    colors: ['White', 'Walnut', 'Gray', 'Custom Colors']
  },
  {
    id: 610,
    name: 'Minimalist Wardrobe',
    price: 35999,
    originalPrice: 43999,
    images: [
      '/images/wardrobes/minimalist-1.jpg',
      '/images/wardrobes/minimalist-2.jpg',
      '/images/wardrobes/minimalist-3.jpg',
      '/images/wardrobes/minimalist-4.jpg'
    ],
    rating: 4.5,
    reviews: 189,
    description: 'Clean and minimalist wardrobe design for modern homes.',
    features: ['Minimalist Design', 'Clean Lines', 'Hidden Handles', 'Simple Elegance'],
    material: 'Engineered Wood',
    type: 'Minimalist',
    dimensions: '140cm x 55cm x 200cm',
    doors: '3 Doors',
    colors: ['Pure White', 'Matte Black', 'Light Gray', 'Natural Oak']
  }
]

export default function WardrobesPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedType, setSelectedType] = useState('All Types')
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

  const filteredWardrobes = wardrobes.filter(wardrobe => {
    if (selectedType !== 'All Types' && wardrobe.type !== selectedType) return false
    if (selectedMaterial !== 'All Materials' && !wardrobe.material.includes(selectedMaterial)) return false
    if (priceRange !== 'All Prices') {
      const price = wardrobe.price
      switch (priceRange) {
        case 'Under ₹50,000':
          if (price >= 50000) return false
          break
        case '₹50,000 - ₹100,000':
          if (price < 50000 || price > 100000) return false
          break
        case 'Above ₹100,000':
          if (price <= 100000) return false
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wardrobes Collection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your bedroom with our premium wardrobe collection. From sliding doors to walk-in closets, 
            find the perfect storage solution that combines style with functionality.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-furniture-brown"
          >
            <option>All Types</option>
            <option>Sliding Door</option>
            <option>Hinged Door</option>
            <option>Walk-in Closet</option>
            <option>Modular</option>
            <option>Mirror Wardrobe</option>
            <option>Corner Unit</option>
            <option>Vintage</option>
            <option>Kids Wardrobe</option>
            <option>Built-in</option>
            <option>Minimalist</option>
          </select>
          
          <select 
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-furniture-brown"
          >
            <option>All Materials</option>
            <option>Engineered Wood</option>
            <option>Solid Wood</option>
            <option>Premium Wood</option>
            <option>Teak Wood</option>
          </select>

          <select 
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-furniture-brown"
          >
            <option>All Prices</option>
            <option>Under ₹50,000</option>
            <option>₹50,000 - ₹100,000</option>
            <option>Above ₹100,000</option>
          </select>

          <button className="px-6 py-2 bg-furniture-brown text-white rounded-full hover:bg-furniture-dark-wood transition duration-200">
            With Mirror
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWardrobes.map((wardrobe) => (
            <div key={wardrobe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
              {/* Product Image */}
              <div className="relative group">
                <img
                  src={wardrobe.images[0]}
                  alt={wardrobe.name}
                  className="w-full h-64 object-cover"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center space-x-4">
                  <button 
                    onClick={() => handle360View(wardrobe)}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    <ArrowPathIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => toggleFavorite(wardrobe.id)}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    {favorites.includes(wardrobe.id) ? (
                      <HeartSolid className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartOutline className="h-5 w-5" />
                    )}
                  </button>
                  <Link
                    href={`/products/${wardrobe.id}`}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </Link>
                </div>

                {/* Sale Badge */}
                {wardrobe.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {Math.round(((wardrobe.originalPrice - wardrobe.price) / wardrobe.originalPrice) * 100)}% OFF
                  </div>
                )}

                {/* Type Badge */}
                <div className="absolute top-4 right-4 bg-furniture-brown text-white px-3 py-1 rounded-full text-sm">
                  {wardrobe.type}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{wardrobe.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(wardrobe.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({wardrobe.reviews} reviews)</span>
                </div>

                {/* Material and Doors */}
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Material: {wardrobe.material}</span>
                  <span className="text-furniture-brown font-medium">{wardrobe.doors}</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  Size: {wardrobe.dimensions}
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-furniture-brown">
                    ₹{wardrobe.price.toLocaleString()}
                  </span>
                  {wardrobe.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{wardrobe.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Color Options */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-600">Colors:</span>
                  <div className="flex space-x-1">
                    {wardrobe.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ 
                          backgroundColor: color.toLowerCase().includes('white') ? '#ffffff' : 
                                         color.toLowerCase().includes('black') ? '#000000' :
                                         color.toLowerCase().includes('brown') ? '#8B4513' :
                                         color.toLowerCase().includes('walnut') ? '#5D4037' :
                                         color.toLowerCase().includes('gray') ? '#9E9E9E' :
                                         color.toLowerCase().includes('oak') ? '#DEB887' : '#D2B48C' 
                        }}
                        title={color}
                      />
                    ))}
                    {wardrobe.colors.length > 3 && (
                      <span className="text-xs text-gray-500">+{wardrobe.colors.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    href={`/products/${wardrobe.id}`}
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 transition duration-200 text-center"
                  >
                    View Details
                  </Link>
                  <div className="flex-1">
                    <AddToCartButton 
                      product={{
                        id: wardrobe.id,
                        name: wardrobe.name,
                        price: wardrobe.price,
                        originalPrice: wardrobe.originalPrice,
                        image: wardrobe.images[0],
                        category: 'Wardrobes'
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
            Load More Wardrobes
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
                    <p className="text-furniture-brown font-medium">{selectedProduct.type}</p>
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
                    <span className="font-semibold">Type:</span> {selectedProduct.type}
                  </div>
                  <div>
                    <span className="font-semibold">Dimensions:</span> {selectedProduct.dimensions}
                  </div>
                  <div>
                    <span className="font-semibold">Doors:</span> {selectedProduct.doors}
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
                      category: 'Wardrobes'
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