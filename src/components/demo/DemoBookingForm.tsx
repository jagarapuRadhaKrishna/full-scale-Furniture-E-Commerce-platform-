'use client'

import { useState, useEffect } from 'react'
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'
import { useActivityTracker } from '@/lib/activity-tracker'
import { APIService } from '@/lib/api'
import AuthModal from '@/components/auth/AuthModal'

const furnitureCategories = [
  'Bedroom Furniture',
  'Living Room Furniture', 
  'Dining Furniture',
  'Office Furniture',
  'Kids Furniture',
  'Outdoor Furniture',
  'Custom Design',
  'Mixed Categories'
]

const timeSlots = [
  '9:00 AM - 11:00 AM',
  '11:00 AM - 1:00 PM', 
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM'
]

export default function DemoBookingForm() {
  const { user, isAuthenticated, token } = useAuth()
  const { trackDemoBooking } = useActivityTracker()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    preferredDate: '',
    timeSlot: '',
    categories: [] as string[],
    specificProducts: [] as string[],
    notes: '',
    agreedToTerms: false
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  // Auto-fill user data when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email || '',
        phone: user.phone || ''
      }))
    }
  }, [isAuthenticated, user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Check authentication
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    setIsLoading(true)

    try {
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.pincode}`,
        preferredDate: formData.preferredDate,
        preferredTime: formData.timeSlot,
        serviceType: formData.categories.join(', ') || 'Free Demo',
        message: `Categories interested: ${formData.categories.join(', ')}\nSpecific products: ${formData.specificProducts.join(', ')}\nNotes: ${formData.notes}`
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      })

      const result = await response.json()

      if (result.success) {
        // Track demo booking activity
        trackDemoBooking(
          'general',
          formData.categories.join(', ') || 'Mixed Categories',
          formData.preferredDate,
          formData.timeSlot
        )

        // Show success message - NO WhatsApp opening for user
        setSuccess(`Demo booking submitted successfully! 

📋 Booking ID: ${result.bookingId}
📞 Our team will call you within 2 hours
✅ ${result.adminNotificationSent ? 'Admin notification sent successfully' : 'Processing your request'}

Thank you for choosing DFW Furniture!`)
        // Reset form
        setFormData({
          name: user?.name || '',
          phone: user?.phone || '',
          email: user?.email || '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          preferredDate: '',
          timeSlot: '',
          categories: [],
          specificProducts: [],
          notes: '',
          agreedToTerms: false
        })
        setCurrentStep(1)
      } else {
        setError(result.error || 'Failed to submit booking. Please try again.')
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.phone && formData.email
      case 2:
        return formData.address && formData.city && formData.state && formData.pincode && formData.preferredDate && formData.timeSlot
      case 3:
        return formData.categories.length > 0 && formData.agreedToTerms
      default:
        return false
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Book Your FREE Demo Visit
        </h2>
        <p className="text-gray-600">
          Fill in your details to schedule a complimentary home furniture demo
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step <= currentStep
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            
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
                placeholder="Enter your full name"
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
          </div>
        )}

        {/* Step 2: Location and Schedule */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Location & Schedule
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="input-field"
                rows={3}
                placeholder="Enter your complete address"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Enter city"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Enter state"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode *
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="input-field"
                placeholder="110001"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date *
              </label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                className="input-field"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Slot *
              </label>
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Furniture Preferences */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Furniture Preferences
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Furniture Categories * (Select multiple)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {furnitureCategories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="text-primary-600"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="input-field"
                rows={3}
                placeholder="Any specific requirements, room dimensions, color preferences, etc."
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <UserIcon className="h-6 w-6 text-green-500" />
                <div>
                  <h4 className="font-semibold text-gray-900">FREE Demo Service</h4>
                  <p className="text-sm text-gray-600">
                    No charges for home consultation and measurements
                  </p>
                </div>
              </div>
              
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
                <span className="text-sm text-gray-700">
                  I agree to the FREE home demo service and understand the consultation 
                  includes measurements and design recommendations. I also agree to the{' '}
                  <a href="/terms" className="text-primary-600 hover:underline">
                    Terms & Conditions
                  </a>
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Error/Success Messages */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled={currentStep === 1}
          >
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className={`px-6 py-2 rounded-lg font-medium ${
                isStepValid()
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!isStepValid()}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={!isStepValid() || isLoading}
              className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                isStepValid() && !isLoading
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isLoading ? 'Booking...' : 'Book FREE Demo'}
            </button>
          )}
        </div>
      </form>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="login"
      />
    </div>
  )
}