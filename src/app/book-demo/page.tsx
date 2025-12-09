'use client'

import { useEffect } from 'react'
import { Metadata } from 'next'
import DemoBookingForm from '@/components/demo/DemoBookingForm'
import DemoProcessSteps from '@/components/demo/DemoProcessSteps'
import DemoTestimonials from '@/components/demo/DemoTestimonials'
import ModuleHeader from '@/components/shared/ModuleHeader'
import { useActivityTracker } from '@/lib/activity-tracker'

// export const metadata: Metadata = {
//   title: 'Book Demo Visit | DFW - Divya Furniture World',
//   description: 'Book a FREE furniture demo visit. Expert technician will visit your home with samples and provide personalized consultation at no cost.',
// }

export default function BookDemoPage() {
  const { trackPageView } = useActivityTracker()

  useEffect(() => {
    // Track demo booking page view
    trackPageView('Demo Booking', '/book-demo')
  }, [trackPageView])

  return (
    <div className="w-full bg-gray-50">
      <ModuleHeader 
        title="Book Free Demo Visit" 
        subtitle="Schedule a FREE home demonstration with our furniture experts"
        backUrl="/"
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Book Your FREE Home Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our furniture in your own space before you buy. 
            Our expert technicians bring samples and provide personalized consultation - absolutely FREE!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <DemoBookingForm />
          
          {/* Process Steps */}
          <DemoProcessSteps />
        </div>

        {/* Testimonials */}
        <DemoTestimonials />
      </div>
    </div>
  )
}