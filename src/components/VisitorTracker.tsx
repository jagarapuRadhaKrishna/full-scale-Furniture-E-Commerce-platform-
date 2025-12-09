'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function VisitorTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Generate session ID if not exists
    let sessionId = sessionStorage.getItem('dfw_session_id')
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      sessionStorage.setItem('dfw_session_id', sessionId)
    }

    // Track page visit
    const trackVisit = async () => {
      try {
        const visitorData = {
          page: pathname,
          referrer: document.referrer || undefined,
          sessionId,
          location: await getLocationData()
        }

        await fetch('/api/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(visitorData)
        })
      } catch (error) {
        console.error('Failed to track visitor:', error)
      }
    }

    // Small delay to ensure page is loaded
    const timer = setTimeout(trackVisit, 1000)
    return () => clearTimeout(timer)
  }, [pathname])

  // Get basic location data (optional)
  const getLocationData = async () => {
    try {
      // You can integrate with a geolocation service here
      // For now, we'll use a simple IP-based service
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      return {
        country: data.country_name,
        city: data.city,
        region: data.region
      }
    } catch (error) {
      return undefined
    }
  }

  return null // This component doesn't render anything
}