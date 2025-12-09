import { Metadata } from 'next'
import ModuleHeader from '@/components/shared/ModuleHeader'
import CustomDesignForm from '@/components/custom-design/CustomDesignForm'
import DesignProcess from '@/components/custom-design/DesignProcess'
import DesignGallery from '@/components/custom-design/DesignGallery'

export const metadata: Metadata = {
  title: 'Custom Furniture Design | DFW - Divya Furniture World',
  description: 'Create custom furniture designs tailored to your space. Upload sketches, specify requirements, and get personalized furniture solutions.',
}

export default function CustomDesignPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ModuleHeader 
        title="Custom Furniture Design" 
        subtitle="Bring your furniture ideas to life with our expert design team"
        backUrl="/"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Custom Design Form */}
          <CustomDesignForm />
          
          {/* Design Process */}
          <DesignProcess />
        </div>

        {/* Design Gallery */}
        <DesignGallery />
      </div>
    </div>
  )
}