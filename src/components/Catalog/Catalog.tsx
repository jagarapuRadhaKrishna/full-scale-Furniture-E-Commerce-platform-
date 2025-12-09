import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product.types';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import ProductSearch from './ProductSearch';
import CategoryNav from './CategoryNav';

interface CatalogProps {
  initialProducts: Product[];
}

export default function Catalog({ initialProducts }: CatalogProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 100000 },
    categories: [] as string[],
    materials: [] as string[],
    rating: 0,
  });

  // Filter products based on search and filters
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.model.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.subcategory.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    result = result.filter(product => 
      product.variants.some(variant => 
        variant.price >= filters.priceRange.min && 
        variant.price <= filters.priceRange.max
      )
    );

    // Materials filter
    if (filters.materials.length > 0) {
      result = result.filter(product =>
        filters.materials.some(material =>
          product.materials.primary === material ||
          product.materials.secondary === material
        )
      );
    }

    // Rating filter
    if (filters.rating > 0) {
      result = result.filter(product => product.rating >= filters.rating);
    }

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, filters]);

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <ProductFilters
            filters={filters}
            setFilters={setFilters}
            products={products}
          />
        </div>

        {/* Main content */}
        <div className="flex-grow">
          {/* Search and category navigation */}
          <div className="mb-6">
            <ProductSearch
              onSearch={setSearchQuery}
              placeholder="Search by model code (e.g., DFW-LS-001) or product name..."
            />
            <CategoryNav
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600">
                No products found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}