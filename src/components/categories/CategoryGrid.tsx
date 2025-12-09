'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HeartIcon as HeartOutline, EyeIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'

const furnitureCategories = [
  {
    id: 1,
    name: 'Bedroom',
    href: '/categories/bedroom',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 150,
    subcategories: ['Beds', 'Wardrobes', 'Dressers', 'Side Tables'],
    priceRange: '₹15,000 - ₹80,000',
    has360View: true
  },
  {
    id: 2,
    name: 'Living Room',
    href: '/categories/living-room',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 200,
    subcategories: ['Sofas', 'TV Units', 'Center Tables', 'Recliners'],
    priceRange: '₹20,000 - ₹120,000',
    has360View: true
  },
  {
    id: 3,
    name: 'Dining',
    href: '/categories/dining',
    image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 100,
    subcategories: ['Dining Tables', 'Dining Chairs', 'Sideboards', 'Bar Units'],
    priceRange: '₹12,000 - ₹60,000',
    has360View: true
  },
  {
    id: 4,
    name: 'Office',
    href: '/categories/office',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 80,
    subcategories: ['Office Chairs', 'Desks', 'Storage Units', 'Conference Tables'],
    priceRange: '₹8,000 - ₹45,000',
    has360View: true
  },
  {
    id: 5,
    name: 'Kids',
    href: '/categories/kids',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 60,
    subcategories: ['Bunk Beds', 'Study Tables', 'Kids Chairs', 'Storage'],
    priceRange: '₹5,000 - ₹35,000',
    has360View: true
  },
  {
    id: 6,
    name: 'Outdoor',
    href: '/categories/outdoor',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 40,
    subcategories: ['Garden Chairs', 'Patio Sets', 'Outdoor Tables', 'Swings'],
    priceRange: '₹10,000 - ₹70,000',
    has360View: true
  }
]

export default function CategoryGrid() {
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
  }

  const sortedCategories = [...furnitureCategories].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'items':
        return b.itemCount - a.itemCount
      case 'popular':
        return b.itemCount - a.itemCount // Using item count as popularity proxy
      default:
        return 0
    }
  })

  return (
    <div>
      {/* Sort and View Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="name">Sort by Name</option>
            <option value="items">Sort by Item Count</option>
            <option value="popular">Sort by Popularity</option>
          </select>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-furniture-brown text-white' : 'bg-gray-200'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-furniture-brown text-white' : 'bg-gray-200'}`}
            >
              List
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {furnitureCategories.length} categories
        </div>
      </div>

      {/* Category Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-4'
      }>
        {sortedCategories.map((category) => (
          <div
            key={category.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200 ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
              <img
                src={category.image}
                alt={category.name}
                className={`object-cover ${
                  viewMode === 'list' ? 'w-full h-32' : 'w-full h-48'
                }`}
              />
              <button
                onClick={() => toggleFavorite(category.id)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition duration-200"
              >
                {favorites.includes(category.id) ? (
                  <HeartSolid className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartOutline className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>

            <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h3>
                <span className="text-sm text-furniture-brown font-medium">
                  {category.itemCount} items
                </span>
              </div>

              <p className="text-gray-600 mb-3">
                {category.priceRange}
              </p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.slice(0, 3).map((sub, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{category.subcategories.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-3">
                <Link
                  href={category.href}
                  className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium text-center hover:bg-primary-700 transition duration-200"
                >
                  Browse Collection
                </Link>
                <Link
                  href={`/book-demo?category=${category.name.toLowerCase()}`}
                  className="flex items-center justify-center bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200 transition duration-200"
                >
                  <EyeIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Book Demo CTA */}
      <div className="mt-12 bg-furniture-cream rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Can&apos;t Decide? Book a Home Demo!
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our expert technicians will bring samples from multiple categories to your home. 
          Get personalized recommendations completely FREE.
        </p>
        <Link
          href="/book-demo"
          className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-200"
        >
          Book FREE Demo
        </Link>
      </div>
    </div>
  )
}