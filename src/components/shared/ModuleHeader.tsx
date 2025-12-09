'use client'

import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

interface Breadcrumb {
  label: string
  href: string
}

interface ModuleHeaderProps {
  title: string
  subtitle?: string
  showBackButton?: boolean
  backUrl?: string
  breadcrumbs?: Breadcrumb[]
  children?: React.ReactNode
}

export default function ModuleHeader({ 
  title, 
  subtitle, 
  showBackButton = true, 
  backUrl,
  children 
}: ModuleHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl)
    } else {
      router.back()
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 py-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                title="Go Back"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back
              </button>
            )}
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          
          {children && (
            <div className="flex items-center space-x-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}