'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon, ChevronDownIcon, HeartIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import AuthModal from '@/components/auth/AuthModal'
import UserProfile from '@/components/auth/UserProfile'

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Products',
    href: '/categories',
    hasDropdown: true,
    categories: [
      {
        title: 'Bedroom',
        items: [
          { name: 'Low Height Beds', href: '/categories/bedroom/low-height-beds' },
          { name: 'Height Beds', href: '/categories/bedroom/height-beds' },
          { name: 'Platform Beds', href: '/categories/bedroom/platform-beds' },
          { name: 'Hydraulic Storage Beds', href: '/categories/bedroom/hydraulic-beds' },
          { name: 'Bookshelf Beds', href: '/categories/bedroom/bookshelf-beds' },
          { name: 'Sliding Wardrobes', href: '/categories/bedroom/sliding-wardrobes' },
          { name: 'Hinged Wardrobes', href: '/categories/bedroom/hinged-wardrobes' },
          { name: 'Walk-in Wardrobes', href: '/categories/bedroom/walk-in-wardrobes' },
          { name: 'Dressing Tables', href: '/categories/bedroom/dressing-tables' },
          { name: 'Side Tables', href: '/categories/bedroom/side-tables' },
          { name: 'Chest of Drawers', href: '/categories/bedroom/chest-drawers' },
        ]
      },
      {
        title: 'Living Room',
        items: [
          { name: 'L-Shaped Sofas', href: '/categories/living-room/sofas-l-shaped' },
          { name: '3-Seater Sofas', href: '/categories/living-room/sofas-3-seater' },
          { name: '2-Seater Sofas', href: '/categories/living-room/sofas-2-seater' },
          { name: 'Sofa-Cum-Bed', href: '/categories/living-room/sofa-cum-bed' },
          { name: 'Power Recliners', href: '/categories/living-room/power-recliners' },
          { name: 'Manual Recliners', href: '/categories/living-room/manual-recliners' },
          { name: 'Marble Coffee Tables', href: '/categories/living-room/marble-coffee-tables' },
          { name: 'Glass Coffee Tables', href: '/categories/living-room/glass-coffee-tables' },
          { name: 'Wall-Mounted TV Units', href: '/categories/living-room/wall-tv-units' },
          { name: 'Floor TV Units', href: '/categories/living-room/floor-tv-units' },
        ]
      },
      {
        title: 'Dining',
        items: [
          { name: '4-Seater Dining Sets', href: '/categories/dining/4-seater-sets' },
          { name: '6-Seater Dining Sets', href: '/categories/dining/6-seater-sets' },
          { name: 'Marble Dining Tables', href: '/categories/dining/marble-tables' },
          { name: 'Wood Dining Tables', href: '/categories/dining/wood-tables' },
          { name: 'Glass Dining Tables', href: '/categories/dining/glass-tables' },
          { name: 'Upholstered Chairs', href: '/categories/dining/upholstered-chairs' },
          { name: 'Wooden Chairs', href: '/categories/dining/wooden-chairs' },
          { name: 'Storage Buffets', href: '/categories/dining/buffet-storage' },
          { name: 'Display Buffets', href: '/categories/dining/buffet-display' },
        ]
      },
      {
        title: 'Office',
        items: [
          { name: 'Executive Desks', href: '/categories/office/executive-desks' },
          { name: 'Computer Desks', href: '/categories/office/computer-desks' },
          { name: 'Office Chairs', href: '/categories/office/chairs' },
          { name: 'Ergonomic Chairs', href: '/categories/office/ergonomic-chairs' },
          { name: 'Bookshelves', href: '/categories/office/bookshelves' },
          { name: 'Filing Cabinets', href: '/categories/office/filing-cabinets' },
          { name: 'Conference Tables', href: '/categories/office/conference-tables' },
        ]
      },
      {
        title: 'Kids',
        items: [
          { name: 'Kids Beds', href: '/categories/kids/beds' },
          { name: 'Bunk Beds', href: '/categories/kids/bunk-beds' },
          { name: 'Study Tables', href: '/categories/kids/study-tables' },
          { name: 'Kids Wardrobes', href: '/categories/kids/wardrobes' },
          { name: 'Toy Storage', href: '/categories/kids/toy-storage' },
          { name: 'Kids Chairs', href: '/categories/kids/chairs' },
        ]
      },
      {
        title: 'Outdoor',
        items: [
          { name: 'Garden Chairs', href: '/categories/outdoor/garden-chairs' },
          { name: 'Outdoor Tables', href: '/categories/outdoor/tables' },
          { name: 'Swing Chairs', href: '/categories/outdoor/swing-chairs' },
          { name: 'Sun Loungers', href: '/categories/outdoor/sun-loungers' },
          { name: 'Garden Benches', href: '/categories/outdoor/benches' },
          { name: 'Outdoor Sofas', href: '/categories/outdoor/sofas' },
        ]
      },
      {
        title: 'Textiles',
        items: [
          { name: 'Bed Sheets', href: '/categories/textiles/bed-sheets' },
          { name: 'Pillow Covers', href: '/categories/textiles/pillow-covers' },
          { name: 'Curtains', href: '/categories/textiles/curtains' },
          { name: 'Cushion Covers', href: '/categories/textiles/cushion-covers' },
          { name: 'Sofa Covers', href: '/categories/textiles/sofa-covers' },
          { name: 'Carpets & Rugs', href: '/categories/textiles/carpets-rugs' },
          { name: 'Table Linens', href: '/categories/textiles/table-linens' },
        ]
      }
    ]
  },
  {
    name: 'Custom Design',
    href: '/custom-design',
    hasDropdown: true,
    categories: [
      {
        title: 'Design Services',
        items: [
          { name: 'Custom Furniture Design', href: '/custom-design' },
          { name: '3D Visualization', href: '/custom-design#visualization' },
          { name: 'Space Planning', href: '/custom-design#planning' },
          { name: 'Material Selection', href: '/custom-design#materials' },
        ]
      }
    ]
  },
  {
    name: 'Services',
    href: '/services',
    hasDropdown: true,
    categories: [
      {
        title: 'Our Services',
        items: [
          { name: 'Free Home Demo', href: '/book-demo' },
          { name: 'Furniture Repair', href: '/services#repair' },
          { name: 'Assembly Service', href: '/services#assembly' },
          { name: 'Customization', href: '/services#customization' },
          { name: 'Interior Design', href: '/services#interior' },
        ]
      }
    ]
  },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const pathname = usePathname()
  const { getItemCount } = useCart()
  const cartCount = getItemCount()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const { user, isAuthenticated } = useAuth()

  return (
    <nav className="bg-[#FFF5F0] border-b border-orange-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative w-10 h-10">
              <Image
                src="/images/dfw-logo.png"
                alt="DFW Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 leading-tight tracking-wide">
                DIVYA FURNITURE WORLD
              </span>
              <span className="text-[10px] text-orange-600 font-medium">
                Premium and affordable furniture
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <div 
                key={item.name}
                className="relative group"
              >
                {item.hasDropdown ? (
                  <>
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg relative ${
                        pathname?.startsWith('/categories') || pathname === item.href
                          ? 'text-orange-600 bg-orange-50 shadow-sm'
                          : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                      }`}
                    >
                      {item.name}
                      <ChevronDownIcon className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                      {(pathname?.startsWith('/categories') || pathname === item.href) && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-t-full"></div>
                      )}
                    </Link>
                    <div className={`absolute left-1/2 transform -translate-x-1/2 mt-2 ${item.categories && item.categories.length > 2 ? 'w-[900px]' : 'w-[300px]'} bg-white rounded-2xl shadow-2xl py-6 z-[100] border border-orange-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto max-h-[80vh] overflow-y-auto`}>
                      <div className={`grid ${item.categories && item.categories.length > 2 ? 'grid-cols-4' : 'grid-cols-1'} gap-6 px-6`}>
                        {item.categories?.map((category, idx) => (
                          <div key={idx} className="space-y-2">
                            <h3 className="text-sm font-bold text-orange-600 mb-3 pb-2 border-b border-orange-100 sticky top-0 bg-white">{category.title}</h3>
                            <ul className="space-y-1">
                              {category.items.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    className="block px-3 py-2 text-xs text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all duration-200"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg block ${
                      pathname === item.href
                        ? 'text-orange-600 bg-orange-50 shadow-sm'
                        : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                    }`}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-t-full"></div>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Icon */}
            <Link 
              href="/wishlist"
              className="relative p-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-200 hidden lg:block"
            >
              <HeartIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </Link>

            {/* Cart Icon */}
            <Link 
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-200 hidden lg:block"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <button 
                onClick={() => setShowProfileModal(true)}
                className="hidden lg:flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-200"
              >
                <UserIcon className="h-5 w-5" />
                <span className="text-sm font-medium">{user?.name}</span>
              </button>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <button
                  onClick={() => {
                    setAuthMode('login')
                    setShowAuthModal(true)
                  }}
                  className="px-4 py-1.5 text-xs font-semibold text-orange-600 border border-orange-500 rounded-full hover:bg-orange-50 transition-all duration-200"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup')
                    setShowAuthModal(true)
                  }}
                  className="px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Sign up
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-orange-500 p-2 transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-4 pt-4 pb-6 space-y-2 bg-[#FFF5F0] border-t border-orange-100 max-h-[80vh] overflow-y-auto">
          {navigation.map((item) => (
            <div key={item.name}>
              {'categories' in item && item.categories ? (
                <div>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200"
                  >
                    {item.name}
                    <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Mobile Submenu */}
                  {activeDropdown === item.name && (
                    <div className="pl-2 mt-2 space-y-3">
                      {item.categories.map((category) => (
                        <div key={category.title} className="border-l-2 border-orange-300 pl-4">
                          <div className="font-semibold text-orange-600 mb-2 text-sm">
                            {category.title}
                          </div>
                          <div className="space-y-1">
                            {category.items.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block py-2 text-sm text-gray-600 hover:text-orange-500 hover:pl-2 transition-all"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setActiveDropdown(null);
                                }}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          
          {/* Mobile Auth Buttons */}
          <div className="pt-4 border-t border-orange-100 space-y-2">
            {isAuthenticated ? (
              <button 
                onClick={() => {
                  setShowProfileModal(true)
                  setMobileMenuOpen(false)
                }}
                className="flex items-center space-x-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg w-full transition-all duration-200"
              >
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold">{user?.name}</div>
                  <div className="text-xs text-gray-500">View Profile</div>
                </div>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setAuthMode('login')
                    setShowAuthModal(true)
                    setMobileMenuOpen(false)
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-orange-500 border border-orange-500 rounded-full hover:bg-orange-50 transition-all duration-200"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup')
                    setShowAuthModal(true)
                    setMobileMenuOpen(false)
                  }}
                  className="px-4 py-2.5 text-sm font-medium bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-200"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />

      {/* User Profile Modal */}
      <UserProfile
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </nav>
  )
}