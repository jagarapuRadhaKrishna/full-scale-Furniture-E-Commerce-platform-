import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-furniture-cream to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 lg:py-24">
          {/* Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Premium Furniture with 
              <span className="text-furniture-brown"> Home Demo</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience our furniture in your home before you buy - completely FREE! 
              Book a demo visit and get personalized design consultation 
              at no cost to you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                href="/book-demo"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition duration-200 text-center cursor-pointer select-none"
              >
                Book FREE Demo
              </Link>
              <Link 
                href="/categories"
                className="bg-white text-furniture-brown border-2 border-furniture-brown px-8 py-4 rounded-lg text-lg font-semibold hover:bg-furniture-brown hover:text-white transition duration-200 text-center cursor-pointer select-none"
              >
                Browse Furniture
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free Home Demo</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Custom Designs</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Expert Consultation</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80&sig=hero-main"
                alt="Beautiful Modern Living Room with Premium Furniture"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="text-2xl font-bold text-furniture-brown">500+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-green-500 text-white p-4 rounded-lg shadow-lg">
              <div className="text-lg font-bold">FREE</div>
              <div className="text-sm">Demo Service</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-furniture-light-brown opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-200 opacity-20 rounded-full translate-y-16 -translate-x-16"></div>
    </div>
  )
}