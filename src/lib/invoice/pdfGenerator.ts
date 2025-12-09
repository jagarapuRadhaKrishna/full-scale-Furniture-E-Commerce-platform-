/**
 * PDF Invoice Generation using PDFKit
 * Part 4: Order Management & Invoicing
 */

import PDFDocument from 'pdfkit';
import { IInvoice } from '@/models/Order';
import fs from 'fs';
import path from 'path';

export class InvoiceGenerator {
  /**
   * Generate PDF invoice
   */
  static async generateInvoice(invoice: IInvoice): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        });

        // Header
        this.generateHeader(doc);

        // Invoice details
        this.generateInvoiceInfo(doc, invoice);

        // Customer details
        this.generateCustomerInfo(doc, invoice);

        // Items table
        this.generateItemsTable(doc, invoice);

        // Footer
        this.generateFooter(doc);

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Generate header with logo and company details
   */
  private static generateHeader(doc: PDFKit.PDFDocument) {
    doc
      .fontSize(20)
      .fillColor('#FF6B35')
      .text('DFW FURNITURE WORLD', 50, 45)
      .fontSize(10)
      .fillColor('#333333')
      .text('Premium Furniture for Your Dream Home', 50, 70)
      .text('GST: 29XXXXX1234X1Z5', 50, 85)
      .text('📍 123 Furniture Street, Delhi, India - 110001', 50, 100)
      .text('📞 +91 9876543210 | ✉ info@dfwfurniture.com', 50, 115)
      .moveDown();

    // Line
    doc
      .strokeColor('#aaaaaa')
      .lineWidth(1)
      .moveTo(50, 135)
      .lineTo(550, 135)
      .stroke();
  }

  /**
   * Generate invoice information
   */
  private static generateInvoiceInfo(doc: PDFKit.PDFDocument, invoice: IInvoice) {
    const invoiceTop = 155;

    doc
      .fontSize(16)
      .fillColor('#FF6B35')
      .text('TAX INVOICE', 50, invoiceTop);

    doc
      .fontSize(10)
      .fillColor('#333333')
      .text(`Invoice Number: ${invoice.invoiceNumber}`, 50, invoiceTop + 25)
      .text(`Order Number: ${invoice.orderNumber}`, 50, invoiceTop + 40)
      .text(`Invoice Date: ${this.formatDate(invoice.issuedDate)}`, 50, invoiceTop + 55)
      .text(`Payment Method: ${invoice.paymentMethod}`, 50, invoiceTop + 70)
      .text(`Payment Status: ${invoice.paymentStatus}`, 50, invoiceTop + 85);

    // Status badge
    const statusColor = invoice.paymentStatus === 'Completed' ? '#22C55E' : '#EAB308';
    doc
      .fillColor(statusColor)
      .fontSize(12)
      .text(invoice.paymentStatus.toUpperCase(), 400, invoiceTop + 25);
  }

  /**
   * Generate customer information
   */
  private static generateCustomerInfo(doc: PDFKit.PDFDocument, invoice: IInvoice) {
    const customerTop = 280;

    // Billing Address
    doc
      .fontSize(12)
      .fillColor('#FF6B35')
      .text('BILL TO:', 50, customerTop);

    doc
      .fontSize(10)
      .fillColor('#333333')
      .text(invoice.customerName, 50, customerTop + 20)
      .text(invoice.customerPhone, 50, customerTop + 35)
      .text(invoice.customerEmail, 50, customerTop + 50);

    const billing = invoice.billingAddress;
    doc
      .text(billing.street, 50, customerTop + 70)
      .text(`${billing.city}, ${billing.state} ${billing.zipCode}`, 50, customerTop + 85)
      .text(billing.country, 50, customerTop + 100);

    // Shipping Address
    doc
      .fontSize(12)
      .fillColor('#FF6B35')
      .text('SHIP TO:', 320, customerTop);

    const shipping = invoice.shippingAddress;
    doc
      .fontSize(10)
      .fillColor('#333333')
      .text(shipping.name, 320, customerTop + 20)
      .text(shipping.phone, 320, customerTop + 35)
      .text(shipping.street, 320, customerTop + 50)
      .text(`${shipping.city}, ${shipping.state} ${shipping.zipCode}`, 320, customerTop + 65)
      .text(shipping.country, 320, customerTop + 80);
  }

  /**
   * Generate items table
   */
  private static generateItemsTable(doc: PDFKit.PDFDocument, invoice: IInvoice) {
    const tableTop = 430;

    // Table header
    doc
      .fontSize(10)
      .fillColor('#FFFFFF')
      .rect(50, tableTop, 500, 25)
      .fill('#FF6B35');

    doc
      .fillColor('#FFFFFF')
      .text('Item', 60, tableTop + 8)
      .text('Qty', 280, tableTop + 8)
      .text('Price', 340, tableTop + 8)
      .text('Tax', 410, tableTop + 8)
      .text('Total', 480, tableTop + 8);

    // Table rows
    let yPosition = tableTop + 30;
    doc.fillColor('#333333');

    invoice.items.forEach((item, index) => {
      const bgColor = index % 2 === 0 ? '#F9F9F9' : '#FFFFFF';
      doc.rect(50, yPosition - 5, 500, 25).fill(bgColor);

      doc
        .fillColor('#333333')
        .fontSize(9)
        .text(item.productName.substring(0, 30), 60, yPosition, { width: 200 })
        .text(item.quantity.toString(), 280, yPosition)
        .text(`₹${item.price.toLocaleString()}`, 340, yPosition)
        .text(`₹${item.tax.toLocaleString()}`, 410, yPosition)
        .text(`₹${item.total.toLocaleString()}`, 480, yPosition);

      yPosition += 25;
    });

    // Summary
    yPosition += 20;
    doc
      .fontSize(10)
      .text('Subtotal:', 380, yPosition)
      .text(`₹${invoice.subtotal.toLocaleString()}`, 480, yPosition, { align: 'right' });

    if (invoice.discount > 0) {
      yPosition += 20;
      doc
        .text('Discount:', 380, yPosition)
        .text(`-₹${invoice.discount.toLocaleString()}`, 480, yPosition, { align: 'right' });
    }

    yPosition += 20;
    doc
      .text('Tax (GST 18%):', 380, yPosition)
      .text(`₹${invoice.tax.toLocaleString()}`, 480, yPosition, { align: 'right' });

    yPosition += 20;
    doc
      .text('Shipping:', 380, yPosition)
      .text(`₹${invoice.shipping.toLocaleString()}`, 480, yPosition, { align: 'right' });

    yPosition += 20;
    doc
      .fontSize(12)
      .fillColor('#FF6B35')
      .text('TOTAL:', 380, yPosition)
      .text(`₹${invoice.total.toLocaleString()}`, 480, yPosition, { align: 'right' });
  }

  /**
   * Generate footer
   */
  private static generateFooter(doc: PDFKit.PDFDocument) {
    doc
      .fontSize(8)
      .fillColor('#666666')
      .text('Thank you for your business!', 50, 720, { align: 'center' })
      .text('For any queries, contact: support@dfwfurniture.com | +91 9876543210', 50, 735, { align: 'center' })
      .text('This is a computer generated invoice and does not require signature.', 50, 750, { align: 'center' });
  }

  /**
   * Format date
   */
  private static formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-IN', options);
  }

  /**
   * Save invoice to file system
   */
  static async saveInvoice(invoice: IInvoice, pdfBuffer: Buffer): Promise<string> {
    const invoicesDir = path.join(process.cwd(), 'public', 'invoices');

    // Create directory if it doesn't exist
    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir, { recursive: true });
    }

    const filename = `${invoice.invoiceNumber}.pdf`;
    const filepath = path.join(invoicesDir, filename);

    fs.writeFileSync(filepath, pdfBuffer);

    return `/invoices/${filename}`;
  }
}
