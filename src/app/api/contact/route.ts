import { NextRequest, NextResponse } from 'next/server'
import { automatedWhatsApp } from '@/lib/automated-whatsapp'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message, contactType } = body

    // Validate required fields
    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      )
    }

    // Create contact record
    const contact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      subject: subject || 'General Inquiry',
      message,
      contactType: contactType || 'general',
      status: 'new',
      createdAt: new Date().toISOString(),
      whatsappSent: false
    }

    // Log the contact (in real implementation, save to database)
    console.log('New contact inquiry received:', contact)

    // Send automated notification to admin numbers
    const adminNotification = await automatedWhatsApp.sendContactToAdmin(contact)

    return NextResponse.json({
      success: true,
      message: 'Contact inquiry submitted successfully! Our team will respond within 4 hours.',
      contactId: contact.id,
      adminNotificationSent: adminNotification.success,
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        status: contact.status,
        createdAt: contact.createdAt
      }
    })

  } catch (error) {
    console.error('Error processing contact inquiry:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return contact information
  return NextResponse.json({
    businessName: 'Divya Furniture World (DFW)',
    phones: ['9059737539', '9550897539', '8309228382'],
    email: 'info@dfwfurniture.com',
    address: {
      city: 'Bhimavaram',
      state: 'Andhra Pradesh',
      country: 'India'
    },
    ceo: 'Jagarapu Subrahmanyam',
    businessHours: {
      weekdays: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 8:00 PM', 
      sunday: '10:00 AM - 6:00 PM'
    },
    services: [
      'Custom Furniture Design',
      'Home Interior Consultation',
      'Free Demo & Consultation',
      'Furniture Installation',
      'After-sales Support'
    ]
  })
}