'use client'

import { useState } from 'react'
import { SparklesIcon } from '@heroicons/react/24/outline'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ProductCard from '@/components/shared/ProductCard'

const pillows = [
  {
    id: 1,
    name: "Memory Foam Pillow",
    price: 2999,
    originalPrice: 4499,
    rating: 4.8,
    reviews: 234,
    image: "/images/bedroom/pillow-memory-foam.jpg",
    colors: ["White", "Cream"],
    sizes: ["Standard", "Queen", "King"],
    material: "Memory Foam",
    firmness: "Medium",
    features: ["Contour Support", "Cooling Gel", "Hypoallergenic"],
    isNew: true,
    isBestSeller: true
  },
  {
    id: 2,
    name: "Down Alternative Pillow",
    price: 1999,
    originalPrice: 2999,
    rating: 4.6,
    reviews: 156,
    image: "/images/bedroom/pillow-down-alternative.jpg",
    colors: ["White", "Ivory"],
    sizes: ["Standard", "Queen"],
    material: "Down Alternative",
    firmness: "Soft",
    features: ["Machine Washable", "Hypoallergenic", "Breathable"],
    isNew: false,
    isBestSeller: true
  },
  {
    id: 3,
    name: "Bamboo Fiber Pillow",
    price: 2499,
    originalPrice: 3499,
    rating: 4.7,
    reviews: 189,
    image: "/images/bedroom/pillow-bamboo.jpg",
    colors: ["Natural", "White"],
    sizes: ["Standard", "Queen", "King"],
    material: "Bamboo Fiber",
    firmness: "Medium-Soft",
    features: ["Eco-Friendly", "Moisture Wicking", "Antimicrobial"],
    isNew: true,
    isBestSeller: false
  },
  {
    id: 4,
    name: "Latex Pillow",
    price: 3999,
    originalPrice: 5999,
    rating: 4.9,
    reviews: 123,
    image: "/images/bedroom/pillow-latex.jpg",
    colors: ["White"],
    sizes: ["Standard", "Queen", "King"],
    material: "Natural Latex",
    firmness: "Firm",
    features: ["Durable", "Natural", "Responsive Support"],
    isNew: false,
    isBestSeller: true
  },
  {
    id: 5,
    name: "Gel-Infused Pillow",
    price: 3499,
    originalPrice: 4999,
    rating: 4.5,
    reviews: 167,
    image: "/images/bedroom/pillow-gel.jpg",
    colors: ["Blue", "White"],
    sizes: ["Standard", "Queen"],
    material: "Gel Memory Foam",
    firmness: "Medium",
    features: ["Cooling Technology", "Pressure Relief", "Sleep Cool"],
    isNew: true,
    isBestSeller: false
  },
  {
    id: 6,
    name: "Feather Pillow",
    price: 1499,
    originalPrice: 2499,
    rating: 4.4,
    reviews: 89,
    image: "/images/bedroom/pillow-feather.jpg",
    colors: ["White", "Cream"],
    sizes: ["Standard", "Queen", "King"],
    material: "Duck Feather",
    firmness: "Soft",
    features: ["Luxury Feel", "Moldable", "Traditional"],
    isNew: false,
    isBestSeller: false
  }
]

const filters = {
  priceRanges: [
    { label: "Under ₹2,000", min: 0, max: 2000 },
    { label: "₹2,000 - ₹3,000", min: 2000, max: 3000 },
    { label: "₹3,000 - ₹4,000", min: 3000, max: 4000 },
    { label: "Above ₹4,000", min: 4000, max: 99999 }
  ],
  materials: ["Memory Foam", "Down Alternative", "Bamboo Fiber", "Natural Latex", "Gel Memory Foam", "Duck Feather"],
  sizes: ["Standard", "Queen", "King"],
  firmness: ["Soft", "Medium-Soft", "Medium", "Firm"]
}

export default function PillowsPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: null as any,
    materials: [] as string[],
    sizes: [] as string[],
    firmness: [] as string[]
  })
  const [sortBy, setSortBy] = useState('popularity')

  const filteredProducts = pillows.filter(product => {
    if (selectedFilters.priceRange) {
      if (product.price < selectedFilters.priceRange.min || product.price > selectedFilters.priceRange.max) {
        return false
      }
    }
    if (selectedFilters.materials.length > 0) {
      if (!selectedFilters.materials.includes(product.material)) return false
    }
    if (selectedFilters.sizes.length > 0) {
      if (!product.sizes.some(size => selectedFilters.sizes.includes(size))) return false
    }
    if (selectedFilters.firmness.length > 0) {
      if (!selectedFilters.firmness.includes(product.firmness)) return false
    }
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'rating': return b.rating - a.rating
      case 'newest': return a.isNew ? -1 : 1
      default: return b.reviews - a.reviews
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Premium Pillows Collection
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Perfect comfort and support for a restful night's sleep
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Multiple Firmness Options</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Hypoallergenic Materials</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">All Sizes Available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                {filters.priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="priceRange"
                      className="text-purple-600 focus:ring-purple-500"
                      onChange={() => setSelectedFilters(prev => ({ ...prev, priceRange: range }))}
                    />
                    <span className="ml-2 text-sm">{range.label}</span>
                  </label>
                ))}
              </div>

              {/* Material */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Material</h4>
                {filters.materials.map((material) => (
                  <label key={material} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="text-purple-600 focus:ring-purple-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters(prev => ({ ...prev, materials: [...prev.materials, material] }))
                        } else {
                          setSelectedFilters(prev => ({ ...prev, materials: prev.materials.filter(m => m !== material) }))
                        }
                      }}
                    />
                    <span className="ml-2 text-sm">{material}</span>
                  </label>
                ))}
              </div>

              {/* Firmness */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Firmness</h4>
                {filters.firmness.map((firm) => (
                  <label key={firm} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="text-purple-600 focus:ring-purple-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters(prev => ({ ...prev, firmness: [...prev.firmness, firm] }))
                        } else {
                          setSelectedFilters(prev => ({ ...prev, firmness: prev.firmness.filter(f => f !== firm) }))
                        }
                      }}
                    />
                    <span className="ml-2 text-sm">{firm}</span>
                  </label>
                ))}
              </div>

              {/* Size */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Size</h4>
                {filters.sizes.map((size) => (
                  <label key={size} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="text-purple-600 focus:ring-purple-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters(prev => ({ ...prev, sizes: [...prev.sizes, size] }))
                        } else {
                          setSelectedFilters(prev => ({ ...prev, sizes: prev.sizes.filter(s => s !== size) }))
                        }
                      }}
                    />
                    <span className="ml-2 text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and View Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
              <div className="text-gray-600">
                Showing {sortedProducts.length} of {pillows.length} products
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={product.rating}
                  reviews={product.reviews}
                  image={product.image}
                  colors={product.colors}
                  sizes={product.sizes}
                  material={product.material}
                  features={[product.firmness, ...product.features]}
                  isNew={product.isNew}
                  isBestSeller={product.isBestSeller}
                  category="pillow"
                  colorScheme="purple"
                  onAddToCart={() => console.log('Added to cart:', product.name)}
                  onAddToWishlist={() => console.log('Added to wishlist:', product.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}