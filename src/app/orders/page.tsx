// Enhanced orders page with comprehensive order management

'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  ShoppingBagIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import AuthModal from '@/components/auth/AuthModal'
import { useRouter } from 'next/navigation'

interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: {
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }[]
  total: number
  deliveryAddress?: string
  trackingNumber?: string
  estimatedDelivery?: string
}

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  // Sample orders data
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'DFW2024001',
      date: '2024-01-15',
      status: 'delivered',
      items: [
        {
          id: 1,
          name: 'Premium Sectional Sofa',
          price: 89999,
          quantity: 1,
          image: '/images/products/sofa-1.jpg'
        }
      ],
      total: 94999,
      deliveryAddress: '123 Main Street, Mumbai, Maharashtra 400001',
      trackingNumber: 'DFW123456789',
      estimatedDelivery: '2024-01-18'
    },
    {
      id: '2',
      orderNumber: 'DFW2024002',
      date: '2024-01-18',
      status: 'shipped',
      items: [
        {
          id: 2,
          name: 'Teak Wood Dining Set',
          price: 75999,
          quantity: 1,
          image: '/images/products/dining-1.jpg'
        },
        {
          id: 3,
          name: 'Premium Office Chair',
          price: 15999,
          quantity: 2,
          image: '/images/products/office-1.jpg'
        }
      ],
      total: 110997,
      deliveryAddress: '456 Garden Road, Delhi, Delhi 110001',
      trackingNumber: 'DFW987654321',
      estimatedDelivery: '2024-01-22'
    },
    {
      id: '3',
      orderNumber: 'DFW2024003',
      date: '2024-01-20',
      status: 'processing',
      items: [
        {
          id: 4,
          name: 'Modern Bed Frame',
          price: 45999,
          quantity: 1,
          image: '/images/products/bedroom-1.jpg'
        }
      ],
      total: 48999,
      deliveryAddress: '789 Tech Park, Bangalore, Karnataka 560001',
      estimatedDelivery: '2024-01-25'
    }
  ])

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
    }
  }, [isAuthenticated])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />
      case 'confirmed':
        return <CheckCircleIcon className="w-5 h-5 text-blue-600" />
      case 'processing':
        return <ArrowPathIcon className="w-5 h-5 text-purple-600" />
      case 'shipped':
        return <TruckIcon className="w-5 h-5 text-orange-600" />
      case 'delivered':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />
      case 'cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-600" />
      default:
        return <ClockIcon className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-purple-100 text-purple-800'
      case 'shipped':
        return 'bg-orange-100 text-orange-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please Login to View Orders
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your order history
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600">Track and manage your furniture orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'all', label: 'All Orders' },
                { key: 'pending', label: 'Pending' },
                { key: 'processing', label: 'Processing' },
                { key: 'shipped', label: 'Shipped' },
                { key: 'delivered', label: 'Delivered' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilterStatus(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    filterStatus === tab.key
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Found</h2>
            <p className="text-gray-600 mb-8">
              {filterStatus === 'all' 
                ? "You haven't placed any orders yet" 
                : `No ${filterStatus} orders found`}
            </p>
            <button
              onClick={() => router.push('/categories')}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Order Header */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ₹{order.total.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image || '/images/placeholder-furniture.jpg'}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <span className="font-medium text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Actions and Info */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {order.trackingNumber && (
                        <p className="text-sm text-gray-600">
                          Tracking: <span className="font-medium">{order.trackingNumber}</span>
                        </p>
                      )}
                      {order.estimatedDelivery && order.status !== 'delivered' && (
                        <p className="text-sm text-gray-600">
                          Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center space-x-2 text-orange-600 hover:text-orange-700"
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span className="text-sm">View Details</span>
                      </button>
                      
                      {order.status === 'delivered' && (
                        <button
                          onClick={() => router.push(`/products/${order.items[0].id}`)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                        >
                          <ChatBubbleLeftRightIcon className="w-4 h-4" />
                          <span className="text-sm">Write Review</span>
                        </button>
                      )}
                      
                      {order.status === 'shipped' && (
                        <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                          <TruckIcon className="w-4 h-4" />
                          <span className="text-sm">Track Order</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    Order Details - #{selectedOrder.orderNumber}
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircleIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="px-6 py-4 space-y-6">
                {/* Order Status */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Order Status</h3>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedOrder.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Items Ordered</h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <img
                          src={item.image || '/images/placeholder-furniture.jpg'}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-sm text-gray-600">
                            Unit Price: ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                        <span className="font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Information */}
                {selectedOrder.deliveryAddress && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
                    <p className="text-gray-600">{selectedOrder.deliveryAddress}</p>
                  </div>
                )}

                {/* Tracking Information */}
                {selectedOrder.trackingNumber && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Tracking Information</h3>
                    <p className="text-gray-600">
                      Tracking Number: <span className="font-medium">{selectedOrder.trackingNumber}</span>
                    </p>
                    {selectedOrder.estimatedDelivery && (
                      <p className="text-gray-600">
                        Estimated Delivery: {new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{(selectedOrder.total - 5000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery & Assembly</span>
                      <span>₹5,000</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                      <span>Total</span>
                      <span>₹{selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => router.push('/')}
          defaultMode="login"
        />
      </div>
    </div>
  )
}