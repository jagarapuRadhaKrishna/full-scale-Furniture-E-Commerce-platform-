'use client'

import { useState, useEffect } from 'react'
import { CreditCardIcon, DevicePhoneMobileIcon, BanknotesIcon, ClockIcon } from '@heroicons/react/24/outline'

export interface PaymentMethod {
  id: string
  name: string
  type: 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod' | 'emi'
  icon: React.ComponentType<any>
  processingFee: number
  processingTime: string
  description: string
  enabled: boolean
  popular?: boolean
}

export interface PaymentDetails {
  method: PaymentMethod
  amount: number
  currency: string
  orderId: string
  customerInfo: {
    name: string
    email: string
    phone: string
    address: any
  }
}

export interface PaymentResult {
  success: boolean
  transactionId?: string
  paymentId?: string
  orderId: string
  amount: number
  method: string
  timestamp: string
  error?: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'upi',
    name: 'UPI',
    type: 'upi',
    icon: DevicePhoneMobileIcon,
    processingFee: 0,
    processingTime: 'Instant',
    description: 'Pay using PhonePe, Google Pay, Paytm, or any UPI app',
    enabled: true,
    popular: true
  },
  {
    id: 'cards',
    name: 'Credit/Debit Cards',
    type: 'card',
    icon: CreditCardIcon,
    processingFee: 1.5,
    processingTime: 'Instant',
    description: 'Visa, Mastercard, RuPay, American Express',
    enabled: true,
    popular: true
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    type: 'netbanking',
    icon: BanknotesIcon,
    processingFee: 0,
    processingTime: 'Instant',
    description: 'All major banks supported',
    enabled: true
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    type: 'cod',
    icon: ClockIcon,
    processingFee: 50,
    processingTime: 'On Delivery',
    description: 'Pay when your furniture is delivered',
    enabled: true
  },
  {
    id: 'emi_3',
    name: '3 Month EMI',
    type: 'emi',
    icon: CreditCardIcon,
    processingFee: 2,
    processingTime: 'Instant',
    description: 'No cost EMI available on select products',
    enabled: true
  },
  {
    id: 'emi_6',
    name: '6 Month EMI',
    type: 'emi',
    icon: CreditCardIcon,
    processingFee: 3,
    processingTime: 'Instant',
    description: 'Low interest EMI options',
    enabled: true
  },
  {
    id: 'emi_12',
    name: '12 Month EMI',
    type: 'emi',
    icon: CreditCardIcon,
    processingFee: 4,
    processingTime: 'Instant',
    description: 'Extended EMI for large purchases',
    enabled: true
  }
]

interface PaymentProcessorProps {
  amount: number
  orderId: string
  customerInfo: any
  onPaymentSuccess: (result: PaymentResult) => void
  onPaymentFailure: (error: string) => void
  onCancel: () => void
}

export default function PaymentProcessor({
  amount,
  orderId,
  customerInfo,
  onPaymentSuccess,
  onPaymentFailure,
  onCancel
}: PaymentProcessorProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })
  const [upiId, setUpiId] = useState('')
  const [emiTenure, setEmiTenure] = useState(3)

  const calculateEMIAmount = (principal: number, tenure: number): number => {
    const rate = 0.12 / 12 // 12% annual rate
    const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1)
    return Math.round(emi)
  }

  const getTotalAmount = (method: PaymentMethod): number => {
    const processingFee = (amount * method.processingFee) / 100
    return amount + processingFee
  }

  const processPayment = async () => {
    if (!selectedMethod) return

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate payment gateway integration
      const paymentResult = await simulatePaymentGateway({
        method: selectedMethod,
        amount: getTotalAmount(selectedMethod),
        currency: 'INR',
        orderId,
        customerInfo
      })

      if (paymentResult.success) {
        onPaymentSuccess(paymentResult)
      } else {
        onPaymentFailure(paymentResult.error || 'Payment failed')
      }
    } catch (error) {
      onPaymentFailure('Payment processing error')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-furniture-brown text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Complete Your Payment</h2>
        <div className="flex justify-between items-center">
          <span className="text-furniture-light-brown">Order ID: {orderId}</span>
          <span className="text-2xl font-bold">₹{amount.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
        
        <div className="grid gap-3 mb-6">
          {paymentMethods.filter(method => method.enabled).map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method)}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                selectedMethod?.id === method.id
                  ? 'border-furniture-brown bg-furniture-cream'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <method.icon className="w-6 h-6 text-furniture-brown" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{method.name}</span>
                      {method.popular && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    <p className="text-xs text-gray-500">
                      Processing: {method.processingTime}
                      {method.processingFee > 0 && ` • Fee: ${method.processingFee}%`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ₹{getTotalAmount(method).toLocaleString()}
                  </p>
                  {method.type === 'emi' && (
                    <p className="text-sm text-gray-600">
                      ₹{calculateEMIAmount(amount, parseInt(method.id.split('_')[1]))}/month
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Payment Details Form */}
        {selectedMethod && (
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Payment Details</h4>
            
            {selectedMethod.type === 'card' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-furniture-brown focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-furniture-brown focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-furniture-brown focus:border-transparent"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-furniture-brown focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {selectedMethod.type === 'upi' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="yourname@paytm"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-furniture-brown focus:border-transparent"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Or scan QR code from your UPI app
                </p>
              </div>
            )}

            {selectedMethod.type === 'emi' && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">EMI Details</h5>
                <div className="text-sm text-blue-800">
                  <p>Principal Amount: ₹{amount.toLocaleString()}</p>
                  <p>EMI Amount: ₹{calculateEMIAmount(amount, parseInt(selectedMethod.id.split('_')[1])).toLocaleString()}/month</p>
                  <p>Total Amount: ₹{(calculateEMIAmount(amount, parseInt(selectedMethod.id.split('_')[1])) * parseInt(selectedMethod.id.split('_')[1])).toLocaleString()}</p>
                  <p>Interest Rate: 12% per annum</p>
                </div>
              </div>
            )}

            {selectedMethod.type === 'cod' && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h5 className="font-medium text-yellow-900 mb-2">Cash on Delivery</h5>
                <div className="text-sm text-yellow-800">
                  <p>• Payment will be collected at the time of delivery</p>
                  <p>• COD charge: ₹{selectedMethod.processingFee}</p>
                  <p>• Please keep exact change ready</p>
                  <p>• Available for orders up to ₹50,000</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={processPayment}
            disabled={!selectedMethod || isProcessing}
            className="flex-1 py-3 px-6 bg-furniture-brown text-white rounded-lg hover:bg-furniture-brown/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              `Pay ₹${selectedMethod ? getTotalAmount(selectedMethod).toLocaleString() : amount.toLocaleString()}`
            )}
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            🔒 Your payment information is secure and encrypted. We use industry-standard security measures to protect your data.
          </p>
        </div>
      </div>
    </div>
  )
}

// Simulate payment gateway integration
async function simulatePaymentGateway(details: PaymentDetails): Promise<PaymentResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Simulate success/failure (90% success rate)
  const success = Math.random() > 0.1

  if (success) {
    return {
      success: true,
      transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      paymentId: `PAY${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      orderId: details.orderId,
      amount: details.amount,
      method: details.method.name,
      timestamp: new Date().toISOString()
    }
  } else {
    return {
      success: false,
      orderId: details.orderId,
      amount: details.amount,
      method: details.method.name,
      timestamp: new Date().toISOString(),
      error: 'Payment failed. Please try again or use a different payment method.'
    }
  }
}

export { paymentMethods }