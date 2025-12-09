'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowPathIcon, HeartIcon as HeartOutline, EyeIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import BackNavigation from '@/components/layout/BackNavigation'
import AddToCartButton from '@/components/cart/AddToCartButton'

const chairs = [
  {
    id: 301,
    name: 'Executive Office Chair',
    price: 18999,
    originalPrice: 24999,
    images: [
      '/images/chairs/executive-chair-1.jpg',
      '/images/chairs/executive-chair-2.jpg',
      '/images/chairs/executive-chair-3.jpg',
      '/images/chairs/executive-chair-4.jpg'
    ],
    rating: 4.8,
    reviews: 156,
    description: 'Premium leather executive chair with ergonomic design and lumbar support.',
    features: ['Genuine Leather', 'Ergonomic Design', 'Lumbar Support', 'Height Adjustable'],
    material: 'Genuine Leather',
    type: 'Office Chair',
    weight_capacity: '120 kg',
    dimensions: '70cm x 70cm x 120cm',
    colors: ['Black', 'Brown', 'Burgundy']
  },
  {
    id: 302,
    name: 'Wooden Dining Chair',
    price: 4999,
    originalPrice: 6999,
    images: [
      '/images/chairs/wooden-dining-1.jpg',
      '/images/chairs/wooden-dining-2.jpg',
      '/images/chairs/wooden-dining-3.jpg',
      '/images/chairs/wooden-dining-4.jpg'
    ],
    rating: 4.6,
    reviews: 234,
    description: 'Classic wooden dining chair with comfortable cushioned seat.',
    features: ['Solid Wood', 'Cushioned Seat', 'Classic Design', 'Sturdy Build'],
    material: 'Teak Wood',
    type: 'Dining Chair',
    weight_capacity: '100 kg',
    dimensions: '45cm x 50cm x 85cm',
    colors: ['Natural', 'Walnut', 'Cherry']
  },
  {
    id: 303,
    name: 'Accent Lounge Chair',
    price: 24999,
    originalPrice: 29999,
    images: [
      '/images/chairs/accent-lounge-1.jpg',
      '/images/chairs/accent-lounge-2.jpg',
      '/images/chairs/accent-lounge-3.jpg',
      '/images/chairs/accent-lounge-4.jpg'
    ],
    rating: 4.7,
    reviews: 89,
    description: 'Stylish accent chair perfect for living rooms and reading corners.',
    features: ['Premium Fabric', 'Modern Design', 'Comfortable Padding', 'Swivel Base'],
    material: 'Velvet Fabric',
    type: 'Accent Chair',
    weight_capacity: '110 kg',
    dimensions: '65cm x 65cm x 95cm',
    colors: ['Navy Blue', 'Emerald Green', 'Mustard Yellow']
  },
  {
    id: 304,
    name: 'Gaming Chair Pro',
    price: 22999,
    originalPrice: 27999,
    images: [
      '/images/chairs/gaming-chair-1.jpg',
      '/images/chairs/gaming-chair-2.jpg',
      '/images/chairs/gaming-chair-3.jpg',
      '/images/chairs/gaming-chair-4.jpg'
    ],
    rating: 4.9,
    reviews: 312,
    description: 'Professional gaming chair with RGB lighting and premium support.',
    features: ['RGB Lighting', 'Memory Foam', 'Reclining', '4D Armrests'],
    material: 'Gaming Fabric',
    type: 'Gaming Chair',
    weight_capacity: '130 kg',
    dimensions: '70cm x 55cm x 130cm',
    colors: ['Black/Red', 'Black/Blue', 'Black/White']
  },
  {
    id: 305,
    name: 'Rocking Chair',
    price: 16999,
    originalPrice: 19999,
    images: [
      '/images/chairs/rocking-chair-1.jpg',
      '/images/chairs/rocking-chair-2.jpg',
      '/images/chairs/rocking-chair-3.jpg',
      '/images/chairs/rocking-chair-4.jpg'
    ],
    rating: 4.5,
    reviews: 76,
    description: 'Traditional wooden rocking chair with comfortable cushions.',
    features: ['Solid Wood', 'Smooth Rocking', 'Comfortable Cushions', 'Timeless Design'],
    material: 'Sheesham Wood',
    type: 'Rocking Chair',
    weight_capacity: '100 kg',
    dimensions: '65cm x 75cm x 105cm',
    colors: ['Natural', 'Dark Brown', 'Honey']
  },
  {
    id: 306,
    name: 'Bar Stool Set',
    price: 8999,
    originalPrice: 11999,
    images: [
      '/images/chairs/bar-stool-1.jpg',
      '/images/chairs/bar-stool-2.jpg',
      '/images/chairs/bar-stool-3.jpg',
      '/images/chairs/bar-stool-4.jpg'
    ],
    rating: 4.4,
    reviews: 145,
    description: 'Modern bar stools with adjustable height. Set of 2 pieces.',
    features: ['Height Adjustable', 'Swivel Seat', 'Chrome Base', 'Set of 2'],
    material: 'PU Leather',
    type: 'Bar Stool',
    weight_capacity: '90 kg each',
    dimensions: '40cm x 40cm x 75-95cm',
    colors: ['Black', 'White', 'Red', 'Brown']
  },
  {
    id: 307,
    name: 'Ergonomic Mesh Chair',
    price: 14999,
    originalPrice: 18999,
    images: [
      '/images/chairs/mesh-chair-1.jpg',
      '/images/chairs/mesh-chair-2.jpg',
      '/images/chairs/mesh-chair-3.jpg',
      '/images/chairs/mesh-chair-4.jpg'
    ],
    rating: 4.6,
    reviews: 198,
    description: 'Breathable mesh office chair with superior back support.',
    features: ['Breathable Mesh', 'Lumbar Support', 'Armrest Adjustable', 'Tilt Function'],
    material: 'Mesh Fabric',
    type: 'Office Chair',
    weight_capacity: '110 kg',
    dimensions: '65cm x 65cm x 115cm',
    colors: ['Black', 'Gray', 'White']
  },
  {
    id: 308,
    name: 'Antique Wooden Chair',
    price: 12999,
    originalPrice: 15999,
    images: [
      '/images/chairs/antique-chair-1.jpg',
      '/images/chairs/antique-chair-2.jpg',
      '/images/chairs/antique-chair-3.jpg',
      '/images/chairs/antique-chair-4.jpg'
    ],
    rating: 4.3,
    reviews: 67,
    description: 'Handcrafted antique-style chair with intricate wood carving.',
    features: ['Hand Carved', 'Antique Finish', 'Solid Construction', 'Heritage Design'],
    material: 'Mango Wood',
    type: 'Antique Chair',
    weight_capacity: '95 kg',
    dimensions: '50cm x 55cm x 90cm',
    colors: ['Antique Brown', 'Dark Walnut']
  }
]

