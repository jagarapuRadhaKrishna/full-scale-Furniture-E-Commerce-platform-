'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const slides = [
  {
    title: 'Exquisite Luxury Furniture',
    subtitle: 'Elevate Your Living with Timeless Elegance',
    cta: 'Explore Collection',
    href: '/products',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80',
    alt: 'Luxurious modern living room with designer furniture'
  },
  {
    title: 'Opulent Bedroom Sanctuaries',
    subtitle: 'Where Comfort Meets Sophistication',
    cta: 'Discover Bedrooms',
    href: '/categories/bedroom',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=80',
    alt: 'Elegant luxury bedroom with premium furnishings'
  },
  {
    title: 'Refined Living Spaces',
    subtitle: 'Premium Craftsmanship, Affordable Luxury',
    cta: 'View Living Room',
    href: '/categories/living-room',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1920&q=80',
    alt: 'Sophisticated living room with contemporary design'
  }
]

export default function ModernHeroWithImages() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden mt-16 lg:mt-20">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Hero Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
              sizes="100vw"
            />
            {/* Enhanced gradient overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 sm:from-black/70 sm:via-black/50 sm:to-transparent" />
          </div>
          
          {/* Decorative Geometric Pattern Overlay - Hidden on mobile */}
          <div className="absolute inset-0 opacity-5 hidden md:block">
            <div className="grid grid-cols-10 grid-rows-10 h-full">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border border-white/30" />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center safe-top safe-bottom">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 text-white leading-tight animate-fade-in drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 lg:mb-10 text-amber-300 animate-fade-in-delay font-semibold">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href={slide.href}
                    className="inline-block bg-amber-500 text-white px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-full font-bold text-sm sm:text-base lg:text-lg hover:bg-amber-600 transition-all duration-300 hover:scale-105 shadow-2xl text-center active:scale-95"
                  >
                    {slide.cta}
                  </Link>
                  <Link
                    href="/book-demo"
                    className="inline-block bg-white/10 backdrop-blur-md text-white border-2 border-amber-400 px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-full font-bold text-sm sm:text-base lg:text-lg hover:bg-white/20 hover:border-amber-300 transition-all duration-300 hover:scale-105 text-center active:scale-95"
                  >
                    Book Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots - Responsive positioning */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full active:scale-95 ${
              index === currentSlide
                ? 'bg-white w-8 sm:w-10 md:w-12 h-2 sm:h-2.5 md:h-3'
                : 'bg-white/50 hover:bg-white/75 w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator - Hidden on mobile */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <div className="animate-bounce">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white/80"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  )
}
