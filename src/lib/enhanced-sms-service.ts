// Enhanced SMS service with proper error handling and formatting

import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export interface SMSResult {
  success: boolean
  error?: string
  messageId?: string
}

export async function sendSMSOTP(phone: string, otp: string, purpose: string): Promise<SMSResult> {
  try {
    // Validate Twilio configuration
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      console.error('Twilio configuration missing')
      return { 
        success: false, 
        error: 'SMS service configuration error. Please contact support.' 
      }
    }

    // Format the message
    const message = createSMSMessage(otp, purpose)
    
    // Send SMS
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
    
    console.log(`SMS sent successfully to ${phone}, Message SID: ${result.sid}`)
    
    return { 
      success: true, 
      messageId: result.sid 
    }
  } catch (error: any) {
    console.error('SMS sending failed:', error)
    
    // Handle specific Twilio errors
    if (error.code === 21211) {
      return { success: false, error: 'Invalid phone number format' }
    } else if (error.code === 21408) {
      return { success: false, error: 'Phone number not reachable' }
    } else if (error.code === 21610) {
      return { success: false, error: 'Phone number is blocked' }
    } else if (error.code === 20003) {
      return { success: false, error: 'Authentication failed - invalid credentials' }
    }
    
    return { 
      success: false, 
      error: 'Failed to send SMS. Please try again or use email login.' 
    }
  }
}

export async function sendOrderNotificationSMS(phone: string, orderNumber: string, status: string): Promise<SMSResult> {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      return { success: false, error: 'SMS service not configured' }
    }

    const message = `DFW Furniture: Your order ${orderNumber} is now ${status}. Track your order at ${process.env.NEXT_PUBLIC_APP_URL}/orders`
    
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
    
    return { success: true, messageId: result.sid }
  } catch (error) {
    console.error('Order notification SMS failed:', error)
    return { success: false, error: 'Failed to send order notification' }
  }
}

export async function sendDeliveryUpdateSMS(phone: string, orderNumber: string, estimatedTime: string): Promise<SMSResult> {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      return { success: false, error: 'SMS service not configured' }
    }

    const message = `DFW Furniture: Your order ${orderNumber} will be delivered around ${estimatedTime}. Our delivery team will contact you shortly.`
    
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
    
    return { success: true, messageId: result.sid }
  } catch (error) {
    console.error('Delivery update SMS failed:', error)
    return { success: false, error: 'Failed to send delivery update' }
  }
}

function createSMSMessage(otp: string, purpose: string): string {
  const baseMessage = `DFW Furniture ${purpose === 'login' ? 'Login' : 'Signup'} OTP: ${otp}`
  const validityMessage = 'Valid for 10 minutes.'
  const securityMessage = 'Do not share this code with anyone.'
  
  return `${baseMessage}\\n${validityMessage} ${securityMessage}`
}

// Test SMS functionality
export async function testSMSService(): Promise<SMSResult> {
  try {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      return { success: false, error: 'Twilio credentials not configured' }
    }

    // Test with a verified number (for development)
    const testNumber = process.env.TWILIO_TEST_NUMBER || '+15005550006' // Twilio magic number
    
    const result = await client.messages.create({
      body: 'DFW Furniture: SMS service test successful!',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: testNumber,
    })
    
    return { success: true, messageId: result.sid }
  } catch (error) {
    console.error('SMS test failed:', error)
    return { success: false, error: 'SMS service test failed' }
  }
}