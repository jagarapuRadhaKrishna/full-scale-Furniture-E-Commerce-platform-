// Reviews API endpoints

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Review } from '@/lib/types'
import { v4 as uuidv4 } from 'uuid'

// GET /api/reviews - Get all reviews with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const customerId = searchParams.get('customerId')
    const rating = searchParams.get('rating')
    const verified = searchParams.get('verified')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const { db } = await connectToDatabase()
    
    // Build filter query
    const filter: any = {}
    if (productId) filter.productId = productId
    if (customerId) filter.customerId = customerId
    if (rating) filter.rating = parseInt(rating)
    if (verified !== null) filter.isVerified = verified === 'true'

    const skip = (page - 1) * limit

    const reviews = await db
      .collection('reviews')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    const total = await db.collection('reviews').countDocuments(filter)

    return NextResponse.json({
      reviews,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST /api/reviews - Create new review
export async function POST(request: NextRequest) {
  try {
    const reviewData = await request.json()
    
    const { db } = await connectToDatabase()
    
    // Check if customer has already reviewed this product
    const existingReview = await db
      .collection('reviews')
      .findOne({ 
        productId: reviewData.productId,
        customerId: reviewData.customerId
      })
    
    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this product' },
        { status: 409 }
      )
    }
    
    // Create new review
    const newReview: Review = {
      id: uuidv4(),
      productId: reviewData.productId,
      customerId: reviewData.customerId,
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      images: reviewData.images || [],
      isVerified: false, // Will be verified after purchase confirmation
      helpfulVotes: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await db.collection('reviews').insertOne(newReview)
    
    // Update product's average rating and review count
    const allProductReviews = await db
      .collection('reviews')
      .find({ productId: reviewData.productId })
      .toArray()
    
    const avgRating = allProductReviews.reduce((sum, review) => sum + review.rating, 0) / allProductReviews.length
    
    await db.collection('products').updateOne(
      { id: parseInt(reviewData.productId) },
      { 
        $set: { 
          rating: Math.round(avgRating * 10) / 10,
          reviews: allProductReviews.length
        }
      } as any
    )
    
    return NextResponse.json({
      success: true,
      reviewId: result.insertedId,
      review: newReview,
      message: 'Review submitted successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}