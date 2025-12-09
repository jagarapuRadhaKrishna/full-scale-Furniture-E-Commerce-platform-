// Complete Payment Gateway Integration for DFW
import crypto from 'crypto'

// Environment variables
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_your_key_id'
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET || 'your_secret_key'
const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY || 'your_merchant_key'
const PAYU_SALT = process.env.PAYU_SALT || 'your_salt'

// Types
export interface PaymentOrder {
  id: string
  orderId: string
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'failed' | 'cancelled'
  paymentMethod: 'razorpay' | 'payu' | 'cod'
  gatewayOrderId?: string
  gatewayPaymentId?: string
  transactionId?: string
  failureReason?: string
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  createdAt: Date
  paidAt?: Date
}

export interface PaymentResponse {
  success: boolean
  orderId?: string
  paymentUrl?: string
  gatewayOrderId?: string
  error?: string
  message?: string
}

export interface PaymentVerification {
  success: boolean
  transactionId?: string
  amount?: number
  status?: string
  error?: string
}

// In-memory storage (replace with database)
const paymentOrders: PaymentOrder[] = []

export class PaymentService {
  // Generate order ID
  static generateOrderId(): string {
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substring(2, 8)
    return `DFW${timestamp}${randomStr}`.toUpperCase()
  }

  // Create payment order
  static async createPaymentOrder(orderData: {
    amount: number
    currency?: string
    paymentMethod: 'razorpay' | 'payu' | 'cod'
    customerInfo: {
      name: string
      email: string
      phone: string
    }
    items: Array<{
      name: string
      quantity: number
      price: number
    }>
  }): Promise<PaymentResponse> {
    try {
      const orderId = this.generateOrderId()
      
      const paymentOrder: PaymentOrder = {
        id: Date.now().toString(),
        orderId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        status: 'pending',
        paymentMethod: orderData.paymentMethod,
        customerInfo: orderData.customerInfo,
        items: orderData.items,
        createdAt: new Date()
      }

      // Handle different payment methods
      switch (orderData.paymentMethod) {
        case 'razorpay':
          return await this.createRazorpayOrder(paymentOrder)
        case 'payu':
          return await this.createPayUOrder(paymentOrder)
        case 'cod':
          return await this.createCODOrder(paymentOrder)
        default:
          return { success: false, error: 'Invalid payment method' }
      }
    } catch (error) {
      console.error('Create payment order error:', error)
      return { success: false, error: 'Failed to create payment order' }
    }
  }

  // Razorpay integration
  static async createRazorpayOrder(paymentOrder: PaymentOrder): Promise<PaymentResponse> {
    try {
      // Razorpay order creation
      const razorpayOrder = {
        amount: paymentOrder.amount * 100, // Amount in paise
        currency: paymentOrder.currency,
        receipt: paymentOrder.orderId,
        notes: {
          customer_name: paymentOrder.customerInfo.name,
          customer_email: paymentOrder.customerInfo.email
        }
      }

      // In production, make actual API call to Razorpay
      const gatewayOrderId = `order_${Date.now()}`
      paymentOrder.gatewayOrderId = gatewayOrderId
      
      // Store order
      paymentOrders.push(paymentOrder)

      return {
        success: true,
        orderId: paymentOrder.orderId,
        gatewayOrderId,
        message: 'Razorpay order created successfully'
      }
    } catch (error) {
      console.error('Razorpay order creation error:', error)
      return { success: false, error: 'Failed to create Razorpay order' }
    }
  }

