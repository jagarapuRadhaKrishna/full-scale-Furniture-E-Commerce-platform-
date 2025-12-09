'use client'

import { useState, useEffect } from 'react'
import { 
  ChartBarIcon, 
  CurrencyRupeeIcon, 
  UserGroupIcon, 
  ShoppingCartIcon,
  TruckIcon,
  EyeIcon,
  HeartIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { enhancedProductsData } from '@/data/enhanced-products'

interface AnalyticsData {
  overview: {
    totalRevenue: number
    totalOrders: number
    totalCustomers: number
    conversionRate: number
    averageOrderValue: number
    demoBookings: number
    customDesignRequests: number
  }
  sales: {
    daily: Array<{ date: string; revenue: number; orders: number }>
    monthly: Array<{ month: string; revenue: number; orders: number }>
    byCategory: Array<{ category: string; revenue: number; percentage: number }>
  }
  products: {
    topSelling: Array<{ name: string; sales: number; revenue: number }>
    mostViewed: Array<{ name: string; views: number; category: string }>
    wishlistFavorites: Array<{ name: string; saves: number; category: string }>
  }
  customers: {
    demographics: Array<{ ageGroup: string; percentage: number }>
    geography: Array<{ state: string; customers: number; revenue: number }>
    behavior: {
      avgSessionDuration: number
      bounceRate: number
      returnVisitors: number
    }
  }
  demo: {
    bookingTrends: Array<{ date: string; bookings: number; conversions: number }>
    conversionRate: number
    averageRating: number
    topCategories: Array<{ category: string; bookings: number }>
  }
}

interface MetricCardProps {
  title: string
  value: string | number
  change: number
  icon: React.ComponentType<any>
  format?: 'currency' | 'percentage' | 'number'
}

function MetricCard({ title, value, change, icon: Icon, format = 'number' }: MetricCardProps) {
  const formatValue = (val: string | number) => {
    if (format === 'currency') {
      return `₹${typeof val === 'number' ? val.toLocaleString() : val}`
    }
    if (format === 'percentage') {
      return `${val}%`
    }
    return typeof val === 'number' ? val.toLocaleString() : val
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{formatValue(value)}</p>
        </div>
        <div className="p-3 bg-furniture-brown/10 rounded-full">
          <Icon className="w-6 h-6 text-furniture-brown" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
        <span className="text-sm text-gray-600 ml-2">from last month</span>
      </div>
    </div>
  )
}

interface ChartProps {
  data: any[]
  title: string
  type: 'line' | 'bar' | 'pie'
}

function SimpleChart({ data, title, type }: ChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-center">
          <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">Chart: {title}</p>
          <p className="text-sm text-gray-500">{data.length} data points</p>
        </div>
      </div>
    </div>
  )
}

