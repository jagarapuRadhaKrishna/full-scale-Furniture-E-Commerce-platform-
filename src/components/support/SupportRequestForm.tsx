'use client'

import { useState } from 'react'

const serviceTypes = [
  'Furniture Repair',
  'Assembly Service', 
  'Maintenance',
  'Cleaning Service',
  'Hardware Replacement',
  'Other'
]

const urgencyLevels = [
  'Normal (3-5 days)',
  'Urgent (1-2 days)',
  'Emergency (Same day)'
]

export default function SupportRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: '',
    urgency: '',
    description: '',
    preferredDate: '',
    preferredTime: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Support request submitted:', formData)
    alert('Support request submitted! Our technician will contact you shortly.')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Request Support Service
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="input-field"
            rows={2}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Type *
            </label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">Select service type</option>
              {serviceTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Urgency *
            </label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">Select urgency</option>
              {urgencyLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Problem Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="input-field"
            rows={4}
            placeholder="Please describe the issue in detail..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date
            </label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleInputChange}
              className="input-field"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Time
            </label>
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">Any time</option>
              <option value="morning">Morning (9 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
              <option value="evening">Evening (4 PM - 8 PM)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-200"
        >
          Submit Support Request
        </button>
      </form>
    </div>
  )
}