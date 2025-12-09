import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/database'
import { automatedWhatsApp } from '@/lib/automated-whatsapp'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      email, 
      phone, 
      address, 
      preferredDate, 
      preferredTime, 
      serviceType, 
      message 
    } = body

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone number are required' },
        { status: 400 }
      )
    }

    // Create booking record in database
    const booking = await db.createBooking({
      name,
      email: email || '',
      phone,
      address: address || '',
      preferredDate: preferredDate || '',
      preferredTime: preferredTime || '',
      serviceType: serviceType || 'Free Demo',
      message: message || '',
      status: 'pending',
      whatsappSent: false
    })

    // Log the booking
    console.log('New booking created:', booking)

    // Send automated notification to admin numbers (no user WhatsApp opening)
    const adminNotification = await automatedWhatsApp.sendBookingToAdmin(booking)
    
    // Update booking status to indicate notification sent
    if (adminNotification.success) {
      await db.updateBooking(booking.id, { whatsappSent: true })
    }

    // Prepare response (NO WhatsApp URL for user)
    return NextResponse.json({
      success: true,
      message: 'Booking request submitted successfully! Our team will contact you within 2 hours.',
      bookingId: booking.id,
      adminNotificationSent: adminNotification.success,
      booking: {
        id: booking.id,
        name: booking.name,
        phone: booking.phone,
        status: booking.status,
        createdAt: booking.createdAt
      }
    })

  } catch (error) {
    console.error('Error processing booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const bookings = await db.getBookings()
    const analytics = await db.getAnalytics()
    
    return NextResponse.json({
      success: true,
      bookings,
      analytics: {
        total: analytics.totalBookings,
        pending: analytics.pendingBookings,
        today: analytics.todayBookings,
        thisMonth: analytics.monthlyBookings
      }
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}