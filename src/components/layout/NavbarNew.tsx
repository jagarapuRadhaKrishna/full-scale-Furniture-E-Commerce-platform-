'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Bars3Icon, 
  XMarkIcon, 
  ShoppingCartIcon, 
  HeartIcon, 
  UserCircleIcon,
  ChevronDownIcon,
  HomeIcon,
  BuildingOfficeIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline'

interface DropdownProps {
  title: string
  children: React.ReactNode
  isScrolled?: boolean
}

const Dropdown = ({ title, children, isScrolled = false }: DropdownProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsHovered(false)
    }, 150) // Small delay to prevent accidental closing
    setTimeoutId(id)
  }

  return (
    <div 
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex items-center px-3 py-1 text-sm font-medium transition-all duration-300 cursor-pointer group rounded-lg active:scale-95 active:shadow-inner text-white hover:text-amber-300 hover:bg-white/10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <span className="relative z-10">
          {title}
        </span>
        <ChevronDownIcon className={`w-5 h-5 ml-2 transform transition-all duration-300 ${
          isHovered ? 'rotate-180' : 'rotate-0'
        }`} />
      </div>
      
      {/* Enhanced dropdown with smooth animations */}
      <div className={`absolute top-full left-0 mt-1 z-[100] min-w-max transition-all duration-300 transform ${
        isHovered 
          ? 'opacity-100 visible translate-y-0 scale-100' 
          : 'opacity-0 invisible -translate-y-2 scale-95'
      }`}>
        <div className="bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-500/30 py-4 overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-black/30 pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[90] w-full transition-all duration-500">
      <nav className={`px-0 py-0.5 transition-all duration-500 w-full ${
        isScrolled 
          ? 'bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-xl shadow-2xl border-b border-white/10' 
          : 'bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm'
      }`}>
        <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group space-x-3 flex-shrink-0">
            <div className="relative w-12 h-12 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Circle background */}
                <circle cx="50" cy="50" r="48" fill="#78350f" opacity="0.2"/>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f59e0b" strokeWidth="2"/>
                
                {/* DFW Letters */}
                <text 
                  x="50" 
                  y="42" 
                  fontSize="28" 
                  fontWeight="bold" 
                  fill="#ffffff" 
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Arial, sans-serif"
                >
                  DFW
                </text>
                
                {/* DIVYA text */}
                <text 
                  x="50" 
                  y="65" 
                  fontSize="11" 
                  fontWeight="600" 
                  fill="#fbbf24" 
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Arial, sans-serif"
                >
                  DIVYA
                </text>
                
                {/* Furniture World text */}
                <text 
                  x="50" 
                  y="78" 
                  fontSize="7" 
                  fill="#fde68a" 
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Arial, sans-serif"
                >
                  FURNITURE WORLD
                </text>
              </svg>
            </div>
            <div className="hidden md:flex flex-col">
              <div className="font-bold text-sm lg:text-base leading-tight whitespace-nowrap transition-colors duration-300 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                DIVYA FURNITURE WORLD
              </div>
              <div className="text-xs lg:text-sm font-semibold whitespace-nowrap transition-colors duration-300 text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                PREMIUM & AFFORDABLE
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-1 flex-1 justify-center max-w-3xl'>
            <Link 
              href="/" 
              className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 active:scale-95 active:shadow-inner ${
                pathname === '/' 
                  ? 'bg-amber-500 text-white shadow-lg' 
                  : 'text-white hover:text-amber-300 hover:bg-white/10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
              }`}
            >
              Home
            </Link>

            {/* Furniture Dropdown - Complete Categories */}
            <Dropdown title="Furniture" isScrolled={isScrolled}>
              <div className='py-2 min-w-[900px]'>
                <div className='grid grid-cols-4 gap-6 p-6'>
                  <div>
                    <div className='flex items-center mb-3'>
                      <HomeIcon className='w-4 h-4 text-amber-500 mr-2' />
                      <h3 className='text-sm font-semibold text-white'>Living Room</h3>
                    </div>
                    <ul className='space-y-1'>
                      <li><Link href='/categories/living-room/sofas-l-shaped' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>L-Shaped Sofas</Link></li>
                      <li><Link href='/categories/living-room/sofas-3-seater' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>3-Seater Sofas</Link></li>
                      <li><Link href='/categories/living-room/sofas-2-seater' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>2-Seater Sofas</Link></li>
                      <li><Link href='/categories/living-room/sofa-cum-bed' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Sofa-Cum-Bed</Link></li>
                      <li><Link href='/categories/living-room/power-recliners' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Power Recliners</Link></li>
                      <li><Link href='/categories/living-room/manual-recliners' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Manual Recliners</Link></li>
                      <li><Link href='/categories/living-room/marble-coffee-tables' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Marble Coffee Tables</Link></li>
                      <li><Link href='/categories/living-room/glass-coffee-tables' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Glass Coffee Tables</Link></li>
                      <li><Link href='/categories/living-room/wall-tv-units' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Wall-Mounted TV Units</Link></li>
                      <li><Link href='/categories/living-room/floor-tv-units' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Floor TV Units</Link></li>
                      <li><Link href='/categories/bean-bags' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Bean Bags</Link></li>
                      <li><Link href='/categories/footwear-stands' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Footwear Stands</Link></li>
                    </ul>
                  </div>

                  <div>
                    <div className='flex items-center mb-3'>
                      <BuildingOfficeIcon className='w-4 h-4 text-amber-500 mr-2' />
                      <h3 className='text-sm font-semibold text-white'>Bedroom</h3>
                    </div>
                    <ul className='space-y-1'>
                      <li><Link href='/categories/bedroom/low-height-beds' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Low Height Beds</Link></li>
                      <li><Link href='/categories/bedroom/height-beds' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Height Beds</Link></li>
                      <li><Link href='/categories/bedroom/classic-beds' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Classic Beds</Link></li>
                      <li><Link href='/categories/bedroom/platform-beds' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Platform Beds</Link></li>
                      <li><Link href='/categories/bedroom/hydraulic-beds' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Hydraulic Storage Beds</Link></li>
                      <li><Link href='/categories/bedroom/bookshelf-beds' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Bookshelf Beds</Link></li>
                      <li><Link href='/categories/bedroom/sliding-wardrobes' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Sliding Wardrobes</Link></li>
                      <li><Link href='/categories/bedroom/hinged-wardrobes' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Hinged Wardrobes</Link></li>
                      <li><Link href='/categories/bedroom/walk-in-wardrobes' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Walk-in Wardrobes</Link></li>
                      <li><Link href='/categories/bedroom/dressing-tables' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Dressing Tables</Link></li>
                      <li><Link href='/categories/bedroom/side-tables' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Side Tables</Link></li>
                      <li><Link href='/categories/bedroom/chest-drawers' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Chest of Drawers</Link></li>
                    </ul>
                  </div>

                  <div>
                    <div className='flex items-center mb-3'>
                      <ShoppingBagIcon className='w-4 h-4 text-amber-500 mr-2' />
                      <h3 className='text-sm font-semibold text-white'>Dining & Office</h3>
                    </div>
                    <ul className='space-y-1'>
                      <li className="list-animate"><Link href='/categories/dining/4-seater-sets' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>4-Seater Dining Sets</Link></li>
                      <li className="list-animate"><Link href='/categories/dining/6-seater-sets' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>6-Seater Dining Sets</Link></li>
                      <li className="list-animate"><Link href='/categories/dining/marble-tables' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Marble Dining Tables</Link></li>
                      <li className="list-animate"><Link href='/categories/dining/wood-tables' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Wood Dining Tables</Link></li>
                      <li className="list-animate"><Link href='/categories/dining/glass-tables' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Glass Dining Tables</Link></li>
                      <li className="list-animate"><Link href='/categories/dining/upholstered-chairs' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Upholstered Chairs</Link></li>
                      <li className="list-animate"><Link href='/categories/dining/wooden-chairs' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Wooden Chairs</Link></li>
                      <li className="list-animate"><Link href='/categories/dining/buffet-storage' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Storage Buffets</Link></li>
                      <li className="list-animate"><Link href='/categories/dining/buffet-display' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Display Buffets</Link></li>
                      <li className="list-animate"><Link href='/categories/office/executive-desks' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Executive Desks</Link></li>
                      <li className="list-animate"><Link href='/categories/office/workstation-desks' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Workstation Desks</Link></li>
                      <li className="list-animate"><Link href='/categories/office/executive-chairs' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Executive Chairs</Link></li>
                    </ul>
                  </div>

                  <div>
                    <div className='flex items-center mb-3'>
                      <HomeIcon className='w-4 h-4 text-amber-500 mr-2' />
                      <h3 className='text-sm font-semibold text-white'>Kids & Outdoor</h3>
                    </div>
                    <ul className='space-y-1'>
                      <li><Link href='/categories/kids/theme-beds' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Theme Kids Beds</Link></li>
                      <li><Link href='/categories/kids/bunk-beds' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Bunk Beds</Link></li>
                      <li><Link href='/categories/kids/smart-study-tables' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Smart Study Tables</Link></li>
                      <li><Link href='/categories/kids/compact-study-tables' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Compact Study Tables</Link></li>
                      <li><Link href='/categories/kids/corner-study-tables' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Corner Study Tables</Link></li>
                      <li><Link href='/categories/outdoor/3-piece-lounge' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>3-Piece Lounge Sets</Link></li>
                      <li><Link href='/categories/outdoor/6-piece-lounge' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>6-Piece Lounge Sets</Link></li>
                      <li><Link href='/categories/outdoor/outdoor-dining-4' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>4-Seater Outdoor Dining</Link></li>
                      <li><Link href='/categories/outdoor/outdoor-dining-6' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>6-Seater Outdoor Dining</Link></li>
                      <li><Link href='/categories/outdoor/swing-chairs' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Swing Chairs</Link></li>
                      <li><Link href='/categories/outdoor/garden-chairs' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Garden Chairs</Link></li>
                      <li><Link href='/complete-catalog' className='block px-3 py-1 text-xs text-amber-500 hover:text-purple-300 font-medium'>View All →</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </Dropdown>

            {/* Textiles Dropdown - Complete */}
            <Dropdown title="Textiles" isScrolled={isScrolled}>
              <div className='py-2 min-w-[450px]'>
                <div className='grid grid-cols-2 gap-6 p-4'>
                  <div>
                    <h3 className='text-sm font-semibold text-white mb-3'>Bedding Essentials</h3>
                    <ul className='space-y-1'>
                      <li><Link href='/categories/textiles/bed-sheets' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Premium Bed Sheets</Link></li>
                      <li><Link href='/categories/textiles/duvet-covers' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Duvet Covers</Link></li>
                      <li><Link href='/categories/textiles/comforters' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Comforters</Link></li>
                      <li><Link href='/categories/textiles/blankets' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Blankets & Throws</Link></li>
                      <li><Link href='/categories/textiles/pillows' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Pillows & Cushions</Link></li>
                      <li><Link href='/categories/textiles/mattress-protectors' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Mattress Protectors</Link></li>
                    </ul>
                    
                    <h3 className='text-sm font-semibold text-white mb-3 mt-4'>Window Treatments</h3>
                    <ul className='space-y-1'>
                      <li><Link href='/categories/textiles/curtains' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full'>Thermal Curtains</Link></li>
                      <li><Link href='/textiles' className='block px-3 py-1 text-xs text-amber-500 hover:text-purple-300 font-medium'>View All Textiles →</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </Dropdown>

            <Link 
              href="/about" 
              className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 active:scale-95 active:shadow-inner ${
                pathname === '/about' 
                  ? 'bg-amber-500 text-white shadow-lg' 
                  : 'text-white hover:text-amber-300 hover:bg-white/10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
              }`}
            >
              About
            </Link>
            
            <Link 
              href="/contact" 
              className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 active:scale-95 active:shadow-inner ${
                pathname === '/contact' 
                  ? 'bg-amber-500 text-white shadow-lg' 
                  : 'text-white hover:text-amber-300 hover:bg-white/10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right side - User Actions */}
          <div className="hidden lg:flex items-center space-x-1.5 flex-shrink-0">
            {/* Wishlist */}
            <Link 
              href="/wishlist" 
              className="p-1.5 rounded-full hover:scale-105 transition-all duration-300 shadow-lg border-2 active:scale-95 active:shadow-inner bg-white/10 backdrop-blur-sm text-white border-amber-500/30 hover:bg-white/20"
              title="Wishlist"
            >
              <HeartIcon className="w-4 h-4 stroke-[2.5]" />
            </Link>
            
            {/* Cart */}
            <Link 
              href="/cart" 
              className="p-1.5 rounded-full hover:scale-105 transition-all duration-300 shadow-lg border-2 active:scale-95 active:shadow-inner bg-white/10 backdrop-blur-sm text-white border-amber-500/30 hover:bg-white/20"
              title="Shopping Cart"
            >
              <ShoppingCartIcon className="w-4 h-4 stroke-[2.5]" />
            </Link>
            
            {/* User Account Dropdown */}
            <Dropdown title="Account" isScrolled={isScrolled}>
              <div className='py-2 min-w-[200px]'>
                <div className='p-4'>
                  <div className='flex items-center mb-3'>
                    <UserCircleIcon className='w-4 h-4 text-amber-500 mr-2' />
                    <h3 className='text-sm font-semibold text-white'>Account</h3>
                  </div>
                  <ul className='space-y-1'>
                    <li><Link href='/login' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Login</Link></li>
                    <li><Link href='/signup' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Sign Up</Link></li>
                    <li><Link href='/dashboard' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Dashboard</Link></li>
                    <li><Link href='/orders' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Orders</Link></li>
                    <li><Link href='/wishlist' className='block px-3 py-1 text-xs text-gray-300 hover:text-amber-300 hover:bg-white/10 rounded-full transition-all duration-300'>Wishlist</Link></li>
                  </ul>
                </div>
              </div>
            </Dropdown>
            
            {/* Book Demo Button */}
            <Link 
              href="/book-demo" 
              className="bg-amber-500 text-white px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-amber-600 hover:shadow-2xl transition-all duration-300 min-w-[110px] text-center active:scale-95 active:shadow-inner"
            >
              Book Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 rounded-full hover:scale-105 transition-all duration-300 border bg-white/10 backdrop-blur-sm text-white border-amber-500/30 hover:bg-white/20"
            >
              <div className="relative w-5 h-5">
                <div className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
                  <Bars3Icon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`}>
                  <XMarkIcon className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 py-4 z-[60]">
            <div className="px-6 space-y-3">
              <Link 
                href="/" 
                className="block text-white hover:text-gray-300 transition-colors duration-300 text-sm font-medium py-2"
              >
                Home
              </Link>
              <Link 
                href="/furniture" 
                className="block text-white hover:text-gray-300 transition-colors duration-300 text-sm font-medium py-2"
              >
                Furniture
              </Link>
              <Link 
                href="/textiles" 
                className="block text-white hover:text-gray-300 transition-colors duration-300 text-sm font-medium py-2"
              >
                Textiles
              </Link>
              <Link 
                href="/about" 
                className="block text-white hover:text-gray-300 transition-colors duration-300 text-sm font-medium py-2"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="block text-white hover:text-gray-300 transition-colors duration-300 text-sm font-medium py-2"
              >
                Contact
              </Link>
              <div className="pt-3 mt-3 border-t border-gray-700">
                <Link 
                  href="mailto:info@dfwfurniture.com" 
                  className="block bg-white text-white px-4 py-2 rounded-full text-sm font-medium text-center hover:bg-gray-100 transition-colors duration-300"
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
