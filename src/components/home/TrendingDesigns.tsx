'use client'

import { useState } from 'react'
import { ArrowPathIcon, HeartIcon as HeartOutline, EyeIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import Link from 'next/link'

const trendingDesigns = [
  {
    id: 1,
    name: 'Luxury King Size Platform Bed',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=trend-1',
    category: 'Bedroom',
    price: '₹45,000 - ₹65,000',
    popularity: '95% liked',
    has360View: true
  },
  {
    id: 2,
    name: 'Modern Wardrobe Collection',
    image: 'https://images.unsplash.com/photo-1571898123604-061673c69d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=trend-2',
    category: 'Bedroom',
    price: '₹35,000 - ₹55,000',
    popularity: '92% liked',
    has360View: true
  },
  {
    id: 3,
    name: 'L-Shaped Sectional Sofa',
    image: 'https://images.unsplash.com/photo-1594736797933-d0f29bbef2a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=trend-3',
    category: 'Living Room',
    price: '₹75,000 - ₹95,000',
    popularity: '98% liked',
    has360View: true
  },
  {
    id: 4,
    name: 'Premium Leather Recliner',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=trend-4',
    category: 'Living Room',
    price: '₹40,000 - ₹60,000',
    popularity: '90% liked',
    has360View: true
  },
  {
    id: 5,
    name: 'Elegant Bedroom Set',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=trend-5',
    category: 'Bedroom',
    price: '₹85,000 - ₹120,000',
    popularity: '94% liked',
    has360View: true
  },
  {
    id: 6,
    name: 'Contemporary Sofa Collection',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Living Room',
    price: '₹50,000 - ₹80,000',
    popularity: '87% liked',
    has360View: true
  }
]

export default function TrendingDesigns() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [selected360, setSelected360] = useState<number | null>(null)

  const toggleFavorite = (designId: number) => {
    setFavorites(prev => 
      prev.includes(designId) 
        ? prev.filter(id => id !== designId)
        : [...prev, designId]
    )
  }

  const handle360View = (designId: number) => {
    setSelected360(designId)
    // Close after 3 seconds
    setTimeout(() => setSelected360(null), 3000)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Trending Designs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most popular furniture designs loved by our customers. 
            Get inspiration for your space with these trending collections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingDesigns.map((design) => (
            <div key={design.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="relative">
                <Link href={`/products/${design.id}`}>
                  <img
                    src={design.image}
                    alt={design.name}
                    className="w-full h-48 object-cover hover:opacity-95 transition-opacity duration-200"
                  />
                </Link>
                
                {/* Popularity Badge */}
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-xs font-medium text-green-600 shadow-md">
                  {design.popularity}
                </div>
                
                {/* Favorite Button */}
                <button 
                  onClick={() => toggleFavorite(design.id)}
                  className="absolute top-4 left-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-white transition-all duration-200"
                >
                  {favorites.includes(design.id) ? (
                    <HeartSolid className="h-4 w-4 text-red-500" />
                  ) : (
                    <HeartOutline className="h-4 w-4 text-gray-600" />
                  )}
                </button>
                
                {/* 360 View Button */}
                {design.has360View && (
                  <button 
                    onClick={() => handle360View(design.id)}
                    className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-full text-xs font-medium flex items-center space-x-1 hover:bg-opacity-90 transition duration-200"
                  >
                    <ArrowPathIcon className={`h-3 w-3 ${selected360 === design.id ? 'animate-spin' : ''}`} />
                    <span>{selected360 === design.id ? 'Viewing...' : '360° View'}</span>
                  </button>
                )}
                
                {/* Quick View Button */}
                <button className="absolute bottom-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-white transition-all duration-200">
                  <EyeIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    {design.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">Trending</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-amber-700 transition-colors duration-200">
                  {design.name}
                </h3>
                
                <p className="text-amber-700 font-bold mb-4 text-lg">
                  {design.price}
                </p>
                
                <div className="flex space-x-2">
                  <Link
                    href={`/book-demo?product=${design.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-md text-sm font-medium text-center hover:bg-amber-700 transition duration-200"
                  >
                    Book Demo
                  </Link>
                  <Link
                    href={`/products/${design.id}`}
                    className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-md text-sm font-medium text-center hover:bg-gray-900 transition duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="bg-furniture-brown text-white px-8 py-3 rounded-lg font-semibold hover:bg-furniture-dark-wood transition duration-200 cursor-pointer"
          >
            View All Designs
          </Link>
        </div>

        {/* Home Delivery Experience Section */}
        <div className="mt-20 bg-gradient-to-r from-furniture-brown to-furniture-dark-wood rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left side - Image */}
            <div className="relative h-64 lg:h-80">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Elegant Bedroom Furniture Setup"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
            
            {/* Right side - Content */}
            <div className="p-8 lg:p-12 text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Experience Furniture in Your Home - Completely FREE
              </h3>
              <p className="text-furniture-light-brown text-lg mb-6">
                Get FREE home demo and consultation service. Our expert team will visit, 
                demonstrate furniture, and provide design consultation at no cost.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-white bg-opacity-20 rounded-full p-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>FREE home demo & consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white bg-opacity-20 rounded-full p-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Professional design consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white bg-opacity-20 rounded-full p-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Payment only for repairs & maintenance</span>
                </div>
              </div>
              
              <Link
                href="/book-demo"
                className="inline-block bg-white text-furniture-brown px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200 cursor-pointer"
              >
                Book FREE Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}