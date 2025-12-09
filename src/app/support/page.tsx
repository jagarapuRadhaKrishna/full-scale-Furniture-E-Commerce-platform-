import { Metadata } from 'next'
import SupportServices from '@/components/support/SupportServices'
import SupportRequestForm from '@/components/support/SupportRequestForm'
import FAQ from '@/components/support/FAQ'

export const metadata: Metadata = {
  title: 'Support Services | DFW - Divya Furniture World',
  description: 'Get expert support for furniture repair, assembly, and maintenance. Professional technician visits starting from ₹200.',
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Furniture Support Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional repair, assembly, and maintenance services for all your furniture needs. 
            Expert technicians available for home visits.
          </p>
        </div>

        {/* Support Services Overview */}
        <SupportServices />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Support Request Form */}
          <SupportRequestForm />
          
          {/* FAQ */}
          <FAQ />
        </div>
      </div>
    </div>
  )
}