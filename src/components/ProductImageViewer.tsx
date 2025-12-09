'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ComprehensiveFurnitureImageGenerator, { FurnitureImageSet } from '@/lib/comprehensive-furniture-image-generator'

interface ProductImageViewerProps {
  productId?: string
  category?: string
  showAllProducts?: boolean
}

const ProductImageViewer: React.FC<ProductImageViewerProps> = ({
  productId,
  category,
  showAllProducts = false
}) => {
  const [imageGenerator] = useState(new ComprehensiveFurnitureImageGenerator())
  const [selectedProduct, setSelectedProduct] = useState<FurnitureImageSet | null>(null)
  const [selectedView, setSelectedView] = useState<keyof FurnitureImageSet['views']>('front')
  const [products, setProducts] = useState<FurnitureImageSet[]>([])
  const [currentProductIndex, setCurrentProductIndex] = useState(0)

  useEffect(() => {
    if (productId) {
      const product = imageGenerator.getProductImages(productId)
      setSelectedProduct(product)
      setProducts(product ? [product] : [])
    } else if (category) {
      const categoryProducts = imageGenerator.getImagesByCategory(category)
      setProducts(categoryProducts)
      setSelectedProduct(categoryProducts[0] || null)
    } else if (showAllProducts) {
      const allProducts = [
        ...imageGenerator.generateAllProductImages(),
        ...imageGenerator.generateExtendedProductImages()
      ]
      setProducts(allProducts)
      setSelectedProduct(allProducts[0] || null)
    }
  }, [productId, category, showAllProducts, imageGenerator])

  const viewLabels = {
    front: 'Front View',
    back: 'Back View',
    leftSide: 'Left Side',
    rightSide: 'Right Side',
    top: 'Top View',
    isometric: '3D Isometric'
  }

  const nextProduct = () => {
    if (currentProductIndex < products.length - 1) {
      const newIndex = currentProductIndex + 1
      setCurrentProductIndex(newIndex)
      setSelectedProduct(products[newIndex])
      setSelectedView('front')
    }
  }

  const previousProduct = () => {
    if (currentProductIndex > 0) {
      const newIndex = currentProductIndex - 1
      setCurrentProductIndex(newIndex)
      setSelectedProduct(products[newIndex])
      setSelectedView('front')
    }
  }

  const selectProduct = (index: number) => {
    setCurrentProductIndex(index)
    setSelectedProduct(products[index])
    setSelectedView('front')
  }

  if (!selectedProduct) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No product images available</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Product Navigation */}
      {products.length > 1 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Product Gallery ({products.length} items)
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={previousProduct}
                disabled={currentProductIndex === 0}
                className="px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-300"
              >
                ← Previous
              </button>
              <span className="text-sm text-gray-600">
                {currentProductIndex + 1} of {products.length}
              </span>
              <button
                onClick={nextProduct}
                disabled={currentProductIndex === products.length - 1}
                className="px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-300"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Product Selector */}
          <div className="w-full max-w-full">
            <div className="flex gap-2 overflow-x-auto pb-2 max-w-full">
              {products.map((product, index) => (
                <button
                  key={product.productId}
                  onClick={() => selectProduct(index)}
                  className={`flex-shrink-0 px-3 py-2 text-sm rounded border ${
                    index === currentProductIndex
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {product.productName.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Current Product Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {selectedProduct.productName}
        </h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span><strong>Product ID:</strong> {selectedProduct.productId}</span>
          <span><strong>Category:</strong> {selectedProduct.category}</span>
          <span><strong>Sub-Category:</strong> {selectedProduct.subCategory}</span>
          <span><strong>Dimensions:</strong> {selectedProduct.dimensions}</span>
        </div>
        <div className="mt-3">
          <strong className="text-sm text-gray-700">Materials:</strong>
          <div className="flex flex-wrap gap-1 mt-1">
            {selectedProduct.materials.map((material, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded"
              >
                {material}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <strong className="text-sm text-gray-700">Smart Features:</strong>
          <div className="flex flex-wrap gap-1 mt-1">
            {selectedProduct.smartFeatures.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* View Selection Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          {Object.entries(viewLabels).map(([viewKey, label]) => (
            <button
              key={viewKey}
              onClick={() => setSelectedView(viewKey as keyof FurnitureImageSet['views'])}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                selectedView === viewKey
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Image Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Main View */}
        <div className="lg:col-span-2">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {selectedProduct.views[selectedView] ? (
              <Image
                src={selectedProduct.views[selectedView]}
                alt={`${selectedProduct.productName} - ${viewLabels[selectedView]}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                unoptimized
                onError={(e) => {
                  console.log('Image load error:', e)
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm">Image not available</p>
                </div>
              </div>
            )}
            <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm">
              {viewLabels[selectedView]}
            </div>
          </div>
        </div>

        {/* Thumbnail Views */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">All Views</h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(selectedProduct.views).map(([viewKey, imageUrl]) => (
              <button
                key={viewKey}
                onClick={() => setSelectedView(viewKey as keyof FurnitureImageSet['views'])}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedView === viewKey
                    ? 'border-blue-600 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={imageUrl}
                  alt={`${viewLabels[viewKey as keyof typeof viewLabels]}`}
                  fill
                  className="object-cover"
                  sizes="150px"
                  unoptimized
                />
                <div className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                  {viewLabels[viewKey as keyof typeof viewLabels]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 360° View Simulation */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          360° Interactive View
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {Object.entries(selectedProduct.views).map(([viewKey, imageUrl], index) => (
            <div key={viewKey} className="text-center">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-2 border-2 border-gray-200">
                <Image
                  src={imageUrl}
                  alt={`${viewLabels[viewKey as keyof typeof viewLabels]}`}
                  fill
                  className="object-cover"
                  sizes="150px"
                  unoptimized
                />
              </div>
              <p className="text-xs text-gray-600">
                {viewLabels[viewKey as keyof typeof viewLabels]}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Click any view above to see detailed perspective of the {selectedProduct.productName}
          </p>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-semibold text-gray-900 mb-3">Product Specifications</h5>
          <div className="space-y-2 text-sm">
            <div><strong>Product ID:</strong> {selectedProduct.productId}</div>
            <div><strong>Dimensions:</strong> {selectedProduct.dimensions}</div>
            <div><strong>Category:</strong> {selectedProduct.category} → {selectedProduct.subCategory}</div>
            <div>
              <strong>Materials:</strong>
              <div className="mt-1 flex flex-wrap gap-1">
                {selectedProduct.materials.map((material, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-gray-200 rounded">
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h5 className="font-semibold text-gray-900 mb-3">Smart Features</h5>
          <div className="space-y-1">
            {selectedProduct.smartFeatures.map((feature, index) => (
              <div key={index} className="flex items-center text-sm">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductImageViewer