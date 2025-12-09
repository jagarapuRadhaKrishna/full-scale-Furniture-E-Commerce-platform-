'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface WishlistItem {
  id: string | number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating?: number
  reviews?: number
}

interface WishlistContextType {
  items: WishlistItem[]
  addToWishlist: (product: WishlistItem) => void
  removeFromWishlist: (id: string | number) => void
  clearWishlist: () => void
  getItemCount: () => number
  isItemInWishlist: (id: string | number) => boolean
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

interface WishlistProviderProps {
  children: ReactNode
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const [items, setItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('dfw-wishlist')
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist)
        setItems(parsedWishlist)
      } catch (error) {
        console.error('Error parsing saved wishlist:', error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('dfw-wishlist', JSON.stringify(items))
  }, [items])

  const addToWishlist = (product: WishlistItem) => {
    setItems(currentItems => {
      // Check if item already exists
      const existingItem = currentItems.find(item => item.id === product.id)
      if (existingItem) {
        return currentItems // Don't add duplicates
      }
      return [...currentItems, product]
    })
  }

  const removeFromWishlist = (id: string | number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }

  const clearWishlist = () => {
    setItems([])
  }

  const getItemCount = () => {
    return items.length
  }

  const isItemInWishlist = (id: string | number) => {
    return items.some(item => item.id === id)
  }

  const value: WishlistContextType = {
    items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    getItemCount,
    isItemInWishlist
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}