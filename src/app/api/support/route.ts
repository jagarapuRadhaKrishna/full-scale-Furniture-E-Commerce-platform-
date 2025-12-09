// Support tickets API endpoints

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { SupportTicket } from '@/lib/types'
import { v4 as uuidv4 } from 'uuid'

// GET /api/support - Get all support tickets
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const { db } = await connectToDatabase()
    
    // Build filter query
    const filter: any = {}
    if (customerId) filter.customerId = customerId
    if (type) filter.type = type
    if (status) filter.status = status
    if (priority) filter.priority = priority

    const skip = (page - 1) * limit

    const tickets = await db
      .collection('support_tickets')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    const total = await db.collection('support_tickets').countDocuments(filter)

    return NextResponse.json({
      tickets,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    })
  } catch (error) {
    console.error('Error fetching support tickets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch support tickets' },
      { status: 500 }
    )
  }
}

// POST /api/support - Create new support ticket
export async function POST(request: NextRequest) {
  try {
    const ticketData = await request.json()
    
    const { db } = await connectToDatabase()
    
    // Create new support ticket
    const newTicket: SupportTicket = {
      id: uuidv4(),
      customerId: ticketData.customerId,
      type: ticketData.type,
      subject: ticketData.subject,
      description: ticketData.description,
      priority: ticketData.priority || 'medium',
      status: 'open',
      images: ticketData.images || [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await db.collection('support_tickets').insertOne(newTicket)
    
    return NextResponse.json({
      success: true,
      ticketId: result.insertedId,
      ticket: newTicket,
      message: 'Support ticket created successfully. Our team will contact you soon.'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating support ticket:', error)
    return NextResponse.json(
      { error: 'Failed to create support ticket' },
      { status: 500 }
    )
  }
}