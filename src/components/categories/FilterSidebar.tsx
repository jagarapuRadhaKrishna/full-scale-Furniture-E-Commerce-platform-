'use client'

import { useState } from 'react'
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface PriceRange {
  label: string
  min: number
  max: number
}

const priceRanges: PriceRange[] = [
  { label: 'Under ₹10,000', min: 0, max: 10000 },
  { label: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
  { label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
  { label: '₹50,000 - ₹100,000', min: 50000, max: 100000 },
  { label: 'Above ₹100,000', min: 100000, max: Infinity },
]

const materials: string[] = ['Wood', 'Metal', 'Fabric', 'Leather', 'Glass', 'Plastic']
const brands: string[] = ['DFW Premium', 'Classic Collection', 'Modern Series', 'Luxury Line']
const availability: string[] = ['In Stock', 'Pre-Order', 'Custom Made']

export default function FilterSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('')
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const toggleAvailability = (availability: string) => {
    setSelectedAvailability(prev =>
      prev.includes(availability)
        ? prev.filter(a => a !== availability)
        : [...prev, availability]
    )
  }

  const clearAllFilters = () => {
    setSelectedPriceRange('')
    setSelectedMaterials([])
    setSelectedBrands([])
    setSelectedAvailability([])
  }

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md"
        >
          <FunnelIcon className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setIsOpen(false)}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <FilterContent
                priceRanges={priceRanges}
                materials={materials}
                brands={brands}
                availability={availability}
                selectedPriceRange={selectedPriceRange}
                selectedMaterials={selectedMaterials}
                selectedBrands={selectedBrands}
                selectedAvailability={selectedAvailability}
                setSelectedPriceRange={setSelectedPriceRange}
                toggleMaterial={toggleMaterial}
                toggleBrand={toggleBrand}
                toggleAvailability={toggleAvailability}
                clearAllFilters={clearAllFilters}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <FilterContent
            priceRanges={priceRanges}
            materials={materials}
            brands={brands}
            availability={availability}
            selectedPriceRange={selectedPriceRange}
            selectedMaterials={selectedMaterials}
            selectedBrands={selectedBrands}
            selectedAvailability={selectedAvailability}
            setSelectedPriceRange={setSelectedPriceRange}
            toggleMaterial={toggleMaterial}
            toggleBrand={toggleBrand}
            toggleAvailability={toggleAvailability}
            clearAllFilters={clearAllFilters}
          />
        </div>
      </div>
    </>
  )
}

interface FilterContentProps {
  priceRanges: PriceRange[]
  materials: string[]
  brands: string[]
  availability: string[]
  selectedPriceRange: string
  selectedMaterials: string[]
  selectedBrands: string[]
  selectedAvailability: string[]
  setSelectedPriceRange: (range: string) => void
  toggleMaterial: (material: string) => void
  toggleBrand: (brand: string) => void
  toggleAvailability: (availability: string) => void
  clearAllFilters: () => void
}

function FilterContent({
  priceRanges,
  materials,
  brands,
  availability,
  selectedPriceRange,
  selectedMaterials,
  selectedBrands,
  selectedAvailability,
  setSelectedPriceRange,
  toggleMaterial,
  toggleBrand,
  toggleAvailability,
  clearAllFilters,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      {/* Clear All */}
      <button
        onClick={clearAllFilters}
        className="text-sm text-furniture-brown hover:text-furniture-dark-wood"
      >
        Clear All Filters
      </button>

      {/* Price Range */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                value={range.label}
                checked={selectedPriceRange === range.label}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Material */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Material</h3>
        <div className="space-y-2">
          {materials.map((material) => (
            <label key={material} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material)}
                onChange={() => toggleMaterial(material)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{material}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Availability</h3>
        <div className="space-y-2">
          {availability.map((avail) => (
            <label key={avail} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedAvailability.includes(avail)}
                onChange={() => toggleAvailability(avail)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{avail}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}