  // PayU integration
  static async createPayUOrder(paymentOrder: PaymentOrder): Promise<PaymentResponse> {
    try {
      const txnid = paymentOrder.orderId
      const amount = paymentOrder.amount.toString()
      const productinfo = paymentOrder.items.map(item => item.name).join(', ')
      const firstname = paymentOrder.customerInfo.name
      const email = paymentOrder.customerInfo.email
      const phone = paymentOrder.customerInfo.phone

      // Create hash
      const hashString = `${PAYU_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_SALT}`
      const hash = crypto.createHash('sha512').update(hashString).digest('hex')

      // PayU payment URL (test environment)
      const paymentUrl = 'https://sandboxsecure.payu.in/_payment'
      
      paymentOrder.gatewayOrderId = txnid
      paymentOrders.push(paymentOrder)

      return {
        success: true,
        orderId: paymentOrder.orderId,
        paymentUrl,
        gatewayOrderId: txnid,
        message: 'PayU order created successfully'
      }
    } catch (error) {
      console.error('PayU order creation error:', error)
      return { success: false, error: 'Failed to create PayU order' }
    }
  }

  // Cash on Delivery
  static async createCODOrder(paymentOrder: PaymentOrder): Promise<PaymentResponse> {
    try {
      paymentOrder.status = 'pending'
      paymentOrders.push(paymentOrder)

      return {
        success: true,
        orderId: paymentOrder.orderId,
        message: 'COD order created successfully'
      }
    } catch (error) {
      console.error('COD order creation error:', error)
      return { success: false, error: 'Failed to create COD order' }
    }
  }

  // Verify payment
  static async verifyPayment(data: {
    orderId: string
    paymentId?: string
    signature?: string
    status?: string
    paymentMethod: string
  }): Promise<PaymentVerification> {
    try {
      const order = paymentOrders.find(o => o.orderId === data.orderId)
      if (!order) {
        return { success: false, error: 'Order not found' }
      }

      switch (data.paymentMethod) {
        case 'razorpay':
          return await this.verifyRazorpayPayment(order, data)
        case 'payu':
          return await this.verifyPayUPayment(order, data)
        case 'cod':
          return await this.verifyCODPayment(order)
        default:
          return { success: false, error: 'Invalid payment method' }
      }
    } catch (error) {
      console.error('Payment verification error:', error)
      return { success: false, error: 'Payment verification failed' }
    }
  }

