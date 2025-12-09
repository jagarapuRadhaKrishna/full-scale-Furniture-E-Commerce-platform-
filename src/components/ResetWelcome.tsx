'use client'

import { useRouter } from 'next/navigation'

const ResetWelcome = () => {
  const router = useRouter()

  const resetWelcome = () => {
    // Clear the localStorage flag
    localStorage.removeItem('dfw-welcome-seen')
    // Refresh the page to show welcome animation again
    router.refresh()
    window.location.reload()
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={resetWelcome}
        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-all duration-200 hover:scale-105"
        title="Reset Welcome Animation (Development Only)"
      >
        🔄 Reset Welcome
      </button>
    </div>
  )
}

export default ResetWelcome