'use client'

import { TruckIcon, ShoppingBagIcon, LifebuoyIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

const features = [
  {
    icon: TruckIcon,
    title: "Fast and Free Shipping",
    description: "Get your furniture delivered to your doorstep with our express shipping service. Free delivery on orders above ₹50,000.",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&q=80"
  },
  {
    icon: ShoppingBagIcon,
    title: "Easy to Shop",
    description: "Browse through our extensive catalog, compare products, and shop from the comfort of your home with our user-friendly platform.",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=400&q=80"
  },
  {
    icon: LifebuoyIcon,
    title: "24/7 Support",
    description: "Our dedicated customer support team is available round the clock to assist you with any queries or concerns.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80"
  },
  {
    icon: ArrowPathIcon,
    title: "Hassle Free Returns",
    description: "Not satisfied with your purchase? Return it within 30 days with our simple and hassle-free return policy.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80"
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8] relative overflow-hidden">
      {/* Banner Image */}
      <div className="relative h-80 mb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1615874694520-474822394e73?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center max-w-3xl px-4">
            <h2 className="text-6xl font-bold mb-4 text-white drop-shadow-2xl">Why Choose DFW</h2>
            <p className="text-2xl text-amber-300">Unparalleled Quality & Service Excellence</p>
          </div>
        </div>
      </div>

      {/* Decorative dots pattern */}
      <div className="absolute right-0 top-0 w-1/4 h-full opacity-10">
        <div className="grid grid-cols-10 gap-3 p-8">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-amber-500 rounded-full"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Us
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Divya Furniture World, we combine premium quality with affordable prices. 
                Our commitment to excellence and customer satisfaction sets us apart in the furniture industry.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="space-y-3 group"
                >
                  <div className="relative w-full h-32 rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-lg group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                      <feature.icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative lg:block hidden">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
                alt="Luxury Furniture Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Decorative Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-white">DFW</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">15+ Years</div>
                    <div className="text-sm text-gray-600">Trusted Excellence</div>
                  </div>
                </div>
              </div>
              
              {/* Frame decoration */}
              <div className="absolute top-8 right-8 w-32 h-32 border-4 border-white/60 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
