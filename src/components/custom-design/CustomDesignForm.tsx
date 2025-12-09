'use client'

import { useState } from 'react'
import { PhotoIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline'

const furnitureTypes = [
  'Sofa Set',
  'Dining Table',
  'Bed Frame',
  'Wardrobe',
  'TV Unit',
  'Study Table',
  'Office Chair',
  'Coffee Table',
  'Kitchen Cabinets',
  'Bookshelf',
  'Other'
]

const materials = [
  'Solid Wood (Teak)',
  'Solid Wood (Sheesham)',
  'Engineered Wood',
  'Metal Frame',
  'Fabric Upholstery',
  'Leather Upholstery',
  'Glass',
  'Mixed Materials'
]

const budgetRanges = [
  '₹10,000 - ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹100,000',
  '₹100,000 - ₹200,000',
  'Above ₹200,000'
]

export default function CustomDesignForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    furnitureType: '',
    material: '',
    budget: '',
    dimensions: '',
    colorPreference: '',
    description: '',
    roomDimensions: '',
    includeDemo: false
  })

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      setUploadedFiles(prev => [...prev, ...files])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadedFiles(prev => [...prev, ...files])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Custom design request submitted:', formData, uploadedFiles)
    alert('Custom design request submitted! Our design team will contact you within 24 hours.')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Submit Custom Design Request
        </h2>
        <p className="text-gray-600">
          Tell us about your dream furniture and we&apos;ll make it reality
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input-field"
              placeholder="+91 98765 43210"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input-field"
            placeholder="your.email@example.com"
            required
          />
        </div>

        {/* Furniture Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Furniture Type *
            </label>
            <select
              name="furnitureType"
              value={formData.furnitureType}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">Select furniture type</option>
              {furnitureTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Material *
            </label>
            <select
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">Select material</option>
              {materials.map((material) => (
                <option key={material} value={material}>{material}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget Range *
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">Select budget range</option>
              {budgetRanges.map((budget) => (
                <option key={budget} value={budget}>{budget}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color Preference
            </label>
            <input
              type="text"
              name="colorPreference"
              value={formData.colorPreference}
              onChange={handleInputChange}
              className="input-field"
              placeholder="e.g., Dark brown, White, Natural wood"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Approximate Dimensions
          </label>
          <input
            type="text"
            name="dimensions"
            value={formData.dimensions}
            onChange={handleInputChange}
            className="input-field"
            placeholder="e.g., 6ft x 4ft x 3ft (L x W x H)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Room Dimensions
          </label>
          <input
            type="text"
            name="roomDimensions"
            value={formData.roomDimensions}
            onChange={handleInputChange}
            className="input-field"
            placeholder="e.g., 12ft x 10ft room"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Sketches/Photos/References
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop files here, or{' '}
              <label className="text-primary-600 cursor-pointer hover:underline">
                browse
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </p>
            <p className="text-sm text-gray-500">
              Images, PDFs, or documents up to 10MB each
            </p>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <DocumentIcon className="h-5 w-5 text-gray-500" />
                  <span className="flex-1 text-sm text-gray-700 truncate">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Detailed Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="input-field"
            rows={4}
            placeholder="Describe your vision in detail. Include style preferences, specific features, usage requirements, etc."
            required
          />
        </div>

        {/* Include Demo Option */}
        <div className="bg-furniture-cream p-4 rounded-lg">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="includeDemo"
              checked={formData.includeDemo}
              onChange={handleInputChange}
              className="mt-1"
            />
            <div>
              <span className="font-medium text-gray-900">
                Include FREE Home Demo Visit
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Our designer will visit your home with material samples and discuss 
                the design in detail. Highly recommended for custom projects.
              </p>
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition duration-200"
        >
          Submit Custom Design Request
        </button>

        <p className="text-xs text-gray-500 text-center">
          Our design team will review your request and contact you within 24 hours 
          with initial concepts and timeline.
        </p>
      </form>
    </div>
  )
}