'use client'

import Link from 'next/link'
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline'

const featuredProducts = [
  {
    id: 1,
    name: "Modern L-Shaped Sofa",
    category: "Living Room",
    price: "₹75,000",
    originalPrice: "₹95,000",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Premium Wooden Wardrobe",
    category: "Bedroom",
    price: "₹1,50,000",
    originalPrice: "₹1,80,000",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&q=80",
    badge: "New Arrival"
  },
  {
    id: 3,
    name: "Luxury King Size Bed",
    category: "Bedroom",
    price: "₹5,10,000",
    originalPrice: "₹6,00,000",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
    badge: "Premium"
  },
  {
    id: 4,
    name: "Designer Dining Table",
    category: "Dining",
    price: "₹85,000",
    originalPrice: "₹1,05,000",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80",
    badge: "Sale"
  }
]

export default function FeaturedProducts() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8] overflow-hidden">
      {/* Banner Image */}
      <div className="relative h-48 sm:h-64 md:h-80 mb-10 sm:mb-12 lg:mb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1586105251261-72a756497a11?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 sm:from-black/70 sm:via-black/50 sm:to-transparent" />
        </div>
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center max-w-3xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 text-white drop-shadow-2xl">Premium Featured Collection</h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-300">Handcrafted Excellence in Every Piece</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Crafted with Excellent Material
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover our curated collection of premium furniture pieces designed to transform your space with elegance and comfort.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                  loading="lazy"
                />

                {/* Premium Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/20">
                    {product.badge}
                  </div>
                )}                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 active:scale-95">
                    <ShoppingCartIcon className="w-5 h-5" />
                  </button>
                  <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95">
                    <HeartIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-5 lg:p-6 space-y-2 sm:space-y-3">
                <div className="text-xs sm:text-sm text-gray-500 font-medium">{product.category}</div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{product.price}</span>
                  <span className="text-xs sm:text-sm text-gray-400 line-through">{product.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Button */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <Link 
            href="/products"
            className="inline-block bg-gray-900 text-white px-6 py-3 sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-amber-600 transition-all duration-300 active:scale-95 shadow-lg"
          >
            Explore All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