  // Verify Razorpay payment
  static async verifyRazorpayPayment(
    order: PaymentOrder, 
    data: { paymentId?: string; signature?: string }
  ): Promise<PaymentVerification> {
    try {
      if (!data.paymentId || !data.signature) {
        return { success: false, error: 'Missing payment details' }
      }

      // Verify signature
      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_SECRET)
        .update(`${order.gatewayOrderId}|${data.paymentId}`)
        .digest('hex')

      if (expectedSignature === data.signature) {
        // Update order status
        order.status = 'paid'
        order.gatewayPaymentId = data.paymentId
        order.transactionId = data.paymentId
        order.paidAt = new Date()

        return {
          success: true,
          transactionId: data.paymentId,
          amount: order.amount,
          status: 'paid'
        }
      } else {
        order.status = 'failed'
        order.failureReason = 'Signature verification failed'
        
        return { success: false, error: 'Invalid payment signature' }
      }
    } catch (error) {
      console.error('Razorpay verification error:', error)
      return { success: false, error: 'Razorpay verification failed' }
    }
  }

  // Verify PayU payment
  static async verifyPayUPayment(
    order: PaymentOrder,
    data: { status?: string; paymentId?: string }
  ): Promise<PaymentVerification> {
    try {
      if (data.status === 'success') {
        order.status = 'paid'
        order.gatewayPaymentId = data.paymentId
        order.transactionId = data.paymentId
        order.paidAt = new Date()

        return {
          success: true,
          transactionId: data.paymentId,
          amount: order.amount,
          status: 'paid'
        }
      } else {
        order.status = 'failed'
        order.failureReason = 'Payment failed at gateway'
        
        return { success: false, error: 'Payment failed' }
      }
    } catch (error) {
      console.error('PayU verification error:', error)
      return { success: false, error: 'PayU verification failed' }
    }
  }

  // Verify COD payment
  static async verifyCODPayment(order: PaymentOrder): Promise<PaymentVerification> {
    try {
      // COD orders are marked as pending until delivery
      order.status = 'pending'
      
      return {
        success: true,
        transactionId: order.orderId,
        amount: order.amount,
        status: 'pending'
      }
    } catch (error) {
      console.error('COD verification error:', error)
      return { success: false, error: 'COD verification failed' }
    }
  }

  // Get order details
  static getOrder(orderId: string): PaymentOrder | null {
    return paymentOrders.find(o => o.orderId === orderId) || null
  }

  // Get all orders
  static getAllOrders(): PaymentOrder[] {
    return paymentOrders
  }

  // Cancel order
  static async cancelOrder(orderId: string, reason: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const order = paymentOrders.find(o => o.orderId === orderId)
      if (!order) {
        return { success: false, error: 'Order not found' }
      }

      if (order.status === 'paid') {
        return { success: false, error: 'Cannot cancel paid order' }
      }

      order.status = 'cancelled'
      order.failureReason = reason

      return { success: true, message: 'Order cancelled successfully' }
    } catch (error) {
      console.error('Cancel order error:', error)
      return { success: false, error: 'Failed to cancel order' }
    }
  }

  // Refund payment
  static async refundPayment(orderId: string, amount?: number): Promise<{ success: boolean; refundId?: string; message?: string; error?: string }> {
    try {
      const order = paymentOrders.find(o => o.orderId === orderId)
      if (!order) {
        return { success: false, error: 'Order not found' }
      }

      if (order.status !== 'paid') {
        return { success: false, error: 'Order is not in paid status' }
      }

      const refundAmount = amount || order.amount
      
      // In production, make actual refund API call
      const refundId = `refund_${Date.now()}`
      
      return {
        success: true,
        refundId,
        message: `Refund of ₹${refundAmount} initiated successfully`
      }
    } catch (error) {
      console.error('Refund error:', error)
      return { success: false, error: 'Refund failed' }
    }
  }

  // EMI options
  static getEMIOptions(amount: number): Array<{
    tenure: number
    monthlyAmount: number
    totalAmount: number
    interestRate: number
  }> {
    const emiPlans = [
      { tenure: 3, interestRate: 12 },
      { tenure: 6, interestRate: 14 },
      { tenure: 9, interestRate: 16 },
      { tenure: 12, interestRate: 18 },
      { tenure: 18, interestRate: 20 },
      { tenure: 24, interestRate: 22 }
    ]

    return emiPlans.map(plan => {
      const monthlyInterestRate = plan.interestRate / 12 / 100
      const monthlyAmount = (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, plan.tenure)) / 
                           (Math.pow(1 + monthlyInterestRate, plan.tenure) - 1)
      const totalAmount = monthlyAmount * plan.tenure

      return {
        tenure: plan.tenure,
        monthlyAmount: Math.round(monthlyAmount),
        totalAmount: Math.round(totalAmount),
        interestRate: plan.interestRate
      }
    })
  }

  // Payment analytics
  static getPaymentAnalytics() {
    const totalOrders = paymentOrders.length
    const paidOrders = paymentOrders.filter(o => o.status === 'paid').length
    const pendingOrders = paymentOrders.filter(o => o.status === 'pending').length
    const failedOrders = paymentOrders.filter(o => o.status === 'failed').length
    const cancelledOrders = paymentOrders.filter(o => o.status === 'cancelled').length

    const totalRevenue = paymentOrders
      .filter(o => o.status === 'paid')
      .reduce((sum, o) => sum + o.amount, 0)

    const paymentMethodStats = {
      razorpay: paymentOrders.filter(o => o.paymentMethod === 'razorpay').length,
      payu: paymentOrders.filter(o => o.paymentMethod === 'payu').length,
      cod: paymentOrders.filter(o => o.paymentMethod === 'cod').length
    }

    return {
      totalOrders,
      paidOrders,
      pendingOrders,
      failedOrders,
      cancelledOrders,
      totalRevenue,
      paymentMethodStats,
      successRate: totalOrders > 0 ? Math.round((paidOrders / totalOrders) * 100) : 0
    }
  }
}

export default PaymentService