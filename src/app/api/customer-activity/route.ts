// Real-time Customer-Admin Integration API
// Connects customer actions to admin dashboard

import { NextRequest, NextResponse } from 'next/server'

interface CustomerActivity {
  id: string
  customerId: string
  customerName: string
  action: string
  details: any
  timestamp: string
  type: 'product_view' | 'cart_add' | 'order_place' | 'demo_book' | 'design_request' | 'user_signup'
}

interface AdminNotification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'urgent'
  timestamp: string
  customerData?: any
}

// In-memory storage for real-time data (in production, use Redis or database)
let customerActivities: CustomerActivity[] = []
let adminNotifications: AdminNotification[] = []
let realtimeStats = {
  activeUsers: 0,
  todayOrders: 0,
  todayRevenue: 0,
  pendingDemos: 0,
  newSignups: 0,
  cartAbandonment: 0
}

// POST /api/customer-activity - Log customer activity
export async function POST(request: NextRequest) {
  try {
    const activity: Omit<CustomerActivity, 'id' | 'timestamp'> = await request.json()
    
    const newActivity: CustomerActivity = {
      id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...activity,
      timestamp: new Date().toISOString()
    }
    
    // Add to activities log
    customerActivities.unshift(newActivity)
    
    // Keep only last 100 activities
    if (customerActivities.length > 100) {
      customerActivities = customerActivities.slice(0, 100)
    }
    
    // Create admin notification based on activity type
    const notification = createAdminNotification(newActivity)
    if (notification) {
      adminNotifications.unshift(notification)
      
      // Keep only last 50 notifications
      if (adminNotifications.length > 50) {
        adminNotifications = adminNotifications.slice(0, 50)
      }
    }
    
    // Update real-time stats
    updateRealtimeStats(newActivity)
    
    return NextResponse.json({ 
      success: true, 
      activityId: newActivity.id,
      message: 'Activity logged successfully' 
    })
    
  } catch (error) {
    console.error('Error logging customer activity:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to log activity' 
    }, { status: 500 })
  }
}

// GET /api/customer-activity - Get activities for admin dashboard
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '20')
  const type = searchParams.get('type')
  
  let filteredActivities = customerActivities
  
  if (type) {
    filteredActivities = customerActivities.filter(activity => activity.type === type)
  }
  
  return NextResponse.json({
    activities: filteredActivities.slice(0, limit),
    notifications: adminNotifications.slice(0, 10),
    stats: realtimeStats,
    totalActivities: filteredActivities.length
  })
}

function createAdminNotification(activity: CustomerActivity): AdminNotification | null {
  switch (activity.type) {
    case 'order_place':
      return {
        id: `notif_${Date.now()}`,
        title: 'New Order Placed!',
        message: `${activity.customerName} placed an order worth ₹${activity.details.amount?.toLocaleString()}`,
        type: 'success',
        timestamp: activity.timestamp,
        customerData: {
          customerId: activity.customerId,
          orderAmount: activity.details.amount,
          products: activity.details.products
        }
      }
      
    case 'demo_book':
      return {
        id: `notif_${Date.now()}`,
        title: 'Demo Booking Request',
        message: `${activity.customerName} booked a demo for ${activity.details.productName}`,
        type: 'info',
        timestamp: activity.timestamp,
        customerData: {
          customerId: activity.customerId,
          productName: activity.details.productName,
          scheduledDate: activity.details.scheduledDate
        }
      }
      
    case 'design_request':
      return {
        id: `notif_${Date.now()}`,
        title: 'Custom Design Request',
        message: `${activity.customerName} submitted a design request (Budget: ₹${activity.details.budget?.toLocaleString()})`,
        type: 'info',
        timestamp: activity.timestamp,
        customerData: {
          customerId: activity.customerId,
          projectType: activity.details.projectType,
          budget: activity.details.budget
        }
      }
      
    case 'user_signup':
      return {
        id: `notif_${Date.now()}`,
        title: 'New User Registration',
        message: `${activity.customerName} just signed up!`,
        type: 'success',
        timestamp: activity.timestamp,
        customerData: {
          customerId: activity.customerId,
          email: activity.details.email
        }
      }
      
    case 'cart_add':
      if (activity.details.cartValue > 50000) { // High-value cart
        return {
          id: `notif_${Date.now()}`,
          title: 'High-Value Cart Alert',
          message: `${activity.customerName} has ₹${activity.details.cartValue?.toLocaleString()} worth items in cart`,
          type: 'warning',
          timestamp: activity.timestamp,
          customerData: {
            customerId: activity.customerId,
            cartValue: activity.details.cartValue,
            products: activity.details.products
          }
        }
      }
      return null
      
    default:
      return null
  }
}

function updateRealtimeStats(activity: CustomerActivity) {
  switch (activity.type) {
    case 'order_place':
      realtimeStats.todayOrders++
      realtimeStats.todayRevenue += activity.details.amount || 0
      break
      
    case 'demo_book':
      realtimeStats.pendingDemos++
      break
      
    case 'user_signup':
      realtimeStats.newSignups++
      break
      
    case 'product_view':
      // Track active users (simplified)
      realtimeStats.activeUsers = Math.max(1, realtimeStats.activeUsers + Math.random() > 0.7 ? 1 : -1)
      break
  }
}