'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface BackNavigationProps {
  label?: string
  href?: string
  className?: string
}

export default function BackNavigation({ 
  label = 'Back', 
  href,
  className = ''
}: BackNavigationProps) {
  const router = useRouter()

  const handleClick = () => {
    // Always use router.back() unless specific href is provided
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 ${className}`}
    >
      <ArrowLeftIcon className="w-4 h-4 mr-2" />
      {label}
    </button>
  )
}