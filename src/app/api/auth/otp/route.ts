import { NextRequest, NextResponse } from 'next/server'
import { OTPService } from '@/lib/complete-auth-system'

export async function POST(request: NextRequest) {
  try {
    const { identifier, type } = await request.json()
    
    if (!identifier || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing identifier or type' },
        { status: 400 }
      )
    }

    if (type !== 'email' && type !== 'sms') {
      return NextResponse.json(
        { success: false, error: 'Type must be email or sms' },
        { status: 400 }
      )
    }

    const result = await OTPService.sendOTP(identifier, type)
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { identifier, code } = await request.json()
    
    if (!identifier || !code) {
      return NextResponse.json(
        { success: false, error: 'Missing identifier or code' },
        { status: 400 }
      )
    }

    const result = OTPService.verifyOTP(identifier, code)
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json({ success: true, message: 'OTP verified successfully' })
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to verify OTP' },
      { status: 500 }
    )
  }
}