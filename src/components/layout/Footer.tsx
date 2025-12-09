import Link from 'next/link'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="bg-[#FFF5F0] border-t border-orange-100 w-full mt-auto overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 border-2 border-orange-500 rounded flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-1 bg-orange-500 rounded-full mb-0.5"></div>
                  <div className="w-6 h-1 bg-orange-500 rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-semibold text-gray-800">Furniture</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Divya Furniture World - Premium furniture with home demo service. 
              Custom designs, repairs, and assembly services.
            </p>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <PhoneIcon className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col space-y-1">
                    <a href="tel:+919059737539" className="text-xs sm:text-sm text-gray-600 hover:text-orange-500 transition duration-200 break-words">+91 90597 37539 (Primary)</a>
                    <a href="tel:+919550897539" className="text-xs sm:text-sm text-gray-600 hover:text-orange-500 transition duration-200 break-words">+91 95508 97539</a>
                    <a href="tel:+918309228382" className="text-xs sm:text-sm text-gray-600 hover:text-orange-500 transition duration-200 break-words">+91 83092 28382</a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <EnvelopeIcon className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:divyafurnitureworld7539@gmail.com" className="text-xs sm:text-sm text-gray-600 hover:text-orange-500 transition duration-200 break-all">
                  divyafurnitureworld@gmail.com
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <a 
                  href="https://maps.app.goo.gl/K7rrtTqDEbJeRJ196?g_st=ipc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-gray-600 hover:text-orange-500 transition duration-200"
                >
                  900 Winward Drive, Suite A, Conington, LA 70123
                </a>
              </div>
              
              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">📞</span>
                  <span>(318) 228-6768</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-800">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link href="/about" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">About Us</Link></li>
              <li><Link href="/services" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">Our Services</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">Contact</Link></li>
              <li><Link href="/book-demo" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">Book Demo</Link></li>
              <li><Link href="/cart" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-800">Categories</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link href="/categories/bedroom" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">Bedroom</Link></li>
              <li><Link href="/categories/living-room" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">Living Room</Link></li>
              <li><Link href="/categories/dining" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">Dining</Link></li>
              <li><Link href="/categories/office" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">Office</Link></li>
              <li><Link href="/categories/kids" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">Kids</Link></li>
              <li><Link href="/categories/outdoor" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">Outdoor</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-800">Customer Service</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link href="/services" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">FREE Home Demo</Link></li>
              <li><Link href="/services" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">Custom Design</Link></li>
              <li><Link href="/services" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">Installation</Link></li>
              <li><Link href="/services" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">Warranty</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-orange-500 transition duration-200 text-xs sm:text-sm block">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-orange-100 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 gap-4">
            <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
              © 2025 DFW Furniture World. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-xs sm:text-sm">Follow us:</span>
              <div className="flex gap-3">
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}