// Simple in-memory database simulation for development
// In production, this would be replaced with a real database like PostgreSQL, MongoDB, etc.

export interface Booking {
  id: string
  name: string
  email: string
  phone: string
  address: string
  preferredDate: string
  preferredTime: string
  serviceType: string
  message: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
  whatsappSent: boolean
  adminNotes?: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  contactType: string
  status: 'new' | 'responded' | 'closed'
  createdAt: string
  updatedAt: string
  whatsappSent: boolean
  adminNotes?: string
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  items: Array<{
    productId: string
    name: string
    price: number
    quantity: number
    image?: string
  }>
  totalAmount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  deliveryAddress: string
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
  trackingNumber?: string
  adminNotes?: string
}

// In-memory storage (replace with real database)
class InMemoryDatabase {
  private bookings: Map<string, Booking> = new Map()
  private contacts: Map<string, Contact> = new Map()
  private orders: Map<string, Order> = new Map()

  // Bookings
  async createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    const id = Date.now().toString()
    const now = new Date().toISOString()
    
    const newBooking: Booking = {
      ...booking,
      id,
      createdAt: now,
      updatedAt: now
    }
    
    this.bookings.set(id, newBooking)
    return newBooking
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  async getBookingById(id: string): Promise<Booking | null> {
    return this.bookings.get(id) || null
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | null> {
    const booking = this.bookings.get(id)
    if (!booking) return null
    
    const updated = {
      ...booking,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    this.bookings.set(id, updated)
    return updated
  }

  async deleteBooking(id: string): Promise<boolean> {
    return this.bookings.delete(id)
  }

  // Contacts
  async createContact(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    const id = Date.now().toString()
    const now = new Date().toISOString()
    
    const newContact: Contact = {
      ...contact,
      id,
      createdAt: now,
      updatedAt: now
    }
    
    this.contacts.set(id, newContact)
    return newContact
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  async getContactById(id: string): Promise<Contact | null> {
    return this.contacts.get(id) || null
  }

  async updateContact(id: string, updates: Partial<Contact>): Promise<Contact | null> {
    const contact = this.contacts.get(id)
    if (!contact) return null
    
    const updated = {
      ...contact,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    this.contacts.set(id, updated)
    return updated
  }

  // Orders
  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const id = Date.now().toString()
    const now = new Date().toISOString()
    
    const newOrder: Order = {
      ...order,
      id,
      createdAt: now,
      updatedAt: now
    }
    
    this.orders.set(id, newOrder)
    return newOrder
  }

  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orders.get(id) || null
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
    const order = this.orders.get(id)
    if (!order) return null
    
    const updated = {
      ...order,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    this.orders.set(id, updated)
    return updated
  }

  // Analytics
  async getAnalytics() {
    const bookings = await this.getBookings()
    const contacts = await this.getContacts()
    const orders = await this.getOrders()
    
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    return {
      totalBookings: bookings.length,
      totalContacts: contacts.length,
      totalOrders: orders.length,
      todayBookings: bookings.filter(b => new Date(b.createdAt) >= today).length,
      todayContacts: contacts.filter(c => new Date(c.createdAt) >= today).length,
      todayOrders: orders.filter(o => new Date(o.createdAt) >= today).length,
      monthlyBookings: bookings.filter(b => new Date(b.createdAt) >= thisMonth).length,
      monthlyContacts: contacts.filter(c => new Date(c.createdAt) >= thisMonth).length,
      monthlyOrders: orders.filter(o => new Date(o.createdAt) >= thisMonth).length,
      pendingBookings: bookings.filter(b => b.status === 'pending').length,
      newContacts: contacts.filter(c => c.status === 'new').length,
      processingOrders: orders.filter(o => o.status === 'processing').length,
      totalRevenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.totalAmount, 0)
    }
  }
}

// Export singleton instance
export const db = new InMemoryDatabase()