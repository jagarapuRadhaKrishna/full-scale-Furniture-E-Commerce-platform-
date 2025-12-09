// Frontend service layer for API communication with authentication

const API_BASE_URL = '/api'

export class APIService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Add authorization header if token is provided
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`
    }
    
    const config: RequestInit = {
      headers: { ...defaultHeaders, ...options.headers },
      ...options,
    }
    
    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Products API
  static async getProducts(params?: {
    category?: string
    subCategory?: string
    minPrice?: number
    maxPrice?: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    page?: number
    limit?: number
  }) {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = queryParams.toString()
    return this.request(`/products${queryString ? `?${queryString}` : ''}`)
  }

  static async getProduct(id: string) {
    return this.request(`/products/${id}`)
  }

  // Categories API
  static async getCategories(includeInactive = false) {
    return this.request(`/categories?includeInactive=${includeInactive}`)
  }

  // Demo Bookings API
  static async createDemoBooking(bookingData: {
    customerName: string
    email: string
    phone: string
    address: {
      street: string
      city: string
      state: string
      pincode: string
    }
    preferredDate: string
    preferredTime: string
    categories: string[]
    specificProducts?: string[]
    notes?: string
  }, token?: string) {
    return this.request('/demo-bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }, token)
  }

  static async getDemoBookings(params?: {
    status?: string
    customerEmail?: string
    page?: number
    limit?: number
  }) {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = queryParams.toString()
    return this.request(`/demo-bookings${queryString ? `?${queryString}` : ''}`)
  }

  // Customers API
  static async createCustomer(customerData: {
    name: string
    email: string
    phone: string
    addresses?: Array<{
      type: 'home' | 'office' | 'other'
      street: string
      city: string
      state: string
      pincode: string
      isDefault: boolean
    }>
    preferences?: {
      categories: string[]
      priceRange: { min: number; max: number }
    }
  }) {
    return this.request('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData),
    })
  }

  static async getCustomers(params?: {
    email?: string
    phone?: string
    page?: number
    limit?: number
  }) {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = queryParams.toString()
    return this.request(`/customers${queryString ? `?${queryString}` : ''}`)
  }

  // Orders API
  static async createOrder(orderData: {
    customerId: string
    items: Array<{
      productId: string
      quantity: number
      price: string
      specifications?: any
    }>
    deliveryAddress: {
      street: string
      city: string
      state: string
      pincode: string
    }
    expectedDelivery?: string
    notes?: string
  }) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  static async getOrders(params?: {
    customerId?: string
    status?: string
    paymentStatus?: string
    page?: number
    limit?: number
  }) {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = queryParams.toString()
    return this.request(`/orders${queryString ? `?${queryString}` : ''}`)
  }

  // Reviews API
  static async createReview(reviewData: {
    productId: string
    customerId: string
    rating: number
    title: string
    comment: string
    images?: string[]
  }) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    })
  }

  static async getReviews(params?: {
    productId?: string
    customerId?: string
    rating?: number
    verified?: boolean
    page?: number
    limit?: number
  }) {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = queryParams.toString()
    return this.request(`/reviews${queryString ? `?${queryString}` : ''}`)
  }

  // Custom Designs API
  static async createCustomDesign(designData: {
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
    images?: string[]
    includeHomeDemo: boolean
  }) {
    return this.request('/custom-designs', {
      method: 'POST',
      body: JSON.stringify(designData),
    })
  }

  static async getCustomDesigns(params?: {
    customerId?: string
    status?: string
    type?: string
    page?: number
    limit?: number
  }) {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = queryParams.toString()
    return this.request(`/custom-designs${queryString ? `?${queryString}` : ''}`)
  }

  // Support API
  static async createSupportTicket(ticketData: {
    customerId: string
    type: 'repair' | 'assembly' | 'warranty' | 'general' | 'complaint'
    subject: string
    description: string
    priority?: 'low' | 'medium' | 'high' | 'urgent'
    images?: string[]
  }) {
    return this.request('/support', {
      method: 'POST',
      body: JSON.stringify(ticketData),
    })
  }

  static async getSupportTickets(params?: {
    customerId?: string
    type?: string
    status?: string
    priority?: string
    page?: number
    limit?: number
  }) {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = queryParams.toString()
    return this.request(`/support${queryString ? `?${queryString}` : ''}`)
  }

  // Statistics API
  static async getStatistics() {
    return this.request('/stats')
  }

  // Database Seeding (Development only)
  static async seedDatabase() {
    return this.request('/seed', {
      method: 'POST',
    })
  }
}