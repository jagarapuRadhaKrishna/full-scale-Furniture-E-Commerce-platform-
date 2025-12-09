'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SparklesIcon, HomeIcon, StarIcon, TruckIcon } from '@heroicons/react/24/outline'

const categories = [
  {
    id: 1,
    name: "Dining Tables",
    description: "Elegant dining tables for family gatherings",
    href: "/categories/dining-tables",
    image: "/images/furniture/dining-tables-category.jpg",
    productCount: 35,
    priceRange: "₹15,999 - ₹89,999",
    features: ["Solid Wood", "Multiple Sizes", "Modern Designs"],
    color: "from-amber-600 to-yellow-600",
    icon: "🍽️"
  },
  {
    id: 2,
    name: "Chairs",
    description: "Comfortable seating solutions for every space",
    href: "/categories/chairs",
    image: "/images/furniture/chairs-category.jpg",
    productCount: 42,
    priceRange: "₹2,999 - ₹25,999",
    features: ["Ergonomic Design", "Various Materials", "Stackable Options"],
    color: "from-blue-600 to-cyan-600",
    icon: "🪑"
  },
  {
    id: 3,
    name: "Bean Bags",
    description: "Casual and comfortable bean bag seating",
    href: "/categories/bean-bags",
    image: "/images/furniture/bean-bags-category.jpg",
    productCount: 28,
    priceRange: "₹3,999 - ₹15,999",
    features: ["Premium Fabric", "Refillable", "Multiple Colors"],
    color: "from-green-600 to-emerald-600",
    icon: "🛋️"
  },
  {
    id: 4,
    name: "Tepoy",
    description: "Traditional and modern tepoy designs",
    href: "/categories/tepoy",
    image: "/images/furniture/tepoy-category.jpg",
    productCount: 18,
    priceRange: "₹1,999 - ₹12,999",
    features: ["Handcrafted", "Storage Options", "Compact Design"],
    color: "from-purple-600 to-indigo-600",
    icon: "🏺"
  },
  {
    id: 5,
    name: "Footwear Stands",
    description: "Organized storage for footwear",
    href: "/categories/footwear-stands",
    image: "/images/furniture/footwear-stands-category.jpg",
    productCount: 22,
    priceRange: "₹1,499 - ₹8,999",
    features: ["Space Saving", "Durable Materials", "Easy Assembly"],
    color: "from-red-600 to-pink-600",
    icon: "👟"
  },
  {
    id: 6,
    name: "Wardrobes",
    description: "Spacious storage solutions for clothing",
    href: "/categories/wardrobes",
    image: "/images/furniture/wardrobes-category.jpg",
    productCount: 25,
    priceRange: "₹25,999 - ₹149,999",
    features: ["Sliding Doors", "Mirror Options", "Customizable"],
    color: "from-gray-600 to-slate-600",
    icon: "👔"
  }
]

const features = [
  {
    icon: HomeIcon,
    title: "Premium Quality",
    description: "High-quality materials and expert craftsmanship"
  },
  {
    icon: StarIcon,
    title: "Modern Designs",
    description: "Contemporary and classic designs to suit every taste"
  },
  {
    icon: SparklesIcon,
    title: "Customization",
    description: "Custom sizes and finishes available on request"
  },
  {
    icon: TruckIcon,
    title: "Home Delivery",
    description: "Free delivery and installation services"
  }
]

export default function FurniturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-800 via-orange-700 to-red-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
              Premium Furniture Collection
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-amber-100 max-w-3xl mx-auto">
              Discover our extensive range of high-quality furniture designed to transform your living spaces
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 backdrop-blur px-6 py-3 rounded-full border border-white/20">Premium Materials</span>
              <span className="bg-white/20 backdrop-blur px-6 py-3 rounded-full border border-white/20">Modern Designs</span>
              <span className="bg-white/20 backdrop-blur px-6 py-3 rounded-full border border-white/20">Custom Options</span>
              <span className="bg-white/20 backdrop-blur px-6 py-3 rounded-full border border-white/20">Free Installation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Furniture Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From dining essentials to storage solutions, find everything you need to furnish your home
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              <Link href={category.href}>
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:scale-105">
                  <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
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

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                        {category.name}
                      </h3>
                      <div className={`w-8 h-8 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500">Price Range</span>
                        <span className="text-sm font-bold text-gray-900">{category.priceRange}</span>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-medium text-gray-500 block">Key Features</span>
                        <div className="flex flex-wrap gap-1">
                          {category.features.map((feature, index) => (
                            <span 
                              key={index} 
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className={`flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r ${category.color} text-white rounded-xl font-semibold text-sm group-hover:shadow-lg transform group-hover:scale-105 transition-all duration-300`}>
                        <span>Explore {category.name}</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Why Choose Our Furniture?
            </h2>
            <p className="text-lg text-gray-600">
              We provide exceptional quality furniture with superior craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-200 transform hover:scale-105">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
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
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Furnish Your Home?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Browse our complete furniture collection and create your dream living space
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories"
              className="bg-white text-amber-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              View All Furniture
            </Link>
            <Link
              href="/custom-design"
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-amber-600 transform hover:scale-105 transition-all duration-200"
            >
              Custom Design Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}