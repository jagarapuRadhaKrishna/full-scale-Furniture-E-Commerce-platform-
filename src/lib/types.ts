// Database models and interfaces

import { ObjectId } from 'mongodb'

export interface Product {
  _id?: ObjectId
  id: number
  name: string
  category: string
  subCategory?: string
  price: string
  originalPrice?: string
  description?: string
  images: string[]
  rating: number
  reviews: number
  has360View: boolean
  isNew: boolean
  specifications?: {
    material?: string
    dimensions?: string
    weight?: string
    color?: string
    warranty?: string
  }
  stock: number
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  _id?: ObjectId
  id: number
  name: string
  slug: string
  description: string
  image: string
  itemCount: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface DemoBooking {
  _id?: ObjectId
  id: string
  customerName: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    pincode: string
  }
  preferredDate: Date
  preferredTime: string
  categories: string[]
  specificProducts?: string[]
  notes?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  technicianId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  _id?: ObjectId
  id: string
  name: string
  email: string
  phone: string
  addresses: Array<{
    type: 'home' | 'office' | 'other'
    street: string
    city: string
    state: string
    pincode: string
    isDefault: boolean
  }>
  orders: string[]
  demoBookings: string[]
  preferences: {
    categories: string[]
    priceRange: {
      min: number
      max: number
    }
  }
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  _id?: ObjectId
  id: string
  customerId: string
  items: Array<{
    productId: string
    quantity: number
    price: string
    specifications?: any
  }>
  totalAmount: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  deliveryAddress: {
    street: string
    city: string
    state: string
    pincode: string
  }
  orderDate: Date
  expectedDelivery?: Date
  actualDelivery?: Date
  trackingId?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface CustomDesign {
  _id?: ObjectId
  id: string
  customerId: string
  type: string
  roomType: string
  budget: string
  dimensions: {
    length: number
    width: number
    height?: number
  }
  materials: string[]
  style: string
  colorPreferences: string[]
  description: string
  images: string[]
  status: 'submitted' | 'under_review' | 'approved' | 'in_production' | 'completed' | 'cancelled'
  designerId?: string
  quotation?: {
    amount: number
    details: string
    validUntil: Date
  }
  includeHomeDemo: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Technician {
  _id?: ObjectId
  id: string
  name: string
  email: string
  phone: string
  employeeId: string
  expertise: string[]
  serviceAreas: string[]
  isActive: boolean
  rating: number
  totalBookings: number
  completedBookings: number
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  _id?: ObjectId
  id: string
  productId: string
  customerId: string
  rating: number
  title: string
  comment: string
  images?: string[]
  isVerified: boolean
  helpfulVotes: number
  createdAt: Date
  updatedAt: Date
}

export interface SupportTicket {
  _id?: ObjectId
  id: string
  customerId: string
  type: 'repair' | 'assembly' | 'warranty' | 'general' | 'complaint'
  subject: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  assignedTo?: string
  resolution?: string
  images?: string[]
  createdAt: Date
  updatedAt: Date
}