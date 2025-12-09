import { NextRequest, NextResponse } from 'next/server'

// Get real-time stats for admin dashboard
export async function GET(request: NextRequest) {
  try {
    // In a real application, these would come from your database
    // For demo purposes, we'll simulate some live data
    const stats = {
      activeUsers: Math.floor(Math.random() * 25) + 15, // 15-40 users
      todayOrders: Math.floor(Math.random() * 20) + 5, // 5-25 orders
      todayRevenue: Math.floor(Math.random() * 500000) + 100000, // ₹1L-6L
      todayDemoBookings: Math.floor(Math.random() * 8) + 2, // 2-10 bookings
      cartAdditions: Math.floor(Math.random() * 50) + 20, // 20-70 additions
      productViews: Math.floor(Math.random() * 200) + 100, // 100-300 views
      newSignups: Math.floor(Math.random() * 15) + 3, // 3-18 signups
      conversionRate: (Math.random() * 3) + 1.5 // 1.5-4.5%
    }

    return NextResponse.json({
      success: true,
      stats: stats,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching real-time stats:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch stats' 
    }, { status: 500 })
  }
}