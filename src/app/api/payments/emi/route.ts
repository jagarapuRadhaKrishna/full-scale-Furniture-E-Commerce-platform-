import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/lib/payment-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const amount = parseFloat(searchParams.get('amount') || '0')
    
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid amount is required' },
        { status: 400 }
      )
    }

    // Minimum amount for EMI
    if (amount < 5000) {
      return NextResponse.json(
        { success: false, error: 'EMI is available for orders above ₹5,000' },
        { status: 400 }
      )
    }

    const emiOptions = PaymentService.getEMIOptions(amount)

    return NextResponse.json({
      success: true,
      amount,
      emiOptions,
      message: 'EMI options calculated successfully'
    })
  } catch (error) {
    console.error('EMI options error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to calculate EMI options' },
      { status: 500 }
    )
  }
}