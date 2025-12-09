'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowPathIcon, HeartIcon as HeartOutline, EyeIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import BackNavigation from '@/components/layout/BackNavigation'
import AddToCartButton from '@/components/cart/AddToCartButton'

const beanBags = [
  {
    id: 201,
    name: 'Classic Leather Bean Bag',
    price: 12999,
    originalPrice: 16999,
    images: [
      '/images/bean-bags/leather-bean-1.jpg',
      '/images/bean-bags/leather-bean-2.jpg',
      '/images/bean-bags/leather-bean-3.jpg',
      '/images/bean-bags/leather-bean-4.jpg'
    ],
    rating: 4.7,
    reviews: 89,
    description: 'Premium leather bean bag with high-quality filling. Perfect for relaxation.',
    features: ['Genuine Leather', 'Refillable', 'Water Resistant', 'Easy Maintenance'],
    material: 'Genuine Leather',
    size: 'Large (3ft x 3ft)',
    filling: 'Virgin Beans',
    colors: ['Brown', 'Black', 'Tan']
  },
  {
    id: 202,
    name: 'Fabric Bean Bag Chair',
    price: 7999,
    originalPrice: 9999,
    images: [
      '/images/bean-bags/fabric-bean-1.jpg',
      '/images/bean-bags/fabric-bean-2.jpg',
      '/images/bean-bags/fabric-bean-3.jpg',
      '/images/bean-bags/fabric-bean-4.jpg'
    ],
    rating: 4.5,
    reviews: 134,
    description: 'Comfortable fabric bean bag chair available in multiple colors.',
    features: ['Soft Fabric', 'Machine Washable Cover', 'Lightweight', 'Durable'],
    material: 'Cotton Fabric',
    size: 'Medium (2.5ft x 2.5ft)',
    filling: 'EPS Beans',
    colors: ['Red', 'Blue', 'Green', 'Yellow', 'Purple']
  },
  {
    id: 203,
    name: 'Gaming Bean Bag',
    price: 15999,
    originalPrice: 19999,
    images: [
      '/images/bean-bags/gaming-bean-1.jpg',
      '/images/bean-bags/gaming-bean-2.jpg',
      '/images/bean-bags/gaming-bean-3.jpg',
      '/images/bean-bags/gaming-bean-4.jpg'
    ],
    rating: 4.8,
    reviews: 76,
    description: 'Ergonomic bean bag designed specifically for gaming. Includes side pockets.',
    features: ['Ergonomic Design', 'Side Pockets', 'Extra Support', 'Gaming Optimized'],
    material: 'Gaming Fabric',
    size: 'XL (3.5ft x 3.5ft)',
    filling: 'Memory Foam + Beans',
    colors: ['Black', 'Red', 'Blue']
  },
  {
    id: 204,
    name: 'Kids Bean Bag',
    price: 4999,
    originalPrice: 6999,
    images: [
      '/images/bean-bags/kids-bean-1.jpg',
      '/images/bean-bags/kids-bean-2.jpg',
      '/images/bean-bags/kids-bean-3.jpg',
      '/images/bean-bags/kids-bean-4.jpg'
    ],
    rating: 4.6,
    reviews: 156,
    description: 'Colorful and safe bean bag designed for children. Fun animal designs.',
    features: ['Child Safe', 'Fun Designs', 'Easy to Clean', 'Lightweight'],
    material: 'Child-Safe Fabric',
    size: 'Small (2ft x 2ft)',
    filling: 'Virgin Beans',
    colors: ['Pink', 'Blue', 'Green', 'Orange']
  },
  {
    id: 205,
    name: 'Outdoor Bean Bag',
    price: 18999,
    originalPrice: 22999,
    images: [
      '/images/bean-bags/outdoor-bean-1.jpg',
      '/images/bean-bags/outdoor-bean-2.jpg',
      '/images/bean-bags/outdoor-bean-3.jpg',
      '/images/bean-bags/outdoor-bean-4.jpg'
    ],
    rating: 4.4,
    reviews: 67,
    description: 'Weather-resistant bean bag perfect for outdoor use. UV protected material.',
    features: ['Weather Resistant', 'UV Protection', 'Quick Dry', 'Fade Resistant'],
    material: 'Outdoor Fabric',
    size: 'Large (3ft x 3ft)',
    filling: 'Water Resistant Beans',
    colors: ['Navy', 'Gray', 'Olive', 'Beige']
  },
  {
    id: 206,
    name: 'Luxury Velvet Bean Bag',
    price: 22999,
    originalPrice: 27999,
    images: [
      '/images/bean-bags/velvet-bean-1.jpg',
      '/images/bean-bags/velvet-bean-2.jpg',
      '/images/bean-bags/velvet-bean-3.jpg',
      '/images/bean-bags/velvet-bean-4.jpg'
    ],
    rating: 4.9,
    reviews: 43,
    description: 'Luxurious velvet bean bag for premium comfort and style.',
    features: ['Velvet Fabric', 'Premium Filling', 'Luxury Design', 'Ultra Soft'],
    material: 'Premium Velvet',
    size: 'Large (3ft x 3ft)',
    filling: 'Memory Foam + Virgin Beans',
    colors: ['Royal Blue', 'Emerald', 'Burgundy', 'Gold']
  }
]