export default function ChairsPage() {
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

  const filteredChairs = chairs.filter(chair => {
    if (selectedType !== 'All Types' && chair.type !== selectedType) return false
    if (selectedMaterial !== 'All Materials' && !chair.material.includes(selectedMaterial)) return false
    if (priceRange !== 'All Prices') {
      const price = chair.price
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Chairs Collection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From office chairs to dining chairs, find the perfect seating solution for every space. 
            Comfort meets style in our premium chair collection.
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
            <option>Office Chair</option>
            <option>Dining Chair</option>
            <option>Accent Chair</option>
            <option>Gaming Chair</option>
            <option>Rocking Chair</option>
            <option>Bar Stool</option>
            <option>Antique Chair</option>
          </select>
          
          <select 
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-furniture-brown"
          >
            <option>All Materials</option>
            <option>Leather</option>
            <option>Wood</option>
            <option>Fabric</option>
            <option>Mesh</option>
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
            Featured
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredChairs.map((chair) => (
            <div key={chair.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
              {/* Product Image */}
              <div className="relative group">
                <img
                  src={chair.images[0]}
                  alt={chair.name}
                  className="w-full h-48 object-cover"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center space-x-3">
                  <button 
                    onClick={() => handle360View(chair)}
                    className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => toggleFavorite(chair.id)}
                    className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    {favorites.includes(chair.id) ? (
                      <HeartSolid className="h-4 w-4 text-red-500" />
                    ) : (
                      <HeartOutline className="h-4 w-4" />
                    )}
                  </button>
                  <Link
                    href={`/products/${chair.id}`}
                    className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Link>
                </div>

                {/* Sale Badge */}
                {chair.originalPrice && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {Math.round(((chair.originalPrice - chair.price) / chair.originalPrice) * 100)}% OFF
                  </div>
                )}

                {/* Type Badge */}
                <div className="absolute top-2 right-2 bg-furniture-brown text-white px-2 py-1 rounded-full text-xs">
                  {chair.type}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{chair.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(chair.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-600">({chair.reviews})</span>
                </div>

                {/* Material and Weight */}
                <div className="text-xs text-gray-600 mb-2">
                  <div>{chair.material}</div>
                  <div>Capacity: {chair.weight_capacity}</div>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-furniture-brown">
                    ₹{chair.price.toLocaleString()}
                  </span>
                  {chair.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{chair.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Color Options */}
                <div className="flex items-center space-x-1 mb-3">
                  <span className="text-xs text-gray-600">Colors:</span>
                  <div className="flex space-x-1">
                    {chair.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                        title={color}
                      />
                    ))}
                    {chair.colors.length > 3 && (
                      <span className="text-xs text-gray-500">+{chair.colors.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    href={`/products/${chair.id}`}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-xs font-medium hover:bg-gray-200 transition duration-200 text-center"
                  >
                    Details
                  </Link>
                  <div className="flex-1">
                    <AddToCartButton 
                      product={{
                        id: chair.id,
                        name: chair.name,
                        price: chair.price,
                        originalPrice: chair.originalPrice,
                        image: chair.images[0],
                        category: 'Chairs'
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
            Load More Chairs
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
                    <span className="font-semibold">Weight Capacity:</span> {selectedProduct.weight_capacity}
                  </div>
                  <div>
                    <span className="font-semibold">Dimensions:</span> {selectedProduct.dimensions}
                  </div>
                  <div>
                    <span className="font-semibold">Colors:</span> {selectedProduct.colors.join(', ')}
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
                      category: 'Chairs'
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