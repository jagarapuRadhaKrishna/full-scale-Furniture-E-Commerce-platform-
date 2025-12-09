// Demo & Custom Design Management Component
// Feature 5 from DFW Admin Panel Blueprint

'use client'

import React, { useState, useEffect } from 'react'
import { 
  CalendarIcon,
  UserIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
  EyeIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  PhotoIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  StarIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

interface DemoBooking {
  id: string
  bookingNumber: string
  customer: {
    id: string
    name: string
    email: string
    phone: string
    address: string
  }
  product: {
    id: string
    name: string
    category: string
    image: string
  }
  scheduledDate: string
  timeSlot: string
  technician?: {
    id: string
    name: string
    phone: string
    expertise: string[]
  }
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled'
  notes?: string
  feedback?: {
    rating: number
    comments: string
    likelihood: number // 1-10 scale for purchase likelihood
  }
  conversionStatus: 'pending' | 'converted' | 'not-converted'
  followUpDate?: string
  createdAt: string
}

interface CustomDesignRequest {
  id: string
  requestNumber: string
  customer: {
    id: string
    name: string
    email: string
    phone: string
  }
  projectType: 'bedroom' | 'living-room' | 'dining' | 'office' | 'full-home'
  budget: {
    min: number
    max: number
  }
  requirements: string
  specifications: {
    rooms: number
    style: string
    timeline: string
    specialRequests: string[]
  }
  attachments: {
    sketches: string[]
    inspirationImages: string[]
    roomMeasurements: string[]
  }
  assignedDesigner?: {
    id: string
    name: string
    expertise: string[]
  }
  status: 'submitted' | 'under-review' | 'in-design' | 'review-pending' | 'revision-requested' | 'approved' | 'completed' | 'cancelled'
  designFiles?: {
    concepts: string[]
    finalDesign: string[]
    _3dRenderings: string[]
  }
  revisionCount: number
  estimatedCost?: number
  timeline: {
    designPhase: string
    manufacturingPhase: string
    deliveryPhase: string
  }
  createdAt: string
  updatedAt: string
}

interface Technician {
  id: string
  name: string
  phone: string
  email: string
  expertise: string[]
  availability: {
    [key: string]: string[] // date: time slots
  }
  location: string
  rating: number
  completedDemos: number
  conversionRate: number
}

const DemoCustomDesignManagement = () => {
  const [activeTab, setActiveTab] = useState<'demos' | 'designs'>('demos')
  const [demoBookings, setDemoBookings] = useState<DemoBooking[]>([])
  const [customDesigns, setCustomDesigns] = useState<CustomDesignRequest[]>([])
  const [technicians, setTechnicians] = useState<Technician[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDemo, setSelectedDemo] = useState<DemoBooking | null>(null)
  const [selectedDesign, setSelectedDesignRequest] = useState<CustomDesignRequest | null>(null)
  const [calendarView, setCalendarView] = useState(false)

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      setDemoBookings([
        {
          id: '1',
          bookingNumber: 'DEMO-2025-001',
          customer: {
            id: 'cust-1',
            name: 'Priya Sharma',
            email: 'priya@example.com',
            phone: '+91 98765 43210',
            address: 'Sector 15, Gurgaon, Haryana'
          },
          product: {
            id: 'prod-1',
            name: 'Luxury Living Room Set',
            category: 'Living Room',
            image: '/images/living-room-set.jpg'
          },
          scheduledDate: '2025-10-12',
          timeSlot: '10:00 AM - 12:00 PM',
          technician: {
            id: 'tech-1',
            name: 'Rahul Kumar',
            phone: '+91 98765 12345',
            expertise: ['Living Room', 'Modular Furniture']
          },
          status: 'confirmed',
          notes: 'Customer specifically interested in modular sofa options',
          conversionStatus: 'pending',
          followUpDate: '2025-10-13',
          createdAt: '2025-10-05T10:00:00Z'
        }
      ])

      setCustomDesigns([
        {
          id: '1',
          requestNumber: 'CDR-2025-001',
          customer: {
            id: 'cust-2',
            name: 'Amit Patel',
            email: 'amit@example.com',
            phone: '+91 98765 67890'
          },
          projectType: 'full-home',
          budget: { min: 500000, max: 800000 },
          requirements: 'Need complete home furnishing for 3BHK apartment. Modern contemporary style with smart storage solutions.',
          specifications: {
            rooms: 3,
            style: 'Modern Contemporary',
            timeline: '2-3 months',
            specialRequests: ['Smart storage', 'Space optimization', 'Kid-friendly furniture']
          },
          attachments: {
            sketches: ['/uploads/sketch1.jpg', '/uploads/sketch2.jpg'],
            inspirationImages: ['/uploads/inspiration1.jpg'],
            roomMeasurements: ['/uploads/measurements.pdf']
          },
          assignedDesigner: {
            id: 'des-1',
            name: 'Sneha Design Studio',
            expertise: ['Contemporary', 'Space Planning', 'Smart Homes']
          },
          status: 'in-design',
          revisionCount: 1,
          estimatedCost: 650000,
          timeline: {
            designPhase: '2 weeks',
            manufacturingPhase: '6-8 weeks',
            deliveryPhase: '1 week'
          },
          createdAt: '2025-09-28T14:30:00Z',
          updatedAt: '2025-10-05T16:20:00Z'
        }
      ])

      setTechnicians([
        {
          id: 'tech-1',
          name: 'Rahul Kumar',
          phone: '+91 98765 12345',
          email: 'rahul@dfwfurniture.com',
          expertise: ['Living Room', 'Modular Furniture', 'Assembly'],
          availability: {
            '2025-10-12': ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'],
            '2025-10-13': ['9:00 AM - 11:00 AM', '3:00 PM - 5:00 PM']
          },
          location: 'Delhi NCR',
          rating: 4.8,
          completedDemos: 156,
          conversionRate: 78
        }
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'rescheduled': 'bg-orange-100 text-orange-800',
      'submitted': 'bg-gray-100 text-gray-800',
      'under-review': 'bg-blue-100 text-blue-800',
      'in-design': 'bg-purple-100 text-purple-800',
      'review-pending': 'bg-yellow-100 text-yellow-800',
      'revision-requested': 'bg-orange-100 text-orange-800',
      'approved': 'bg-green-100 text-green-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const DemoBookingCard = ({ booking }: { booking: DemoBooking }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{booking.bookingNumber}</h3>
          <p className="text-sm text-gray-600">{booking.product.name}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <UserIcon className="w-4 h-4 mr-2" />
          {booking.customer.name}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <PhoneIcon className="w-4 h-4 mr-2" />
          {booking.customer.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="w-4 h-4 mr-2" />
          {new Date(booking.scheduledDate).toLocaleDateString()} • {booking.timeSlot}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPinIcon className="w-4 h-4 mr-2" />
          {booking.customer.address}
        </div>
        {booking.technician && (
          <div className="flex items-center text-sm text-gray-600">
            <WrenchScrewdriverIcon className="w-4 h-4 mr-2" />
            {booking.technician.name}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
            booking.conversionStatus === 'converted' ? 'bg-green-100 text-green-800' :
            booking.conversionStatus === 'not-converted' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {booking.conversionStatus}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedDemo(booking)}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            <EyeIcon className="w-4 h-4 inline mr-1" />
            View
          </button>
          <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
            <PencilIcon className="w-4 h-4 inline mr-1" />
            Edit
          </button>
        </div>
      </div>
    </div>
  )

  const CustomDesignCard = ({ design }: { design: CustomDesignRequest }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{design.requestNumber}</h3>
          <p className="text-sm text-gray-600 capitalize">{design.projectType.replace('-', ' ')}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(design.status)}`}>
          {design.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <UserIcon className="w-4 h-4 mr-2" />
          {design.customer.name}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <CurrencyRupeeIcon className="w-4 h-4 mr-2" />
          Budget: ₹{design.budget.min.toLocaleString()} - ₹{design.budget.max.toLocaleString()}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <HomeIcon className="w-4 h-4 mr-2" />
          {design.specifications.rooms} rooms • {design.specifications.style}
        </div>
        {design.assignedDesigner && (
          <div className="flex items-center text-sm text-gray-600">
            <PencilIcon className="w-4 h-4 mr-2" />
            {design.assignedDesigner.name}
          </div>
        )}
        {design.estimatedCost && (
          <div className="flex items-center text-sm text-green-600">
            <CurrencyRupeeIcon className="w-4 h-4 mr-2" />
            Estimated: ₹{design.estimatedCost.toLocaleString()}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Revisions: {design.revisionCount}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedDesignRequest(design)}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            <EyeIcon className="w-4 h-4 inline mr-1" />
            View
          </button>
          <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
            <PencilIcon className="w-4 h-4 inline mr-1" />
            Edit
          </button>
        </div>
      </div>
    </div>
  )

  const DemoDetailModal = ({ demo }: { demo: DemoBooking }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Demo Details - {demo.bookingNumber}</h2>
            <button
              onClick={() => setSelectedDemo(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Customer Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {demo.customer.name}</p>
                <p><span className="font-medium">Email:</span> {demo.customer.email}</p>
                <p><span className="font-medium">Phone:</span> {demo.customer.phone}</p>
                <p><span className="font-medium">Address:</span> {demo.customer.address}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Demo Schedule</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Date:</span> {new Date(demo.scheduledDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Time:</span> {demo.timeSlot}</p>
                <p><span className="font-medium">Product:</span> {demo.product.name}</p>
                <p><span className="font-medium">Category:</span> {demo.product.category}</p>
              </div>
            </div>
          </div>

          {demo.technician && (
            <div>
              <h3 className="text-lg font-medium mb-3">Assigned Technician</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <WrenchScrewdriverIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{demo.technician.name}</p>
                    <p className="text-sm text-gray-600">{demo.technician.phone}</p>
                    <p className="text-sm text-gray-600">
                      Expertise: {demo.technician.expertise.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {demo.feedback && (
            <div>
              <h3 className="text-lg font-medium mb-3">Customer Feedback</h3>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{demo.feedback.rating}/5</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{demo.feedback.comments}</p>
                <p className="text-sm text-gray-600">
                  Purchase Likelihood: {demo.feedback.likelihood}/10
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const DesignDetailModal = ({ design }: { design: CustomDesignRequest }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Design Request - {design.requestNumber}</h2>
            <button
              onClick={() => setSelectedDesignRequest(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Project Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Project Type:</span> {design.projectType.replace('-', ' ')}</p>
                <p><span className="font-medium">Budget:</span> ₹{design.budget.min.toLocaleString()} - ₹{design.budget.max.toLocaleString()}</p>
                <p><span className="font-medium">Rooms:</span> {design.specifications.rooms}</p>
                <p><span className="font-medium">Style:</span> {design.specifications.style}</p>
                <p><span className="font-medium">Timeline:</span> {design.specifications.timeline}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Customer Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {design.customer.name}</p>
                <p><span className="font-medium">Email:</span> {design.customer.email}</p>
                <p><span className="font-medium">Phone:</span> {design.customer.phone}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Requirements</h3>
            <p className="text-gray-700 bg-gray-50 rounded-lg p-4">{design.requirements}</p>
          </div>

          {design.specifications.specialRequests.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3">Special Requests</h3>
              <div className="flex flex-wrap gap-2">
                {design.specifications.specialRequests.map((request, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {request}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-medium mb-3">Attachments</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Sketches ({design.attachments.sketches.length})</h4>
                <div className="space-y-1">
                  {design.attachments.sketches.map((sketch, index) => (
                    <div key={index} className="flex items-center text-sm text-blue-600 hover:underline cursor-pointer">
                      <PhotoIcon className="w-4 h-4 mr-1" />
                      Sketch {index + 1}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Inspiration ({design.attachments.inspirationImages.length})</h4>
                <div className="space-y-1">
                  {design.attachments.inspirationImages.map((image, index) => (
                    <div key={index} className="flex items-center text-sm text-blue-600 hover:underline cursor-pointer">
                      <PhotoIcon className="w-4 h-4 mr-1" />
                      Image {index + 1}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Measurements ({design.attachments.roomMeasurements.length})</h4>
                <div className="space-y-1">
                  {design.attachments.roomMeasurements.map((measurement, index) => (
                    <div key={index} className="flex items-center text-sm text-blue-600 hover:underline cursor-pointer">
                      <DocumentTextIcon className="w-4 h-4 mr-1" />
                      Document {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {design.assignedDesigner && (
            <div>
              <h3 className="text-lg font-medium mb-3">Assigned Designer</h3>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="font-medium">{design.assignedDesigner.name}</p>
                <p className="text-sm text-gray-600">
                  Expertise: {design.assignedDesigner.expertise.join(', ')}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Timeline</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Design Phase:</span> {design.timeline.designPhase}</p>
                <p><span className="font-medium">Manufacturing:</span> {design.timeline.manufacturingPhase}</p>
                <p><span className="font-medium">Delivery:</span> {design.timeline.deliveryPhase}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Project Status</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Current Status:</span> 
                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(design.status)}`}>
                    {design.status}
                  </span>
                </p>
                <p><span className="font-medium">Revisions:</span> {design.revisionCount}</p>
                {design.estimatedCost && (
                  <p><span className="font-medium">Estimated Cost:</span> ₹{design.estimatedCost.toLocaleString()}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const StatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100">
            <CalendarIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Upcoming Demos</p>
            <p className="text-2xl font-semibold text-gray-900">12</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Demo Conversion</p>
            <p className="text-2xl font-semibold text-gray-900">78%</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100">
            <PencilIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Active Designs</p>
            <p className="text-2xl font-semibold text-gray-900">8</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-orange-100">
            <CurrencyRupeeIcon className="w-6 h-6 text-orange-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Design Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">₹24L</p>
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <h1 className="text-2xl font-bold text-gray-900">Demo & Custom Design Management</h1>
          <p className="text-gray-600">Manage demo bookings and custom design requests</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setCalendarView(!calendarView)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <CalendarIcon className="w-4 h-4 inline mr-2" />
            {calendarView ? 'List View' : 'Calendar View'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('demos')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'demos'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Demo Bookings ({demoBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('designs')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'designs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Custom Designs ({customDesigns.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'demos' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {demoBookings.map(booking => (
                <DemoBookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {customDesigns.map(design => (
                <CustomDesignCard key={design.id} design={design} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {selectedDemo && <DemoDetailModal demo={selectedDemo} />}
      {selectedDesign && <DesignDetailModal design={selectedDesign} />}
    </div>
  )
}

export default DemoCustomDesignManagement