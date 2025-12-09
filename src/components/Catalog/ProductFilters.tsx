import React from 'react';
import { Product } from '@/types/product.types';

interface FilterState {
  priceRange: { min: number; max: number };
  categories: string[];
  materials: string[];
  rating: number;
}

interface ProductFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  products: Product[];
}

export default function ProductFilters({
  filters,
  setFilters,
  products,
}: ProductFiltersProps) {
  // Get unique categories and materials from products
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const materials = Array.from(
    new Set(
      products.flatMap((p) => [p.materials.primary, p.materials.secondary])
    )
  ).filter(Boolean);

  // Get min and max prices from all variants
  const prices = products.flatMap((p) => p.variants.map((v) => v.price));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Price Range</h3>
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={filters.priceRange.max}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: {
                  ...filters.priceRange,
                  max: Number(e.target.value),
                },
              })
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{filters.priceRange.min.toLocaleString()}</span>
            <span>₹{filters.priceRange.max.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...filters.categories, category]
                    : filters.categories.filter((c) => c !== category);
                  setFilters({ ...filters, categories: newCategories });
                }}
                className="mr-2"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Materials Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Materials</h3>
        <div className="flex flex-col gap-2">
          {materials.map((material) => (
            <label key={material} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.materials.includes(material as string)}
                onChange={(e) => {
                  const newMaterials = e.target.checked
                    ? [...filters.materials, material as string]
                    : filters.materials.filter((m) => m !== material);
                  setFilters({ ...filters, materials: newMaterials });
                }}
                className="mr-2"
              />
              <span className="text-sm">{material}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Minimum Rating</h3>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                filters.rating >= rating
                  ? 'bg-yellow-400 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
              onClick={() =>
                setFilters({ ...filters, rating: rating })
              }
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <button
        className="w-full bg-gray-100 text-gray-600 py-2 rounded-md hover:bg-gray-200 transition-colors"
        onClick={() =>
          setFilters({
            priceRange: { min: minPrice, max: maxPrice },
            categories: [],
            materials: [],
            rating: 0,
          })
        }
      >
        Reset Filters
      </button>
    </div>
  );
}