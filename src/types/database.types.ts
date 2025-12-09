/**
 * Database Type Definitions
 * All MongoDB collection interfaces and types
 */

import { ObjectId } from 'mongodb';

// ============================================
// USER TYPES
// ============================================

export type UserRole = 'customer' | 'admin' | 'vendor' | 'delivery' | 'super_admin';

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role: UserRole;
  avatar?: string;
  addresses: Address[];
  defaultAddressId?: string;
  wishlist: ObjectId[];
  preferences: {
    newsletter: boolean;
    smsNotifications: boolean;
    emailNotifications: boolean;
    pushNotifications: boolean;
    language: string;
    currency: string;
  };
  savedCards: SavedCard[];
  stats: {
    totalOrders: number;
    totalSpent: number;
    loyaltyPoints?: number;
  };
  twoFactorEnabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  type: 'home' | 'office' | 'other';
  fullName: string;
  phone: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  landmark?: string;
  isDefault: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface SavedCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  token: string; // Tokenized card
  isDefault: boolean;
}

// ============================================
// PRODUCT TYPES
// ============================================

export interface Product {
  _id?: ObjectId;
  sku: string;
  title: string;
  slug: string;
  brand: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    validUntil?: Date;
  };
  taxRate: number;
  specifications: ProductSpecifications;
  stock: ProductStock;
  variants?: ProductVariant[];
  images: ProductImage[];
  videos?: ProductVideo[];
  model3D?: Product3DModel;
  categories: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  wishlistCount: number;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  vendorId?: ObjectId;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  trending: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSpecifications {
  material: string;
  color: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: 'cm' | 'inch';
  };
  weight: {
    value: number;
    unit: 'kg' | 'lbs';
  };
  assembly: 'required' | 'not_required';
  warranty: string;
  features?: string[];
}

export interface ProductStock {
  available: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'pre_order';
  leadTime?: string;
  locations?: {
    warehouseId: string;
    quantity: number;
  }[];
}

export interface ProductVariant {
  id: string;
  type: 'color' | 'size' | 'material';
  options: {
    value: string;
    sku: string;
    priceAdjustment: number;
    available: boolean;
    image?: string;
  }[];
}

export interface ProductImage {
  id: string;
  url: string;
  thumbnail: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductVideo {
  id: string;
  url: string;
  thumbnail: string;
  duration: number;
}

export interface Product3DModel {
  glbUrl: string;
  usdzUrl: string; // For iOS AR
  poster: string;
}

// ============================================
// ORDER TYPES
// ============================================

export type OrderStatus =
  | 'pending_payment'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'refunded';

export interface Order {
  _id?: ObjectId;
  userId: ObjectId;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  payment: OrderPayment;
  status: OrderStatus;
  statusHistory: OrderStatusHistory[];
  totals: OrderTotals;
  shipping: {
    method: string;
    cost: number;
    trackingNumber?: string;
    courierPartner?: string;
    estimatedDelivery?: Date;
  };
  deliveryAgentId?: ObjectId;
  notes?: string;
  cancellationReason?: string;
  returnReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: ObjectId;
  variantId?: string;
  sku: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

export interface OrderPayment {
  provider: 'razorpay' | 'stripe' | 'upi' | 'cod' | 'wallet';
  method: string;
  txnId?: string;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  amount: number;
  paidAt?: Date;
}

export interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: Date;
  location?: string;
  notes?: string;
  updatedBy: string;
}

export interface OrderTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

// ============================================
// CART TYPES
// ============================================

export interface Cart {
  _id?: ObjectId;
  userId?: ObjectId; // null for guest carts
  items: CartItem[];
  coupons: AppliedCoupon[];
  totals: {
    subtotal: number;
    discount: number;
    estimatedTax: number;
    estimatedShipping: number;
    total: number;
  };
  expiresAt?: Date; // For guest carts
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: ObjectId;
  variantId?: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
    slug: string;
    currentPrice: number;
    stock: number;
  };
  notes?: string;
  addedAt: Date;
}

export interface AppliedCoupon {
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping' | 'bogo';
  value: number;
  discount: number;
  appliedAt: Date;
}

// ============================================
// REVIEW TYPES
// ============================================

