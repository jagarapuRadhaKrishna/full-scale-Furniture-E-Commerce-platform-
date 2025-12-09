// User dashboard page

'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  CalendarIcon, 
  ShoppingBagIcon, 
  CogIcon, 
  HeartIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import AuthModal from '@/components/auth/AuthModal'
import { APIService } from '@/lib/api'

interface DashboardData {
  demoBookings: any[]
  orders: any[]
  reviews: any[]
}

export default function DashboardPage() {
  const { user, isAuthenticated, token } = useAuth()
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [activeTab, setActiveTab] = useState('bookings')
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    demoBookings: [],
    orders: [],
    reviews: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
    } else {
      loadDashboardData()
    }
  }, [isAuthenticated])

  const loadDashboardData = async () => {
    if (!token) return

    try {
      setIsLoading(true)
      
      // In a real app, you'd have endpoints to get user-specific data
      const [bookingsRes, ordersRes, reviewsRes] = await Promise.all([
        APIService.getDemoBookings({ customerEmail: user?.email }),
        APIService.getOrders({ customerId: user?.id }),
        APIService.getReviews({ customerId: user?.id })
      ])

      setDashboardData({
        demoBookings: (bookingsRes as any).bookings || [],
        orders: (ordersRes as any).orders || [],
        reviews: (reviewsRes as any).reviews || []
      })
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <ClockIcon className="w-4 h-4" />
      case 'confirmed': case 'completed': return <CheckCircleIcon className="w-4 h-4" />
      case 'cancelled': return <XCircleIcon className="w-4 h-4" />
      default: return <ClockIcon className="w-4 h-4" />
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please Login to Access Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your bookings and orders
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
          >
            Login to Continue
          </button>
        </div>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => router.push('/')}
          defaultMode="login"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Manage your bookings, orders, and account settings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CalendarIcon className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Demo Bookings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.demoBookings.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ShoppingBagIcon className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.orders.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <HeartIcon className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reviews</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData.reviews.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CogIcon className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Account</p>
                <p className="text-sm text-green-600 font-medium">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'bookings', name: 'Demo Bookings', icon: CalendarIcon },
                { id: 'orders', name: 'Orders', icon: ShoppingBagIcon },
                { id: 'reviews', name: 'Reviews', icon: HeartIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                <p className="mt-4 text-gray-600">Loading your data...</p>
              </div>
            ) : (
              <>
                {/* Demo Bookings Tab */}
                {activeTab === 'bookings' && (
                  <div className="space-y-4">
                    {dashboardData.demoBookings.length === 0 ? (
                      <div className="text-center py-12">
                        <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No demo bookings yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Book a FREE home demo to experience our furniture in your space
                        </p>
                        <button
                          onClick={() => router.push('/book-demo')}
                          className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
                        >
                          Book Demo Now
                        </button>
                      </div>
                    ) : (
                      dashboardData.demoBookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
                              Demo Booking #{booking.id.slice(-8)}
                            </h4>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <p><strong>Date:</strong> {new Date(booking.preferredDate).toLocaleDateString()}</p>
                              <p><strong>Time:</strong> {booking.preferredTime}</p>
                            </div>
                            <div>
                              <p><strong>Categories:</strong> {booking.categories.join(', ')}</p>
                              <p><strong>Address:</strong> {booking.address.city}, {booking.address.state}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div className="space-y-4">
                    {dashboardData.orders.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingBagIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No orders yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Start shopping for premium furniture
                        </p>
                        <button
                          onClick={() => router.push('/categories')}
                          className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
                        >
                          Browse Furniture
                        </button>
                      </div>
                    ) : (
                      dashboardData.orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
                              Order #{order.id.slice(-8)}
                            </h4>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div>
                              <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                              <p><strong>Total:</strong> ₹{order.totalAmount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p><strong>Items:</strong> {order.items.length} item(s)</p>
                              <p><strong>Payment:</strong> {order.paymentStatus}</p>
                            </div>
                            <div>
                              {order.trackingId && (
                                <p><strong>Tracking:</strong> {order.trackingId}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {dashboardData.reviews.length === 0 ? (
                      <div className="text-center py-12">
                        <HeartIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No reviews yet
                        </h3>
                        <p className="text-gray-600">
                          Share your experience with our products
                        </p>
                      </div>
                    ) : (
                      dashboardData.reviews.map((review) => (
                        <div key={review.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{review.title}</h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}