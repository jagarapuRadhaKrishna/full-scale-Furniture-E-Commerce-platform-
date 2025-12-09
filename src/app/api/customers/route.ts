// Customers API endpoints

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Customer } from '@/lib/types'
import { v4 as uuidv4 } from 'uuid'

// GET /api/customers - Get all customers (Admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const phone = searchParams.get('phone')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const { db } = await connectToDatabase()
    
    // Build filter query
    const filter: any = {}
    if (email) filter.email = email
    if (phone) filter.phone = phone

    const skip = (page - 1) * limit

    const customers = await db
      .collection('customers')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    const total = await db.collection('customers').countDocuments(filter)

    return NextResponse.json({
      customers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    })
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }
}

// POST /api/customers - Create new customer
export async function POST(request: NextRequest) {
  try {
    const customerData = await request.json()
    
    const { db } = await connectToDatabase()
    
    // Check if customer already exists
    const existingCustomer = await db
      .collection('customers')
      .findOne({ 
        $or: [
          { email: customerData.email },
          { phone: customerData.phone }
        ]
      })
    
    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Customer with this email or phone already exists' },
        { status: 409 }
      )
    }
    
    // Create new customer
    const newCustomer: Customer = {
      id: uuidv4(),
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      addresses: customerData.addresses || [],
      orders: [],
      demoBookings: [],
      preferences: {
        categories: customerData.preferences?.categories || [],
        priceRange: customerData.preferences?.priceRange || { min: 0, max: 1000000 }
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await db.collection('customers').insertOne(newCustomer)
    
    return NextResponse.json({
      success: true,
      customerId: result.insertedId,
      customer: newCustomer,
      message: 'Customer created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating customer:', error)
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    )
  }
}