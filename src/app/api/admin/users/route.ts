// Admin users management API

import { NextRequest, NextResponse } from 'next/server'
import { extractAdminToken, verifyAdminToken, hasPermission, ADMIN_PERMISSIONS } from '@/lib/admin-auth'

// Sample user data (in production, fetch from database)
const USERS_DATA = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 9876543210',
    joinDate: '2024-01-15',
    status: 'active',
    orders: 12,
    totalSpent: 245000,
    lastLogin: '2024-01-20T10:30:00Z',
    location: 'Mumbai, Maharashtra'
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 8765432109',
    joinDate: '2024-01-10',
    status: 'active',
    orders: 8,
    totalSpent: 180000,
    lastLogin: '2024-01-19T15:45:00Z',
    location: 'Delhi, Delhi'
  },
  {
    id: '3',
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 7654321098',
    joinDate: '2024-01-05',
    status: 'inactive',
    orders: 3,
    totalSpent: 75000,
    lastLogin: '2024-01-10T09:20:00Z',
    location: 'Bangalore, Karnataka'
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    email: 'sneha.gupta@email.com',
    phone: '+91 6543210987',
    joinDate: '2024-01-12',
    status: 'active',
    orders: 15,
    totalSpent: 320000,
    lastLogin: '2024-01-20T14:15:00Z',
    location: 'Chennai, Tamil Nadu'
  },
  {
    id: '5',
    name: 'Ravi Singh',
    email: 'ravi.singh@email.com',
    phone: '+91 5432109876',
    joinDate: '2024-01-08',
    status: 'active',
    orders: 6,
    totalSpent: 125000,
    lastLogin: '2024-01-18T11:00:00Z',
    location: 'Pune, Maharashtra'
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

    if (!hasPermission(payload.permissions, ADMIN_PERMISSIONS.USERS_READ)) {
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

    let filteredUsers = USERS_DATA

    // Apply search filter
    if (search) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search)
      )
    }

    // Apply status filter
    if (status !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === status)
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return NextResponse.json({
      users: paginatedUsers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredUsers.length / limit),
        totalUsers: filteredUsers.length,
        hasNext: endIndex < filteredUsers.length,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Admin users fetch error:', error)
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

    if (!hasPermission(payload.permissions, ADMIN_PERMISSIONS.USERS_WRITE)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const { userId, action, status } = await request.json()

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'User ID and action are required' },
        { status: 400 }
      )
    }

    // Find user and update (in production, update in database)
    const userIndex = USERS_DATA.findIndex(user => user.id === userId)
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (action === 'updateStatus' && status) {
      USERS_DATA[userIndex].status = status
    }

    return NextResponse.json({
      success: true,
      user: USERS_DATA[userIndex]
    })
  } catch (error) {
    console.error('Admin user update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}