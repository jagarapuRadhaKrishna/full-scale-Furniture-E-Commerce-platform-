'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowPathIcon, HeartIcon as HeartOutline, EyeIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import BackNavigation from '@/components/layout/BackNavigation'
import AddToCartButton from '@/components/cart/AddToCartButton'

const footwearStands = [
  {
    id: 501,
    name: 'Wooden Shoe Rack 4-Tier',
    price: 3999,
    originalPrice: 5999,
    images: [
      '/images/footwear-stands/wooden-rack-4tier-1.jpg',
      '/images/footwear-stands/wooden-rack-4tier-2.jpg',
      '/images/footwear-stands/wooden-rack-4tier-3.jpg',
      '/images/footwear-stands/wooden-rack-4tier-4.jpg'
    ],
    rating: 4.5,
    reviews: 234,
    description: 'Sturdy wooden shoe rack with 4 tiers, perfect for entryways and closets.',
    features: ['4 Tier Storage', 'Solid Wood', 'Easy Assembly', 'Compact Design'],
    material: 'Sheesham Wood',
    type: 'Shoe Rack',
    capacity: '12-16 pairs',
    dimensions: '60cm x 25cm x 80cm',
    colors: ['Natural Wood', 'Dark Brown', 'Walnut']
  },
  {
    id: 502,
    name: 'Metal Shoe Cabinet with Doors',
    price: 8999,
    originalPrice: 11999,
    images: [
      '/images/footwear-stands/metal-cabinet-1.jpg',
      '/images/footwear-stands/metal-cabinet-2.jpg',
      '/images/footwear-stands/metal-cabinet-3.jpg',
      '/images/footwear-stands/metal-cabinet-4.jpg'
    ],
    rating: 4.7,
    reviews: 156,
    description: 'Sleek metal shoe cabinet with perforated doors for ventilation.',
    features: ['Perforated Doors', 'Metal Construction', 'Ventilation', 'Lockable'],
    material: 'Powder Coated Steel',
    type: 'Shoe Cabinet',
    capacity: '18-24 pairs',
    dimensions: '80cm x 35cm x 90cm',
    colors: ['White', 'Black', 'Gray', 'Blue']
  },
  {
    id: 503,
    name: 'Bench with Shoe Storage',
    price: 6999,
    originalPrice: 8999,
    images: [
      '/images/footwear-stands/bench-storage-1.jpg',
      '/images/footwear-stands/bench-storage-2.jpg',
      '/images/footwear-stands/bench-storage-3.jpg',
      '/images/footwear-stands/bench-storage-4.jpg'
    ],
    rating: 4.6,
    reviews: 189,
    description: 'Multi-functional bench with hidden shoe storage compartment and seating.',
    features: ['Seating + Storage', 'Cushioned Top', 'Hidden Compartment', 'Space Saving'],
    material: 'Engineered Wood',
    type: 'Storage Bench',
    capacity: '6-8 pairs',
    dimensions: '90cm x 35cm x 45cm',
    colors: ['White', 'Oak', 'Gray', 'Black']
  },
  {
    id: 504,
    name: 'Wall Mounted Shoe Rack',
    price: 2999,
    originalPrice: 3999,
    images: [
      '/images/footwear-stands/wall-mounted-1.jpg',
      '/images/footwear-stands/wall-mounted-2.jpg',
      '/images/footwear-stands/wall-mounted-3.jpg',
      '/images/footwear-stands/wall-mounted-4.jpg'
    ],
    rating: 4.4,
    reviews: 298,
    description: 'Space-saving wall mounted shoe rack with adjustable hooks.',
    features: ['Wall Mounted', 'Space Saving', 'Adjustable Hooks', 'Easy Installation'],
    material: 'Metal + Plastic',
    type: 'Wall Mount',
    capacity: '8-10 pairs',
    dimensions: '70cm x 15cm x 20cm',
    colors: ['Black', 'White', 'Chrome']
  },
  {
    id: 505,
    name: 'Rotating Shoe Tower',
    price: 12999,
    originalPrice: 15999,
    images: [
      '/images/footwear-stands/rotating-tower-1.jpg',
      '/images/footwear-stands/rotating-tower-2.jpg',
      '/images/footwear-stands/rotating-tower-3.jpg',
      '/images/footwear-stands/rotating-tower-4.jpg'
    ],
    rating: 4.8,
    reviews: 87,
    description: 'Innovative 360-degree rotating shoe tower for maximum storage in minimal space.',
    features: ['360° Rotation', 'Space Efficient', 'Multiple Levels', 'Modern Design'],
    material: 'Engineered Wood + Metal',
    type: 'Rotating Tower',
    capacity: '20-24 pairs',
    dimensions: '40cm x 40cm x 150cm',
    colors: ['White', 'Black', 'Walnut']
  },
  {
    id: 506,
    name: 'Bamboo Shoe Organizer',
    price: 4999,
    originalPrice: 6999,
    images: [
      '/images/footwear-stands/bamboo-organizer-1.jpg',
      '/images/footwear-stands/bamboo-organizer-2.jpg',
      '/images/footwear-stands/bamboo-organizer-3.jpg',
      '/images/footwear-stands/bamboo-organizer-4.jpg'
    ],
    rating: 4.5,
    reviews: 167,
    description: 'Eco-friendly bamboo shoe organizer with natural finish and ventilation.',
    features: ['Eco-Friendly', 'Natural Bamboo', 'Ventilated Design', 'Lightweight'],
    material: 'Bamboo',
    type: 'Shoe Organizer',
    capacity: '10-12 pairs',
    dimensions: '65cm x 30cm x 70cm',
    colors: ['Natural Bamboo', 'Dark Bamboo']
  },
  {
    id: 507,
    name: 'Over-the-Door Shoe Rack',
    price: 1999,
    originalPrice: 2999,
    images: [
      '/images/footwear-stands/over-door-1.jpg',
      '/images/footwear-stands/over-door-2.jpg',
      '/images/footwear-stands/over-door-3.jpg',
      '/images/footwear-stands/over-door-4.jpg'
    ],
    rating: 4.3,
    reviews: 345,
    description: 'Convenient over-the-door shoe rack that fits most standard doors.',
    features: ['Over Door Design', 'No Tools Required', 'Adjustable Hooks', 'Portable'],
    material: 'Metal Wire',
    type: 'Over Door Rack',
    capacity: '12-15 pairs',
    dimensions: '60cm x 20cm x 180cm',
    colors: ['White', 'Black', 'Chrome']
  },
  {
    id: 508,
    name: 'Modular Shoe Storage System',
    price: 15999,
    originalPrice: 19999,
    images: [
      '/images/footwear-stands/modular-system-1.jpg',
      '/images/footwear-stands/modular-system-2.jpg',
      '/images/footwear-stands/modular-system-3.jpg',
      '/images/footwear-stands/modular-system-4.jpg'
    ],
    rating: 4.9,
    reviews: 76,
    description: 'Customizable modular shoe storage system that grows with your collection.',
    features: ['Modular Design', 'Expandable', 'Customizable', 'Premium Quality'],
    material: 'High-Quality Plastic',
    type: 'Modular System',
    capacity: '24-30 pairs',
    dimensions: 'Customizable',
    colors: ['Transparent', 'White', 'Black']
  },
  {
    id: 509,
    name: 'Vintage Shoe Cabinet',
    price: 18999,
    originalPrice: 23999,
    images: [
      '/images/footwear-stands/vintage-cabinet-1.jpg',
      '/images/footwear-stands/vintage-cabinet-2.jpg',
      '/images/footwear-stands/vintage-cabinet-3.jpg',
      '/images/footwear-stands/vintage-cabinet-4.jpg'
    ],
    rating: 4.6,
    reviews: 94,
    description: 'Elegant vintage-style shoe cabinet with intricate detailing and premium finish.',
    features: ['Vintage Design', 'Hand Finished', 'Premium Hardware', 'Adjustable Shelves'],
    material: 'Solid Wood',
    type: 'Vintage Cabinet',
    capacity: '16-20 pairs',
    dimensions: '90cm x 40cm x 120cm',
    colors: ['Antique Brown', 'Dark Walnut', 'Vintage White']
  },
  {
    id: 510,
    name: 'Compact Corner Shoe Rack',
    price: 3499,
    originalPrice: 4999,
    images: [
      '/images/footwear-stands/corner-rack-1.jpg',
      '/images/footwear-stands/corner-rack-2.jpg',
      '/images/footwear-stands/corner-rack-3.jpg',
      '/images/footwear-stands/corner-rack-4.jpg'
    ],
    rating: 4.4,
    reviews: 212,
    description: 'Space-efficient corner shoe rack perfect for small spaces and apartments.',
    features: ['Corner Design', 'Space Efficient', 'Triangular Shape', 'Multi-Tier'],
    material: 'Metal Frame',
    type: 'Corner Rack',
    capacity: '8-10 pairs',
    dimensions: '35cm x 35cm x 90cm',
    colors: ['Black', 'White', 'Silver']
  }
]

