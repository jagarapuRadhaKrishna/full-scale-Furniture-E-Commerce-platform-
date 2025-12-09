'use client'

import { useState } from 'react'
import { SparklesIcon } from '@heroicons/react/24/outline'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ProductCard from '@/components/shared/ProductCard'

const covers = [
  {
    id: 1,
    name: "Waterproof Mattress Protector",
    price: 1999,
    originalPrice: 2999,
    rating: 4.7,
    reviews: 234,
    image: "/images/bedroom/cover-waterproof.jpg",
    colors: ["White", "Cream"],
    sizes: ["Single", "Double", "Queen", "King"],
    material: "Terry Cotton with TPU backing",
    type: "Mattress Protector",
    features: ["Waterproof", "Breathable", "Machine Washable"],
    isNew: false,
    isBestSeller: true
  },
  {
    id: 2,
    name: "Quilted Mattress Cover",
    price: 2499,
    originalPrice: 3499,
    rating: 4.6,
    reviews: 156,
    image: "/images/bedroom/cover-quilted.jpg",
    colors: ["White", "Ivory", "Gray"],
    sizes: ["Double", "Queen", "King"],
    material: "Cotton with Polyester Filling",
    type: "Mattress Topper",
    features: ["Extra Comfort", "Quilted Design", "Deep Pockets"],
    isNew: true,
    isBestSeller: true
  },
  {
    id: 3,
    name: "Pillow Protector Set",
    price: 999,
    originalPrice: 1499,
    rating: 4.5,
    reviews: 189,
    image: "/images/bedroom/cover-pillow-protector.jpg",
    colors: ["White"],
    sizes: ["Standard", "Queen", "King"],
    material: "Cotton Terry",
    type: "Pillow Protector",
    features: ["Set of 2", "Hypoallergenic", "Easy Care"],
    isNew: false,
    isBestSeller: false
  },
  {
    id: 4,
    name: "Cooling Mattress Pad",
    price: 3999,
    originalPrice: 5999,
    rating: 4.8,
    reviews: 123,
    image: "/images/bedroom/cover-cooling-pad.jpg",
    colors: ["White", "Light Blue"],
    sizes: ["Queen", "King"],
    material: "Gel-Infused Memory Foam",
    type: "Cooling Pad",
    features: ["Temperature Regulation", "Pressure Relief", "Breathable"],
    isNew: true,
    isBestSeller: true
  },
  {
    id: 5,
    name: "Organic Cotton Mattress Cover",
    price: 2999,
    originalPrice: 4499,
    rating: 4.7,
    reviews: 167,
    image: "/images/bedroom/cover-organic.jpg",
    colors: ["Natural", "White"],
    sizes: ["Double", "Queen", "King"],
    material: "Organic Cotton",
    type: "Mattress Cover",
    features: ["Chemical-Free", "Sustainable", "Soft Touch"],
    isNew: true,
    isBestSeller: false
  },
  {
    id: 6,
    name: "Fitted Sheet Style Protector",
    price: 1499,
    originalPrice: 2499,
    rating: 4.4,
    reviews: 89,
    image: "/images/bedroom/cover-fitted-sheet.jpg",
    colors: ["White", "Gray", "Navy"],
    sizes: ["Single", "Double", "Queen", "King"],
    material: "Bamboo Terry",
    type: "Fitted Protector",
    features: ["Easy Fit", "Antimicrobial", "Moisture Wicking"],
    isNew: false,
    isBestSeller: false
  }
]

const filters = {
  priceRanges: [
    { label: "Under ₹1,500", min: 0, max: 1500 },
    { label: "₹1,500 - ₹2,500", min: 1500, max: 2500 },
    { label: "₹2,500 - ₹4,000", min: 2500, max: 4000 },
    { label: "Above ₹4,000", min: 4000, max: 99999 }
  ],
  materials: ["Terry Cotton with TPU backing", "Cotton with Polyester Filling", "Cotton Terry", "Gel-Infused Memory Foam", "Organic Cotton", "Bamboo Terry"],
  sizes: ["Single", "Double", "Queen", "King", "Standard"],
  types: ["Mattress Protector", "Mattress Topper", "Pillow Protector", "Cooling Pad", "Mattress Cover", "Fitted Protector"]
}

export default function CoversPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: null as any,
    materials: [] as string[],
    sizes: [] as string[],
    types: [] as string[]
  })
  const [sortBy, setSortBy] = useState('popularity')

  const filteredProducts = covers.filter(product => {
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
    if (selectedFilters.types.length > 0) {
      if (!selectedFilters.types.includes(product.type)) return false
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-800 via-emerald-700 to-teal-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mattress & Pillow Covers
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Protect and enhance your bedding with our premium cover collection
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Waterproof Options</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Easy Care</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Multiple Types</span>
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
                      className="text-green-600 focus:ring-green-500"
                      onChange={() => setSelectedFilters(prev => ({ ...prev, priceRange: range }))}
                    />
                    <span className="ml-2 text-sm">{range.label}</span>
                  </label>
                ))}
              </div>

              {/* Type */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Type</h4>
                {filters.types.map((type) => (
                  <label key={type} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="text-green-600 focus:ring-green-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters(prev => ({ ...prev, types: [...prev.types, type] }))
                        } else {
                          setSelectedFilters(prev => ({ ...prev, types: prev.types.filter(t => t !== type) }))
                        }
                      }}
                    />
                    <span className="ml-2 text-sm">{type}</span>
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
                      className="text-green-600 focus:ring-green-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFilters(prev => ({ ...prev, materials: [...prev.materials, material] }))
                        } else {
                          setSelectedFilters(prev => ({ ...prev, materials: prev.materials.filter(m => m !== material) }))
                        }
                      }}
                    />
                    <span className="ml-2 text-sm">{material.length > 20 ? material.substring(0, 20) + '...' : material}</span>
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
                      className="text-green-600 focus:ring-green-500"
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
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
              <div className="text-gray-600">
                Showing {sortedProducts.length} of {covers.length} products
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
                  features={[product.type, ...product.features]}
                  isNew={product.isNew}
                  isBestSeller={product.isBestSeller}
                  category="cover"
                  colorScheme="green"
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