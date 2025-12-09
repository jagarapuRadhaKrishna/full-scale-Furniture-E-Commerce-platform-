// Production Email Service with Multiple Providers
import nodemailer from 'nodemailer'

interface EmailConfig {
  provider: 'smtp' | 'sendgrid' | 'aws-ses'
  smtp?: {
    host: string
    port: number
    secure: boolean
    user: string
    pass: string
  }
  sendgrid?: {
    apiKey: string
  }
  awsSes?: {
    region: string
    accessKeyId: string
    secretAccessKey: string
  }
  from: {
    name: string
    email: string
  }
}

interface EmailMessage {
  to: string | string[]
  cc?: string[]
  bcc?: string[]
  subject: string
  text?: string
  html?: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
}

interface EmailTemplate {
  name: string
  subject: string
  html: string
  variables: string[]
}

export class ProductionEmailService {
  private config: EmailConfig
  private transporter: any

  constructor() {
    this.config = {
      provider: (process.env.EMAIL_PROVIDER as any) || 'smtp',
      smtp: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || ''
      },
      sendgrid: {
        apiKey: process.env.SENDGRID_API_KEY || ''
      },
      awsSes: {
        region: process.env.AWS_REGION || 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
      },
      from: {
        name: 'DFW Furniture World',
        email: process.env.FROM_EMAIL || 'info@dfwfurniture.com'
      }
    }

