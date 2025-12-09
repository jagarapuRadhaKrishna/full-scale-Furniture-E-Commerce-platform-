import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/database'

// Simple admin authentication (in production, use proper JWT tokens)
function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  // For demo purposes, accept any token starting with 'admin-'
  // In production, validate proper JWT tokens
  return authHeader?.startsWith('Bearer admin-') || false
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const analytics = await db.getAnalytics()
    const bookings = await db.getBookings()
    const contacts = await db.getContacts()
    const orders = await db.getOrders()

    return NextResponse.json({
      success: true,
      analytics,
      recent: {
        bookings: bookings.slice(0, 5),
        contacts: contacts.slice(0, 5),
        orders: orders.slice(0, 5)
      },
      summary: {
        totalBookings: analytics.totalBookings,
        totalContacts: analytics.totalContacts,
        totalOrders: analytics.totalOrders,
        todayActivity: analytics.todayBookings + analytics.todayContacts + analytics.todayOrders,
        monthlyRevenue: analytics.totalRevenue,
        pendingItems: analytics.pendingBookings + analytics.newContacts + analytics.processingOrders
      }
    })
  } catch (error) {
    console.error('Error fetching admin dashboard:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { action, type, id, data } = await request.json()

    switch (action) {
      case 'update':
        if (type === 'booking') {
          const updated = await db.updateBooking(id, data)
          return NextResponse.json({ success: true, data: updated })
        } else if (type === 'contact') {
          const updated = await db.updateContact(id, data)
          return NextResponse.json({ success: true, data: updated })
        } else if (type === 'order') {
          const updated = await db.updateOrder(id, data)
          return NextResponse.json({ success: true, data: updated })
        }
        break

      case 'delete':
        if (type === 'booking') {
          const deleted = await db.deleteBooking(id)
          return NextResponse.json({ success: deleted })
        }
        break

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  } catch (error) {
    console.error('Error processing admin action:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}