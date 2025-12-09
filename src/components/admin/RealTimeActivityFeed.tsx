'use client'

import { useState, useEffect } from 'react'
import { 
  EyeIcon, 
  ShoppingCartIcon, 
  ShoppingBagIcon, 
  CalendarIcon,
  PaintBrushIcon,
  UserPlusIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

interface CustomerActivity {
  id: string
  customerId: string
  customerName: string
  action: string
  details: any
  type: 'product_view' | 'cart_add' | 'order_place' | 'demo_book' | 'design_request' | 'user_signup' | 'page_view' | 'category_view'
  timestamp: string
}

export default function RealTimeActivityFeed() {
  const [activities, setActivities] = useState<CustomerActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch initial activities
    fetchActivities()

    // Set up polling for real-time updates (every 5 seconds)
    const interval = setInterval(fetchActivities, 5000)

    return () => clearInterval(interval)
  }, [])

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/customer-activity')
      if (response.ok) {
        const data = await response.json()
        setActivities(data.activities || [])
      }
    } catch (error) {
      console.error('Failed to fetch activities:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'product_view':
        return <EyeIcon className="h-5 w-5 text-blue-500" />
      case 'cart_add':
        return <ShoppingCartIcon className="h-5 w-5 text-green-500" />
      case 'order_place':
        return <ShoppingBagIcon className="h-5 w-5 text-purple-500" />
      case 'demo_book':
        return <CalendarIcon className="h-5 w-5 text-orange-500" />
      case 'design_request':
        return <PaintBrushIcon className="h-5 w-5 text-pink-500" />
      case 'user_signup':
        return <UserPlusIcon className="h-5 w-5 text-indigo-500" />
      case 'page_view':
        return <EyeIcon className="h-5 w-5 text-gray-500" />
      case 'category_view':
        return <EyeIcon className="h-5 w-5 text-teal-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-400" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'product_view':
        return 'border-l-blue-500'
      case 'cart_add':
        return 'border-l-green-500'
      case 'order_place':
        return 'border-l-purple-500'
      case 'demo_book':
        return 'border-l-orange-500'
      case 'design_request':
        return 'border-l-pink-500'
      case 'user_signup':
        return 'border-l-indigo-500'
      case 'page_view':
        return 'border-l-gray-500'
      case 'category_view':
        return 'border-l-teal-500'
      default:
        return 'border-l-gray-400'
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-Time Customer Activity</h3>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Real-Time Customer Activity</h3>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Live</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ClockIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className={`border-l-4 ${getActivityColor(activity.type)} bg-gray-50 p-3 rounded-r-lg hover:bg-gray-100 transition-colors`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.customerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.action}
                  </p>
                  
                  {/* Additional details based on activity type */}
                  {activity.type === 'product_view' && activity.details?.productName && (
                    <p className="text-xs text-gray-500 mt-1">
                      Product: {activity.details.productName}
                    </p>
                  )}
                  
                  {activity.type === 'cart_add' && activity.details && (
                    <div className="text-xs text-gray-500 mt-1">
                      <p>Added: {activity.details.productName}</p>
                      <p>Quantity: {activity.details.quantity} | Price: ₹{activity.details.price?.toLocaleString()}</p>
                    </div>
                  )}
                  
                  {activity.type === 'order_place' && activity.details && (
                    <div className="text-xs text-gray-500 mt-1">
                      <p>Order: {activity.details.orderId}</p>
                      <p>Amount: ₹{activity.details.amount?.toLocaleString()} | Items: {activity.details.productCount}</p>
                    </div>
                  )}
                  
                  {activity.type === 'demo_book' && activity.details && (
                    <div className="text-xs text-gray-500 mt-1">
                      <p>Product: {activity.details.productName}</p>
                      <p>Date: {activity.details.scheduledDate} at {activity.details.timeSlot}</p>
                    </div>
                  )}
                  
                  {activity.type === 'category_view' && activity.details && (
                    <p className="text-xs text-gray-500 mt-1">
                      Category: {activity.details.categoryName} ({activity.details.productCount} products)
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {activities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Showing last {activities.length} activities</span>
            <button 
              onClick={fetchActivities}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  )
}