// Enhanced Order Management System for DFW
export interface OrderItem {
  id: string
  productId: string
  productName: string
  productSku: string
  productImage: string
  variantId?: string
  quantity: number
  unitPrice: number
  totalPrice: number
  customizationDetails?: any
}

export interface OrderAddress {
  firstName: string
  lastName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

export interface EnhancedOrder {
  id: string
  orderNumber: string
  userId?: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded' | 'partial_refund'
  shippingStatus: 'not_shipped' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'returned'
  
  // Customer details
  customerName: string
  customerEmail: string
  customerPhone: string
  
  // Order items
  items: OrderItem[]
  
  // Pricing
  subtotal: number
  taxAmount: number
  shippingAmount: number
  discountAmount: number
  totalAmount: number
  
  // Addresses
  shippingAddress: OrderAddress
  billingAddress?: OrderAddress
  
  // Shipping
  shippingMethod: string
  trackingNumber?: string
  estimatedDeliveryDate?: Date
  actualDeliveryDate?: Date
  
  // Timestamps
  orderDate: Date
  paymentDate?: Date
  shippedDate?: Date
  deliveredDate?: Date
  cancelledDate?: Date
  
  // Notes and history
  customerNotes?: string
  adminNotes?: string
  cancellationReason?: string
  statusHistory: Array<{
    status: string
    timestamp: Date
    notes?: string
    updatedBy?: string
  }>
  
  // Additional info
  referenceNumber?: string
  demoBookingId?: string
  customDesignId?: string
}

// In-memory storage (replace with database)
const orders: EnhancedOrder[] = []

export class OrderManagementService {
  // Generate order number
  static generateOrderNumber(): string {
    const prefix = 'DFW'
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `${prefix}${date}${random}`
  }

  // Create new order
  static async createOrder(orderData: {
    userId?: string
    customerName: string
    customerEmail: string
    customerPhone: string
    items: Omit<OrderItem, 'id' | 'totalPrice'>[]
    shippingAddress: OrderAddress
    billingAddress?: OrderAddress
    shippingMethod: string
    customerNotes?: string
    demoBookingId?: string
    customDesignId?: string
  }): Promise<{ success: boolean; order?: EnhancedOrder; error?: string }> {
    try {
      // Calculate order items
      const items: OrderItem[] = orderData.items.map(item => ({
        ...item,
        id: Date.now().toString() + Math.random().toString(36).substring(2),
        totalPrice: item.unitPrice * item.quantity
      }))

      // Calculate totals
      const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0)
      const taxAmount = subtotal * 0.18 // 18% GST
      const shippingAmount = subtotal > 25000 ? 0 : 500 // Free shipping above ₹25,000
      const totalAmount = subtotal + taxAmount + shippingAmount

      // Create order
      const order: EnhancedOrder = {
        id: Date.now().toString(),
        orderNumber: this.generateOrderNumber(),
        userId: orderData.userId,
        status: 'pending',
        paymentStatus: 'pending',
        shippingStatus: 'not_shipped',
        
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        
        items,
        
        subtotal,
        taxAmount,
        shippingAmount,
        discountAmount: 0,
        totalAmount,
        
        shippingAddress: orderData.shippingAddress,
        billingAddress: orderData.billingAddress || orderData.shippingAddress,
        
        shippingMethod: orderData.shippingMethod,
        
        orderDate: new Date(),
        
        customerNotes: orderData.customerNotes,
        statusHistory: [{
          status: 'pending',
          timestamp: new Date(),
          notes: 'Order created'
        }],
        
        demoBookingId: orderData.demoBookingId,
        customDesignId: orderData.customDesignId
      }

      // Store order
      orders.push(order)

      // Send admin notification
      await this.sendOrderNotification(order, 'created')

      return { success: true, order }
    } catch (error) {
      console.error('Create order error:', error)
      return { success: false, error: 'Failed to create order' }
    }
  }

