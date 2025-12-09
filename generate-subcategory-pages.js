// Subcategory Page Generator for DFW Furniture
// This script generates all missing subcategory pages with real data

const fs = require('fs');
const path = require('path');

// Define all subcategories for each main category
const subcategoryStructure = {
  bedroom: [
    { slug: 'low-height-beds', name: 'Low Height Beds', filter: 'Beds' },
    { slug: 'height-beds', name: 'Height Beds', filter: 'Beds' },
    { slug: 'platform-beds', name: 'Platform Beds', filter: 'Beds' },
    { slug: 'hydraulic-beds', name: 'Hydraulic Storage Beds', filter: 'Beds' },
    { slug: 'bookshelf-beds', name: 'Bookshelf Beds', filter: 'Beds' },
    { slug: 'sliding-wardrobes', name: 'Sliding Wardrobes', filter: 'Wardrobes' },
    { slug: 'hinged-wardrobes', name: 'Hinged Wardrobes', filter: 'Wardrobes' },
    { slug: 'walk-in-wardrobes', name: 'Walk-in Wardrobes', filter: 'Wardrobes' },
    { slug: 'dressing-tables', name: 'Dressing Tables', filter: 'Dressing Tables' },
    { slug: 'side-tables', name: 'Side Tables', filter: 'Side Tables' },
    { slug: 'chest-drawers', name: 'Chest of Drawers', filter: 'Storage' }
  ],
  'living-room': [
    { slug: 'sofas-l-shaped', name: 'L-Shaped Sofas', filter: 'Sofas' },
    { slug: 'sofas-3-seater', name: '3-Seater Sofas', filter: 'Sofas' },
    { slug: 'sofas-2-seater', name: '2-Seater Sofas', filter: 'Sofas' },
    { slug: 'sofa-cum-bed', name: 'Sofa-Cum-Bed', filter: 'Sofas' },
    { slug: 'power-recliners', name: 'Power Recliners', filter: 'Recliners' },
    { slug: 'manual-recliners', name: 'Manual Recliners', filter: 'Recliners' },
    { slug: 'marble-coffee-tables', name: 'Marble Coffee Tables', filter: 'Coffee Tables' },
    { slug: 'glass-coffee-tables', name: 'Glass Coffee Tables', filter: 'Coffee Tables' },
    { slug: 'wall-tv-units', name: 'Wall-Mounted TV Units', filter: 'TV Units' },
    { slug: 'floor-tv-units', name: 'Floor TV Units', filter: 'TV Units' }
  ],
  dining: [
    { slug: '4-seater-sets', name: '4-Seater Dining Sets', filter: 'Dining Sets' },
    { slug: '6-seater-sets', name: '6-Seater Dining Sets', filter: 'Dining Sets' },
    { slug: 'marble-tables', name: 'Marble Dining Tables', filter: 'Dining Tables' },
    { slug: 'wood-tables', name: 'Wood Dining Tables', filter: 'Dining Tables' },
    { slug: 'glass-tables', name: 'Glass Dining Tables', filter: 'Dining Tables' },
    { slug: 'upholstered-chairs', name: 'Upholstered Chairs', filter: 'Dining Chairs' },
    { slug: 'wooden-chairs', name: 'Wooden Chairs', filter: 'Dining Chairs' },
    { slug: 'buffet-storage', name: 'Storage Buffets', filter: 'Buffets' },
    { slug: 'buffet-display', name: 'Display Buffets', filter: 'Buffets' }
  ],
  office: [
    { slug: 'executive-desks', name: 'Executive Desks', filter: 'Desks' },
    { slug: 'computer-desks', name: 'Computer Desks', filter: 'Desks' },
    { slug: 'chairs', name: 'Office Chairs', filter: 'Chairs' },
    { slug: 'ergonomic-chairs', name: 'Ergonomic Chairs', filter: 'Chairs' },
    { slug: 'bookshelves', name: 'Bookshelves', filter: 'Storage' },
    { slug: 'filing-cabinets', name: 'Filing Cabinets', filter: 'Storage' },
    { slug: 'conference-tables', name: 'Conference Tables', filter: 'Tables' }
  ],
  kids: [
    { slug: 'beds', name: 'Kids Beds', filter: 'Beds' },
    { slug: 'bunk-beds', name: 'Bunk Beds', filter: 'Beds' },
    { slug: 'study-tables', name: 'Study Tables', filter: 'Study Tables' },
    { slug: 'wardrobes', name: 'Kids Wardrobes', filter: 'Wardrobes' },
    { slug: 'toy-storage', name: 'Toy Storage', filter: 'Storage' },
    { slug: 'chairs', name: 'Kids Chairs', filter: 'Chairs' }
  ],
  outdoor: [
    { slug: 'garden-chairs', name: 'Garden Chairs', filter: 'Chairs' },
    { slug: 'tables', name: 'Outdoor Tables', filter: 'Tables' },
    { slug: 'swing-chairs', name: 'Swing Chairs', filter: 'Chairs' },
    { slug: 'sun-loungers', name: 'Sun Loungers', filter: 'Loungers' },
    { slug: 'patio-sets', name: 'Patio Sets', filter: 'Sets' },
    { slug: 'benches', name: 'Benches', filter: 'Benches' }
  ],
  textiles: [
    { slug: 'pillow-covers', name: 'Pillow Covers', filter: 'Pillow Covers' },
    { slug: 'curtains', name: 'Curtains', filter: 'Curtains' },
    { slug: 'cushion-covers', name: 'Cushion Covers', filter: 'Cushion Covers' },
    { slug: 'sofa-covers', name: 'Sofa Covers', filter: 'Sofa Covers' },
    { slug: 'carpets-rugs', name: 'Carpets & Rugs', filter: 'Carpets' },
    { slug: 'table-linens', name: 'Table Linens', filter: 'Table Linens' }
  ]
};

