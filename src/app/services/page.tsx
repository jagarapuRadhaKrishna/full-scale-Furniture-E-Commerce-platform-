'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircleIcon, TruckIcon, CogIcon, WrenchScrewdriverIcon, SparklesIcon, ShieldCheckIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function ServicesPage() {
  const services = [
    {
      icon: CheckCircleIcon,
      title: 'FREE Home Demo',
      description: 'Experience furniture in your own space before you buy. Our team brings samples to your home so you can see how they look and feel in your actual environment.',
      features: ['No cost, no obligation', 'Professional consultation', 'Multiple options to choose from', 'Available 6 days a week']
    },
    {
      icon: SparklesIcon,
      title: 'Custom Design Service',
      description: 'Create bespoke furniture tailored to your exact specifications. Our designers work with you to bring your vision to life with premium materials and craftsmanship.',
      features: ['Personal design consultation', 'CAD renderings', 'Material selection assistance', 'Flexible sizing options']
    },
    {
      icon: TruckIcon,
      title: 'Free Delivery & Setup',
      description: 'Enjoy complimentary delivery and professional installation across the region. Our trained team ensures your furniture is set up perfectly and ready to use.',
      features: ['Free delivery within 50km', 'Professional assembly', 'Packaging removal', 'Placement assistance']
    },
    {
      icon: CogIcon,
      title: 'Installation Service',
      description: 'Expert assembly and installation by certified professionals. We handle everything from simple setups to complex modular furniture systems.',
      features: ['Certified technicians', 'All tools provided', 'Quality guaranteed', 'Same-day service available']
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'Repair & Maintenance',
      description: 'Keep your furniture looking new with our comprehensive repair and maintenance services. From minor fixes to major refurbishments.',
      features: ['On-site repairs', 'Quality spare parts', 'Polish and refinishing', 'Annual maintenance plans']
    },
    {
      icon: ShieldCheckIcon,
      title: 'Extended Warranty',
      description: 'Comprehensive warranty coverage protecting your investment. Standard 1-year warranty with options to extend up to 5 years.',
      features: ['1-5 year coverage', 'Free repairs', 'Replacement parts', 'Priority service']
    }
  ]

  const process = [
    { step: '1', title: 'Contact Us', description: 'Reach out via phone, email, or visit our showroom' },
    { step: '2', title: 'Consultation', description: 'Discuss your needs with our expert team' },
    { step: '3', title: 'Selection', description: 'Choose from our wide range or customize' },
    { step: '4', title: 'Delivery', description: 'Professional delivery and installation' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8]">
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1920&q=80"
            alt="Our Services"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Our <span className="text-orange-200">Services</span>
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive furniture solutions designed to make your experience seamless and enjoyable
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <CheckCircleIcon className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It <span className="text-orange-500">Works</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our simple 4-step process ensures you get the perfect furniture with minimum hassle
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-orange-300 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80"
                alt="Quality Service"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our <span className="text-orange-500">Services</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <CheckCircleIcon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Team</h3>
                    <p className="text-gray-600">Trained professionals with years of experience in furniture industry</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <ShieldCheckIcon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guaranteed</h3>
                    <p className="text-gray-600">We stand behind our work with comprehensive warranties and guarantees</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <PhoneIcon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
                    <p className="text-gray-600">Our customer service team is always available to help you</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Started Today
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Book your FREE home demo or speak with our experts today
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book-demo" className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Book FREE Demo
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300">
              Contact Us
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
