// Enhanced Email service with better templates and error handling

import nodemailer from 'nodemailer'

export interface EmailResult {
  success: boolean
  error?: string
  messageId?: string
}

// Create transporter with better error handling
function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('Email configuration missing')
    return null
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  })
}

export async function sendEmailOTP(email: string, otp: string, purpose: string): Promise<EmailResult> {
  try {
    const transporter = createTransporter()
    if (!transporter) {
      return { success: false, error: 'Email service not configured' }
    }

    const subject = purpose === 'login' 
      ? 'DFW Furniture - Login Verification Code' 
      : 'DFW Furniture - Welcome! Verify Your Account'
    
    const html = createOTPEmailTemplate(otp, purpose, email)
    
    const result = await transporter.sendMail({
      from: `"DFW Furniture" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      html,
      text: `Your DFW Furniture ${purpose} OTP is: ${otp}. Valid for 10 minutes.`
    })
    
    console.log(`Email sent successfully to ${email}, Message ID: ${result.messageId}`)
    
    return { 
      success: true, 
      messageId: result.messageId 
    }
  } catch (error: any) {
    console.error('Email sending failed:', error)
    
    // Handle specific email errors
    if (error.code === 'EAUTH') {
      return { success: false, error: 'Email authentication failed' }
    } else if (error.code === 'ECONNECTION') {
      return { success: false, error: 'Email server connection failed' }
    } else if (error.responseCode === 550) {
      return { success: false, error: 'Invalid email address' }
    }
    
    return { 
      success: false, 
      error: 'Failed to send email. Please try again or use phone login.' 
    }
  }
}

export async function sendWelcomeEmail(email: string, name: string): Promise<EmailResult> {
  try {
    const transporter = createTransporter()
    if (!transporter) {
      return { success: false, error: 'Email service not configured' }
    }

    const html = createWelcomeEmailTemplate(name)
    
    const result = await transporter.sendMail({
      from: `"DFW Furniture" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Welcome to DFW Furniture - Your Premium Furniture Journey Begins!',
      html,
    })
    
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Welcome email failed:', error)
    return { success: false, error: 'Failed to send welcome email' }
  }
}

export async function sendOrderConfirmationEmail(
  email: string, 
  name: string, 
  orderNumber: string, 
  orderDetails: any
): Promise<EmailResult> {
  try {
    const transporter = createTransporter()
    if (!transporter) {
      return { success: false, error: 'Email service not configured' }
    }

    const html = createOrderConfirmationTemplate(name, orderNumber, orderDetails)
    
    const result = await transporter.sendMail({
      from: `"DFW Furniture" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Order Confirmation - ${orderNumber} | DFW Furniture`,
      html,
    })
    
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Order confirmation email failed:', error)
    return { success: false, error: 'Failed to send order confirmation' }
  }
}

function createOTPEmailTemplate(otp: string, purpose: string, email: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>DFW Furniture - ${purpose === 'login' ? 'Login' : 'Signup'} OTP</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">DFW Furniture</h1>
          <p style="color: #FFE4B5; margin: 10px 0 0 0; font-size: 16px;">Premium Furniture Collection</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #333; margin-bottom: 20px; font-size: 24px;">
            ${purpose === 'login' ? 'Login Verification Code' : 'Welcome to DFW Furniture!'}
          </h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            ${purpose === 'login' 
              ? `Hi there! Use the verification code below to login to your DFW Furniture account.`
              : `Thank you for joining DFW Furniture! Use the verification code below to complete your account setup.`
            }
          </p>
          
          <!-- OTP Box -->
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 3px solid #8B4513; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
            <p style="color: #8B4513; font-size: 14px; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Verification Code</p>
            <div style="font-size: 36px; font-weight: bold; color: #8B4513; letter-spacing: 8px; font-family: 'Courier New', monospace; margin: 10px 0;">
              ${otp}
            </div>
            <p style="color: #666; font-size: 12px; margin: 10px 0 0 0;">Valid for 10 minutes</p>
          </div>
          
          <!-- Instructions -->
          <div style="background: #f8f9fa; border-left: 4px solid #8B4513; padding: 20px; margin: 30px 0;">
            <h3 style="color: #8B4513; margin: 0 0 10px 0; font-size: 16px;">Important Security Information:</h3>
            <ul style="color: #666; font-size: 14px; margin: 0; padding-left: 20px;">
              <li>This code expires in 10 minutes</li>
              <li>Never share this code with anyone</li>
              <li>DFW Furniture will never ask for this code over phone or email</li>
              <li>If you didn't request this code, please ignore this email</li>
            </ul>
          </div>
          
          ${purpose === 'signup' ? `
          <!-- Welcome Benefits -->
          <div style="background: linear-gradient(135deg, #fff8dc 0%, #f5deb3 100%); border-radius: 8px; padding: 25px; margin: 30px 0;">
            <h3 style="color: #8B4513; margin: 0 0 15px 0; font-size: 18px;">🎉 Welcome Benefits</h3>
            <ul style="color: #666; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li><strong>10% off</strong> on your first order</li>
              <li><strong>Free delivery</strong> for orders above ₹25,000</li>
              <li><strong>Exclusive access</strong> to new collections</li>
              <li><strong>Priority support</strong> from our design experts</li>
            </ul>
          </div>
          ` : ''}
        </div>
        
        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 14px; margin: 0 0 10px 0;">
            <strong>DFW Furniture</strong><br>
            Your trusted partner for premium furniture solutions
          </p>
          <p style="color: #adb5bd; font-size: 12px; margin: 0;">
            This email was sent to ${email}. If you didn't request this, please ignore this email.<br>
            © 2024 DFW Furniture. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function createWelcomeEmailTemplate(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to DFW Furniture</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">Welcome to DFW Furniture!</h1>
          <p style="color: #FFE4B5; margin: 10px 0 0 0; font-size: 16px;">Your Premium Furniture Journey Begins</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #333; margin-bottom: 20px; font-size: 24px;">Hello ${name}! 👋</h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            Thank you for joining the DFW Furniture family! We're excited to help you create beautiful spaces with our premium furniture collection.
          </p>
          
          <!-- Benefits -->
          <div style="background: linear-gradient(135deg, #fff8dc 0%, #f5deb3 100%); border-radius: 12px; padding: 30px; margin: 30px 0;">
            <h3 style="color: #8B4513; margin: 0 0 20px 0; font-size: 20px; text-align: center;">🎉 Your Welcome Benefits</h3>
            <div style="display: grid; gap: 15px;">
              <div style="display: flex; align-items: center; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="color: #8B4513; font-size: 24px; margin-right: 15px;">💰</div>
                <div>
                  <strong style="color: #8B4513;">10% Off First Order</strong><br>
                  <span style="color: #666; font-size: 14px;">Use code WELCOME10 at checkout</span>
                </div>
              </div>
              <div style="display: flex; align-items: center; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="color: #8B4513; font-size: 24px; margin-right: 15px;">🚚</div>
                <div>
                  <strong style="color: #8B4513;">Free Delivery</strong><br>
                  <span style="color: #666; font-size: 14px;">On orders above ₹25,000</span>
                </div>
              </div>
              <div style="display: flex; align-items: center; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="color: #8B4513; font-size: 24px; margin-right: 15px;">⭐</div>
                <div>
                  <strong style="color: #8B4513;">Exclusive Access</strong><br>
                  <span style="color: #666; font-size: 14px;">Early access to new collections</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- CTA Button -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/products" style="display: inline-block; background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Start Shopping Now
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 14px; margin: 0 0 10px 0;">
            <strong>DFW Furniture</strong><br>
            Follow us for latest updates and exclusive offers
          </p>
          <p style="color: #adb5bd; font-size: 12px; margin: 0;">
            © 2024 DFW Furniture. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function createOrderConfirmationTemplate(name: string, orderNumber: string, orderDetails: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - ${orderNumber}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">Order Confirmed! ✅</h1>
          <p style="color: #d4edda; margin: 10px 0 0 0; font-size: 16px;">Thank you for your purchase</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #333; margin-bottom: 20px; font-size: 24px;">Hello ${name}!</h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            Your order has been confirmed and is being processed. We'll keep you updated on its progress.
          </p>
          
          <!-- Order Details -->
          <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 25px; margin: 30px 0;">
            <h3 style="color: #8B4513; margin: 0 0 15px 0; font-size: 18px;">Order Details</h3>
            <p style="margin: 5px 0;"><strong>Order Number:</strong> ${orderNumber}</p>
            <p style="margin: 5px 0;"><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Total Amount:</strong> ₹${orderDetails.total || 'N/A'}</p>
          </div>
          
          <!-- Track Order Button -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/orders" style="display: inline-block; background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Track Your Order
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 14px; margin: 0 0 10px 0;">
            <strong>DFW Furniture</strong><br>
            Questions? Contact us at support@dfwfurniture.com
          </p>
          <p style="color: #adb5bd; font-size: 12px; margin: 0;">
            © 2024 DFW Furniture. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Test email functionality
export async function testEmailService(): Promise<EmailResult> {
  try {
    const transporter = createTransporter()
    if (!transporter) {
      return { success: false, error: 'Email service not configured' }
    }

    const result = await transporter.sendMail({
      from: `"DFW Furniture" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to self for testing
      subject: 'DFW Furniture - Email Service Test',
      text: 'Email service is working correctly!',
      html: '<h1>Email service is working correctly!</h1>'
    })
    
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Email test failed:', error)
    return { success: false, error: 'Email service test failed' }
  }
}