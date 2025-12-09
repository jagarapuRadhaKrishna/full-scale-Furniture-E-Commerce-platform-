/**
 * Email Service using NodeMailer
 * Part 4: Order Management & Invoicing
 */

import nodemailer from 'nodemailer';
import { IOrder, IInvoice } from '@/models/Order';

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export class EmailService {
  /**
   * Send order confirmation email
   */
  static async sendOrderConfirmation(order: IOrder): Promise<void> {
    try {
      const mailOptions = {
        from: `"DFW Furniture" <${process.env.SMTP_USER}>`,
        to: order.userEmail,
        subject: `Order Confirmed - ${order.orderId}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; }
              .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
              .total { font-size: 18px; font-weight: bold; color: #FF6B35; margin-top: 20px; }
              .button { display: inline-block; background: #FF6B35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; color: #666; padding: 20px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Order Confirmed!</h1>
                <p>Thank you for shopping with DFW Furniture</p>
              </div>
              
              <div class="content">
                <p>Hi ${order.userName},</p>
                <p>Your order has been confirmed and is being processed. Here are the details:</p>
                
                <div class="order-details">
                  <h3>Order #${order.orderId}</h3>
                  <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                  <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                  <p><strong>Estimated Delivery:</strong> ${order.estimatedDeliveryDate ? new Date(order.estimatedDeliveryDate).toLocaleDateString('en-IN') : 'TBD'}</p>
                  
                  <h4 style="margin-top: 20px;">Order Items:</h4>
                  ${order.items.map(item => `
                    <div class="item">
                      <span>${item.productName} × ${item.quantity}</span>
                      <span>₹${item.total.toLocaleString()}</span>
                    </div>
                  `).join('')}
                  
                  <div class="total">
                    <div class="item">
                      <span>Subtotal:</span>
                      <span>₹${order.subtotal.toLocaleString()}</span>
                    </div>
                    <div class="item">
                      <span>Tax (18%):</span>
                      <span>₹${order.tax.toLocaleString()}</span>
                    </div>
                    <div class="item">
                      <span>Shipping:</span>
                      <span>₹${order.shipping.toLocaleString()}</span>
                    </div>
                    <div class="item" style="border-top: 2px solid #FF6B35; padding-top: 10px;">
                      <span>Total:</span>
                      <span>₹${order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div style="text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/orders/${order._id}" class="button">Track Your Order</a>
                </div>
                
                <p style="margin-top: 30px;"><strong>Shipping Address:</strong></p>
                <p>
                  ${order.shippingAddress.name}<br>
                  ${order.shippingAddress.street}, ${order.shippingAddress.apartment || ''}<br>
                  ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
                  ${order.shippingAddress.country}<br>
                  Phone: ${order.shippingAddress.phone}
                </p>
              </div>
              
              <div class="footer">
                <p>Questions? Contact us at support@dfwfurniture.com or call +91 9876543210</p>
                <p>&copy; 2025 DFW Furniture World. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Order confirmation email sent to ${order.userEmail}`);
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
      throw error;
    }
  }

  /**
   * Send invoice email with PDF attachment
   */
  static async sendInvoiceEmail(invoice: IInvoice, pdfBuffer: Buffer): Promise<void> {
    try {
      const mailOptions = {
        from: `"DFW Furniture" <${process.env.SMTP_USER}>`,
        to: invoice.customerEmail,
        subject: `Invoice ${invoice.invoiceNumber} - DFW Furniture`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; }
              .button { display: inline-block; background: #FF6B35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; color: #666; padding: 20px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📄 Your Invoice is Ready</h1>
              </div>
              
              <div class="content">
                <p>Hi ${invoice.customerName},</p>
                <p>Please find attached your invoice for order <strong>#${invoice.orderNumber}</strong>.</p>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>
                  <p><strong>Invoice Date:</strong> ${new Date(invoice.issuedDate).toLocaleDateString('en-IN')}</p>
                  <p><strong>Total Amount:</strong> ₹${invoice.total.toLocaleString()}</p>
                  <p><strong>Payment Status:</strong> ${invoice.paymentStatus}</p>
                </div>
                
                <p>The invoice is attached as a PDF. You can also download it anytime from your order page.</p>
              </div>
              
              <div class="footer">
                <p>Questions? Contact us at support@dfwfurniture.com or call +91 9876543210</p>
                <p>&copy; 2025 DFW Furniture World. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        attachments: [
          {
            filename: `${invoice.invoiceNumber}.pdf`,
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
        ],
      };

      await transporter.sendMail(mailOptions);
      console.log(`Invoice email sent to ${invoice.customerEmail}`);
    } catch (error) {
      console.error('Error sending invoice email:', error);
      throw error;
    }
  }

  /**
   * Send order status update email
   */
  static async sendStatusUpdate(order: IOrder, statusMessage: string): Promise<void> {
    try {
      const mailOptions = {
        from: `"DFW Furniture" <${process.env.SMTP_USER}>`,
        to: order.userEmail,
        subject: `Order Update - ${order.orderId}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; }
              .status { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
              .status-badge { display: inline-block; padding: 10px 20px; background: #22C55E; color: white; border-radius: 20px; font-weight: bold; }
              .button { display: inline-block; background: #FF6B35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; color: #666; padding: 20px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📦 Order Status Update</h1>
              </div>
              
              <div class="content">
                <p>Hi ${order.userName},</p>
                <p>Your order <strong>#${order.orderId}</strong> has been updated:</p>
                
                <div class="status">
                  <div class="status-badge">${order.status}</div>
                  <p style="margin-top: 20px; font-size: 16px;">${statusMessage}</p>
                  ${order.trackingNumber ? `<p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>` : ''}
                </div>
                
                <div style="text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/orders/${order._id}" class="button">Track Your Order</a>
                </div>
              </div>
              
              <div class="footer">
                <p>Questions? Contact us at support@dfwfurniture.com or call +91 9876543210</p>
                <p>&copy; 2025 DFW Furniture World. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Status update email sent to ${order.userEmail}`);
    } catch (error) {
      console.error('Error sending status update email:', error);
      throw error;
    }
  }

  /**
   * Send delivery notification
   */
  static async sendDeliveryNotification(order: IOrder): Promise<void> {
    try {
      const mailOptions = {
        from: `"DFW Furniture" <${process.env.SMTP_USER}>`,
        to: order.userEmail,
        subject: `🎉 Order Delivered - ${order.orderId}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #22C55E 0%, #10B981 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; }
              .button { display: inline-block; background: #FF6B35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; color: #666; padding: 20px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Order Delivered Successfully!</h1>
              </div>
              
              <div class="content">
                <p>Hi ${order.userName},</p>
                <p>Great news! Your order <strong>#${order.orderId}</strong> has been delivered successfully.</p>
                
                <p style="margin-top: 20px;">We hope you love your new furniture! Please take a moment to share your feedback.</p>
                
                <div style="text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}/orders/${order._id}/review" class="button">Write a Review</a>
                </div>
                
                <p style="margin-top: 30px;">If you have any concerns, you can return the product within 30 days.</p>
              </div>
              
              <div class="footer">
                <p>Thank you for choosing DFW Furniture World!</p>
                <p>&copy; 2025 DFW Furniture World. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Delivery notification sent to ${order.userEmail}`);
    } catch (error) {
      console.error('Error sending delivery notification:', error);
      throw error;
    }
  }
}
