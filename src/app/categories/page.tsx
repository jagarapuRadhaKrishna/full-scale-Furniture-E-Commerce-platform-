import { Metadata } from 'next'
import CategoryGrid from '@/components/categories/CategoryGrid'
import FilterSidebar from '@/components/categories/FilterSidebar'
import BackNavigation from '@/components/layout/BackNavigation'

export const metadata: Metadata = {
  title: 'Furniture Categories | DFW - Divya Furniture World',
  description: 'Browse our complete furniture collection by category. Bedroom, Living Room, Dining, Office, Kids, and Outdoor furniture.',
}

export default function CategoriesPage() {
  return (
    <div className="w-full bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 w-full">
        <BackNavigation label="Back" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 w-full">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            All Categories
          </h1>
          <p className="text-lg text-gray-600">
            Discover our complete furniture collection organized by room and style.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
          <FilterSidebar />
          <div className="lg:col-span-3">
            <CategoryGrid />
          </div>
        </div>
      </div>
    </div>
  )
}