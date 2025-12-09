'use client';

import React from 'react';
import Catalog from '@/components/Catalog/Catalog';
import { CatalogLoader } from '@/lib/catalog-loader';

export default function CatalogDemoPage() {
  const products = CatalogLoader.loadProducts();
  const stats = CatalogLoader.getCatalogStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              DFW Furniture Catalog 2025
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Complete collection with all model codes and premium furniture
            </p>
            <div className="mt-4 flex justify-center gap-6 text-sm text-gray-500">
              <span>🏠 {stats.totalProducts} Products</span>
              <span>🛋️ {stats.totalCategories} Categories</span>
              <span>⭐ {stats.averageRating.toFixed(1)} Avg Rating</span>
              <span>� {stats.totalStock} In Stock</span>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              Price Range: ₹{stats.priceRange.min.toLocaleString()} - ₹{stats.priceRange.max.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Catalog */}
      <Catalog initialProducts={products} />

      {/* Footer Info */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <h3 className="text-lg font-semibold mb-4">Featured Model Codes from Complete Catalog</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold text-blue-600">DFW-LS-001</div>
                <div>Premium L-Shape Sofa</div>
                <div className="text-xs text-gray-500">Living Room</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold text-green-600">DFW-PR-001</div>
                <div>Luxe Power Recliner</div>
                <div className="text-xs text-gray-500">Recliners</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold text-purple-600">DFW-KB-001</div>
                <div>Modern Platform King</div>
                <div className="text-xs text-gray-500">Bedroom</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold text-orange-600">DFW-DS-001</div>
                <div>Marble Top 6-Seater</div>
                <div className="text-xs text-gray-500">Dining</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold text-red-600">DFW-OC-001</div>
                <div>Ergonomic Executive</div>
                <div className="text-xs text-gray-500">Office</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold text-teal-600">DFW-OS-001</div>
                <div>4-Piece Garden Set</div>
                <div className="text-xs text-gray-500">Outdoor</div>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p className="font-medium">🎯 Search by Model Code:</p>
              <p>Try searching: DFW-LS-002, DFW-3S-001, DFW-PR-003, DFW-CT-001, DFW-KB-001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}