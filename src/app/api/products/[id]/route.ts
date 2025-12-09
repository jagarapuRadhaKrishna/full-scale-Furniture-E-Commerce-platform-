// Individual product API endpoints

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { ObjectId } from 'mongodb'

// GET /api/products/[id] - Get product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { db } = await connectToDatabase()
    
    const product = await db
      .collection('products')
      .findOne({ _id: new ObjectId(id) })
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Update product (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const updateData = await request.json()
    const { db } = await connectToDatabase()
    
    // Add updated timestamp
    updateData.updatedAt = new Date()
    
    const result = await db
      .collection('products')
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      )
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Product updated successfully'
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Delete product (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { db } = await connectToDatabase()
    
    const result = await db
      .collection('products')
      .deleteOne({ _id: new ObjectId(id) })
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}