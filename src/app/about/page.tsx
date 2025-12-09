'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  CheckCircleIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  HeartIcon,
  UsersIcon,
  StarIcon,
  SparklesIcon,
  HomeIcon,
  CogIcon
} from '@heroicons/react/24/outline'

export default function AboutPage() {
  const stats = [
    { number: '15K+', label: 'Products Sold', icon: UsersIcon },
    { number: '50K+', label: 'Happy Customers', icon: HeartIcon },
    { number: '15+', label: 'Years Experience', icon: StarIcon },
    { number: '5.0', label: 'Star Rating', icon: StarIcon }
  ]

  const values = [
    {
      icon: CheckCircleIcon,
      title: 'Quality Assured',
      description: 'Premium materials and craftsmanship in every piece'
    },
    {
      icon: TruckIcon,
      title: 'Free Home Demo',
      description: 'Experience our furniture in your home before you buy'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Warranty Protection',
      description: 'Comprehensive warranty coverage on all products'
    },
    {
      icon: SparklesIcon,
      title: 'Custom Designs',
      description: 'Personalized furniture solutions for your unique space'
    },
    {
      icon: CogIcon,
      title: 'Installation Service',
      description: 'Professional assembly and installation included'
    },
    {
      icon: HomeIcon,
      title: 'Room Planning',
      description: 'Free consultation and room design assistance'
    }
  ]

  const team = [
    {
      name: 'Mr. Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      description: 'Visionary leader with 15+ years in furniture industry'
    },
    {
      name: 'Mrs. Priya Sharma',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      description: 'Award-winning interior designer and furniture expert'
    },
    {
      name: 'Mr. Amit Patel',
      role: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
      description: 'Ensures seamless delivery and customer satisfaction'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8]">
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1920&q=80"
            alt="Furniture Showroom"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About <span className="text-orange-200">Divya Furniture World</span>
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Transforming houses into homes with premium, affordable furniture since 2009
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <stat.icon className="w-12 h-12 mx-auto text-orange-500 mb-3" />
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-orange-500">Story</span>
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>Founded in 2009, <strong className="text-orange-600">Divya Furniture World</strong> started with a simple mission: to make premium furniture accessible and affordable for every home.</p>
                <p>What began as a small showroom has grown into one of the region's most trusted furniture brands, serving over <strong className="text-orange-600">50,000+ satisfied customers</strong> across the country.</p>
                <p>We pioneered the <strong className="text-orange-600">FREE Home Demo service</strong>, allowing customers to experience our furniture in their own space before making a purchase.</p>
                <p>Today, we offer a comprehensive range of furniture for every room - from elegant bedroom sets to modern living room collections, from practical office furniture to playful kids' pieces.</p>
              </div>
              <div className="mt-8">
                <Link href="/categories" className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Explore Our Collections
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" alt="Furniture Showroom" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose <span className="text-orange-500">Us</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We're committed to delivering exceptional value, quality, and service</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-5">
                  <value.icon className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our <span className="text-orange-500">Team</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Passionate professionals dedicated to your satisfaction</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-80">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Transform Your Home?</h2>
          <p className="text-xl text-orange-100 mb-8">Book a FREE home demo and experience our furniture firsthand</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book-demo" className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Book FREE Demo
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300">
              Contact Us
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
