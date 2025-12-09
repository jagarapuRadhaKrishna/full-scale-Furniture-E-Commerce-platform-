'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const heroSlides = [
  {
    title: "Premium Furniture Collection",
    subtitle: "DIVYA FURNITURE WORLD",
    description: "Transform your living space with our exquisite collection of modern and affordable furniture. Quality craftsmanship meets elegant design.",
    image: "/api/placeholder/1200/600",
    bgColor: "bg-gradient-to-r from-emerald-800 to-emerald-600"
  },
  {
    title: "Luxury Bedroom Sets",
    subtitle: "PREMIUM & AFFORDABLE",
    description: "Create your dream bedroom with our stunning collection of beds, wardrobes, and bedroom furniture designed for comfort and style.",
    image: "/api/placeholder/1200/600",
    bgColor: "bg-gradient-to-r from-amber-800 to-amber-600"
  },
  {
    title: "Modern Living Room",
    subtitle: "CONTEMPORARY DESIGNS",
    description: "Discover sophisticated sofas, elegant tables, and stunning decor that brings your living room to life.",
    image: "/api/placeholder/1200/600",
    bgColor: "bg-gradient-to-r from-slate-800 to-slate-600"
  }
]

export default function ModernHero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const currentHero = heroSlides[currentSlide]

  return (
    <section className={`relative min-h-[600px] ${currentHero.bgColor} text-white overflow-hidden transition-all duration-1000`}>
      {/* Decorative dots pattern */}
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-20">
        <div className="grid grid-cols-10 gap-4 p-8">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="text-sm font-medium tracking-wider opacity-90">
              {currentHero.subtitle}
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              {currentHero.title}
            </h1>
            
            <p className="text-lg opacity-90 max-w-xl leading-relaxed">
              {currentHero.description}
            </p>

            <div className="flex gap-4 pt-4">
              <Link 
                href="/products" 
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 active:scale-95 shadow-lg"
              >
                Shop Now
              </Link>
              <Link 
                href="/categories" 
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 active:scale-95"
              >
                Explore
              </Link>
            </div>
          </div>

          {/* Right Content - Image placeholder */}
          <div className="relative lg:block hidden">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold opacity-20">
                DFW
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-12 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
