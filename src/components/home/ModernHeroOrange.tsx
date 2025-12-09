'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function ModernHeroOrange() {
  return (
    <section className="relative bg-[#FFF5F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-20">
          {/* Left Content */}
          <div className="relative z-10 space-y-6 lg:space-y-8">
            {/* Decorative Circle */}
            <div className="absolute -left-32 -top-32 w-96 h-96 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-80 blur-3xl"></div>
            
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Make you feel
                <span className="block text-orange-500">luxury</span>
              </h1>
              
              <p className="mt-6 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Ullamcorper pellentesque porta Tristique cursus nulla magnis 
                arev potenti Morbi facilisis Eget. Neamondium vitae
                ut elementum nisl.
              </p>
              
              {/* CTA Button */}
              <Link
                href="/categories"
                className="inline-flex items-center mt-8 px-8 py-3.5 bg-orange-500 text-white text-sm font-semibold rounded-full hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Shop now
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              {/* Search Bar */}
              <div className="mt-8 lg:mt-12">
                <div className="relative max-w-md">
                  <input
                    type="text"
                    placeholder="What are you looking for ?"
                    className="w-full px-6 py-3 pr-12 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors">
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex items-center space-x-8 mt-8 lg:mt-12">
                {/* User Avatars */}
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-2xl font-bold text-gray-900">1.3 M+</p>
                    <p className="text-xs text-gray-600">customer reviews</p>
                  </div>
                </div>
                
                {/* Active Members */}
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.7 M+</p>
                  <p className="text-xs text-gray-600">Active members</p>
                </div>
                
                {/* Delivery */}
                <div>
                  <p className="text-2xl font-bold text-gray-900">3 day</p>
                  <p className="text-xs text-gray-600">Delivery time</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Image with Decorative Elements */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Large Orange Circle */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-90"></div>
            
            {/* Peach/Cream Wave Shape */}
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-[#FFD9C8] rounded-tl-[100px]"></div>
            
            {/* Furniture Image */}
            <div className="relative z-10 w-full max-w-lg">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
                alt="Modern luxury sofa"
                width={600}
                height={400}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
            
            {/* Decorative Lamp - Top Left */}
            <div className="absolute top-8 left-8 w-16 h-16 z-20">
              <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-lg">
                <circle cx="32" cy="8" r="4" fill="#1F2937"/>
                <line x1="32" y1="12" x2="32" y2="32" stroke="#1F2937" strokeWidth="2"/>
                <circle cx="32" cy="36" r="12" fill="#FFD700" opacity="0.8"/>
                <path d="M20 36 L32 48 L44 36 Z" fill="#1F2937"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
