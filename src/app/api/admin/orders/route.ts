// Admin orders management API

import { NextRequest, NextResponse } from 'next/server'
import { extractAdminToken, verifyAdminToken, hasPermission, ADMIN_PERMISSIONS } from '@/lib/admin-auth'

// Sample orders data (in production, fetch from database)
const ORDERS_DATA = [
  {
    id: '1',
    orderNumber: 'DFW2024001',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@email.com',
    customerPhone: '+91 9876543210',
    date: '2024-01-15T10:30:00Z',
    status: 'delivered',
    items: [
      {
        id: 1,
        name: 'Premium Sectional Sofa',
        price: 89999,
        quantity: 1,
        image: '/images/products/sofa-1.jpg'
      }
    ],
    total: 94999,
    deliveryAddress: '123 Main Street, Mumbai, Maharashtra 400001',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    trackingNumber: 'DFW123456789',
    estimatedDelivery: '2024-01-18',
    actualDelivery: '2024-01-17'
  },
  {
    id: '2',
    orderNumber: 'DFW2024002',
    customerName: 'Priya Patel',
    customerEmail: 'priya.patel@email.com',
    customerPhone: '+91 8765432109',
    date: '2024-01-18T14:20:00Z',
    status: 'shipped',
    items: [
      {
        id: 2,
        name: 'Teak Wood Dining Set',
        price: 75999,
        quantity: 1,
        image: '/images/products/dining-1.jpg'
      }
    ],
    total: 80999,
    deliveryAddress: '456 Garden Road, Delhi, Delhi 110001',
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    trackingNumber: 'DFW987654321',
    estimatedDelivery: '2024-01-22'
  },
  {
    id: '3',
    orderNumber: 'DFW2024003',
    customerName: 'Amit Kumar',
    customerEmail: 'amit.kumar@email.com',
    customerPhone: '+91 7654321098',
    date: '2024-01-20T09:15:00Z',
    status: 'processing',
    items: [
      {
        id: 3,
        name: 'Modern Bed Frame',
        price: 45999,
        quantity: 1,
        image: '/images/products/bedroom-1.jpg'
      }
    ],
    total: 50999,
    deliveryAddress: '789 Tech Park, Bangalore, Karnataka 560001',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    estimatedDelivery: '2024-01-25'
  },
  {
    id: '4',
    orderNumber: 'DFW2024004',
    customerName: 'Sneha Gupta',
    customerEmail: 'sneha.gupta@email.com',
    customerPhone: '+91 6543210987',
    date: '2024-01-19T16:45:00Z',
    status: 'confirmed',
    items: [
      {
        id: 4,
        name: 'Executive Office Chair',
        price: 25999,
        quantity: 2,
        image: '/images/products/office-1.jpg'
      }
    ],
    total: 56998,
    deliveryAddress: '321 Business District, Chennai, Tamil Nadu 600001',
    paymentMethod: 'netbanking',
    paymentStatus: 'paid',
    estimatedDelivery: '2024-01-24'
  },
  {
    id: '5',
    orderNumber: 'DFW2024005',
    customerName: 'Ravi Singh',
    customerEmail: 'ravi.singh@email.com',
    customerPhone: '+91 5432109876',
    date: '2024-01-21T11:30:00Z',
    status: 'cancelled',
    items: [
      {
        id: 5,
        name: 'Kids Study Table',
        price: 15999,
        quantity: 1,
        image: '/images/products/kids-1.jpg'
      }
    ],
    total: 18999,
    deliveryAddress: '654 Residential Area, Pune, Maharashtra 411001',
    paymentMethod: 'card',
    paymentStatus: 'refunded',
    cancelReason: 'Customer requested cancellation'
  }
]

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

    if (!hasPermission(payload.permissions, ADMIN_PERMISSIONS.ORDERS_READ)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const search = url.searchParams.get('search') || ''
    const status = url.searchParams.get('status') || 'all'
    const dateFrom = url.searchParams.get('dateFrom') || ''
    const dateTo = url.searchParams.get('dateTo') || ''

    let filteredOrders = ORDERS_DATA

    // Apply search filter
    if (search) {
      filteredOrders = filteredOrders.filter(order => 
        order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
        order.customerPhone.includes(search)
      )
    }

    // Apply status filter
    if (status !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.status === status)
    }

    // Apply date filter
    if (dateFrom) {
      filteredOrders = filteredOrders.filter(order => 
        new Date(order.date) >= new Date(dateFrom)
      )
    }
    if (dateTo) {
      filteredOrders = filteredOrders.filter(order => 
        new Date(order.date) <= new Date(dateTo)
      )
    }

    // Sort by date (newest first)
    filteredOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

    return NextResponse.json({
      orders: paginatedOrders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredOrders.length / limit),
        totalOrders: filteredOrders.length,
        hasNext: endIndex < filteredOrders.length,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Admin orders fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
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

    if (!hasPermission(payload.permissions, ADMIN_PERMISSIONS.ORDERS_WRITE)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const { orderId, action, status, trackingNumber, notes } = await request.json()

    if (!orderId || !action) {
      return NextResponse.json(
        { error: 'Order ID and action are required' },
        { status: 400 }
      )
    }

    // Find order and update (in production, update in database)
    const orderIndex = ORDERS_DATA.findIndex(order => order.id === orderId)
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    const order = ORDERS_DATA[orderIndex]

    switch (action) {
      case 'updateStatus':
        if (status) {
          order.status = status
          if (status === 'shipped' && trackingNumber) {
            order.trackingNumber = trackingNumber
          }
          if (status === 'delivered') {
            order.actualDelivery = new Date().toISOString().split('T')[0]
          }
        }
        break
      case 'addTracking':
        if (trackingNumber) {
          order.trackingNumber = trackingNumber
        }
        break
      case 'cancel':
        order.status = 'cancelled'
        order.paymentStatus = 'refunded'
        if (notes) {
          order.cancelReason = notes
        }
        break
    }

    return NextResponse.json({
      success: true,
      order: order
    })
  } catch (error) {
    console.error('Admin order update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}