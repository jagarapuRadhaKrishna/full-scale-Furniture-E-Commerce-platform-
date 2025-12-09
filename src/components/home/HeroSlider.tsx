'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ImagePlaceholder } from '@/components/shared/LoadingSkeletons'

const slides = [
  {
    title: 'Make You Feel Luxury',
    subtitle: 'Premium Furniture Collection',
    description: 'Transform your space with our exquisite collection of modern furniture. Crafted with excellence, designed for comfort.',
    cta: 'Shop Now',
    href: '/categories',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80',
    alt: 'Luxury modern sofa'
  },
  {
    title: 'Elegant Bedroom Sets',
    subtitle: 'Sleep in Style & Comfort',
    description: 'Discover our stunning bedroom furniture that combines luxury with functionality. Create your dream sanctuary.',
    cta: 'Explore Bedrooms',
    href: '/categories/bedroom',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=80',
    alt: 'Elegant bedroom furniture'
  },
  {
    title: 'Modern Living Spaces',
    subtitle: 'Designer Furniture for Your Home',
    description: 'Elevate your living room with our contemporary designs. Premium quality, affordable luxury for every home.',
    cta: 'View Collection',
    href: '/categories/living-room',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80',
    alt: 'Modern living room setup'
  }
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Left Content */}
            <div className="relative z-10 space-y-6 lg:space-y-8">
              {/* Decorative Orange Circle */}
              <div className="absolute -left-32 -top-32 w-96 h-96 bg-gradient-to-br from-orange-400/40 to-orange-600/40 rounded-full blur-3xl animate-pulse"></div>
              
              <div className="relative">
                <div className="inline-block px-4 py-2 bg-orange-100 text-orange-600 text-sm font-semibold rounded-full mb-4">
                  {slide.subtitle}
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
                  {slide.title}
                </h1>
                
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mb-8">
                  {slide.description}
                </p>
                
                {/* Service Highlights */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-md">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-700">FREE Home Demo</span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-md">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-700">Custom Designs</span>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={slide.href}
                    className="inline-flex items-center px-8 py-4 bg-orange-500 text-white text-base font-semibold rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {slide.cta}
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/book-demo"
                    className="inline-flex items-center px-8 py-4 bg-white text-orange-600 text-base font-semibold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-orange-200"
                  >
                    Book FREE Demo
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </Link>
                </div>
                
                {/* Stats - Small version */}
                <div className="flex items-center space-x-6 mt-10">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">1.3M+</p>
                    <p className="text-xs text-gray-600">Happy Customers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4.7M+</p>
                    <p className="text-xs text-gray-600">Products Sold</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">3 Days</p>
                    <p className="text-xs text-gray-600">Delivery Time</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative h-[400px] lg:h-[600px]">
              {/* Large Orange Circle Background */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-90 animate-pulse"></div>
              
              {/* Peach Wave Shape */}
              <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-br from-[#FFD9C8] to-[#FFC4A3] rounded-tl-[100px]"></div>
              {/* Furniture Image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {imageLoading[index] !== false && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImagePlaceholder aspectRatio="700/500" />
                  </div>
                )}
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  width={700}
                  height={500}
                  className={`object-contain drop-shadow-2xl transition-opacity duration-500 ${
                    imageLoading[index] === false ? 'opacity-100' : 'opacity-0'
                  }`}
                  priority={index === 0}
                  onLoadingComplete={() => setImageLoading(prev => ({ ...prev, [index]: false }))}
                  onError={() => setImageLoading(prev => ({ ...prev, [index]: false }))}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      >
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      >
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-orange-500 w-12 h-3'
                : 'bg-orange-300 hover:bg-orange-400 w-3 h-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
