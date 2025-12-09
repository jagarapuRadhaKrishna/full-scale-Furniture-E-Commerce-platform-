'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {image1} from "../../../public/images/images.js"
import { 
  Bars3Icon, 
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function NavbarPill() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="bg-gray-900/95 backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl transition-all duration-500">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <Image
                src={image1}
                alt="DFW"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              href="/furniture" 
              className="text-white hover:text-gray-300 transition-colors duration-300 text-sm font-medium"
            >
              Work
            </Link>
            
            <Link 
              href="/about" 
              className="text-white hover:text-gray-300 transition-colors duration-300 text-sm font-medium"
            >
              About
            </Link>
            
            <Link 
              href="/categories" 
              className="text-white hover:text-gray-300 transition-colors duration-300 text-sm font-medium"
            >
              Playground
            </Link>
            
            <Link 
              href="/support" 
              className="text-white hover:text-gray-300 transition-colors duration-300 text-sm font-medium"
            >
              Resource
            </Link>
          </div>

          {/* Right side - Email/Contact */}
          <div className="hidden lg:flex items-center">
            <Link 
              href="mailto:info@dfwfurniture.com" 
              className="bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              info@dfwfurniture.com
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 rounded-full text-white hover:bg-gray-800 transition-colors duration-300"
            >
              <div className="relative w-6 h-6">
                <div className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
                  <Bars3Icon className="w-6 h-6" />
                </div>
                <div className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`}>
                  <XMarkIcon className="w-6 h-6" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 py-4">
            <div className="px-6 space-y-3">
              <Link 
                href="/furniture" 
                className="block text-white hover:text-gray-300 transition-colors duration-300 text-sm font-medium py-2"
              >
                Work
              </Link>
              <Link 
                href="/about" 
                className="block text-white hover:text-gray-300 transition-colors duration-300 text-sm font-medium py-2"
              >
                About
              </Link>
              <Link 
                href="/categories" 
                className="block text-white hover:text-gray-300 transition-colors duration-300 text-sm font-medium py-2"
              >
                Playground
              </Link>
              <Link 
                href="/support" 
                className="block text-white hover:text-gray-300 transition-colors duration-300 text-sm font-medium py-2"
              >
                Resource
              </Link>
              <div className="pt-3 mt-3 border-t border-gray-700">
                <Link 
                  href="mailto:info@dfwfurniture.com" 
                  className="block bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium text-center hover:bg-gray-100 transition-colors duration-300"
                >
                  info@dfwfurniture.com
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}