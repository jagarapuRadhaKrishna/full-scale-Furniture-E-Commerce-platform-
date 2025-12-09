/**
 * Razorpay Payment Integration for DFW Furniture
 */

import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export interface PaymentOrder {
  amount: number; // in rupees
  currency: string;
  receipt: string;
  notes?: Record<string, any>;
}

export interface PaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

/**
 * Create Razorpay order
 */
export async function createPaymentOrder(orderData: PaymentOrder) {
  try {
    const options = {
      amount: orderData.amount * 100, // Convert to paise
      currency: orderData.currency || 'INR',
      receipt: orderData.receipt,
      notes: orderData.notes || {},
    };

    const order = await razorpay.orders.create(options);
    return {
      success: true,
      order,
    };
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to create payment order',
    };
  }
}

/**
 * Verify Razorpay payment signature
 */
export function verifyPaymentSignature(verification: PaymentVerification): boolean {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = verification;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body.toString())
      .digest('hex');

    return expectedSignature === razorpay_signature;
  } catch (error) {
    console.error('Payment verification error:', error);
    return false;
  }
}

/**
 * Fetch payment details
 */
export async function getPaymentDetails(paymentId: string) {
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return {
      success: true,
      payment,
    };
  } catch (error: any) {
    console.error('Fetch payment error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch payment details',
    };
  }
}

/**
 * Capture payment (for authorized payments)
 */
export async function capturePayment(paymentId: string, amount: number) {
  try {
    const payment = await razorpay.payments.capture(paymentId, amount * 100, 'INR');
    return {
      success: true,
      payment,
    };
  } catch (error: any) {
    console.error('Payment capture error:', error);
    return {
      success: false,
      error: error.message || 'Failed to capture payment',
    };
  }
}

/**
 * Initiate refund
 */
export async function initiateRefund(paymentId: string, amount?: number) {
  try {
    const refundData: any = {
      payment_id: paymentId,
    };

    if (amount) {
      refundData.amount = amount * 100; // Convert to paise
    }

    const refund = await razorpay.payments.refund(paymentId, refundData);
    return {
      success: true,
      refund,
    };
  } catch (error: any) {
    console.error('Refund initiation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to initiate refund',
    };
  }
}

/**
 * Get refund details
 */
export async function getRefundDetails(paymentId: string, refundId: string) {
  try {
    const refund = await razorpay.payments.fetchRefund(paymentId, refundId);
    return {
      success: true,
      refund,
    };
  } catch (error: any) {
    console.error('Fetch refund error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch refund details',
    };
  }
}
