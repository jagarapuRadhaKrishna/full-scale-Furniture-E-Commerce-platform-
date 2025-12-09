'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRightIcon, ChevronLeftIcon, HomeIcon } from '@heroicons/react/24/outline'

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  showBackButton?: boolean
  className?: string
}

const pathToNameMap: Record<string, string> = {
  '': 'Home',
  'categories': 'Categories',
  'bedroom': 'Bedroom',
  'living-room': 'Living Room',
  'dining': 'Dining',
  'office': 'Office',
  'kids': 'Kids Furniture',
  'outdoor': 'Outdoor',
  'wardrobes': 'Wardrobes',
  'chairs': 'Chairs',
  'bean-bags': 'Bean Bags',
  'tepoy': 'Tepoy',
  'dining-tables': 'Dining Tables',
  'footwear-stands': 'Footwear Stands',
  'furniture': 'Furniture',
  'textiles': 'Textiles',
  'bed-sheets': 'Bed Sheets',
  'blankets': 'Blankets',
  'pillows': 'Pillows',
  'covers': 'Covers',
  'cushions': 'Cushions',
  'custom-design': 'Custom Design',
  'support': 'Support',
  'cart': 'Shopping Cart',
  'checkout': 'Checkout',
  'orders': 'My Orders',
  'dashboard': 'Dashboard',
  'book-demo': 'Book Demo',
  'products': 'Products'
}

export default function Breadcrumb({ items, showBackButton = true, className = '' }: BreadcrumbProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Generate breadcrumb items from pathname if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items

    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', href: '/' }
    ]

    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const name = pathToNameMap[segment] || segment.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
      
      breadcrumbs.push({
        name,
        href: currentPath
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()
  
  const handleBack = () => {
    if (breadcrumbs.length > 1) {
      const previousItem = breadcrumbs[breadcrumbs.length - 2]
      router.push(previousItem.href)
    } else {
      router.back()
    }
  }

  return (
    <div className={`bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Back Button */}
          {showBackButton && (
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-amber-700 transition-colors duration-200 group"
            >
              <div className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 group-hover:bg-amber-50">
                <ChevronLeftIcon className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm hidden sm:block">Back</span>
            </button>
          )}

          {/* Breadcrumb Navigation */}
          <nav className="flex-1 flex justify-center" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-sm border border-gray-200">
              {breadcrumbs.map((item, index) => (
                <li key={item.href} className="flex items-center">
                  {index > 0 && (
                    <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-2" />
                  )}
                  
                  {index === 0 ? (
                    <Link
                      href={item.href}
                      className="flex items-center text-gray-500 hover:text-amber-700 transition-colors duration-200 group"
                    >
                      <div className="p-1.5 rounded-lg group-hover:bg-amber-50 transition-colors duration-200">
                        <HomeIcon className="w-4 h-4" />
                      </div>
                    </Link>
                  ) : index === breadcrumbs.length - 1 ? (
                    <span className="text-sm font-semibold text-gray-900 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-gray-600 hover:text-amber-700 transition-colors duration-200 hover:underline"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Spacer for layout balance */}
          <div className="w-20"></div>
        </div>
      </div>
    </div>
  )
}