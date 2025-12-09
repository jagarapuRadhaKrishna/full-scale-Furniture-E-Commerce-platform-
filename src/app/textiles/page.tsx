'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SparklesIcon, TagIcon, ShoppingBagIcon, TruckIcon } from '@heroicons/react/24/outline'

const categories = [
  {
    id: 1,
    name: "Bed Sheets",
    description: "Premium quality bed sheets in various materials and designs",
    href: "/categories/bed-sheets",
    image: "/images/textiles/bed-sheets-category.jpg",
    productCount: 25,
    priceRange: "₹1,999 - ₹7,999",
    features: ["100% Cotton", "Thread Count 300+", "Multiple Sizes"],
    color: "from-amber-600 to-orange-600"
  },
  {
    id: 2,
    name: "Blankets",
    description: "Cozy and warm blankets for all seasons",
    href: "/categories/blankets",
    image: "/images/textiles/blankets-category.jpg",
    productCount: 18,
    priceRange: "₹1,999 - ₹18,999",
    features: ["All Season", "Premium Materials", "Machine Washable"],
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: 3,
    name: "Pillows",
    description: "Comfortable pillows with orthopedic support",
    href: "/categories/pillows",
    image: "/images/textiles/pillows-category.jpg",
    productCount: 22,
    priceRange: "₹1,999 - ₹5,999",
    features: ["Memory Foam", "Hypoallergenic", "Multiple Firmness"],
    color: "from-purple-600 to-pink-600"
  },
  {
    id: 4,
    name: "Covers",
    description: "Protective covers for mattresses and furniture",
    href: "/categories/covers",
    image: "/images/textiles/covers-category.jpg",
    productCount: 15,
    priceRange: "₹999 - ₹5,999",
    features: ["Waterproof Options", "Easy Installation", "Durable"],
    color: "from-green-600 to-teal-600"
  }
]

const features = [
  {
    icon: SparklesIcon,
    title: "Premium Quality",
    description: "All textiles are made from high-quality materials"
  },
  {
    icon: TagIcon,
    title: "Best Prices",
    description: "Competitive pricing with regular discounts"
  },
  {
    icon: ShoppingBagIcon,
    title: "Easy Returns",
    description: "30-day return policy for customer satisfaction"
  },
  {
    icon: TruckIcon,
    title: "Free Delivery",
    description: "Free home delivery on orders above ₹2,999"
  }
]

export default function TextilesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-800 via-pink-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              Premium Textiles Collection
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
              Transform your living spaces with our luxurious and comfortable textile collection
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 backdrop-blur px-6 py-3 rounded-full border border-white/20">Premium Materials</span>
              <span className="bg-white/20 backdrop-blur px-6 py-3 rounded-full border border-white/20">Machine Washable</span>
              <span className="bg-white/20 backdrop-blur px-6 py-3 rounded-full border border-white/20">All Sizes Available</span>
              <span className="bg-white/20 backdrop-blur px-6 py-3 rounded-full border border-white/20">Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Textile Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of home textiles designed for comfort, style, and durability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              <Link href={category.href}>
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:scale-105">
                  <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-24 h-24 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                        <SparklesIcon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    
                    {/* Product Count Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        {category.productCount}+ Products
                      </span>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-6 left-6 w-8 h-8 bg-white/20 rounded-full blur-sm"></div>
                    <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/10 rounded-full blur-md"></div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                        {category.name}
                      </h3>
                      <div className={`w-8 h-8 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {category.description}
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Price Range</span>
                        <span className="text-lg font-bold text-gray-900">{category.priceRange}</span>
                      </div>

                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-500 block">Key Features</span>
                        <div className="flex flex-wrap gap-2">
                          {category.features.map((feature, index) => (
                            <span 
                              key={index} 
                              className={`text-xs bg-gradient-to-r ${category.color} bg-opacity-10 text-gray-700 px-3 py-1 rounded-full border border-gray-200`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <div className={`flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r ${category.color} text-white rounded-xl font-semibold group-hover:shadow-lg transform group-hover:scale-105 transition-all duration-300`}>
                        <span>Explore {category.name}</span>
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Textiles?
            </h2>
            <p className="text-lg text-gray-600">
              We provide the best quality textiles with excellent customer service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 transform hover:scale-105">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Browse our complete textile collection and find the perfect items for your home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories"
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Browse All Categories
            </Link>
            <Link
              href="/book-demo"
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transform hover:scale-105 transition-all duration-200"
            >
              Book FREE Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}