    this.initializeTransporter()
  }

  private initializeTransporter() {
    switch (this.config.provider) {
      case 'smtp':
        this.transporter = nodemailer.createTransport({
          host: this.config.smtp!.host,
          port: this.config.smtp!.port,
          secure: this.config.smtp!.secure,
          auth: {
            user: this.config.smtp!.user,
            pass: this.config.smtp!.pass
          },
          tls: {
            rejectUnauthorized: false
          }
        })
        break

      case 'sendgrid':
        // Initialize SendGrid
        break

      case 'aws-ses':
        // Initialize AWS SES
        break
    }
  }

  /**
   * Send email
   */
  async sendEmail(message: EmailMessage): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const mailOptions = {
        from: `${this.config.from.name} <${this.config.from.email}>`,
        to: Array.isArray(message.to) ? message.to.join(',') : message.to,
        cc: message.cc?.join(','),
        bcc: message.bcc?.join(','),
        subject: message.subject,
        text: message.text,
        html: message.html,
        attachments: message.attachments
      }

      const result = await this.transporter.sendMail(mailOptions)
      
      return {
        success: true,
        messageId: result.messageId
      }
    } catch (error) {
      console.error('Email send error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Send booking confirmation email
   */
  async sendBookingConfirmation(booking: any): Promise<{ success: boolean; error?: string }> {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Booking Confirmation - DFW Furniture</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f8f9fa; }
            .details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; }
            .button { display: inline-block; background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🏠 Booking Confirmed!</h1>
                <p>Thank you for choosing DFW Furniture</p>
            </div>
            
            <div class="content">
                <h2>Hi ${booking.name}! 👋</h2>
                <p>Your demo booking has been confirmed. Here are the details:</p>
                
                <div class="details">
                    <h3>📅 Booking Details</h3>
                    <p><strong>Booking ID:</strong> ${booking.id}</p>
                    <p><strong>Service:</strong> ${booking.serviceType}</p>
                    <p><strong>Preferred Date:</strong> ${booking.preferredDate || 'To be scheduled'}</p>
                    <p><strong>Preferred Time:</strong> ${booking.preferredTime || 'To be confirmed'}</p>
                    <p><strong>Address:</strong> ${booking.address}</p>
                </div>
                
                <div class="details">
                    <h3>📞 What Happens Next?</h3>
                    <ul>
                        <li>Our team will call you within 2 hours</li>
                        <li>We'll confirm the exact appointment time</li>
                        <li>Our furniture expert will visit with samples</li>
                        <li>Get personalized recommendations</li>
                    </ul>
                </div>
                
                <div style="text-align: center; margin: 20px 0;">
                    <a href="https://dfwfurniture.com/bookings/${booking.id}" class="button">Track Your Booking</a>
                </div>
                
                <div class="details">
                    <h3>📋 Contact Information</h3>
                    <p><strong>Phone:</strong> +91 90597 37539, +91 95508 97539</p>
                    <p><strong>Email:</strong> info@dfwfurniture.com</p>
                    <p><strong>Address:</strong> Bhimavaram, Andhra Pradesh</p>
                </div>
            </div>
            
            <div class="footer">
                <p>🛋️ <strong>DFW Furniture World</strong></p>
                <p>Premium Furniture & Interiors</p>
                <p>This is an automated message. Please don't reply to this email.</p>
            </div>
        </div>
    </body>
    </html>`

    return this.sendEmail({
      to: booking.email,
      subject: `🏠 Booking Confirmed - DFW Furniture (ID: ${booking.id})`,
      html
    })
  }

  /**
   * Send order confirmation email
   */
  async sendOrderConfirmation(order: any): Promise<{ success: boolean; error?: string }> {
    const itemsHtml = order.items.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString()}</td>
      </tr>
    `).join('')

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Order Confirmation - DFW Furniture</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f8f9fa; }
            .order-details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .items-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            .items-table th { background: #f1f5f9; padding: 10px; text-align: left; }
            .total { font-size: 18px; font-weight: bold; color: #059669; }
            .footer { text-align: center; padding: 20px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🛍️ Order Confirmed!</h1>
                <p>Your furniture is on the way</p>
            </div>
            
            <div class="content">
                <h2>Hi ${order.customerName}! 🎉</h2>
                <p>Thank you for your order. We're excited to deliver your beautiful furniture!</p>
                
                <div class="order-details">
                    <h3>📦 Order Summary</h3>
                    <p><strong>Order ID:</strong> ${order.id}</p>
                    <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                    <p><strong>Estimated Delivery:</strong> ${order.estimatedDelivery || 'Within 7-10 business days'}</p>
                    
                    <table class="items-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th style="text-align: center;">Quantity</th>
                                <th style="text-align: right;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                            <tr>
                                <td colspan="2" style="padding: 15px; font-weight: bold;">Total Amount:</td>
                                <td style="padding: 15px; text-align: right;" class="total">₹${order.totalAmount.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="order-details">
                    <h3>🚚 Delivery Information</h3>
                    <p><strong>Delivery Address:</strong><br>${order.deliveryAddress}</p>
                    <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
                    ${order.trackingNumber ? `<p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>` : ''}
                </div>
                
                <div style="text-align: center; margin: 20px 0;">
                    <a href="https://dfwfurniture.com/orders/${order.id}" style="display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Track Your Order</a>
                </div>
            </div>
            
            <div class="footer">
                <p>🛋️ <strong>DFW Furniture World</strong></p>
                <p>Premium Furniture & Interiors</p>
                <p>Need help? Contact us at +91 90597 37539</p>
            </div>
        </div>
    </body>
    </html>`

    return this.sendEmail({
      to: order.customerEmail,
      subject: `🛍️ Order Confirmed - DFW Furniture (Order #${order.id})`,
      html
    })
  }

  /**
   * Send contact inquiry response
   */
  async sendContactResponse(contact: any, responseMessage: string): Promise<{ success: boolean; error?: string }> {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Response to Your Inquiry - DFW Furniture</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f8f9fa; }
            .message-box { background: white; padding: 20px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #7c3aed; }
            .footer { text-align: center; padding: 20px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📞 Thank You for Contacting Us</h1>
                <p>DFW Furniture World</p>
            </div>
            
            <div class="content">
                <h2>Hi ${contact.name}! 👋</h2>
                <p>Thank you for reaching out to us. Here's our response to your inquiry:</p>
                
                <div class="message-box">
                    <h3>Your Original Message:</h3>
                    <p><strong>Subject:</strong> ${contact.subject}</p>
                    <p><strong>Message:</strong> ${contact.message}</p>
                    <p><strong>Date:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
                </div>
                
                <div class="message-box">
                    <h3>Our Response:</h3>
                    <p>${responseMessage}</p>
                </div>
                
                <div class="message-box">
                    <h3>📞 Need Further Assistance?</h3>
                    <p><strong>Phone:</strong> +91 90597 37539, +91 95508 97539</p>
                    <p><strong>Email:</strong> info@dfwfurniture.com</p>
                    <p><strong>Visit Us:</strong> Bhimavaram, Andhra Pradesh</p>
                    <p><strong>Book Demo:</strong> <a href="https://dfwfurniture.com/book-demo">Schedule Free Home Demo</a></p>
                </div>
            </div>
            
            <div class="footer">
                <p>🛋️ <strong>DFW Furniture World</strong></p>
                <p>Premium Furniture & Interiors</p>
                <p>We appreciate your business!</p>
            </div>
        </div>
    </body>
    </html>`

    return this.sendEmail({
      to: contact.email,
      subject: `Re: ${contact.subject} - DFW Furniture Response`,
      html
    })
  }

  /**
   * Send newsletter
   */
  async sendNewsletter(subscribers: string[], subject: string, content: string): Promise<{ success: boolean; sent: number; failed: number }> {
    let sent = 0
    let failed = 0

    for (const email of subscribers) {
      try {
        const result = await this.sendEmail({
          to: email,
          subject: subject,
          html: content
        })
        
        if (result.success) {
          sent++
        } else {
          failed++
        }
      } catch (error) {
        failed++
      }
    }

    return { success: true, sent, failed }
  }

  /**
   * Send OTP email
   */
  async sendOTP(email: string, otp: string): Promise<{ success: boolean; error?: string }> {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Verification Code - DFW Furniture</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 40px; }
            .otp-box { background: #f0f4f8; padding: 30px; border-radius: 10px; display: inline-block; }
            .otp { font-size: 32px; font-weight: bold; color: #1e40af; letter-spacing: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="otp-box">
            <h2>🔐 Verification Code</h2>
            <p>Your DFW Furniture verification code is:</p>
            <div class="otp">${otp}</div>
            <p>This code will expire in 5 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
        </div>
    </body>
    </html>`

    return this.sendEmail({
      to: email,
      subject: `🔐 Your DFW Furniture Verification Code: ${otp}`,
      html
    })
  }

  /**
   * Test email configuration
   */
  async testConfiguration(): Promise<{ success: boolean; error?: string }> {
    try {
      await this.transporter.verify()
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

// Export singleton instance
export const emailService = new ProductionEmailService()

// Export types
export type { EmailMessage, EmailTemplate }