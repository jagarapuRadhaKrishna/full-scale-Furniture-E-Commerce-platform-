'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const categories = [
  {
    name: "Living Room",
    description: "Sofas, Recliners & More",
    productCount: "200+ Products",
    image: "/api/placeholder/400/500",
    color: "from-emerald-600 to-emerald-800",
    link: "/categories/living-room"
  },
  {
    name: "Bedroom",
    description: "Beds, Wardrobes & Storage",
    productCount: "150+ Products",
    image: "/api/placeholder/400/500",
    color: "from-amber-600 to-amber-800",
    link: "/categories/bedroom"
  },
  {
    name: "Dining",
    description: "Tables, Chairs & Sets",
    productCount: "100+ Products",
    image: "/api/placeholder/400/500",
    color: "from-rose-600 to-rose-800",
    link: "/categories/dining"
  },
  {
    name: "Office",
    description: "Desks, Chairs & Storage",
    productCount: "80+ Products",
    image: "/api/placeholder/400/500",
    color: "from-blue-600 to-blue-800",
    link: "/categories/office"
  }
]

export default function CategoriesShowcase() {
  return (
    <section className="py-20 bg-white">
      {/* Banner Image */}
      <div className="relative h-80 mb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center max-w-3xl px-4">
            <h2 className="text-6xl font-bold mb-4 text-white drop-shadow-2xl">Explore Our Collections</h2>
            <p className="text-2xl text-amber-300">Curated Furniture for Every Space</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of furniture categories and find the perfect pieces for every room in your home.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={index}
              href={category.link}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                {/* Decorative Element */}
                <div className="absolute top-8 right-8 w-16 h-16 border-2 border-white/30 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                
                <div className="space-y-2 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                  <div className="text-sm font-medium opacity-90">{category.productCount}</div>
                  <h3 className="text-3xl font-bold">{category.name}</h3>
                  <p className="text-white/90">{category.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm font-semibold pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore Collection</span>
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/categories"
            className="inline-flex items-center gap-3 text-gray-900 font-semibold text-lg hover:text-amber-600 transition-colors duration-300 group"
          >
            <span>View All Categories</span>
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
