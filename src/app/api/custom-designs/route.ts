// Custom designs API endpoints

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { CustomDesign } from '@/lib/types'
import { v4 as uuidv4 } from 'uuid'

// GET /api/custom-designs - Get all custom design requests
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const { db } = await connectToDatabase()
    
    // Build filter query
    const filter: any = {}
    if (customerId) filter.customerId = customerId
    if (status) filter.status = status
    if (type) filter.type = type

    const skip = (page - 1) * limit

    const designs = await db
      .collection('custom_designs')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    const total = await db.collection('custom_designs').countDocuments(filter)

    return NextResponse.json({
      designs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    })
  } catch (error) {
    console.error('Error fetching custom designs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch custom designs' },
      { status: 500 }
    )
  }
}

// POST /api/custom-designs - Create new custom design request
export async function POST(request: NextRequest) {
  try {
    const designData = await request.json()
    
    const { db } = await connectToDatabase()
    
    // Create new custom design request
    const newDesign: CustomDesign = {
      id: uuidv4(),
      customerId: designData.customerId,
      type: designData.type,
      roomType: designData.roomType,
      budget: designData.budget,
      dimensions: designData.dimensions,
      materials: designData.materials || [],
      style: designData.style,
      colorPreferences: designData.colorPreferences || [],
      description: designData.description,
      images: designData.images || [],
      status: 'submitted',
      includeHomeDemo: designData.includeHomeDemo || false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await db.collection('custom_designs').insertOne(newDesign)
    
    return NextResponse.json({
      success: true,
      designId: result.insertedId,
      design: newDesign,
      message: 'Custom design request submitted successfully. Our team will review and contact you soon.'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating custom design:', error)
    return NextResponse.json(
      { error: 'Failed to create custom design request' },
      { status: 500 }
    )
  }
}