export interface Review {
  _id?: ObjectId;
  productId: ObjectId;
  userId: ObjectId;
  orderId: ObjectId;
  rating: number; // 1-5
  title: string;
  body: string;
  images: string[];
  helpful: number;
  notHelpful: number;
  verified: boolean;
  response?: {
    from: 'vendor' | 'admin';
    text: string;
    date: Date;
  };
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// WISHLIST TYPES
// ============================================

export interface Wishlist {
  _id?: ObjectId;
  userId: ObjectId;
  items: WishlistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WishlistItem {
  productId: ObjectId;
  addedAt: Date;
  notifyOnDiscount: boolean;
  notifyOnStock: boolean;
}

// ============================================
// SUPPORT TICKET TYPES
// ============================================

export type TicketStatus = 'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketCategory = 'order' | 'product' | 'payment' | 'return' | 'other';

export interface SupportTicket {
  _id?: ObjectId;
  userId: ObjectId;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  orderId?: ObjectId;
  productId?: ObjectId;
  messages: TicketMessage[];
  assignedTo?: ObjectId; // Agent ID
  satisfaction?: number; // 1-5 rating
  createdAt: Date;
  resolvedAt?: Date;
  updatedAt: Date;
}

export interface TicketMessage {
  from: 'user' | 'agent';
  userId: ObjectId;
  text: string;
  attachments: string[];
  timestamp: Date;
}

// ============================================
// CATEGORY TYPES
// ============================================

export interface Category {
  _id?: ObjectId;
  name: string;
  slug: string;
  description?: string;
  parentId?: ObjectId;
  image?: string;
  icon?: string;
  productCount: number;
  featured: boolean;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// DEMO BOOKING TYPES
// ============================================

export type DemoStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export interface DemoBooking {
  _id?: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  preferredDate: Date;
  preferredSlot: string;
  address: Address;
  status: DemoStatus;
  assignedAgent?: ObjectId;
  notes?: string;
  feedback?: {
    rating: number;
    comment: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// CUSTOM DESIGN TYPES
// ============================================

export type CustomDesignStatus = 'pending' | 'in_review' | 'quoted' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface CustomDesign {
  _id?: ObjectId;
  userId: ObjectId;
  title: string;
  description: string;
  requirements: string;
  attachments: string[];
  budget?: {
    min: number;
    max: number;
  };
  timeline?: string;
  status: CustomDesignStatus;
  assignedDesigner?: ObjectId;
  quotes: DesignQuote[];
  messages: DesignMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DesignQuote {
  id: string;
  amount: number;
  description: string;
  timeline: string;
  attachments: string[];
  validUntil: Date;
  accepted: boolean;
  createdAt: Date;
}

export interface DesignMessage {
  from: 'user' | 'designer';
  userId: ObjectId;
  text: string;
  attachments: string[];
  timestamp: Date;
}

// ============================================
// VENDOR TYPES
// ============================================

export interface Vendor {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  company: string;
  gst?: string;
  address: Address;
  commissionRate: number;
  status: 'active' | 'inactive' | 'suspended';
  bankDetails?: {
    accountNumber: string;
    ifsc: string;
    accountHolderName: string;
  };
  stats: {
    totalProducts: number;
    totalSales: number;
    totalCommission: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// DELIVERY AGENT TYPES
// ============================================

export type DeliveryAgentStatus = 'available' | 'busy' | 'offline';

export interface DeliveryAgent {
  _id?: ObjectId;
  name: string;
  phone: string;
  email?: string;
  photo?: string;
  vehicleType: 'bike' | 'car' | 'van';
  vehicleNumber: string;
  status: DeliveryAgentStatus;
  currentLocation?: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  currentOrders: ObjectId[];
  stats: {
    totalDeliveries: number;
    successRate: number;
    avgRating: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export type NotificationType = 'order' | 'payment' | 'delivery' | 'promotion' | 'system';

export interface Notification {
  _id?: ObjectId;
  userId: ObjectId;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// ============================================
// PAYMENT TYPES
// ============================================

export interface Payment {
  _id?: ObjectId;
  orderId: ObjectId;
  userId: ObjectId;
  method: 'razorpay' | 'stripe' | 'upi' | 'cod' | 'wallet';
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  transactionId?: string;
  gatewayResponse?: any;
  refundId?: string;
  refundAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// OFFER/COUPON TYPES
// ============================================

export interface Offer {
  _id?: ObjectId;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping' | 'bogo';
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  validFrom: Date;
  validTo: Date;
  usageLimit?: number;
  usedCount: number;
  userLimit?: number;
  applicableCategories?: string[];
  excludedProducts?: ObjectId[];
  firstTimeOnly?: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// ANALYTICS EVENT TYPES
// ============================================

export type AnalyticsEventType = 
  | 'page_view'
  | 'product_view'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'checkout_started'
  | 'purchase'
  | 'search';

export interface AnalyticsEvent {
  _id?: ObjectId;
  userId?: ObjectId;
  sessionId: string;
  event: AnalyticsEventType;
  data: any;
  timestamp: Date;
}
