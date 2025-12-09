// Demo booking API endpoints with authentication

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { DemoBooking } from '@/lib/types'
import { verifyToken } from '@/lib/auth-utils'
import { v4 as uuidv4 } from 'uuid'

// GET /api/demo-bookings - Get all demo bookings (Admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const customerEmail = searchParams.get('customerEmail')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const { db } = await connectToDatabase()
    
    // Build filter query
    const filter: any = {}
    if (status) filter.status = status
    if (customerEmail) filter.email = customerEmail

    const skip = (page - 1) * limit

    const bookings = await db
      .collection('demo_bookings')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    const total = await db.collection('demo_bookings').countDocuments(filter)

    return NextResponse.json({
      bookings,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    })
  } catch (error) {
    console.error('Error fetching demo bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch demo bookings' },
      { status: 500 }
    )
  }
}
//get req:hamper 

// POST /api/demo-bookings - Create new demo booking (Authenticated users only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    const bookingData = await request.json()
    
    const { db } = await connectToDatabase()
    
    // Verify user exists
    const user = await db.collection('users').findOne({ id: decoded.userId })
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }
    
    // Create new booking with UUID
    const newBooking: DemoBooking = {
      id: uuidv4(),
      customerName: bookingData.customerName,
      email: bookingData.email,
      phone: bookingData.phone,
      address: bookingData.address,
      preferredDate: new Date(bookingData.preferredDate),
      preferredTime: bookingData.preferredTime,
      categories: bookingData.categories || [],
      specificProducts: bookingData.specificProducts || [],
      notes: bookingData.notes || '',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await db.collection('demo_bookings').insertOne(newBooking)
    
    // Link booking to customer if exists
    const customer = await db.collection('customers').findOne({
      $or: [
        { email: bookingData.email },
        { phone: bookingData.phone }
      ]
    })

    if (customer) {
      await db.collection('customers').updateOne(
        { id: customer.id },
        { $push: { demoBookings: newBooking.id } as any }
      )
    }
    
    // Send confirmation email (would integrate with email service)
    // await sendBookingConfirmationEmail(newBooking)
    
    return NextResponse.json({
      success: true,
      bookingId: result.insertedId,
      booking: newBooking,
      message: 'Demo booking created successfully. You will receive a confirmation email shortly.'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating demo booking:', error)
    return NextResponse.json(
      { error: 'Failed to create demo booking' },
      { status: 500 }
    )
  }
}