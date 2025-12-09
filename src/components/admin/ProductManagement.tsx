// Product & Category Management Component
// Feature 2 from DFW Admin Panel Blueprint

'use client'

import React, { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  PhotoIcon,
  CubeIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  CloudArrowUpIcon,
  EyeIcon,
  DocumentArrowUpIcon,
  CameraIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

interface Product {
  id: string
  name: string
  sku: string
  category: string
  subCategory: string
  price: number
  material: string
  dimensions: {
    length: number
    width: number
    height: number
    unit: 'cm' | 'inches'
  }
  images: {
    front?: string
    side?: string
    top?: string
    back?: string
    lifestyle?: string
    closeup?: string
  }
  model3D?: {
    gltf?: string
    glb?: string
    usdz?: string
  }
  arPreview: boolean
  customizationOptions: {
    colors: string[]
    sizes: string[]
    materials: string[]
  }
  stock: {
    available: number
    reserved: number
    threshold: number
  }
  status: 'active' | 'inactive' | 'draft'
  variants: ProductVariant[]
  createdAt: string
  updatedAt: string
}

interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  attributes: Record<string, string>
}

interface Category {
  id: string
  name: string
  slug: string
  parentId?: string
  description: string
  image: string
  banner: string
  subCategories: Category[]
  productCount: number
  isActive: boolean
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [bulkActions, setBulkActions] = useState<string[]>([])

  // Mock data
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setProducts([
        {
          id: '1',
          name: 'Luxury Dining Table',
          sku: 'LDT-001',
          category: 'Dining',
          subCategory: 'Tables',
          price: 45000,
          material: 'Solid Wood',
          dimensions: { length: 180, width: 90, height: 75, unit: 'cm' },
          images: {
            front: '/images/dining-table-front.jpg',
            side: '/images/dining-table-side.jpg',
            lifestyle: '/images/dining-table-lifestyle.jpg'
          },
          model3D: {
            gltf: '/models/dining-table.gltf',
            glb: '/models/dining-table.glb',
            usdz: '/models/dining-table.usdz'
          },
          arPreview: true,
          customizationOptions: {
            colors: ['Walnut', 'Oak', 'Mahogany'],
            sizes: ['4-seater', '6-seater', '8-seater'],
            materials: ['Solid Wood', 'Engineered Wood']
          },
          stock: { available: 15, reserved: 3, threshold: 5 },
          status: 'active',
          variants: [],
          createdAt: '2025-10-01',
          updatedAt: '2025-10-08'
        }
      ])

