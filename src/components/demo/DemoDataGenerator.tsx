'use client'

import { useEffect } from 'react'
import { useActivityTracker } from '@/lib/activity-tracker'

export default function DemoDataGenerator() {
  const { 
    trackProductView, 
    trackCartAdd, 
    trackOrderPlace, 
    trackDemoBooking,
    trackPageView,
    trackCategoryView
  } = useActivityTracker()

  useEffect(() => {
    // Generate some demo customer activities for testing
    const generateDemoActivities = () => {
      const customers = [
        { id: 'cust_001', name: 'Rajesh Kumar' },
        { id: 'cust_002', name: 'Priya Sharma' },
        { id: 'cust_003', name: 'Amit Patel' },
        { id: 'cust_004', name: 'Sneha Gupta' },
        { id: 'cust_005', name: 'Vikram Singh' }
      ]

      const products = [
        { id: 'prod_001', name: 'Premium Leather Sofa', price: 89999 },
        { id: 'prod_002', name: 'Teak Wood Dining Table', price: 65999 },
        { id: 'prod_003', name: 'Queen Size Bed Frame', price: 45999 },
        { id: 'prod_004', name: 'Executive Office Chair', price: 25999 },
        { id: 'prod_005', name: 'Kids Study Table', price: 15999 }
      ]

      // Simulate customer activities every 10-30 seconds
      const simulateActivity = () => {
        const customer = customers[Math.floor(Math.random() * customers.length)]
        const product = products[Math.floor(Math.random() * products.length)]
        const activityType = Math.floor(Math.random() * 6)

        switch (activityType) {
          case 0:
            trackProductView(product.id, product.name, 'Living Room')
            break
          case 1:
            trackCartAdd(product.id, product.name, product.price, 1, product.price)
            break
          case 2:
            trackPageView('Category - Bedroom', '/categories/bedroom')
            break
          case 3:
            trackCategoryView('Living Room', 150)
            break
          case 4:
            trackDemoBooking(product.id, product.name, '2024-01-15', '2:00 PM - 4:00 PM')
            break
          case 5:
            trackOrderPlace(
              `ORD_${Date.now()}`,
              product.price,
              [{ id: product.id, name: product.name, price: product.price, quantity: 1 }],
              'UPI'
            )
            break
        }
      }

      // Start generating activities
      const interval = setInterval(simulateActivity, Math.random() * 20000 + 10000) // 10-30 seconds

      return () => clearInterval(interval)
    }

    // Start demo data generation after 5 seconds
    const timeout = setTimeout(generateDemoActivities, 5000)

    return () => clearTimeout(timeout)
  }, [trackProductView, trackCartAdd, trackOrderPlace, trackDemoBooking, trackPageView, trackCategoryView])

  return null // This component doesn't render anything
}