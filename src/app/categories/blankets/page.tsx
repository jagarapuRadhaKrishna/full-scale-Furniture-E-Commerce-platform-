'use client'

import { useState } from 'react'
import { SparklesIcon } from '@heroicons/react/24/outline'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ProductCard from '@/components/shared/ProductCard'

const blankets = [
  {
    id: 1,
    name: "Wool Blend Winter Blanket",
    price: 4999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 234,
    image: "/images/bedroom/blanket-wool.jpg",
    colors: ["Beige", "Brown", "Gray", "Navy"],
    sizes: ["Single", "Double", "Queen"],
    material: "Wool Blend",
    weight: "Heavy",
    season: "Winter",
    isNew: true,
    isBestSeller: true
  },
  {
    id: 2,
    name: "Cotton Summer Blanket",
    price: 2999,
    originalPrice: 4499,
    rating: 4.6,
    reviews: 156,
    image: "/images/bedroom/blanket-cotton.jpg",
    colors: ["White", "Cream", "Light Blue", "Mint"],
    sizes: ["Single", "Double", "Queen"],
    material: "100% Cotton",
    weight: "Light",
    season: "Summer",
    isNew: false,
    isBestSeller: true
  },
  {
    id: 3,
    name: "Fleece Cozy Blanket",
    price: 1999,
    originalPrice: 2999,
    rating: 4.7,
    reviews: 189,
    image: "/images/bedroom/blanket-fleece.jpg",
    colors: ["Pink", "Purple", "Teal", "Charcoal"],
    sizes: ["Single", "Double"],
    material: "Fleece",
    weight: "Medium",
    season: "All-Season",
    isNew: false,
    isBestSeller: false
  },
  {
    id: 4,
    name: "Cashmere Luxury Blanket",
    price: 9999,
    originalPrice: 14999,
    rating: 4.9,
    reviews: 89,
    image: "/images/bedroom/blanket-cashmere.jpg",
    colors: ["Cream", "Camel", "Charcoal"],
    sizes: ["Queen", "King"],
    material: "Cashmere",
    weight: "Medium",
    season: "Winter",
    isNew: true,
    isBestSeller: true
  },
  {
    id: 5,
    name: "Bamboo Cooling Blanket",
    price: 3499,
    originalPrice: 4999,
    rating: 4.5,
    reviews: 167,
    image: "/images/bedroom/blanket-bamboo.jpg",
    colors: ["Natural", "Sage", "Dusty Blue"],
    sizes: ["Double", "Queen", "King"],
    material: "Bamboo Fiber",
    weight: "Light",
    season: "Summer",
    isNew: true,
    isBestSeller: false
  },
  {
    id: 6,
    name: "Sherpa Throw Blanket",
    price: 2499,
    originalPrice: 3999,
    rating: 4.4,
    reviews: 145,
    image: "/images/bedroom/blanket-sherpa.jpg",
    colors: ["White", "Gray", "Brown"],
    sizes: ["Single", "Double"],
    material: "Sherpa",
    weight: "Medium",
    season: "Winter",
    isNew: false,
    isBestSeller: false
  }
]

const filters = {
  priceRanges: [
    { label: "Under ₹3,000", min: 0, max: 3000 },
    { label: "₹3,000 - ₹5,000", min: 3000, max: 5000 },
    { label: "₹5,000 - ₹8,000", min: 5000, max: 8000 },
    { label: "Above ₹8,000", min: 8000, max: 99999 }
  ],
  materials: ["Wool Blend", "Cotton", "Fleece", "Cashmere", "Bamboo Fiber", "Sherpa"],
  sizes: ["Single", "Double", "Queen", "King"],
  weights: ["Light", "Medium", "Heavy"],
  seasons: ["Summer", "Winter", "All-Season"]
}

export default function BlanketsPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: null as any,
    materials: [] as string[],
    sizes: [] as string[],
    weights: [] as string[],
    seasons: [] as string[]
  })
  const [sortBy, setSortBy] = useState('popularity')

  const filteredProducts = blankets.filter(product => {
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
    if (selectedFilters.weights.length > 0) {
      if (!selectedFilters.weights.includes(product.weight)) return false
    }
    if (selectedFilters.seasons.length > 0) {
      if (!selectedFilters.seasons.includes(product.season)) return false
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Cozy Blankets Collection
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Stay warm and comfortable with our premium blanket collection
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">All Seasons Available</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Premium Materials</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Machine Washable</span>
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
                      className="text-blue-600 focus:ring-blue-500"
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
                      className="text-blue-600 focus:ring-blue-500"
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

              {/* Weight */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Weight</h4>
                {filters.weights.map((weight) => (
                  <label key={weight} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="text-blue-600 focus:ring-blue-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters(prev => ({ ...prev, weights: [...prev.weights, weight] }))
                        } else {
                          setSelectedFilters(prev => ({ ...prev, weights: prev.weights.filter(w => w !== weight) }))
                        }
                      }}
                    />
                    <span className="ml-2 text-sm">{weight}</span>
                  </label>
                ))}
              </div>

              {/* Season */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Season</h4>
                {filters.seasons.map((season) => (
                  <label key={season} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="text-blue-600 focus:ring-blue-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters(prev => ({ ...prev, seasons: [...prev.seasons, season] }))
                        } else {
                          setSelectedFilters(prev => ({ ...prev, seasons: prev.seasons.filter(s => s !== season) }))
                        }
                      }}
                    />
                    <span className="ml-2 text-sm">{season}</span>
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
                      className="text-blue-600 focus:ring-blue-500"
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
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
              <div className="text-gray-600">
                Showing {sortedProducts.length} of {blankets.length} products
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
                  features={[product.weight, product.season]}
                  isNew={product.isNew}
                  isBestSeller={product.isBestSeller}
                  category="blanket"
                  colorScheme="blue"
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