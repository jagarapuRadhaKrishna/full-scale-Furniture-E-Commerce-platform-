// Orders API endpoints

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Order } from '@/lib/types'
import { v4 as uuidv4 } from 'uuid'

// GET /api/orders - Get all orders with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')
    const status = searchParams.get('status')
    const paymentStatus = searchParams.get('paymentStatus')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const { db } = await connectToDatabase()
    
    // Build filter query
    const filter: any = {}
    if (customerId) filter.customerId = customerId
    if (status) filter.status = status
    if (paymentStatus) filter.paymentStatus = paymentStatus

    const skip = (page - 1) * limit

    const orders = await db
      .collection('orders')
      .find(filter)
      .sort({ orderDate: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    const total = await db.collection('orders').countDocuments(filter)

    return NextResponse.json({
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()
    
    const { db } = await connectToDatabase()
    
    // Calculate total amount
    const totalAmount = orderData.items.reduce((total: number, item: any) => {
      return total + (parseFloat(item.price.replace(/[₹,]/g, '')) * item.quantity)
    }, 0)
    
    // Create new order
    const newOrder: Order = {
      id: uuidv4(),
      customerId: orderData.customerId,
      items: orderData.items,
      totalAmount,
      status: 'pending',
      paymentStatus: 'pending',
      deliveryAddress: orderData.deliveryAddress,
      orderDate: new Date(),
      expectedDelivery: orderData.expectedDelivery ? new Date(orderData.expectedDelivery) : undefined,
      trackingId: `DFW${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      notes: orderData.notes || '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await db.collection('orders').insertOne(newOrder)
    
    // Update customer's order history
    await db.collection('customers').updateOne(
      { id: orderData.customerId },
      { $push: { orders: newOrder.id } as any }
    )
    
    return NextResponse.json({
      success: true,
      orderId: result.insertedId,
      order: newOrder,
      message: 'Order created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}