// Enhanced checkout page with comprehensive payment integration

'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  CreditCardIcon, 
  LockClosedIcon,
  CheckIcon,
  BanknotesIcon,
  PhoneIcon,
  HomeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import AuthModal from '@/components/auth/AuthModal'
import { useRouter } from 'next/navigation'

interface DeliverySlot {
  date: string
  time: string
  available: boolean
}

export default function CheckoutPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [deliveryType, setDeliveryType] = useState('delivery')
  const [selectedSlot, setSelectedSlot] = useState<DeliverySlot | null>(null)
  const [billingAddress, setBillingAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })

  // Sample order items
  const orderItems = [
    {
      id: 1,
      name: 'Premium Sectional Sofa',
      price: 89999,
      quantity: 1,
      image: '/images/products/sofa-1.jpg'
    },
    {
      id: 2,
      name: 'Teak Wood Dining Set',
      price: 75999,
      quantity: 1,
      image: '/images/products/dining-1.jpg'
    }
  ]

  // Sample delivery slots
  const deliverySlots: DeliverySlot[] = [
    { date: '2024-01-20', time: '09:00 - 13:00', available: true },
    { date: '2024-01-20', time: '14:00 - 18:00', available: false },
    { date: '2024-01-21', time: '09:00 - 13:00', available: true },
    { date: '2024-01-21', time: '14:00 - 18:00', available: true },
    { date: '2024-01-22', time: '09:00 - 13:00', available: true },
    { date: '2024-01-22', time: '14:00 - 18:00', available: true }
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const delivery = deliveryType === 'delivery' ? 2000 : 0
  const assembly = 3000 // Professional assembly
  const total = subtotal + delivery + assembly

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
    } else if (user) {
      setBillingAddress(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }))
    }
  }, [isAuthenticated, user])

  const handlePlaceOrder = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      return
    }

    // Simulate order placement
    try {
      alert('Order placed successfully! Redirecting to order confirmation...')
      router.push('/orders')
    } catch (error) {
      alert('Error placing order. Please try again.')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LockClosedIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Secure Checkout - Login Required
          </h1>
          <p className="text-gray-600 mb-6">
            Please login to continue with your purchase
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
          onClose={() => router.push('/cart')}
          defaultMode="login"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
          <p className="text-gray-600">Complete your purchase safely and securely</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > step ? (
                    <CheckIcon className="w-6 h-6" />
                  ) : (
                    step
                  )}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">
                  {step === 1 && 'Delivery'}
                  {step === 2 && 'Payment'}
                  {step === 3 && 'Review'}
                </span>
                {step < 3 && (
                  <div className="w-16 h-0.5 bg-gray-200 ml-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Delivery Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Delivery Information
                </h2>

                {/* Delivery Type */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Delivery Options
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer ${
                        deliveryType === 'delivery'
                          ? 'border-orange-600 bg-orange-50'
                          : 'border-gray-200'
                      }`}
                      onClick={() => setDeliveryType('delivery')}
                    >
                      <div className="flex items-center space-x-3">
                        <HomeIcon className="w-6 h-6 text-orange-600" />
                        <div>
                          <h4 className="font-semibold">Home Delivery</h4>
                          <p className="text-sm text-gray-600">₹2,000 delivery fee</p>
                        </div>
                      </div>
                    </div>
                    
                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer ${
                        deliveryType === 'pickup'
                          ? 'border-orange-600 bg-orange-50'
                          : 'border-gray-200'
                      }`}
                      onClick={() => setDeliveryType('pickup')}
                    >
                      <div className="flex items-center space-x-3">
                        <BanknotesIcon className="w-6 h-6 text-green-600" />
                        <div>
                          <h4 className="font-semibold">Store Pickup</h4>
                          <p className="text-sm text-gray-600">FREE - Save ₹2,000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {deliveryType === 'delivery' ? 'Delivery Address' : 'Contact Information'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={billingAddress.fullName}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, fullName: e.target.value }))}
                      className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={billingAddress.phone}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, phone: e.target.value }))}
                      className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={billingAddress.email}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, email: e.target.value }))}
                      className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent md:col-span-2"
                    />
                    
                    {deliveryType === 'delivery' && (
                      <>
                        <textarea
                          placeholder="Complete Address"
                          value={billingAddress.address}
                          onChange={(e) => setBillingAddress(prev => ({ ...prev, address: e.target.value }))}
                          className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent md:col-span-2"
                          rows={3}
                        />
                        <input
                          type="text"
                          placeholder="City"
                          value={billingAddress.city}
                          onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                          className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={billingAddress.state}
                          onChange={(e) => setBillingAddress(prev => ({ ...prev, state: e.target.value }))}
                          className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="PIN Code"
                          value={billingAddress.pincode}
                          onChange={(e) => setBillingAddress(prev => ({ ...prev, pincode: e.target.value }))}
                          className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent md:col-span-2"
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Delivery Slots */}
                {deliveryType === 'delivery' && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Select Delivery Slot
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {deliverySlots.map((slot, index) => (
                        <div
                          key={index}
                          className={`border-2 rounded-lg p-4 cursor-pointer ${
                            !slot.available
                              ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                              : selectedSlot === slot
                              ? 'border-orange-600 bg-orange-50'
                              : 'border-gray-200 hover:border-orange-300'
                          }`}
                          onClick={() => slot.available && setSelectedSlot(slot)}
                        >
                          <div className="flex items-center space-x-3">
                            <CalendarIcon className="w-5 h-5 text-gray-600" />
                            <div>
                              <p className="font-medium">
                                {new Date(slot.date).toLocaleDateString('en-IN', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                              <p className="text-sm text-gray-600">{slot.time}</p>
                              {!slot.available && (
                                <p className="text-xs text-red-600">Not Available</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Payment Method
                </h2>

                <div className="space-y-4">
                  {/* Credit/Debit Card */}
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-orange-600 bg-orange-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCardIcon className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Credit/Debit Card</h4>
                        <p className="text-sm text-gray-600">Visa, Mastercard, RuPay accepted</p>
                      </div>
                    </div>
                  </div>

                  {/* UPI */}
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'border-orange-600 bg-orange-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="w-6 h-6 text-green-600" />
                      <div>
                        <h4 className="font-semibold">UPI Payment</h4>
                        <p className="text-sm text-gray-600">Pay using Google Pay, PhonePe, Paytm</p>
                      </div>
                    </div>
                  </div>

                  {/* Net Banking */}
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer ${
                      paymentMethod === 'netbanking'
                        ? 'border-orange-600 bg-orange-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('netbanking')}
                  >
                    <div className="flex items-center space-x-3">
                      <BanknotesIcon className="w-6 h-6 text-purple-600" />
                      <div>
                        <h4 className="font-semibold">Net Banking</h4>
                        <p className="text-sm text-gray-600">All major banks supported</p>
                      </div>
                    </div>
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-orange-600 bg-orange-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <div className="flex items-center space-x-3">
                      <BanknotesIcon className="w-6 h-6 text-orange-600" />
                      <div>
                        <h4 className="font-semibold">Cash on Delivery</h4>
                        <p className="text-sm text-gray-600">Pay when your order is delivered</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="mt-6 space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="mt-6">
                    <input
                      type="text"
                      placeholder="Enter UPI ID (e.g., yourname@paytm)"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Review Your Order
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 pb-4 border-b">
                      <img
                        src={item.image || '/images/placeholder-furniture.jpg'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <span className="font-semibold">₹{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Delivery Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-2">Delivery Information</h3>
                  <p className="text-sm text-gray-600">
                    {deliveryType === 'delivery' ? 'Home Delivery' : 'Store Pickup'}
                  </p>
                  {billingAddress.fullName && (
                    <p className="text-sm text-gray-600">{billingAddress.fullName}</p>
                  )}
                  {selectedSlot && deliveryType === 'delivery' && (
                    <p className="text-sm text-gray-600">
                      {new Date(selectedSlot.date).toLocaleDateString()} {selectedSlot.time}
                    </p>
                  )}
                </div>

                {/* Payment Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Payment Method</h3>
                  <p className="text-sm text-gray-600">
                    {paymentMethod === 'card' && 'Credit/Debit Card'}
                    {paymentMethod === 'upi' && 'UPI Payment'}
                    {paymentMethod === 'netbanking' && 'Net Banking'}
                    {paymentMethod === 'cod' && 'Cash on Delivery'}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : router.push('/cart')}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {currentStep === 1 ? 'Back to Cart' : 'Previous'}
              </button>
              
              <button
                onClick={handlePlaceOrder}
                className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 flex items-center space-x-2"
              >
                <LockClosedIcon className="w-5 h-5" />
                <span>
                  {currentStep < 3 ? 'Continue' : 'Place Order'}
                </span>
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {deliveryType === 'delivery' ? 'Delivery' : 'Store Pickup'}
                  </span>
                  <span className="font-medium">
                    {delivery === 0 ? 'FREE' : `₹${delivery.toLocaleString()}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Professional Assembly</span>
                  <span className="font-medium">₹{assembly.toLocaleString()}</span>
                </div>
                
                <hr className="my-4" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <LockClosedIcon className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Secure Checkout
                  </span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => router.push('/cart')}
        defaultMode="login"
      />
    </div>
  )
}