// Page template generator function
function generatePageTemplate(category, subcategory) {
  const categoryKey = category === 'living-room' ? 'Living Room' : 
                      category.charAt(0).toUpperCase() + category.slice(1);
  
  return `'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HeartIcon as HeartOutline, StarIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { categoryProducts } from '@/data/massive-products'

// Filter products by subcategory
const products = categoryProducts.${categoryKey}?.filter((p: any) => p.subCategory === '${subcategory.filter}') || []

export default function ${subcategory.name.replace(/[^a-zA-Z]/g, '')}Page() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState('all')

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const filteredProducts = products.filter(product => {
    if (priceRange === 'all') return true
    const priceNum = parseInt(product.price.replace(/[₹,]/g, ''))
    if (priceRange === 'under50k') return priceNum < 50000
    if (priceRange === '50k-1L') return priceNum >= 50000 && priceNum <= 100000
    if (priceRange === 'above1L') return priceNum > 100000
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8]">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm">
              <li><Link href="/" className="hover:text-orange-200">Home</Link></li>
              <li>/</li>
              <li><Link href="/categories/${category}" className="hover:text-orange-200">${categoryKey}</Link></li>
              <li>/</li>
              <li className="text-orange-200">${subcategory.name}</li>
            </ol>
          </nav>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            ${subcategory.name}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Discover our premium collection of {products.length}+ ${subcategory.name.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Price Filter */}
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center px-4 py-2 rounded-full border-2 border-orange-500 text-orange-500 font-medium text-sm">
                <FunnelIcon className="w-4 h-4 mr-2" />
                Filters
              </button>
              {['all', 'under50k', '50k-1L', 'above1L'].map((range) => (
                <button
                  key={range}
                  onClick={() => setPriceRange(range)}
                  className={\`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 \${
                    priceRange === range
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                  }\`}
                >
                  {range === 'all' && 'All Prices'}
                  {range === 'under50k' && 'Under ₹50,000'}
                  {range === '50k-1L' && '₹50k - ₹1L'}
                  {range === 'above1L' && 'Above ₹1L'}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Product Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        NEW
                      </span>
                    )}
                    {product.isOnSale && product.discount && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    {favorites.includes(product.id) ? (
                      <HeartSolid className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartOutline className="w-5 h-5 text-gray-600" />
                    )}
                  </button>

                  {/* 360 View Badge */}
                  {product.has360View && (
                    <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v.878A2.25 2.25 0 0110.75 16h-1.5A2.25 2.25 0 017 13.878V13a2 2 0 00-2-2v-.025c-.163-.512-.285-1.041-.378-1.582z" />
                      </svg>
                      360°
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-2">
                    <span className="text-xs text-orange-500 font-semibold uppercase">{product.style}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                    {product.material} • {product.color}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={\`w-4 h-4 \${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }\`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-orange-500">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Link
                      href={\`/products/\${product.id}\`}
                      className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or check back later for new arrivals</p>
            <Link
              href="/categories/${category}"
              className="inline-block px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
            >
              View All ${categoryKey}
            </Link>
          </div>
        )}

        {/* Load More */}
        {filteredProducts.length > 12 && (
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-white text-orange-500 border-2 border-orange-500 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
`;
}

// Main execution
console.log('🚀 Starting DFW Subcategory Page Generator...\n');

let totalCreated = 0;
let totalSkipped = 0;

Object.entries(subcategoryStructure).forEach(([category, subcategories]) => {
  console.log(`\n📁 Processing ${category}...`);
  
  subcategories.forEach(subcategory => {
    const dirPath = path.join(__dirname, 'src', 'app', 'categories', category, subcategory.slug);
    const filePath = path.join(dirPath, 'page.tsx');
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`  ⏭️  Skipped: ${subcategory.slug} (already exists)`);
      totalSkipped++;
      return;
    }
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Generate and write the page
    const pageContent = generatePageTemplate(category, subcategory);
    fs.writeFileSync(filePath, pageContent, 'utf8');
    
    console.log(`  ✅ Created: ${subcategory.slug}`);
    totalCreated++;
  });
});

console.log(`\n\n🎉 Generation Complete!`);
console.log(`   Created: ${totalCreated} pages`);
console.log(`   Skipped: ${totalSkipped} pages (already existed)`);
console.log(`\n✨ All subcategory pages are ready!\n`);
