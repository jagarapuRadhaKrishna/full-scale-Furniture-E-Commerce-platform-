// Statistics and analytics API endpoints

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    
    // Get overall statistics
    const [
      totalProducts,
      totalCategories,
      totalCustomers,
      totalOrders,
      totalDemoBookings,
      totalReviews,
      totalSupportTickets,
      totalCustomDesigns
    ] = await Promise.all([
      db.collection('products').countDocuments(),
      db.collection('categories').countDocuments({ isActive: true }),
      db.collection('customers').countDocuments(),
      db.collection('orders').countDocuments(),
      db.collection('demo_bookings').countDocuments(),
      db.collection('reviews').countDocuments(),
      db.collection('support_tickets').countDocuments(),
      db.collection('custom_designs').countDocuments()
    ])
    
    // Get category-wise product counts
    const categoryStats = await db.collection('products').aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      },
      { $sort: { count: -1 } }
    ]).toArray()
    
    // Get order status breakdown
    const orderStats = await db.collection('orders').aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' }
        }
      }
    ]).toArray()
    
    // Get demo booking status breakdown
    const demoStats = await db.collection('demo_bookings').aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]).toArray()
    
    // Get support ticket metrics
    const supportStats = await db.collection('support_tickets').aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]).toArray()
    
    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const [
      recentOrders,
      recentBookings,
      recentCustomers,
      recentReviews
    ] = await Promise.all([
      db.collection('orders').countDocuments({ 
        createdAt: { $gte: thirtyDaysAgo } 
      }),
      db.collection('demo_bookings').countDocuments({ 
        createdAt: { $gte: thirtyDaysAgo } 
      }),
      db.collection('customers').countDocuments({ 
        createdAt: { $gte: thirtyDaysAgo } 
      }),
      db.collection('reviews').countDocuments({ 
        createdAt: { $gte: thirtyDaysAgo } 
      })
    ])
    
    // Get top-rated products
    const topProducts = await db.collection('products')
      .find()
      .sort({ rating: -1, reviews: -1 })
      .limit(5)
      .toArray()
    
    return NextResponse.json({
      overview: {
        totalProducts,
        totalCategories,
        totalCustomers,
        totalOrders,
        totalDemoBookings,
        totalReviews,
        totalSupportTickets,
        totalCustomDesigns
      },
      categoryStats,
      orderStats,
      demoStats,
      supportStats,
      recentActivity: {
        orders: recentOrders,
        bookings: recentBookings,
        customers: recentCustomers,
        reviews: recentReviews
      },
      topProducts: topProducts.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        rating: product.rating,
        reviews: product.reviews,
        price: product.price
      }))
    })
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}