      setCategories([
        {
          id: '1',
          name: 'Bedroom',
          slug: 'bedroom',
          description: 'Complete bedroom furniture collection',
          image: '/images/bedroom-category.jpg',
          banner: '/images/bedroom-banner.jpg',
          subCategories: [
            { id: '1a', name: 'Beds', slug: 'beds', description: 'All types of beds', image: '', banner: '', subCategories: [], productCount: 45, isActive: true },
            { id: '1b', name: 'Wardrobes', slug: 'wardrobes', description: 'Storage solutions', image: '', banner: '', subCategories: [], productCount: 32, isActive: true }
          ],
          productCount: 124,
          isActive: true
        },
        {
          id: '2',
          name: 'Living Room',
          slug: 'living-room',
          description: 'Comfortable living room furniture',
          image: '/images/living-room-category.jpg',
          banner: '/images/living-room-banner.jpg',
          subCategories: [
            { id: '2a', name: 'Sofas', slug: 'sofas', description: 'Comfortable seating', image: '', banner: '', subCategories: [], productCount: 67, isActive: true },
            { id: '2b', name: 'Coffee Tables', slug: 'coffee-tables', description: 'Center tables', image: '', banner: '', subCategories: [], productCount: 23, isActive: true }
          ],
          productCount: 156,
          isActive: true
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="relative">
        <img 
          src={product.images.front || '/placeholder-image.jpg'} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-1">
          {product.arPreview && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">AR</span>
          )}
          {product.model3D?.gltf && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">3D</span>
          )}
        </div>
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            product.status === 'active' ? 'bg-green-100 text-green-800' :
            product.status === 'inactive' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {product.status}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">SKU: {product.sku}</p>
        <p className="text-sm text-gray-600 mb-2">{product.category} → {product.subCategory}</p>
        <p className="text-lg font-bold text-gray-900 mb-2">₹{product.price.toLocaleString()}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>Stock: {product.stock.available}</span>
          <span className={product.stock.available <= product.stock.threshold ? 'text-red-600' : 'text-green-600'}>
            {product.stock.available <= product.stock.threshold ? 'Low Stock' : 'In Stock'}
          </span>
        </div>

        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedProduct(product)}
            className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            <EyeIcon className="w-4 h-4 inline mr-1" />
            View
          </button>
          <button className="flex-1 bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
            <PencilIcon className="w-4 h-4 inline mr-1" />
            Edit
          </button>
          <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  const ProductListItem = ({ product }: { product: Product }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <img 
          src={product.images.front || '/placeholder-image.jpg'} 
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-600">SKU: {product.sku} | {product.category} → {product.subCategory}</p>
          <div className="flex items-center space-x-4 mt-1">
            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            <span className="text-sm text-gray-600">Stock: {product.stock.available}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              product.status === 'active' ? 'bg-green-100 text-green-800' :
              product.status === 'inactive' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {product.status}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedProduct(product)}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            View
          </button>
          <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
            Edit
          </button>
          <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  )

  const CategoryCard = ({ category }: { category: Category }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <img 
        src={category.image || '/placeholder-category.jpg'} 
        alt={category.name}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{category.description}</p>
        <p className="text-sm text-gray-600 mb-2">{category.productCount} products</p>
        <p className="text-sm text-gray-600 mb-3">{category.subCategories.length} subcategories</p>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
            <EyeIcon className="w-4 h-4 inline mr-1" />
            View
          </button>
          <button className="flex-1 bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
            <PencilIcon className="w-4 h-4 inline mr-1" />
            Edit
          </button>
        </div>
      </div>
    </div>
  )

  const AddProductModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Add New Product</h2>
        </div>
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option>Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input type="number" className="w-full p-2 border border-gray-300 rounded" />
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <h3 className="text-lg font-medium mb-4">Product Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Front', 'Side', 'Top', 'Back', 'Lifestyle', 'Close-up'].map(type => (
                <div key={type} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <PhotoIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">{type} View</p>
                  <button className="mt-2 text-blue-600 text-sm hover:underline">Upload</button>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Model */}
          <div>
            <h3 className="text-lg font-medium mb-4">3D Model & AR</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <CubeIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">GLTF Model</p>
                <button className="mt-2 text-blue-600 text-sm hover:underline">Upload</button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <CubeIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">GLB Model</p>
                <button className="mt-2 text-blue-600 text-sm hover:underline">Upload</button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <CubeIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">USDZ Model</p>
                <button className="mt-2 text-blue-600 text-sm hover:underline">Upload</button>
              </div>
            </div>
            <div className="mt-4">
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                <CameraIcon className="w-4 h-4 inline mr-2" />
                Auto-Generate 3D Models with AI
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button 
            onClick={() => setShowAddProduct(false)}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Product
          </button>
        </div>
      </div>
    </div>
  )

  const AIToolsPanel = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">🤖 AI & Automation Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="bg-purple-100 text-purple-800 p-4 rounded-lg hover:bg-purple-200 text-center">
          <CameraIcon className="w-8 h-8 mx-auto mb-2" />
          <div className="text-sm font-medium">Generate Missing Images</div>
          <div className="text-xs text-gray-600">AI image generation</div>
        </button>
        <button className="bg-blue-100 text-blue-800 p-4 rounded-lg hover:bg-blue-200 text-center">
          <CubeIcon className="w-8 h-8 mx-auto mb-2" />
          <div className="text-sm font-medium">Create 3D Models</div>
          <div className="text-xs text-gray-600">Auto-generate 3D files</div>
        </button>
        <button className="bg-green-100 text-green-800 p-4 rounded-lg hover:bg-green-200 text-center">
          <DocumentArrowUpIcon className="w-8 h-8 mx-auto mb-2" />
          <div className="text-sm font-medium">Bulk Import CSV</div>
          <div className="text-xs text-gray-600">Import product data</div>
        </button>
        <button className="bg-orange-100 text-orange-800 p-4 rounded-lg hover:bg-orange-200 text-center">
          <ArrowPathIcon className="w-8 h-8 mx-auto mb-2" />
          <div className="text-sm font-medium">Remove Duplicates</div>
          <div className="text-xs text-gray-600">AI duplicate detection</div>
        </button>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600">Manage your furniture catalog with AI-powered tools</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAddCategory(true)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <PlusIcon className="w-4 h-4 inline mr-2" />
            Add Category
          </button>
          <button 
            onClick={() => setShowAddProduct(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="w-4 h-4 inline mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* AI Tools Panel */}
      <AIToolsPanel />

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </button>
            <div className="flex rounded-lg border border-gray-300">
              <button
                onClick={() => setView('grid')}
                className={`p-2 ${view === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              >
                <Squares2X2Icon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 ${view === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
              >
                <ListBulletIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="space-y-6">
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {products.map(product => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* Modals */}
      {showAddProduct && <AddProductModal />}
    </div>
  )
}

export default ProductManagement