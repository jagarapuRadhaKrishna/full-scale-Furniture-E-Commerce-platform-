// SMS service for sending OTPs via Twilio

import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function sendSMSOTP(phone: string, otp: string, purpose: string) {
  const message = `DFW Furniture ${purpose === 'login' ? 'Login' : 'Signup'} OTP: ${otp}. Valid for 10 minutes. Do not share this code with anyone.`
  
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
    
    return { success: true }
  } catch (error) {
    console.error('SMS sending failed:', error)
    return { success: false, error: 'Failed to send SMS' }
  }
}