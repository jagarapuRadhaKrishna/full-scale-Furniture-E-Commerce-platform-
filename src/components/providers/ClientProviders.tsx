'use client'

import { ReactNode } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { LoadingProvider } from '@/components/providers/LoadingProvider'

interface ClientProvidersProps {
  children: ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <LoadingProvider initialLoading={true}>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </LoadingProvider>
  )
}
