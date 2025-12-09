// Database seeding script to populate initial data

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { seedCategories, seedProducts } from '@/lib/seed-data'

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    
    // Clear existing data (only in development)
    if (process.env.NODE_ENV === 'development') {
      await db.collection('products').deleteMany({})
      await db.collection('categories').deleteMany({})
    }
    
    // Add timestamps to seed data
    const categoriesWithTimestamps = seedCategories.map(category => ({
      ...category,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    
    const productsWithTimestamps = seedProducts.map(product => ({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    
    // Insert categories
    await db.collection('categories').insertMany(categoriesWithTimestamps)
    
    // Insert products
    await db.collection('products').insertMany(productsWithTimestamps)
    
    // Create indexes for better performance
    await db.collection('products').createIndex({ category: 1 })
    await db.collection('products').createIndex({ subCategory: 1 })
    await db.collection('products').createIndex({ price: 1 })
    await db.collection('products').createIndex({ rating: -1 })
    await db.collection('products').createIndex({ isNew: 1 })
    
    await db.collection('categories').createIndex({ slug: 1 })
    await db.collection('categories').createIndex({ isActive: 1 })
    
    await db.collection('demo_bookings').createIndex({ email: 1 })
    await db.collection('demo_bookings').createIndex({ status: 1 })
    await db.collection('demo_bookings').createIndex({ createdAt: -1 })
    
    await db.collection('customers').createIndex({ email: 1 })
    await db.collection('customers').createIndex({ phone: 1 })
    
    await db.collection('orders').createIndex({ customerId: 1 })
    await db.collection('orders').createIndex({ status: 1 })
    await db.collection('orders').createIndex({ orderDate: -1 })
    
    await db.collection('reviews').createIndex({ productId: 1 })
    await db.collection('reviews').createIndex({ customerId: 1 })
    await db.collection('reviews').createIndex({ rating: -1 })
    
    await db.collection('support_tickets').createIndex({ customerId: 1 })
    await db.collection('support_tickets').createIndex({ status: 1 })
    await db.collection('support_tickets').createIndex({ priority: 1 })
    
    await db.collection('custom_designs').createIndex({ customerId: 1 })
    await db.collection('custom_designs').createIndex({ status: 1 })
    
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      stats: {
        categories: categoriesWithTimestamps.length,
        products: productsWithTimestamps.length,
        indexesCreated: true
      }
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}