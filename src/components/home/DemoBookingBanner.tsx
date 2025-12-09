import Link from 'next/link'
import { CalendarDaysIcon, HomeIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline'

export default function DemoBookingBanner() {
  return (
    <section className="py-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content */}
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Experience Furniture in Your Home - Completely FREE
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our expert technicians bring furniture samples to your home 
                for FREE demonstration. Get personalized recommendations, 
                measurements, and design consultation at no cost. Payment 
                only required for repairs and maintenance services.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CurrencyRupeeIcon className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">Completely FREE home demo & consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CalendarDaysIcon className="h-6 w-6 text-blue-500" />
                  <span className="text-gray-700">Flexible scheduling - 7 days a week</span>
                </div>
                <div className="flex items-center space-x-3">
                  <HomeIcon className="h-6 w-6 text-purple-500" />
                  <span className="text-gray-700">Payment only for repairs & maintenance</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/book-demo"
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition duration-200 text-center cursor-pointer select-none"
                >
                  Book Demo Now
                </Link>
                <Link 
                  href="/how-it-works"
                  className="bg-gray-100 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition duration-200 text-center cursor-pointer select-none"
                >
                  How It Works
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-8 lg:p-12 flex items-center justify-center">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Home Demo Service"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">FREE</div>
                    <div className="text-sm text-gray-600">Demo Service</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            How Our Demo Service Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Book Free Demo</h4>
              <p className="text-gray-600 text-sm">Choose date & time - completely FREE service</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Technician Visit</h4>
              <p className="text-gray-600 text-sm">Expert brings samples & catalog to your home</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Consultation</h4>
              <p className="text-gray-600 text-sm">Get measurements & personalized recommendations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Purchase</h4>
              <p className="text-gray-600 text-sm">Order online or offline - demo was FREE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}