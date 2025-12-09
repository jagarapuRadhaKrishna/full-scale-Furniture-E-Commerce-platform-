'use client'

import { useState, useEffect } from 'react'

interface WelcomeAnimationProps {
  onComplete: () => void
}

export default function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const [showLogo, setShowLogo] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    console.log('Netflix-style DFW Loading Animation Starting')
    
    // Netflix-style timing
    const logoTimer = setTimeout(() => setShowLogo(true), 500)
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500)
    const completeTimer = setTimeout(() => onComplete(), 3200)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(fadeTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className={`fixed inset-0 z-50 bg-gray-900 flex items-center justify-center transition-all duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Netflix-style centered logo */}
      <div className="relative z-10 text-center">
        
        {/* DFW 3D Copper Logo Recreation */}
        <div className={`transform transition-all duration-1000 ${showLogo ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          
          {/* Main Logo Container */}
          <div className="relative mx-auto w-48 h-48 mb-6">
            {/* 3D Copper circular border with enhanced depth */}
            <div className="absolute inset-0 rounded-full relative overflow-hidden shadow-2xl">
              {/* Outer copper ring with 3D effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-amber-600 p-3">
                {/* Inner shadow for depth */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-inner flex items-center justify-center relative">
                  {/* DFW text with 3D copper gradient */}
                  <div className="text-transparent bg-gradient-to-br from-amber-600 via-orange-600 to-amber-800 bg-clip-text font-black text-6xl tracking-wider drop-shadow-lg">
                    DFW
                  </div>
                  {/* Multiple highlight effects for 3D appearance */}
                  <div className="absolute top-4 left-4 w-6 h-6 bg-white/50 rounded-full blur-sm"></div>
                  <div className="absolute top-6 left-8 w-3 h-3 bg-white/30 rounded-full blur-sm"></div>
                </div>
              </div>
            </div>
            
            {/* Enhanced glow effect with copper colors */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/40 to-orange-600/40 blur-xl -z-10 animate-pulse scale-110"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/20 to-orange-500/20 blur-2xl -z-20 scale-125"></div>
          </div>
          
        </div>
        
      </div>
    </div>
  )
}