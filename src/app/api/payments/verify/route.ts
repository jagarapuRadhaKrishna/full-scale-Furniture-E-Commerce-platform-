import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/lib/payment-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.orderId || !body.paymentMethod) {
      return NextResponse.json(
        { success: false, error: 'Missing orderId or paymentMethod' },
        { status: 400 }
      )
    }

    // Verify payment
    const result = await PaymentService.verifyPayment({
      orderId: body.orderId,
      paymentId: body.paymentId,
      signature: body.signature,
      status: body.status,
      paymentMethod: body.paymentMethod
    })

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    // Send admin notification about successful payment
    try {
      const { automatedWhatsApp } = await import('@/lib/automated-whatsapp')
      const order = PaymentService.getOrder(body.orderId)
      
      if (order && result.success) {
        // Use the contact method to send payment notification
        await automatedWhatsApp.sendContactToAdmin({
          name: order.customerInfo.name,
          email: order.customerInfo.email,
          phone: order.customerInfo.phone,
          subject: `Payment Successful - Order ${order.orderId}`,
          message: `Payment of ₹${order.amount} completed successfully via ${order.paymentMethod.toUpperCase()}. Transaction ID: ${result.transactionId || 'N/A'}`
        })
      }
    } catch (notificationError) {
      console.error('Failed to send payment notification:', notificationError)
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      transactionId: result.transactionId,
      amount: result.amount,
      status: result.status
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}