// Categories API endpoints

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Category } from '@/lib/types'

// GET /api/categories - Get all categories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get('includeInactive') === 'true'

    const { db } = await connectToDatabase()
    
    const filter = includeInactive ? {} : { isActive: true }
    
    const categories = await db
      .collection('categories')
      .find(filter)
      .sort({ name: 1 })
      .toArray()

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST /api/categories - Create new category (Admin only)
export async function POST(request: NextRequest) {
  try {
    const categoryData: Category = await request.json()
    
    const { db } = await connectToDatabase()
    
    // Add timestamps
    categoryData.createdAt = new Date()
    categoryData.updatedAt = new Date()
    
    const result = await db.collection('categories').insertOne(categoryData)
    
    return NextResponse.json({
      success: true,
      categoryId: result.insertedId,
      message: 'Category created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}