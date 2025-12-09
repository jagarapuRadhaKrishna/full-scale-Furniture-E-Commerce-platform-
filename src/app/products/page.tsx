'use client'

import { useState } from 'react'
import Link from 'next/link'
import ModuleHeader from '@/components/shared/ModuleHeader'
import { 
  FunnelIcon, 
  Squares2X2Icon, 
  ListBulletIcon,
  MagnifyingGlassIcon,
  StarIcon
} from '@heroicons/react/24/outline'

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const categories = [
    { id: 'all', name: 'All Categories', count: 1250, color: 'blue' },
    { id: 'bedroom', name: 'Bedroom', count: 285, color: 'purple' },
    { id: 'living-room', name: 'Living Room', count: 320, color: 'green' },
    { id: 'dining', name: 'Dining', count: 180, color: 'orange' },
    { id: 'office', name: 'Office', count: 195, color: 'blue' },
    { id: 'kids', name: 'Kids', count: 125, color: 'pink' },
    { id: 'outdoor', name: 'Outdoor', count: 145, color: 'teal' }
  ]

  const features = [
    { icon: '🏠', title: 'Free Home Demo', description: 'Try before you buy' },
    { icon: '🔄', title: '360° Views', description: 'See every angle' },
    { icon: '⭐', title: 'Premium Quality', description: 'Certified materials' },
    { icon: '🚚', title: 'Free Delivery', description: 'Above ₹10,000' }
  ]

  const popularCollections = [
    {
      id: 'premium-bedroom',
      name: 'Premium Bedroom Collection',
      image: '/images/collections/bedroom.jpg',
      price: 'From ₹25,000',
      rating: 4.8,
      reviews: 124,
      href: '/categories/bedroom'
    },
    {
      id: 'modern-living',
      name: 'Modern Living Room Sets',
      image: '/images/collections/living.jpg',
      price: 'From ₹35,000',
      rating: 4.9,
      reviews: 89,
      href: '/categories/living-room'
    },
    {
      id: 'elegant-dining',
      name: 'Elegant Dining Collections',
      image: '/images/collections/dining.jpg',
      price: 'From ₹22,000',
      rating: 4.7,
      reviews: 156,
      href: '/categories/dining'
    },
    {
      id: 'smart-office',
      name: 'Smart Office Solutions',
      image: '/images/collections/office.jpg',
      price: 'From ₹18,000',
      rating: 4.6,
      reviews: 203,
      href: '/categories/office'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8]">
      <ModuleHeader 
        title="All Products"
        subtitle="Discover our complete furniture collection with 360° viewing and free home demos"
      >
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {viewMode === 'grid' ? <ListBulletIcon className="w-5 h-5" /> : <Squares2X2Icon className="w-5 h-5" />}
          </button>
          <Link 
            href="/book-demo"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Book Demo
          </Link>
        </div>
      </ModuleHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>

            {/* Filter Button */}
            <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FunnelIcon className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.id === 'all' ? '/complete-catalog' : `/categories/${category.id}`}
                className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200 hover:shadow-md hover:scale-105 transition-all group"
              >
                <div className={`w-16 h-16 bg-${category.color}-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-${category.color}-200 transition-colors`}>
                  <div className={`w-8 h-8 bg-${category.color}-600 rounded-full`}></div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} items</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Collections */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular Collections</h2>
            <Link href="/complete-catalog" className="text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCollections.map((collection) => (
              <Link
                key={collection.id}
                href={collection.href}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 group-hover:from-blue-50 group-hover:to-blue-100 transition-colors">
                    <span className="text-lg font-medium">{collection.name.split(' ')[0]}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {collection.name}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(collection.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {collection.rating} ({collection.reviews})
                    </span>
                  </div>
                  
                  <p className="text-lg font-bold text-blue-600">{collection.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Experience Before You Buy</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Book a free home demo and see our furniture in your space. Our experts will bring samples 
            directly to your home at no cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book-demo"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Free Demo
            </Link>
            <Link 
              href="/custom-design"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Custom Design
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
