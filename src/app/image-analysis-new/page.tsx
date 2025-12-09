// Product Image Analysis Dashboard Component
// Advanced interface for managing and monitoring image generation

'use client'

import React, { useState, useEffect } from 'react'
import { 
  PhotoIcon, 
  EyeIcon, 
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  DocumentArrowDownIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

// Mock data structures (in real app, these would come from API)
interface ProductImageStatus {
  product_id: string
  name: string
  category: string
  current_status: 'missing' | 'duplicate' | 'irrelevant' | 'valid'
  similarity_score?: number
  images_count: number
  needs_generation: boolean
  last_analyzed: string
}

interface AnalysisSettings {
  similarity_threshold: number
  allow_branded_render: boolean
  jpg_quality: number
  generate_webp: boolean
  batch_size: number
  selected_categories: string[]
}

export default function ImageAnalysisDashboard() {
  const [products, setProducts] = useState<ProductImageStatus[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [settings, setSettings] = useState<AnalysisSettings>({
    similarity_threshold: 0.85,
    allow_branded_render: false,
    jpg_quality: 85,
    generate_webp: true,
    batch_size: 50,
    selected_categories: ['Bedroom', 'Living Room', 'Dining', 'Office', 'Kids', 'Outdoor']
  })
  
  const [analysisResults, setAnalysisResults] = useState({
    total_products: 0,
    missing_images: 0,
    duplicate_images: 0,
    irrelevant_images: 0,
    valid_images: 0,
    generated_count: 0,
    processing_time: 0
  })

  // Mock product data
  useEffect(() => {
    const mockProducts: ProductImageStatus[] = [
      {
        product_id: 'BED-001-KW',
        name: 'Luxury Platform Bed - King Size Walnut',
        category: 'Bedroom',
        current_status: 'valid',
        images_count: 4,
        needs_generation: false,
        last_analyzed: '2025-10-08T10:30:00Z'
      },
      {
        product_id: 'SOF-025-LB',
        name: 'L-Shaped Leather Sofa - Brown',
        category: 'Living Room',
        current_status: 'duplicate',
        similarity_score: 0.92,
        images_count: 2,
        needs_generation: true,
        last_analyzed: '2025-10-08T10:25:00Z'
      },
      {
        product_id: 'TAB-012-GW',
        name: 'Glass Dining Table - White Base',
        category: 'Dining',
        current_status: 'missing',
        images_count: 0,
        needs_generation: true,
        last_analyzed: '2025-10-08T10:20:00Z'
      },
      {
        product_id: 'CHR-089-MG',
        name: 'Mesh Office Chair - Gray',
        category: 'Office',
        current_status: 'irrelevant',
        similarity_score: 0.78,
        images_count: 1,
        needs_generation: true,
        last_analyzed: '2025-10-08T10:15:00Z'
      }
    ]
    
    setProducts(mockProducts)
    
    // Calculate summary stats
    setAnalysisResults({
      total_products: mockProducts.length,
      missing_images: mockProducts.filter(p => p.current_status === 'missing').length,
      duplicate_images: mockProducts.filter(p => p.current_status === 'duplicate').length,
      irrelevant_images: mockProducts.filter(p => p.current_status === 'irrelevant').length,
      valid_images: mockProducts.filter(p => p.current_status === 'valid').length,
      generated_count: 0,
      processing_time: 0
    })
  }, [])

  const categories = ['Bedroom', 'Living Room', 'Dining', 'Office', 'Kids', 'Outdoor']
  const statusOptions = ['missing', 'duplicate', 'irrelevant', 'valid']

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
    const statusMatch = selectedStatus === 'all' || product.current_status === selectedStatus
    return categoryMatch && statusMatch
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'missing':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      case 'duplicate':
        return <ArrowPathIcon className="h-5 w-5 text-yellow-500" />
      case 'irrelevant':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />
      case 'valid':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      default:
        return <PhotoIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'missing': return 'bg-red-100 text-red-800'
      case 'duplicate': return 'bg-yellow-100 text-yellow-800'
      case 'irrelevant': return 'bg-orange-100 text-orange-800'
      case 'valid': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleAnalyzeAll = async () => {
    setIsAnalyzing(true)
    
    // Simulate analysis process
    try {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        // Update progress here if needed
      }
      
      // Mock results after analysis
      setAnalysisResults(prev => ({
        ...prev,
        generated_count: prev.missing_images + prev.duplicate_images + prev.irrelevant_images,
        processing_time: 12500
      }))
      
      alert('Analysis completed! Check the results in the dashboard.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleGenerateImages = async (productIds: string[]) => {
    setIsAnalyzing(true)
    
    try {
      // Simulate image generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update product statuses
      setProducts(prev => prev.map(product => 
        productIds.includes(product.product_id)
          ? { ...product, current_status: 'valid' as const, needs_generation: false, images_count: 4 }
          : product
      ))
      
      alert(`Generated images for ${productIds.length} products!`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleExportResults = () => {
    const data = {
      summary: analysisResults,
      products: filteredProducts,
      settings,
      exported_at: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `image-analysis-report-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <PhotoIcon className="h-8 w-8 text-blue-600" />
            Product Image Analysis & Generation
          </h1>
          <p className="mt-2 text-gray-600">
            Analyze, deduplicate, and generate contextually-correct product images for your catalog
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{analysisResults.total_products}</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Need Generation</p>
                <p className="text-2xl font-bold text-red-600">
                  {analysisResults.missing_images + analysisResults.duplicate_images + analysisResults.irrelevant_images}
                </p>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valid Images</p>
                <p className="text-2xl font-bold text-green-600">{analysisResults.valid_images}</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Generated</p>
                <p className="text-2xl font-bold text-blue-600">{analysisResults.generated_count}</p>
              </div>
              <ArrowPathIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Statuses</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleAnalyzeAll}
                disabled={isAnalyzing}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
                {isAnalyzing ? 'Analyzing...' : 'Analyze All'}
              </button>

              <button
                onClick={() => {
                  const needGeneration = filteredProducts.filter(p => p.needs_generation).map(p => p.product_id)
                  if (needGeneration.length > 0) {
                    handleGenerateImages(needGeneration)
                  }
                }}
                disabled={isAnalyzing || filteredProducts.filter(p => p.needs_generation).length === 0}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                <PhotoIcon className="h-4 w-4" />
                Generate Images
              </button>

              <button
                onClick={handleExportResults}
                className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center gap-2"
              >
                <DocumentArrowDownIcon className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Products ({filteredProducts.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Images
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Similarity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Analyzed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.product_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.product_id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.current_status)}`}>
                        {getStatusIcon(product.current_status)}
                        {product.current_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.images_count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.similarity_score ? `${(product.similarity_score * 100).toFixed(1)}%` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(product.last_analyzed).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {product.needs_generation ? (
                        <button
                          onClick={() => handleGenerateImages([product.product_id])}
                          disabled={isAnalyzing}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                        >
                          Generate
                        </button>
                      ) : (
                        <span className="text-gray-400">Complete</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Settings Panel */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Cog6ToothIcon className="h-5 w-5" />
              Analysis Settings
            </h3>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Similarity Threshold ({(settings.similarity_threshold * 100).toFixed(0)}%)
              </label>
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.05"
                value={settings.similarity_threshold}
                onChange={(e) => setSettings(prev => ({ ...prev, similarity_threshold: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                JPG Quality ({settings.jpg_quality}%)
              </label>
              <input
                type="range"
                min="60"
                max="100"
                step="5"
                value={settings.jpg_quality}
                onChange={(e) => setSettings(prev => ({ ...prev, jpg_quality: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch Size
              </label>
              <select
                value={settings.batch_size}
                onChange={(e) => setSettings(prev => ({ ...prev, batch_size: parseInt(e.target.value) }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value={10}>10 products</option>
                <option value={25}>25 products</option>
                <option value={50}>50 products</option>
                <option value={100}>100 products</option>
              </select>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.allow_branded_render}
                  onChange={(e) => setSettings(prev => ({ ...prev, allow_branded_render: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Allow branded renders</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.generate_webp}
                  onChange={(e) => setSettings(prev => ({ ...prev, generate_webp: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Generate WebP copies</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}