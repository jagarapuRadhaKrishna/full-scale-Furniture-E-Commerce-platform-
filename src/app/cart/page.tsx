// Enhanced cart page with authentication

'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useCart, CartItem } from '@/contexts/CartContext'
import { 
  TrashIcon, 
  PlusIcon, 
  MinusIcon,
  ShoppingBagIcon,
  CreditCardIcon 
} from '@heroicons/react/24/outline'
import AuthModal from '@/components/auth/AuthModal'
import ModuleHeader from '@/components/shared/ModuleHeader'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CartPage() {
  const { user, isAuthenticated } = useAuth()
  const { items, updateQuantity, removeFromCart, getTotalPrice, getItemCount } = useCart()
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const subtotal = getTotalPrice()
  const originalTotal = items.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0)
  const savings = originalTotal - subtotal
  const shipping = subtotal > 50000 ? 0 : 2000 // Free shipping over ₹50,000
  const total = subtotal + shipping

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    
    // In a real app, you'd navigate to checkout
    alert('Proceeding to secure checkout...')
  }

  const handleBookDemo = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    
    router.push('/book-demo')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please Login to Access Cart
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your shopping cart
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
          >
            Login to Continue
          </button>
        </div>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => router.push('/')}
          defaultMode="login"
        />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <ShoppingBagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
            <div className="space-x-4">
              <button
                onClick={() => router.push('/categories')}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
              >
                Browse Products
              </button>
              <button
                onClick={handleBookDemo}
                className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50"
              >
                Book FREE Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ModuleHeader 
        title="Shopping Cart" 
        subtitle="Review your items and proceed to checkout"
        backUrl="/"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <img
                    src={item.image || '/images/placeholder-furniture.jpg'}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-50"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    
                    <span className="text-lg font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full border border-gray-300 hover:bg-gray-50"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => router.push('/categories')}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                ← Continue Shopping
              </button>
              
              <button
                onClick={handleBookDemo}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              >
                Book FREE Demo for These Items
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({getItemCount()} items)</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>You save</span>
                    <span className="font-medium">-₹{savings.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                
                {shipping > 0 && (
                  <p className="text-xs text-gray-500">
                    Free shipping on orders over ₹50,000
                  </p>
                )}
                
                <hr className="my-4" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCardIcon className="w-5 h-5" />
                  <span>Proceed to Checkout</span>
                </button>
                
                <div className="text-center">
                  <p className="text-xs text-gray-600">
                    Secure checkout powered by industry-leading encryption
                  </p>
                </div>
              </div>
              
              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Why shop with us?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>FREE home demo service</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>5-year warranty included</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Professional assembly service</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>30-day return policy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => router.push('/')}
        defaultMode="login"
      />
    </div>
  )
}