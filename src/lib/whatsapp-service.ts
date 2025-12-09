// WhatsApp Business API Integration for DFW Furniture World

interface WhatsAppMessage {
  to: string
  message: string
  type: 'booking' | 'contact' | 'support' | 'order'
}

interface BookingData {
  name: string
  phone: string
  email?: string
  address?: string
  preferredDate?: string
  preferredTime?: string
  serviceType?: string
  message?: string
}

interface ContactData {
  name: string
  email?: string
  phone?: string
  subject?: string
  message: string
  contactType?: string
}

export class WhatsAppService {
  private readonly businessPhone = '919059737539'
  private readonly apiUrl = 'https://wa.me/'

  /**
   * Create WhatsApp URL for demo booking
   */
  createBookingMessage(data: BookingData): string {
    const message = `🏠 *New Demo Booking Request - DFW Furniture*

👤 *Customer Details:*
• Name: ${data.name}
• Phone: ${data.phone}
• Email: ${data.email || 'Not provided'}
• Address: ${data.address || 'Not provided'}

📅 *Appointment Details:*
• Preferred Date: ${data.preferredDate || 'Flexible'}
• Preferred Time: ${data.preferredTime || 'Flexible'}
• Service Type: ${data.serviceType || 'Free Home Demo'}

💬 *Customer Message:*
${data.message || 'No additional message'}

⏰ *Request Time:* ${new Date().toLocaleString()}

---
*DFW Furniture World - Premium Furniture & Interiors*
*Please contact customer within 2 hours*`

    return this.createWhatsAppUrl(message)
  }

  /**
   * Create WhatsApp URL for contact inquiry
   */
  createContactMessage(data: ContactData): string {
    const message = `📞 *New Contact Inquiry - DFW Furniture*

👤 *Customer Details:*
• Name: ${data.name}
• Email: ${data.email || 'Not provided'}
• Phone: ${data.phone || 'Not provided'}

📋 *Inquiry Details:*
• Subject: ${data.subject || 'General Inquiry'}
• Type: ${data.contactType || 'General'}

💬 *Message:*
${data.message}

⏰ *Inquiry Time:* ${new Date().toLocaleString()}

---
*DFW Furniture World - Premium Furniture & Interiors*
*Please respond to this inquiry promptly*`

    return this.createWhatsAppUrl(message)
  }

  /**
   * Create WhatsApp URL for order updates
   */
  createOrderMessage(orderData: any): string {
    const message = `🛍️ *New Order Notification - DFW Furniture*

📦 *Order Details:*
• Order ID: ${orderData.id}
• Customer: ${orderData.customerName}
• Phone: ${orderData.customerPhone}
• Total Amount: ₹${orderData.totalAmount}

🛋️ *Items:*
${orderData.items.map((item: any) => `• ${item.name} (Qty: ${item.quantity})`).join('\n')}

📍 *Delivery Address:*
${orderData.deliveryAddress}

⏰ *Order Time:* ${new Date().toLocaleString()}

---
*DFW Furniture World - Premium Furniture & Interiors*
*Process this order immediately*`

    return this.createWhatsAppUrl(message)
  }

  /**
   * Create generic WhatsApp URL
   */
  private createWhatsAppUrl(message: string): string {
    const encodedMessage = encodeURIComponent(message)
    return `${this.apiUrl}${this.businessPhone}?text=${encodedMessage}`
  }

  /**
   * Open WhatsApp in new window
   */
  openWhatsApp(url: string): void {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  /**
   * Send booking to WhatsApp
   */
  async sendBookingToWhatsApp(bookingData: BookingData): Promise<string> {
    const whatsappUrl = this.createBookingMessage(bookingData)
    
    // In a real implementation, you might also:
    // 1. Log to database
    // 2. Send via WhatsApp Business API
    // 3. Schedule follow-up reminders
    
    return whatsappUrl
  }

  /**
   * Send contact inquiry to WhatsApp  
   */
  async sendContactToWhatsApp(contactData: ContactData): Promise<string> {
    const whatsappUrl = this.createContactMessage(contactData)
    
    return whatsappUrl
  }

  /**
   * Get business contact information
   */
  getBusinessInfo() {
    return {
      name: 'Divya Furniture World (DFW)',
      phone: this.businessPhone,
      alternatePhones: ['919550897539', '918309228382'],
      email: 'info@dfwfurniture.com',
      address: 'Bhimavaram, Andhra Pradesh, India',
      ceo: 'Jagarapu Subrahmanyam',
      businessHours: {
        weekdays: '9:00 AM - 8:00 PM',
        saturday: '9:00 AM - 8:00 PM',
        sunday: '10:00 AM - 6:00 PM'
      }
    }
  }
}

// Export singleton instance
export const whatsappService = new WhatsAppService()

// Export types
export type { WhatsAppMessage, BookingData, ContactData }