export default function BeanBagsPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('All Sizes')
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials')

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

  const filteredBeanBags = beanBags.filter(bag => {
    if (selectedSize !== 'All Sizes' && !bag.size.includes(selectedSize)) return false
    if (selectedMaterial !== 'All Materials' && bag.material !== selectedMaterial) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackNavigation />
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bean Bags</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover comfort like never before with our premium bean bag collection. 
            From gaming to relaxation, find the perfect bean bag for every need.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <select 
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-furniture-brown"
          >
            <option>All Sizes</option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
            <option>XL</option>
          </select>
          
          <select 
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-furniture-brown"
          >
            <option>All Materials</option>
            <option>Genuine Leather</option>
            <option>Cotton Fabric</option>
            <option>Gaming Fabric</option>
            <option>Outdoor Fabric</option>
            <option>Premium Velvet</option>
          </select>

          <button className="px-6 py-2 bg-furniture-brown text-white rounded-full hover:bg-furniture-dark-wood transition duration-200">
            Price: Low to High
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBeanBags.map((bag) => (
            <div key={bag.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
              {/* Product Image */}
              <div className="relative group">
                <img
                  src={bag.images[0]}
                  alt={bag.name}
                  className="w-full h-64 object-cover"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center space-x-4">
                  <button 
                    onClick={() => handle360View(bag)}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    <ArrowPathIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => toggleFavorite(bag.id)}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    {favorites.includes(bag.id) ? (
                      <HeartSolid className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartOutline className="h-5 w-5" />
                    )}
                  </button>
                  <Link
                    href={`/products/${bag.id}`}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition duration-200"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </Link>
                </div>

                {/* Sale Badge */}
                {bag.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {Math.round(((bag.originalPrice - bag.price) / bag.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{bag.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(bag.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({bag.reviews} reviews)</span>
                </div>

                {/* Size and Material */}
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Size: {bag.size}</span>
                  <span>Material: {bag.material}</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-furniture-brown">
                    ₹{bag.price.toLocaleString()}
                  </span>
                  {bag.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{bag.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Color Options */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-600">Colors:</span>
                  <div className="flex space-x-1">
                    {bag.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                    {bag.colors.length > 3 && (
                      <span className="text-xs text-gray-500">+{bag.colors.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    href={`/products/${bag.id}`}
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 transition duration-200 text-center"
                  >
                    View Details
                  </Link>
                  <div className="flex-1">
                    <AddToCartButton 
                      product={{
                        id: bag.id,
                        name: bag.name,
                        price: bag.price,
                        originalPrice: bag.originalPrice,
                        image: bag.images[0],
                        category: 'Bean Bags'
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
            Load More Bean Bags
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
                    <span className="font-semibold">Size:</span> {selectedProduct.size}
                  </div>
                  <div>
                    <span className="font-semibold">Filling:</span> {selectedProduct.filling}
                  </div>
                  <div>
                    <span className="font-semibold">Colors:</span> {selectedProduct.colors.join(', ')}
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
                      category: 'Bean Bags'
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