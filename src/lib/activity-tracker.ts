// Customer Activity Tracker
// Tracks all customer actions and sends to admin dashboard

interface ActivityData {
  customerId: string
  customerName: string
  action: string
  details: any
  type: 'product_view' | 'cart_add' | 'order_place' | 'demo_book' | 'design_request' | 'user_signup'
}

class CustomerActivityTracker {
  private baseUrl: string
  private customerId: string | null = null
  private customerName: string | null = null

  constructor() {
    this.baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    this.initializeCustomer()
  }

  private initializeCustomer() {
    if (typeof window !== 'undefined') {
      // Get customer info from localStorage or session
      const userData = localStorage.getItem('user-data')
      if (userData) {
        const user = JSON.parse(userData)
        this.customerId = user.id || `guest_${Date.now()}`
        this.customerName = user.name || 'Guest User'
      } else {
        // Create anonymous user
        this.customerId = `guest_${Date.now()}`
        this.customerName = 'Guest User'
      }
    }
  }

  async trackActivity(type: ActivityData['type'], action: string, details: any = {}) {
    if (!this.customerId) return

    const activityData: ActivityData = {
      customerId: this.customerId,
      customerName: this.customerName || 'Guest User',
      action,
      details,
      type
    }

    try {
      await fetch('/api/customer-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData)
      })
    } catch (error) {
      console.error('Failed to track activity:', error)
    }
  }

  // Track specific customer actions
  trackProductView(productId: string, productName: string, category: string) {
    this.trackActivity('product_view', `viewed product "${productName}"`, {
      productId,
      productName,
      category
    })
  }

  trackCartAdd(productId: string, productName: string, price: number, quantity: number, cartValue: number) {
    this.trackActivity('cart_add', `added "${productName}" to cart`, {
      productId,
      productName,
      price,
      quantity,
      cartValue,
      products: [{ id: productId, name: productName, price, quantity }]
    })
  }

  trackOrderPlace(orderId: string, amount: number, products: any[], paymentMethod: string) {
    this.trackActivity('order_place', `placed order ${orderId}`, {
      orderId,
      amount,
      products,
      paymentMethod,
      productCount: products.length
    })
  }

  trackDemoBooking(productId: string, productName: string, scheduledDate: string, timeSlot: string) {
    this.trackActivity('demo_book', `booked demo for "${productName}"`, {
      productId,
      productName,
      scheduledDate,
      timeSlot
    })
  }

  trackDesignRequest(projectType: string, budget: { min: number, max: number }, requirements: string) {
    this.trackActivity('design_request', `submitted custom design request for ${projectType}`, {
      projectType,
      budget: budget.max,
      requirements,
      budgetRange: budget
    })
  }

  trackUserSignup(userId: string, userName: string, email: string) {
    this.customerId = userId
    this.customerName = userName
    
    // Update localStorage
    localStorage.setItem('user-data', JSON.stringify({
      id: userId,
      name: userName,
      email
    }))

    this.trackActivity('user_signup', `signed up with email ${email}`, {
      email,
      signupDate: new Date().toISOString()
    })
  }

  trackUserLogin(userId: string, userName: string, email: string) {
    this.customerId = userId
    this.customerName = userName
    
    // Update localStorage
    localStorage.setItem('user-data', JSON.stringify({
      id: userId,
      name: userName,
      email
    }))

    this.trackActivity('user_signup', `logged in`, {
      email,
      loginTime: new Date().toISOString()
    })
  }

  trackPageView(pageName: string, pageUrl: string) {
    this.trackActivity('product_view', `visited ${pageName}`, {
      pageName,
      pageUrl,
      timestamp: new Date().toISOString()
    })
  }

  trackSearch(searchTerm: string, resultCount: number) {
    this.trackActivity('product_view', `searched for "${searchTerm}"`, {
      searchTerm,
      resultCount,
      timestamp: new Date().toISOString()
    })
  }

  trackCategoryView(categoryName: string, productCount: number) {
    this.trackActivity('product_view', `browsed ${categoryName} category`, {
      categoryName,
      productCount,
      timestamp: new Date().toISOString()
    })
  }
}

// Create global instance
export const activityTracker = new CustomerActivityTracker()

// React Hook for easy tracking
export function useActivityTracker() {
  return {
    trackProductView: activityTracker.trackProductView.bind(activityTracker),
    trackCartAdd: activityTracker.trackCartAdd.bind(activityTracker),
    trackOrderPlace: activityTracker.trackOrderPlace.bind(activityTracker),
    trackDemoBooking: activityTracker.trackDemoBooking.bind(activityTracker),
    trackDesignRequest: activityTracker.trackDesignRequest.bind(activityTracker),
    trackUserSignup: activityTracker.trackUserSignup.bind(activityTracker),
    trackUserLogin: activityTracker.trackUserLogin.bind(activityTracker),
    trackPageView: activityTracker.trackPageView.bind(activityTracker),
    trackSearch: activityTracker.trackSearch.bind(activityTracker),
    trackCategoryView: activityTracker.trackCategoryView.bind(activityTracker)
  }
}