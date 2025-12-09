'use client'

import { useState, useEffect } from 'react'
import { 
  EyeIcon, 
  ShoppingCartIcon, 
  UserIcon,
  ArrowTrendingUpIcon,
  CurrencyRupeeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

interface RealtimeStats {
  activeUsers: number
  todayOrders: number
  todayRevenue: number
  todayDemoBookings: number
  cartAdditions: number
  productViews: number
  newSignups: number
  conversionRate: number
}

export default function RealTimeStats() {
  const [stats, setStats] = useState<RealtimeStats>({
    activeUsers: 0,
    todayOrders: 0,
    todayRevenue: 0,
    todayDemoBookings: 0,
    cartAdditions: 0,
    productViews: 0,
    newSignups: 0,
    conversionRate: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch initial stats
    fetchStats()

    // Set up polling for real-time updates (every 10 seconds)
    const interval = setInterval(fetchStats, 10000)

    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/customer-activity/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats || stats)
      }
    } catch (error) {
      console.error('Failed to fetch real-time stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: UserIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      suffix: ' online'
    },
    {
      title: "Today's Orders",
      value: stats.todayOrders,
      icon: ShoppingCartIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      suffix: ' orders'
    },
    {
      title: "Today's Revenue",
      value: stats.todayRevenue,
      icon: CurrencyRupeeIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      prefix: '₹',
      format: 'currency'
    },
    {
      title: 'Demo Bookings',
      value: stats.todayDemoBookings,
      icon: CalendarIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      suffix: ' today'
    },
    {
      title: 'Cart Additions',
      value: stats.cartAdditions,
      icon: ShoppingCartIcon,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      suffix: ' today'
    },
    {
      title: 'Product Views',
      value: stats.productViews,
      icon: EyeIcon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      suffix: ' today'
    },
    {
      title: 'New Signups',
      value: stats.newSignups,
      icon: UserIcon,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      suffix: ' today'
    },
    {
      title: 'Conversion Rate',
      value: stats.conversionRate,
      icon: ArrowTrendingUpIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      suffix: '%',
      format: 'percentage'
    }
  ]

  const formatValue = (value: number, format?: string, prefix?: string) => {
    if (format === 'currency') {
      return `₹${value.toLocaleString()}`
    }
    if (format === 'percentage') {
      return value.toFixed(1)
    }
    if (prefix) {
      return `${prefix}${value.toLocaleString()}`
    }
    return value.toLocaleString()
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Real-Time Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Live Updates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {formatValue(stat.value, stat.format, stat.prefix)}
                    {stat.suffix && (
                      <span className="text-sm font-normal text-gray-500">
                        {stat.suffix}
                      </span>
                    )}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <IconComponent className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              
              {/* Live indicator for active metrics */}
              {(['Active Users', 'Product Views', 'Cart Additions'].includes(stat.title)) && (
                <div className="mt-4 flex items-center">
                  <div className="h-1 w-1 bg-green-500 rounded-full animate-ping mr-2"></div>
                  <span className="text-xs text-green-600 font-medium">Live</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Quick Insights</h3>
          <button 
            onClick={fetchStats}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Refresh
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {stats.conversionRate.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600">Conversion Rate</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              ₹{(stats.todayRevenue / Math.max(stats.todayOrders, 1)).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Avg Order Value</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {((stats.cartAdditions / Math.max(stats.productViews, 1)) * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600">Add to Cart Rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}