export default function AdvancedAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateAnalyticsData()
  }, [timeRange, selectedCategory])

  const generateAnalyticsData = async () => {
    setLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generate realistic analytics data
    const data: AnalyticsData = {
      overview: {
        totalRevenue: 2847550,
        totalOrders: 1284,
        totalCustomers: 2156,
        conversionRate: 3.8,
        averageOrderValue: 45280,
        demoBookings: 456,
        customDesignRequests: 78
      },
      sales: {
        daily: generateDailySales(),
        monthly: generateMonthlySales(),
        byCategory: generateCategorySales()
      },
      products: {
        topSelling: generateTopSellingProducts(),
        mostViewed: generateMostViewedProducts(),
        wishlistFavorites: generateWishlistFavorites()
      },
      customers: {
        demographics: [
          { ageGroup: '25-34', percentage: 35 },
          { ageGroup: '35-44', percentage: 28 },
          { ageGroup: '45-54', percentage: 22 },
          { ageGroup: '18-24', percentage: 10 },
          { ageGroup: '55+', percentage: 5 }
        ],
        geography: [
          { state: 'Andhra Pradesh', customers: 450, revenue: 1250000 },
          { state: 'Telangana', customers: 380, revenue: 980000 },
          { state: 'Karnataka', customers: 320, revenue: 850000 },
          { state: 'Tamil Nadu', customers: 280, revenue: 720000 },
          { state: 'Maharashtra', customers: 250, revenue: 650000 }
        ],
        behavior: {
          avgSessionDuration: 8.5,
          bounceRate: 32.4,
          returnVisitors: 68.2
        }
      },
      demo: {
        bookingTrends: generateDemoTrends(),
        conversionRate: 85.2,
        averageRating: 4.7,
        topCategories: [
          { category: 'Living Room', bookings: 156 },
          { category: 'Bedroom', bookings: 134 },
          { category: 'Dining', bookings: 89 },
          { category: 'Office', bookings: 67 },
          { category: 'Kids', bookings: 45 }
        ]
      }
    }

    setAnalyticsData(data)
    setLoading(false)
  }

  const generateDailySales = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365
    const data = []
    
    for (let i = days; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 50000) + 20000,
        orders: Math.floor(Math.random() * 20) + 5
      })
    }
    
    return data
  }

  const generateMonthlySales = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 500000) + 200000,
      orders: Math.floor(Math.random() * 200) + 50
    }))
  }

  const generateCategorySales = () => {
    const categories = ['Bedroom', 'Living Room', 'Dining', 'Office', 'Kids', 'Outdoor']
    const totalRevenue = 2847550
    
    return categories.map(category => {
      const revenue = Math.floor(Math.random() * 600000) + 200000
      return {
        category,
        revenue,
        percentage: Math.round((revenue / totalRevenue) * 100)
      }
    }).sort((a, b) => b.revenue - a.revenue)
  }

  const generateTopSellingProducts = () => {
    return enhancedProductsData.slice(0, 10).map((product, index) => ({
      name: product.name,
      sales: Math.floor(Math.random() * 50) + 10,
      revenue: Math.floor(Math.random() * 200000) + 50000
    })).sort((a, b) => b.sales - a.sales)
  }

  const generateMostViewedProducts = () => {
    return enhancedProductsData.slice(0, 10).map(product => ({
      name: product.name,
      views: Math.floor(Math.random() * 1000) + 100,
      category: product.category
    })).sort((a, b) => b.views - a.views)
  }

  const generateWishlistFavorites = () => {
    return enhancedProductsData.slice(0, 10).map(product => ({
      name: product.name,
      saves: Math.floor(Math.random() * 200) + 20,
      category: product.category
    })).sort((a, b) => b.saves - a.saves)
  }

  const generateDemoTrends = () => {
    const data = []
    for (let i = 30; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const bookings = Math.floor(Math.random() * 20) + 5
      data.push({
        date: date.toISOString().split('T')[0],
        bookings,
        conversions: Math.floor(bookings * 0.85)
      })
    }
    return data
  }

  if (loading || !analyticsData) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-furniture-brown focus:border-transparent"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-furniture-brown focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="bedroom">Bedroom</option>
            <option value="living-room">Living Room</option>
            <option value="dining">Dining</option>
            <option value="office">Office</option>
            <option value="kids">Kids</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Revenue"
          value={analyticsData.overview.totalRevenue}
          change={12.5}
          icon={CurrencyRupeeIcon}
          format="currency"
        />
        <MetricCard
          title="Total Orders"
          value={analyticsData.overview.totalOrders}
          change={8.2}
          icon={ShoppingCartIcon}
        />
        <MetricCard
          title="Total Customers"
          value={analyticsData.overview.totalCustomers}
          change={15.3}
          icon={UserGroupIcon}
        />
        <MetricCard
          title="Conversion Rate"
          value={analyticsData.overview.conversionRate}
          change={2.1}
          icon={ChartBarIcon}
          format="percentage"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Average Order Value"
          value={analyticsData.overview.averageOrderValue}
          change={5.7}
          icon={CurrencyRupeeIcon}
          format="currency"
        />
        <MetricCard
          title="Demo Bookings"
          value={analyticsData.overview.demoBookings}
          change={22.4}
          icon={TruckIcon}
        />
        <MetricCard
          title="Custom Design Requests"
          value={analyticsData.overview.customDesignRequests}
          change={18.9}
          icon={HeartIcon}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SimpleChart
          data={analyticsData.sales.daily}
          title="Daily Sales Trend"
          type="line"
        />
        <SimpleChart
          data={analyticsData.sales.byCategory}
          title="Sales by Category"
          type="pie"
        />
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Selling Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {analyticsData.products.topSelling.slice(0, 5).map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} sales</p>
                </div>
                <span className="text-furniture-brown font-semibold">
                  ₹{product.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Service Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Conversion Rate</span>
              <span className="text-2xl font-bold text-green-600">
                {analyticsData.demo.conversionRate}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Rating</span>
              <span className="text-2xl font-bold text-yellow-600">
                {analyticsData.demo.averageRating}/5
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Top Categories</p>
              {analyticsData.demo.topCategories.slice(0, 3).map((cat, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm text-gray-600">{cat.category}</span>
                  <span className="text-sm font-medium">{cat.bookings} bookings</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Demographics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Demographics</h3>
          <div className="space-y-3">
            {analyticsData.customers.demographics.map((demo, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{demo.ageGroup}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-furniture-brown h-2 rounded-full"
                      style={{ width: `${demo.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{demo.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top States</h3>
          <div className="space-y-3">
            {analyticsData.customers.geography.slice(0, 5).map((geo, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{geo.state}</p>
                  <p className="text-sm text-gray-600">{geo.customers} customers</p>
                </div>
                <span className="text-furniture-brown font-semibold">
                  ₹{(geo.revenue / 100000).toFixed(1)}L
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Behavior Metrics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Behavior</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg. Session Duration</span>
              <span className="text-lg font-semibold">
                {analyticsData.customers.behavior.avgSessionDuration}m
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bounce Rate</span>
              <span className="text-lg font-semibold">
                {analyticsData.customers.behavior.bounceRate}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Return Visitors</span>
              <span className="text-lg font-semibold">
                {analyticsData.customers.behavior.returnVisitors}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="mt-8 flex justify-end space-x-4">
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Export PDF
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Export CSV
        </button>
        <button className="px-4 py-2 bg-furniture-brown text-white rounded-lg hover:bg-furniture-brown/90 transition-colors">
          Schedule Report
        </button>
      </div>
    </div>
  )
}