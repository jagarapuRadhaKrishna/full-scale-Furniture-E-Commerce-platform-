'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ImageAnalysisPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/image-analysis-new')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to Image Analysis Dashboard...</p>
      </div>
    </div>
  )
}