  // Update order status
  static async updateOrderStatus(
    orderId: string, 
    status: EnhancedOrder['status'], 
    notes?: string,
    updatedBy?: string
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const order = orders.find(o => o.id === orderId)
      if (!order) {
        return { success: false, error: 'Order not found' }
      }

      const oldStatus = order.status
      order.status = status

      // Update status history
      order.statusHistory.push({
        status,
        timestamp: new Date(),
        notes,
        updatedBy
      })

      // Update specific timestamps
      switch (status) {
        case 'confirmed':
          // Order confirmed, update inventory
          await this.updateInventory(order.items, 'decrease')
          break
        case 'shipped':
          order.shippedDate = new Date()
          order.shippingStatus = 'shipped'
          break
        case 'delivered':
          order.deliveredDate = new Date()
          order.shippingStatus = 'delivered'
          break
        case 'cancelled':
          order.cancelledDate = new Date()
          order.cancellationReason = notes
          // Restore inventory
          await this.updateInventory(order.items, 'increase')
          break
      }

      // Send notifications for status changes
      if (oldStatus !== status) {
        await this.sendOrderNotification(order, 'status_updated')
      }

      return { success: true, message: `Order status updated to ${status}` }
    } catch (error) {
      console.error('Update order status error:', error)
      return { success: false, error: 'Failed to update order status' }
    }
  }

  // Add tracking number
  static async addTrackingNumber(
    orderId: string, 
    trackingNumber: string,
    estimatedDeliveryDate?: Date
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const order = orders.find(o => o.id === orderId)
      if (!order) {
        return { success: false, error: 'Order not found' }
      }

      order.trackingNumber = trackingNumber
      order.estimatedDeliveryDate = estimatedDeliveryDate

      // Update status history
      order.statusHistory.push({
        status: order.status,
        timestamp: new Date(),
        notes: `Tracking number added: ${trackingNumber}`
      })

      // Send tracking notification
      await this.sendTrackingNotification(order)

      return { success: true, message: 'Tracking number added successfully' }
    } catch (error) {
      console.error('Add tracking number error:', error)
      return { success: false, error: 'Failed to add tracking number' }
    }
  }

  // Get order by ID
  static getOrder(orderId: string): EnhancedOrder | null {
    return orders.find(o => o.id === orderId) || null
  }

  // Get order by order number
  static getOrderByNumber(orderNumber: string): EnhancedOrder | null {
    return orders.find(o => o.orderNumber === orderNumber) || null
  }

  // Get orders by user
  static getUserOrders(userId: string): EnhancedOrder[] {
    return orders.filter(o => o.userId === userId)
  }

  // Get all orders (admin)
  static getAllOrders(filters?: {
    status?: string
    paymentStatus?: string
    dateFrom?: Date
    dateTo?: Date
    limit?: number
    offset?: number
  }): { orders: EnhancedOrder[]; total: number } {
    let filteredOrders = [...orders]

    // Apply filters
    if (filters?.status) {
      filteredOrders = filteredOrders.filter(o => o.status === filters.status)
    }
    if (filters?.paymentStatus) {
      filteredOrders = filteredOrders.filter(o => o.paymentStatus === filters.paymentStatus)
    }
    if (filters?.dateFrom) {
      filteredOrders = filteredOrders.filter(o => o.orderDate >= filters.dateFrom!)
    }
    if (filters?.dateTo) {
      filteredOrders = filteredOrders.filter(o => o.orderDate <= filters.dateTo!)
    }

    const total = filteredOrders.length

    // Apply pagination
    if (filters?.offset) {
      filteredOrders = filteredOrders.slice(filters.offset)
    }
    if (filters?.limit) {
      filteredOrders = filteredOrders.slice(0, filters.limit)
    }

    return { orders: filteredOrders, total }
  }

  // Update inventory (placeholder - replace with actual inventory system)
  private static async updateInventory(
    items: OrderItem[], 
    action: 'increase' | 'decrease'
  ): Promise<void> {
    // In production, update actual inventory
    console.log(`Inventory ${action}:`, items.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    })))
  }

  // Send order notifications
  private static async sendOrderNotification(order: EnhancedOrder, type: 'created' | 'status_updated'): Promise<void> {
    try {
      const { automatedWhatsApp } = await import('@/lib/automated-whatsapp')
      
      const message = type === 'created' 
        ? `🛍️ NEW ORDER RECEIVED 🛍️

📋 Order: ${order.orderNumber}
👤 Customer: ${order.customerName}
📧 Email: ${order.customerEmail}
📱 Phone: ${order.customerPhone}
💰 Amount: ₹${order.totalAmount}

📦 Items:
${order.items.map(item => `• ${item.productName} (Qty: ${item.quantity})`).join('\n')}

📍 Address: ${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}

*DFW - Divya Furniture World*`
        : `📋 ORDER STATUS UPDATED 📋

🆔 Order: ${order.orderNumber}
📊 Status: ${order.status.toUpperCase()}
👤 Customer: ${order.customerName}
💰 Amount: ₹${order.totalAmount}

*DFW - Divya Furniture World*`

      await automatedWhatsApp.sendContactToAdmin({
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        subject: `Order ${type === 'created' ? 'Created' : 'Updated'} - ${order.orderNumber}`,
        message
      })
    } catch (error) {
      console.error('Failed to send order notification:', error)
    }
  }

  // Send tracking notification
  private static async sendTrackingNotification(order: EnhancedOrder): Promise<void> {
    try {
      const { automatedWhatsApp } = await import('@/lib/automated-whatsapp')
      
      const message = `📦 TRACKING INFO ADDED 📦

🆔 Order: ${order.orderNumber}
👤 Customer: ${order.customerName}
📱 Phone: ${order.customerPhone}
🚚 Tracking: ${order.trackingNumber}
${order.estimatedDeliveryDate ? `📅 Est. Delivery: ${order.estimatedDeliveryDate.toLocaleDateString('en-IN')}` : ''}

*DFW - Divya Furniture World*`

      await automatedWhatsApp.sendContactToAdmin({
        name: order.customerName,
        email: order.customerEmail,
        phone: order.customerPhone,
        subject: `Tracking Added - ${order.orderNumber}`,
        message
      })
    } catch (error) {
      console.error('Failed to send tracking notification:', error)
    }
  }

  // Order analytics
  static getOrderAnalytics() {
    const totalOrders = orders.length
    const totalRevenue = orders
      .filter(o => o.paymentStatus === 'paid')
      .reduce((sum, o) => sum + o.totalAmount, 0)

    const statusStats = {
      pending: orders.filter(o => o.status === 'pending').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      returned: orders.filter(o => o.status === 'returned').length
    }

    const paymentStats = {
      pending: orders.filter(o => o.paymentStatus === 'pending').length,
      paid: orders.filter(o => o.paymentStatus === 'paid').length,
      failed: orders.filter(o => o.paymentStatus === 'failed').length,
      refunded: orders.filter(o => o.paymentStatus === 'refunded').length
    }

    const averageOrderValue = totalOrders > 0 ? totalRevenue / orders.filter(o => o.paymentStatus === 'paid').length : 0

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue: Math.round(averageOrderValue),
      statusStats,
      paymentStats
    }
  }
}

export default OrderManagementService