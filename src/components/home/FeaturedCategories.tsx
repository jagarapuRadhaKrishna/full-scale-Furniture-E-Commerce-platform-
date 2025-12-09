'use client'

import Link from 'next/link'
import { useActivityTracker } from '@/lib/activity-tracker'

const categories = [
  {
    name: 'Bedroom',
    href: '/categories/bedroom',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=cat-bedroom',
    description: 'Beds, Wardrobes, Dressers',
    itemCount: '150+ items'
  },
  {
    name: 'Living Room',
    href: '/categories/living-room',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=cat-living',
    description: 'Sofas, TV Units, Tables',
    itemCount: '200+ items'
  },
  {
    name: 'Dining',
    href: '/categories/dining',
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=cat-dining',
    description: 'Dining Tables, Chairs',
    itemCount: '100+ items'
  },
  {
    name: 'Office',
    href: '/categories/office',
    image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=cat-office',
    description: 'Desks, Office Chairs',
    itemCount: '80+ items'
  },
  {
    name: 'Kids',
    href: '/categories/kids',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=cat-kids',
    description: 'Bunk Beds, Study Tables',
    itemCount: '60+ items'
  },
  {
    name: 'Outdoor',
    href: '/categories/outdoor',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=cat-outdoor',
    description: 'Garden Chairs, Patio Sets',
    itemCount: '40+ items'
  }
]

export default function FeaturedCategories() {
  const { trackCategoryView } = useActivityTracker()

  const handleCategoryClick = (category: string) => {
    trackCategoryView(category, 100) // Default product count
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of furniture categories. From bedroom essentials 
            to outdoor furniture, we have everything for your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.name}
              href={category.href}
              onClick={() => handleCategoryClick(category.name)}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-200"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {category.description}
                  </p>
                  <p className="text-sm text-furniture-brown font-medium">
                    {category.itemCount}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/categories"
            className="bg-furniture-brown text-white px-8 py-3 rounded-lg font-semibold hover:bg-furniture-dark-wood transition duration-200"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  )
}