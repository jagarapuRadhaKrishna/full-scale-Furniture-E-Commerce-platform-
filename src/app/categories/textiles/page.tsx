'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HeartIcon as HeartOutline, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'

const textilesProducts = [
  {
    id: 1,
    name: 'Premium Cotton Bed Sheets',
    category: 'Bed Sheets',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    rating: 4.6,
    reviews: 234,
    colors: ['White', 'Blue', 'Grey']
  },
  {
    id: 2,
    name: 'Silk Pillow Covers Set',
    category: 'Pillow Covers',
    price: 899,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80',
    rating: 4.8,
    reviews: 189
  },
  {
    id: 3,
    name: 'Blackout Curtains',
    category: 'Curtains',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80',
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: 'Velvet Cushion Covers',
    category: 'Cushion Covers',
    price: 599,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    rating: 4.5,
    reviews: 267
  },
  {
    id: 5,
    name: 'Stretch Sofa Covers',
    category: 'Sofa Covers',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80',
    rating: 4.4,
    reviews: 145
  },
  {
    id: 6,
    name: 'Persian Style Carpet',
    category: 'Carpets & Rugs',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80',
    rating: 4.9,
    reviews: 98
  },
  {
    id: 7,
    name: 'Table Runner Set',
    category: 'Table Linens',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    rating: 4.6,
    reviews: 76
  },
  {
    id: 8,
    name: 'Linen Bed Sheets',
    category: 'Bed Sheets',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
    rating: 4.7,
    reviews: 198
  },
]

const categories = ['All', 'Bed Sheets', 'Pillow Covers', 'Curtains', 'Cushion Covers', 'Sofa Covers', 'Carpets & Rugs', 'Table Linens']

export default function TextilesPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const filteredProducts = selectedCategory === 'All' 
    ? textilesProducts 
    : textilesProducts.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8]">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Textiles Collection
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
              Premium quality textiles to enhance every corner of your home
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm ${
                    selectedCategory === cat
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {product.category}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    {favorites.includes(product.id) ? (
                      <HeartSolid className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartOutline className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-500">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-white text-orange-500 border-2 border-orange-500 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  )
}
