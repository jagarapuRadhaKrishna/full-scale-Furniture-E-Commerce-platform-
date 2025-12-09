import { NextRequest, NextResponse } from 'next/server'
import { automatedWhatsApp } from '@/lib/automated-whatsapp'

export async function POST(request: NextRequest) {
  try {
    // Test the admin notification system
    const testResult = await automatedWhatsApp.testNotificationSystem()
    
    return NextResponse.json({
      success: testResult.success,
      message: 'Admin notification test completed',
      adminNumbers: automatedWhatsApp.getAdminInfo().allNumbers,
      testDetails: testResult.details
    })
  } catch (error) {
    console.error('Error testing admin notifications:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to test admin notifications',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const adminInfo = automatedWhatsApp.getAdminInfo()
    
    return NextResponse.json({
      success: true,
      adminInfo: {
        primaryNumber: adminInfo.primaryNumber,
        secondaryNumber: adminInfo.secondaryNumber,
        businessName: adminInfo.businessName,
        totalNumbers: adminInfo.allNumbers.length
      },
      message: 'Admin notification system is configured and ready'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get admin info' },
      { status: 500 }
    )
  }
}