export default function FootwearStandsPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedType, setSelectedType] = useState('All Types')
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials')
  const [capacityRange, setCapacityRange] = useState('All Capacities')

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

  const filteredStands = footwearStands.filter(stand => {
    if (selectedType !== 'All Types' && stand.type !== selectedType) return false
    if (selectedMaterial !== 'All Materials' && !stand.material.includes(selectedMaterial)) return false
    if (capacityRange !== 'All Capacities') {
      const capacity = parseInt(stand.capacity.split('-')[0])
      switch (capacityRange) {
        case 'Under 10 pairs':
          if (capacity >= 10) return false
          break
        case '10-20 pairs':
          if (capacity < 10 || capacity > 20) return false
          break
        case 'Above 20 pairs':
          if (capacity <= 20) return false
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Footwear Stands & Storage</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Organize your shoe collection with our premium footwear storage solutions. 
            From compact racks to elegant cabinets, find the perfect storage for every space.
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
            <option>Shoe Rack</option>
            <option>Shoe Cabinet</option>
            <option>Storage Bench</option>
            <option>Wall Mount</option>
            <option>Rotating Tower</option>
            <option>Shoe Organizer</option>
            <option>Over Door Rack</option>
            <option>Modular System</option>
            <option>Vintage Cabinet</option>
            <option>Corner Rack</option>
          </select>
          
          <select 
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-furniture-brown"
          >
            <option>All Materials</option>
            <option>Wood</option>
            <option>Metal</option>
            <option>Bamboo</option>
            <option>Plastic</option>
          </select>

          <select 
            value={capacityRange}
            onChange={(e) => setCapacityRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-furniture-brown"
          >
            <option>All Capacities</option>
            <option>Under 10 pairs</option>
            <option>10-20 pairs</option>
            <option>Above 20 pairs</option>
          </select>

          <button className="px-6 py-2 bg-furniture-brown text-white rounded-full hover:bg-furniture-dark-wood transition duration-200">
            Space Saving
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStands.map((stand) => (
            <div key={stand.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
              {/* Product Image */}
              <div className="relative group">
                <img
                  src={stand.images[0]}
                  alt={stand.name}
                  className="w-full h-48 object-cover"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center space-x-3">
                  <button 
                    onClick={() => handle360View(stand)}
                    className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => toggleFavorite(stand.id)}
                    className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    {favorites.includes(stand.id) ? (
                      <HeartSolid className="h-4 w-4 text-red-500" />
                    ) : (
                      <HeartOutline className="h-4 w-4" />
                    )}
                  </button>
                  <Link
                    href={`/products/${stand.id}`}
                    className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Link>
                </div>

                {/* Sale Badge */}
                {stand.originalPrice && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {Math.round(((stand.originalPrice - stand.price) / stand.originalPrice) * 100)}% OFF
                  </div>
                )}

                {/* Type Badge */}
                <div className="absolute top-2 right-2 bg-furniture-brown text-white px-2 py-1 rounded-full text-xs">
                  {stand.type}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{stand.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(stand.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-600">({stand.reviews})</span>
                </div>

                {/* Material and Capacity */}
                <div className="text-xs text-gray-600 mb-2">
                  <div>{stand.material}</div>
                  <div className="text-furniture-brown font-medium">Capacity: {stand.capacity}</div>
                </div>

                {/* Dimensions */}
                <div className="text-xs text-gray-600 mb-3">
                  Size: {stand.dimensions}
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-furniture-brown">
                    ₹{stand.price.toLocaleString()}
                  </span>
                  {stand.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{stand.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Color Options */}
                <div className="flex items-center space-x-1 mb-3">
                  <span className="text-xs text-gray-600">Colors:</span>
                  <div className="flex space-x-1">
                    {stand.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{ 
                          backgroundColor: color.toLowerCase().includes('white') ? '#ffffff' : 
                                         color.toLowerCase().includes('black') ? '#000000' :
                                         color.toLowerCase().includes('brown') ? '#8B4513' :
                                         color.toLowerCase().includes('gray') ? '#9E9E9E' :
                                         color.toLowerCase().includes('chrome') ? '#C0C0C0' :
                                         color.toLowerCase().includes('blue') ? '#0066CC' : '#DEB887' 
                        }}
                        title={color}
                      />
                    ))}
                    {stand.colors.length > 3 && (
                      <span className="text-xs text-gray-500">+{stand.colors.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    href={`/products/${stand.id}`}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded text-xs font-medium hover:bg-gray-200 transition duration-200 text-center"
                  >
                    Details
                  </Link>
                  <div className="flex-1">
                    <AddToCartButton 
                      product={{
                        id: stand.id,
                        name: stand.name,
                        price: stand.price,
                        originalPrice: stand.originalPrice,
                        image: stand.images[0],
                        category: 'Footwear Stands'
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
            Load More Storage Solutions
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
                    <span className="font-semibold">Capacity:</span> {selectedProduct.capacity}
                  </div>
                  <div>
                    <span className="font-semibold">Dimensions:</span> {selectedProduct.dimensions}
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
                      category: 'Footwear Stands'
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