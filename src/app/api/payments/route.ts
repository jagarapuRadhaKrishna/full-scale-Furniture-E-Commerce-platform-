import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/lib/payment-service'
import { requireAuth } from '@/lib/complete-auth-system'

// Create payment order
export const POST = requireAuth(async (request: NextRequest, user) => {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.amount || !body.paymentMethod || !body.items || !body.customerInfo) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate payment method
    if (!['razorpay', 'payu', 'cod'].includes(body.paymentMethod)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment method' },
        { status: 400 }
      )
    }

    // Create payment order
    const result = await PaymentService.createPaymentOrder({
      amount: body.amount,
      currency: body.currency || 'INR',
      paymentMethod: body.paymentMethod,
      customerInfo: {
        name: body.customerInfo.name || `${user.firstName} ${user.lastName}`,
        email: body.customerInfo.email || user.email,
        phone: body.customerInfo.phone || user.phone || ''
      },
      items: body.items
    })

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Create payment order error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
})

// Get payment orders (admin only)
export const GET = requireAuth(async (request: NextRequest, user) => {
  try {
    if (user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      )
    }

    const orders = PaymentService.getAllOrders()
    const analytics = PaymentService.getPaymentAnalytics()

    return NextResponse.json({
      success: true,
      orders,
      analytics
    })
  } catch (error) {
    console.error('Get payment orders error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get payment orders' },
      { status: 500 }
    )
  }
})