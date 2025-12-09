// Email service for sending OTPs

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmailOTP(email: string, otp: string, purpose: string) {
  const subject = purpose === 'login' 
    ? 'DFW Furniture - Login OTP' 
    : 'DFW Furniture - Signup OTP'
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">DFW Furniture</h1>
        <p style="color: white; margin: 10px 0 0 0;">Premium Furniture Collection</p>
      </div>
      
      <div style="background: #f9f9f9; padding: 40px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-bottom: 20px;">Your ${purpose === 'login' ? 'Login' : 'Signup'} OTP</h2>
        
        <p style="color: #666; font-size: 16px; margin-bottom: 30px;">
          Hi there! Use the following OTP to ${purpose === 'login' ? 'login to' : 'complete your signup with'} your DFW Furniture account:
        </p>
        
        <div style="background: white; border: 2px solid #8B4513; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0;">
          <div style="font-size: 32px; font-weight: bold; color: #8B4513; letter-spacing: 8px; font-family: 'Courier New', monospace;">
            ${otp}
          </div>
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          <strong>Important:</strong> This OTP is valid for 10 minutes only. Please do not share this code with anyone.
        </p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            This is an automated message from DFW Furniture. If you didn't request this OTP, please ignore this email.
          </p>
        </div>
      </div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"DFW Furniture" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      html,
    })
    
    return { success: true }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: 'Failed to send email' }
  }
}