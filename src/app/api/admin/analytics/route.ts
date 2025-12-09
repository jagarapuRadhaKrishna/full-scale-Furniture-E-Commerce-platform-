// Admin analytics API

import { NextRequest, NextResponse } from 'next/server'
import { extractAdminToken, verifyAdminToken, hasPermission, ADMIN_PERMISSIONS } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  try {
    const token = extractAdminToken(request)
    if (!token) {
      return NextResponse.json(
        { error: 'Admin authentication required' },
        { status: 401 }
      )
    }

    const payload = verifyAdminToken(token)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid admin token' },
        { status: 401 }
      )
    }

    if (!hasPermission(payload.permissions, ADMIN_PERMISSIONS.ANALYTICS_READ)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    // Sample analytics data (in production, fetch from database)
    const analytics = {
      overview: {
        totalUsers: 1247,
        totalOrders: 856,
        totalRevenue: 12450000,
        averageOrderValue: 14500,
        growthMetrics: {
          usersGrowth: 15.2,
          ordersGrowth: 23.1,
          revenueGrowth: 18.7
        }
      },
      recentStats: {
        todayOrders: 12,
        todayRevenue: 175000,
        pendingOrders: 23,
        shippedOrders: 45,
        newCustomers: 8
      },
      salesChart: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [850000, 920000, 1100000, 980000, 1250000, 1400000, 1320000, 1580000, 1450000, 1680000, 1520000, 1750000]
      },
      categoryPerformance: [
        { category: 'Living Room', revenue: 4200000, orders: 320, percentage: 35 },
        { category: 'Bedroom', revenue: 3100000, orders: 280, percentage: 26 },
        { category: 'Dining', revenue: 2800000, orders: 195, percentage: 23 },
        { category: 'Office', revenue: 1500000, orders: 156, percentage: 12 },
        { category: 'Kids', revenue: 850000, orders: 89, percentage: 7 }
      ],
      topProducts: [
        {
          id: 1,
          name: 'Premium Sectional Sofa',
          sales: 89,
          revenue: 8009000,
          category: 'Living Room',
          image: '/images/products/sofa-1.jpg'
        },
        {
          id: 2,
          name: 'Teak Wood Dining Set',
          sales: 67,
          revenue: 5091000,
          category: 'Dining',
          image: '/images/products/dining-1.jpg'
        },
        {
          id: 3,
          name: 'Executive Office Chair',
          sales: 134,
          revenue: 3483000,
          category: 'Office',
          image: '/images/products/office-1.jpg'
        },
        {
          id: 4,
          name: 'Modern Bed Frame',
          sales: 78,
          revenue: 3587000,
          category: 'Bedroom',
          image: '/images/products/bedroom-1.jpg'
        }
      ],
      customerInsights: {
        totalCustomers: 1247,
        activeCustomers: 892,
        newThisMonth: 156,
        topLocations: [
          { city: 'Mumbai', customers: 234, percentage: 18.8 },
          { city: 'Delhi', customers: 198, percentage: 15.9 },
          { city: 'Bangalore', customers: 167, percentage: 13.4 },
          { city: 'Chennai', customers: 134, percentage: 10.7 },
          { city: 'Pune', customers: 112, percentage: 9.0 }
        ]
      },
      orderTrends: {
        thisWeek: [
          { day: 'Mon', orders: 12, revenue: 175000 },
          { day: 'Tue', orders: 18, revenue: 245000 },
          { day: 'Wed', orders: 15, revenue: 198000 },
          { day: 'Thu', orders: 22, revenue: 312000 },
          { day: 'Fri', orders: 19, revenue: 278000 },
          { day: 'Sat', orders: 25, revenue: 356000 },
          { day: 'Sun', orders: 14, revenue: 189000 }
        ]
      },
      paymentMethods: [
        { method: 'Card', percentage: 45, amount: 5602500 },
        { method: 'UPI', percentage: 32, amount: 3984000 },
        { method: 'Net Banking', percentage: 15, amount: 1867500 },
        { method: 'COD', percentage: 8, amount: 996000 }
      ]
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Admin analytics fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}