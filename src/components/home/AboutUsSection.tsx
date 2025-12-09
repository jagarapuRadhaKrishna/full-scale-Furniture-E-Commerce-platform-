'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function AboutUsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#FFD9C8] via-[#FFF5F0] to-[#FFE8DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            <span className="text-orange-500">About</span> Us
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Divya Furniture World - Your Trusted Furniture Partner
            </h3>
            
            <p className="text-gray-600 leading-relaxed">
              At Divya Furniture World, we are dedicated to transforming houses into homes with our premium furniture collection. 
              With over 15 years of experience in the furniture industry, we have established ourselves as a trusted name in 
              providing high-quality, affordable furniture solutions for every room in your home.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              Our comprehensive services include furniture design, manufacturing, delivery, and installation. We offer FREE home 
              demonstrations where our expert technicians bring samples directly to your doorstep, allowing you to visualize how 
              our furniture will look in your space before making a purchase. Our custom design service enables you to create 
              personalized furniture pieces that perfectly match your style and space requirements.
            </p>
            
            <div className="grid grid-cols-2 gap-6 py-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-md">
                <div className="text-3xl font-bold text-orange-600 mb-1">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md">
                <div className="text-3xl font-bold text-orange-600 mb-1">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md">
                <div className="text-3xl font-bold text-orange-600 mb-1">5000+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md">
                <div className="text-3xl font-bold text-orange-600 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Customer Support</div>
              </div>
            </div>
            
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-3.5 bg-orange-500 text-white text-sm font-semibold rounded-full hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore more
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            {/* Decorative Orange Circle Background */}
            <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-tl-[100px] rounded-br-[100px] opacity-90"></div>
            
            {/* Main Room Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
                alt="DFW Furniture Showroom Interior"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white rounded-lg z-0 shadow-lg"></div>
            <div className="absolute -top-4 left-10 w-24 h-24 bg-orange-500 rounded-lg z-0 opacity-80"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
