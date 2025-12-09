// Production WhatsApp Business API Integration
interface WhatsAppConfig {
  accessToken: string
  phoneNumberId: string
  businessAccountId: string
  webhookToken: string
  apiVersion: string
}

interface WhatsAppMessage {
  to: string
  type: 'text' | 'template' | 'media'
  content: any
}

interface MessageStatus {
  id: string
  status: 'sent' | 'delivered' | 'read' | 'failed'
  timestamp: Date
  error?: string
}

export class WhatsAppBusinessAPI {
  private config: WhatsAppConfig
  private baseUrl: string

  constructor() {
    this.config = {
      accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
      businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '',
      webhookToken: process.env.WHATSAPP_WEBHOOK_TOKEN || '',
      apiVersion: process.env.WHATSAPP_API_VERSION || 'v18.0'
    }
    this.baseUrl = `https://graph.facebook.com/${this.config.apiVersion}/${this.config.phoneNumberId}`
  }

  /**
   * Send text message
   */
  async sendTextMessage(to: string, message: string): Promise<MessageStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to.replace(/[^\d]/g, ''), // Clean phone number
          type: 'text',
          text: { body: message }
        })
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error?.message || 'Failed to send message')
      }

      return {
        id: result.messages[0].id,
        status: 'sent',
        timestamp: new Date()
      }
    } catch (error) {
      console.error('WhatsApp send error:', error)
      return {
        id: '',
        status: 'failed',
        timestamp: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Send booking confirmation message
   */
  async sendBookingConfirmation(booking: any): Promise<MessageStatus> {
    const message = `🏠 *Booking Confirmed - DFW Furniture*

Hi ${booking.name}! 👋

Your demo booking has been confirmed:

📅 *Date:* ${booking.preferredDate || 'To be scheduled'}
⏰ *Time:* ${booking.preferredTime || 'To be confirmed'}
🏠 *Service:* ${booking.serviceType}
📍 *Address:* ${booking.address}

*Next Steps:*
• Our team will call you within 2 hours
• We'll confirm the exact time
• Our expert will visit with samples

*Contact Us:*
📞 Phone: +91 90597 37539
📧 Email: info@dfwfurniture.com

Thank you for choosing DFW Furniture! 🛋️✨

*Booking ID:* ${booking.id}`

    return this.sendTextMessage(booking.phone, message)
  }

  /**
   * Send order update message
   */
  async sendOrderUpdate(order: any, status: string): Promise<MessageStatus> {
    let message = ''

    switch (status) {
      case 'confirmed':
        message = `🛍️ *Order Confirmed - DFW Furniture*

Hi ${order.customerName}! 

Your order has been confirmed:

📦 *Order ID:* ${order.id}
💰 *Total:* ₹${order.totalAmount}
📍 *Delivery:* ${order.deliveryAddress}
📅 *Expected:* ${order.estimatedDelivery || 'Within 7-10 days'}

We'll keep you updated on the progress!

Track your order: https://dfwfurniture.com/orders/${order.id}

*DFW Furniture - Premium Quality, Delivered* 🏠✨`
        break

      case 'shipped':
        message = `🚛 *Order Shipped - DFW Furniture*

Great news ${order.customerName}! 

Your order is on its way:

📦 *Order ID:* ${order.id}
🚚 *Tracking:* ${order.trackingNumber}
📅 *Expected Delivery:* ${order.estimatedDelivery}

Track: https://dfwfurniture.com/track/${order.trackingNumber}

Our delivery team will contact you soon! 📞`
        break

      case 'delivered':
        message = `✅ *Order Delivered - DFW Furniture*

Hi ${order.customerName}!

Your order has been delivered successfully! 🎉

📦 *Order ID:* ${order.id}

*We'd love your feedback:*
Rate your experience: https://dfwfurniture.com/review/${order.id}

Thank you for choosing DFW Furniture! 🛋️

Need support? Call us: +91 90597 37539`
        break
    }

    return this.sendTextMessage(order.customerPhone, message)
  }

  /**
   * Send contact inquiry response
   */
  async sendContactResponse(contact: any): Promise<MessageStatus> {
    const message = `📞 *Message Received - DFW Furniture*

Hi ${contact.name}! 

Thank you for contacting us. We've received your message:

📋 *Subject:* ${contact.subject}
⏰ *Received:* ${new Date(contact.createdAt).toLocaleString()}

*What's Next:*
• Our team will review your inquiry
• We'll respond within 2-4 hours
• You'll receive a detailed response

*Contact Details:*
📞 Phone: +91 90597 37539
📧 Email: info@dfwfurniture.com
📍 Location: Bhimavaram, Andhra Pradesh

*Reference ID:* ${contact.id}

Thank you for choosing DFW Furniture! 🏠✨`

    return this.sendTextMessage(contact.phone, message)
  }

  /**
   * Send promotional message
   */
  async sendPromoMessage(to: string, promo: any): Promise<MessageStatus> {
    const message = `🎉 *Special Offer - DFW Furniture*

${promo.title}

${promo.description}

💰 *Discount:* ${promo.discount}
⏰ *Valid Until:* ${promo.validUntil}

*How to Claim:*
• Visit our showroom
• Use code: ${promo.code}
• Or book a demo: https://dfwfurniture.com/book-demo

📞 Call now: +91 90597 37539

*Terms & Conditions Apply*
*DFW Furniture - Premium Quality, Unbeatable Prices* 🛋️✨`

    return this.sendTextMessage(to, message)
  }

  /**
   * Verify webhook signature
   */
  verifyWebhook(payload: string, signature: string): boolean {
    const crypto = require('crypto')
    const expectedSignature = crypto
      .createHmac('sha256', this.config.webhookToken)
      .update(payload)
      .digest('hex')
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(`sha256=${expectedSignature}`)
    )
  }

  /**
   * Handle incoming webhook
   */
  async handleWebhook(payload: any): Promise<void> {
    // Handle incoming messages, delivery receipts, etc.
    if (payload.entry) {
      for (const entry of payload.entry) {
        if (entry.changes) {
          for (const change of entry.changes) {
            if (change.field === 'messages') {
              await this.processMessage(change.value)
            }
          }
        }
      }
    }
  }

  /**
   * Process incoming message
   */
  private async processMessage(value: any): Promise<void> {
    if (value.messages) {
      for (const message of value.messages) {
        // Handle different message types
        if (message.type === 'text') {
          await this.handleTextMessage(message, value.contacts[0])
        }
      }
    }
  }

  /**
   * Handle incoming text message
   */
  private async handleTextMessage(message: any, contact: any): Promise<void> {
    const text = message.text.body.toLowerCase()
    const phoneNumber = message.from

    // Simple auto-responses
    if (text.includes('hello') || text.includes('hi')) {
      await this.sendTextMessage(phoneNumber, 
        `Hello! 👋 Welcome to DFW Furniture. How can we help you today?\n\n` +
        `🛋️ Book Demo: https://dfwfurniture.com/book-demo\n` +
        `📞 Call: +91 90597 37539`
      )
    } else if (text.includes('price') || text.includes('cost')) {
      await this.sendTextMessage(phoneNumber,
        `💰 For pricing information:\n\n` +
        `• Visit: https://dfwfurniture.com/products\n` +
        `• Call: +91 90597 37539\n` +
        `• Book free demo for personalized quotes`
      )
    } else {
      await this.sendTextMessage(phoneNumber,
        `Thank you for your message! 📝\n\n` +
        `Our team will respond shortly. For immediate assistance:\n` +
        `📞 Call: +91 90597 37539`
      )
    }
  }

  /**
   * Get message status
   */
  async getMessageStatus(messageId: string): Promise<MessageStatus | null> {
    try {
      const response = await fetch(`${this.baseUrl}/messages/${messageId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`
        }
      })

      if (!response.ok) return null

      const result = await response.json()
      return {
        id: messageId,
        status: result.status as any,
        timestamp: new Date(result.timestamp * 1000)
      }
    } catch (error) {
      console.error('Error getting message status:', error)
      return null
    }
  }

  /**
   * Send template message (for pre-approved templates)
   */
  async sendTemplate(to: string, templateName: string, parameters: string[] = []): Promise<MessageStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to.replace(/[^\d]/g, ''),
          type: 'template',
          template: {
            name: templateName,
            language: { code: 'en' },
            components: parameters.length > 0 ? [{
              type: 'body',
              parameters: parameters.map(p => ({ type: 'text', text: p }))
            }] : []
          }
        })
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error?.message || 'Failed to send template')
      }

      return {
        id: result.messages[0].id,
        status: 'sent',
        timestamp: new Date()
      }
    } catch (error) {
      console.error('WhatsApp template send error:', error)
      return {
        id: '',
        status: 'failed',
        timestamp: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

// Export singleton instance
export const whatsappAPI = new WhatsAppBusinessAPI()

// Export types
export type { WhatsAppMessage, MessageStatus }