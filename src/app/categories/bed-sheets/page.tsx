'use client'

import { useState } from 'react'
import { SparklesIcon } from '@heroicons/react/24/outline'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ProductCard from '@/components/shared/ProductCard'

const bedSheets = [
  {
    id: 1,
    name: "Premium Cotton Bed Sheet Set",
    price: 2999,
    originalPrice: 4999,
    rating: 4.8,
    reviews: 156,
    image: "/images/bedroom/bed-sheet-cotton.jpg",
    colors: ["White", "Blue", "Gray", "Beige"],
    sizes: ["Single", "Double", "Queen", "King"],
    material: "100% Cotton",
    features: ["300 Thread Count", "Machine Washable", "Fade Resistant"],
    isNew: true,
    isBestSeller: true
  },
  {
    id: 2,
    name: "Luxury Satin Bed Sheet Set",
    price: 3999,
    originalPrice: 6999,
    rating: 4.9,
    reviews: 89,
    image: "/images/bedroom/bed-sheet-satin.jpg",
    colors: ["Champagne", "Navy", "Burgundy", "Silver"],
    sizes: ["Double", "Queen", "King"],
    material: "Satin",
    features: ["400 Thread Count", "Silky Smooth", "Wrinkle Resistant"],
    isNew: false,
    isBestSeller: true
  },
  {
    id: 3,
    name: "Microfiber Comfort Bed Sheet Set",
    price: 1999,
    originalPrice: 2999,
    rating: 4.6,
    reviews: 234,
    image: "/images/bedroom/bed-sheet-microfiber.jpg",
    colors: ["White", "Pink", "Mint", "Lavender"],
    sizes: ["Single", "Double", "Queen"],
    material: "Microfiber",
    features: ["Soft Touch", "Easy Care", "Affordable"],
    isNew: false,
    isBestSeller: false
  },
  {
    id: 4,
    name: "Bamboo Eco-Friendly Bed Sheet Set",
    price: 3499,
    originalPrice: 4999,
    rating: 4.7,
    reviews: 127,
    image: "/images/bedroom/bed-sheet-bamboo.jpg",
    colors: ["Natural", "Sage", "Charcoal"],
    sizes: ["Double", "Queen", "King"],
    material: "Bamboo Fiber",
    features: ["Eco-Friendly", "Antibacterial", "Temperature Regulating"],
    isNew: true,
    isBestSeller: false
  },
  {
    id: 5,
    name: "Printed Designer Bed Sheet Set",
    price: 2499,
    originalPrice: 3999,
    rating: 4.5,
    reviews: 98,
    image: "/images/bedroom/bed-sheet-printed.jpg",
    colors: ["Floral", "Geometric", "Abstract"],
    sizes: ["Single", "Double", "Queen"],
    material: "Cotton Blend",
    features: ["Unique Prints", "Colorfast", "Modern Design"],
    isNew: false,
    isBestSeller: false
  },
  {
    id: 6,
    name: "Linen Luxury Bed Sheet Set",
    price: 4999,
    originalPrice: 7999,
    rating: 4.9,
    reviews: 67,
    image: "/images/bedroom/bed-sheet-linen.jpg",
    colors: ["Natural Linen", "Stone", "Dusty Rose"],
    sizes: ["Queen", "King"],
    material: "100% Linen",
    features: ["Premium Quality", "Breathable", "Natural Texture"],
    isNew: true,
    isBestSeller: true
  }
]

const filters = {
  priceRanges: [
    { label: "Under ₹2,000", min: 0, max: 2000 },
    { label: "₹2,000 - ₹3,000", min: 2000, max: 3000 },
    { label: "₹3,000 - ₹5,000", min: 3000, max: 5000 },
    { label: "Above ₹5,000", min: 5000, max: 99999 }
  ],
  materials: ["Cotton", "Satin", "Microfiber", "Bamboo Fiber", "Linen", "Cotton Blend"],
  sizes: ["Single", "Double", "Queen", "King"]
}

export default function BedSheetsPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: null as any,
    materials: [] as string[],
    sizes: [] as string[]
  })
  const [sortBy, setSortBy] = useState('popularity')

  const filteredProducts = bedSheets.filter(product => {
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-800 via-orange-700 to-amber-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Premium Bed Sheets Collection
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-amber-100">
              Transform your bedroom with our luxurious and comfortable bed sheets
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">100% Quality Assured</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Multiple Sizes Available</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Easy Care Instructions</span>
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
                      className="text-amber-600 focus:ring-amber-500"
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
                      className="text-amber-600 focus:ring-amber-500"
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

              {/* Size */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Size</h4>
                {filters.sizes.map((size) => (
                  <label key={size} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="text-amber-600 focus:ring-amber-500"
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
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
              <div className="text-gray-600">
                Showing {sortedProducts.length} of {bedSheets.length} products
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
                  features={product.features}
                  isNew={product.isNew}
                  isBestSeller={product.isBestSeller}
                  category="bed-sheet"
                  colorScheme="amber"
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