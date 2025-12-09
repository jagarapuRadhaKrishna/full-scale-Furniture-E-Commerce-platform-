import { ObjectId } from 'mongodb';

/**
 * Order Models for DFW Furniture
 * Part 4: Order Management & Invoicing
 */

// ============= Order Models =============

export const ORDER_COLLECTIONS = {
  ORDERS: 'orders',
  INVOICES: 'invoices',
  PAYMENTS: 'payments',
  NOTIFICATIONS: 'notifications',
  ORDER_TRACKING: 'order_tracking',
};

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned'
  | 'Refunded';

export type PaymentStatus = 'Pending' | 'Completed' | 'Failed' | 'Refunded' | 'Partially Refunded';

export interface IOrderItem {
  productId: ObjectId;
  productName: string;
  variantName?: string;
  sku: string;
  quantity: number;
  price: number;
  discount: number;
  tax: number;
  total: number;
  image: string;
}

export interface IShippingAddress {
  name: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IOrder {
  _id?: ObjectId;
  orderId: string; // Human-readable ID (e.g., DFW-20231015-0001)
  userId: ObjectId;
  userName: string;
  userEmail: string;
  userPhone: string;

  // Order items
  items: IOrderItem[];

  // Pricing
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  couponCode?: string;
  couponDiscount?: number;

  // Shipping
  shippingAddress: IShippingAddress;
  billingAddress?: IShippingAddress;

  // Payment
  paymentMethod: 'Razorpay' | 'COD' | 'UPI';
  paymentStatus: PaymentStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;

  // Status & Tracking
  status: OrderStatus;
  trackingNumber?: string;
  deliveryPartnerId?: ObjectId;
  estimatedDeliveryDate?: Date;
  actualDeliveryDate?: Date;

  // Notes
  customerNotes?: string;
  adminNotes?: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface IInvoice {
  _id?: ObjectId;
  invoiceNumber: string; // INV-20231015-0001
  orderId: ObjectId;
  orderNumber: string;

  // Customer details
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  billingAddress: IShippingAddress;
  shippingAddress: IShippingAddress;

  // Invoice items (same as order items)
  items: IOrderItem[];

  // Pricing
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;

  // Payment
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  paidAmount: number;
  dueAmount: number;

  // Invoice metadata
  issuedDate: Date;
  dueDate?: Date;
  pdfUrl?: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment {
  _id?: ObjectId;
  paymentId: string; // PAY-20231015-0001
  orderId: ObjectId;
  userId: ObjectId;

  amount: number;
  currency: string;
  paymentMethod: 'Razorpay' | 'COD' | 'UPI';
  status: PaymentStatus;

  // Razorpay specific
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;

  // Refund
  refundId?: string;
  refundAmount?: number;
  refundReason?: string;
  refundedAt?: Date;

  // Metadata
  metadata?: Record<string, any>;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderTracking {
  _id?: ObjectId;
  orderId: ObjectId;
  status: OrderStatus;
  message: string;
  location?: string;
  updatedBy: ObjectId; // Admin/Vendor/DeliveryAgent ID
  updatedByRole: 'Admin' | 'Vendor' | 'DeliveryAgent' | 'System';
  timestamp: Date;
}

export interface INotification {
  _id?: ObjectId;
  userId: ObjectId;
  type: 'Order' | 'Payment' | 'Delivery' | 'Promotion' | 'System';
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
}

// ============= Indexes =============

export const ORDER_INDEXES = [
  { key: { orderId: 1 }, unique: true },
  { key: { userId: 1 } },
  { key: { status: 1 } },
  { key: { createdAt: -1 } },
  { key: { paymentStatus: 1 } },
];

export const INVOICE_INDEXES = [
  { key: { invoiceNumber: 1 }, unique: true },
  { key: { orderId: 1 } },
  { key: { customerEmail: 1 } },
  { key: { issuedDate: -1 } },
];

export const PAYMENT_INDEXES = [
  { key: { paymentId: 1 }, unique: true },
  { key: { orderId: 1 } },
  { key: { userId: 1 } },
  { key: { status: 1 } },
  { key: { createdAt: -1 } },
];

export const ORDER_TRACKING_INDEXES = [
  { key: { orderId: 1 } },
  { key: { timestamp: -1 } },
];

export const NOTIFICATION_INDEXES = [
  { key: { userId: 1 } },
  { key: { isRead: 1 } },
  { key: { createdAt: -1 } },
];

// ============= Helper Functions =============

export class OrderModel {
  /**
   * Generate unique order ID
   */
  static generateOrderId(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    return `DFW-${year}${month}${day}-${random}`;
  }

  /**
   * Generate invoice number
   */
  static generateInvoiceNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    return `INV-${year}${month}${day}-${random}`;
  }

  /**
   * Generate payment ID
   */
  static generatePaymentId(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    return `PAY-${year}${month}${day}-${random}`;
  }

  /**
   * Calculate estimated delivery date (7-10 business days)
   */
  static calculateEstimatedDelivery(orderDate: Date = new Date()): Date {
    const days = 7 + Math.floor(Math.random() * 4); // 7-10 days
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + days);
    return deliveryDate;
  }

  /**
   * Get status color for UI
   */
  static getStatusColor(status: OrderStatus): string {
    const colors: Record<OrderStatus, string> = {
      Pending: 'yellow',
      Confirmed: 'blue',
      Processing: 'blue',
      Shipped: 'purple',
      'Out for Delivery': 'indigo',
      Delivered: 'green',
      Cancelled: 'red',
      Returned: 'orange',
      Refunded: 'gray',
    };
    return colors[status] || 'gray';
  }

  /**
   * Check if order can be cancelled
   */
  static canCancel(status: OrderStatus): boolean {
    return ['Pending', 'Confirmed'].includes(status);
  }

  /**
   * Check if order can be returned
   */
  static canReturn(status: OrderStatus, deliveryDate?: Date): boolean {
    if (status !== 'Delivered' || !deliveryDate) return false;
    const daysSinceDelivery = Math.floor(
      (new Date().getTime() - deliveryDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSinceDelivery <= 30; // 30-day return policy
  }
}
