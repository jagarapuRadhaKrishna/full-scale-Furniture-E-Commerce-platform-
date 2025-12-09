'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: string | number
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  category: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string | number) => void
  updateQuantity: (id: string | number, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getTotalPrice: () => number
  isItemInCart: (id: string | number) => boolean
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const savedCart = localStorage.getItem('dfw-cart')
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart)
          setItems(parsedCart)
        } catch (error) {
          console.error('Error parsing saved cart:', error)
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
    }
  }, [])

  // Save cart to localStorage whenever items change (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem('dfw-cart', JSON.stringify(items))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }, [items])

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id)
      
      if (existingItem) {
        // Item already exists, increase quantity
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // New item, add to cart
        return [...currentItems, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id: string | number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const isItemInCart = (id: string | number) => {
    return items.some(item => item.id === id)
  }

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotalPrice,
    isItemInCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
