// Order & Checkout Management Component
// Feature 3 from DFW Admin Panel Blueprint

'use client'

import React, { useState, useEffect } from 'react'
import { 
  MagnifyingGlassIcon,
  EyeIcon,
  CheckCircleIcon,
  TruckIcon,
  ClockIcon,
  XCircleIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon,
  CurrencyRupeeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  PrinterIcon,
  BellIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface Order {
  id: string
  orderNumber: string
  customer: {
    id: string
    name: string
    email: string
    phone: string
    address: {
      street: string
      city: string
      state: string
      pincode: string
      country: string
    }
  }
  products: OrderProduct[]
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: string
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  orderDate: string
  expectedDelivery?: string
  trackingNumber?: string
  notes?: string
  logistics: {
    partner: string
    trackingUrl?: string
    estimatedDelivery: string
  }
}

interface OrderProduct {
  id: string
  name: string
  sku: string
  image: string
  quantity: number
  price: number
  variant?: string
}

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: '1',
          orderNumber: 'DFW-2025-001',
          customer: {
            id: 'cust-1',
            name: 'Rajesh Kumar',
            email: 'rajesh@example.com',
            phone: '+91 98765 43210',
            address: {
              street: '123 MG Road',
              city: 'Delhi',
              state: 'Delhi',
              pincode: '110001',
              country: 'India'
            }
          },
          products: [
            {
              id: 'prod-1',
              name: 'Luxury Dining Table',
              sku: 'LDT-001',
              image: '/images/dining-table.jpg',
              quantity: 1,
              price: 45000,
              variant: '6-seater, Walnut finish'
            },
            {
              id: 'prod-2',
              name: 'Dining Chairs (Set of 6)',
              sku: 'DC-001',
              image: '/images/dining-chairs.jpg',
              quantity: 6,
              price: 8000,
              variant: 'Walnut finish, Fabric upholstery'
            }
          ],
          status: 'confirmed',
          paymentStatus: 'paid',
          paymentMethod: 'UPI (GPay)',
          subtotal: 93000,
          tax: 16740,
          shipping: 2000,
          discount: 5000,
          total: 106740,
          orderDate: '2025-10-05T10:30:00Z',
          expectedDelivery: '2025-10-15T18:00:00Z',
          trackingNumber: 'TRK-2025-001',
          logistics: {
            partner: 'BlueDart Express',
            trackingUrl: 'https://tracking.bluedart.com/TRK-2025-001',
            estimatedDelivery: '2025-10-15T18:00:00Z'
          }
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-purple-100 text-purple-800'
      case 'shipped': return 'bg-indigo-100 text-indigo-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'returned': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <ClockIcon className="w-4 h-4" />
      case 'confirmed': return <CheckCircleIcon className="w-4 h-4" />
      case 'processing': return <ArrowPathIcon className="w-4 h-4 animate-spin" />
      case 'shipped': return <TruckIcon className="w-4 h-4" />
      case 'delivered': return <CheckCircleIcon className="w-4 h-4" />
      case 'cancelled': return <XCircleIcon className="w-4 h-4" />
      case 'returned': return <ArrowPathIcon className="w-4 h-4" />
      default: return <ClockIcon className="w-4 h-4" />
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    // Simulate API call
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as any }
        : order
    ))
    
    // Send notification to customer
    console.log(`Notification sent to customer for order ${orderId} - Status: ${newStatus}`)
  }

  const generateInvoice = (order: Order) => {
    // Generate and download PDF invoice
    console.log(`Generating invoice for order: ${order.orderNumber}`)
  }

  const processRefund = (order: Order, amount: number) => {
    // Process refund
    console.log(`Processing refund of ₹${amount} for order: ${order.orderNumber}`)
  }

  const OrderCard = ({ order }: { order: Order }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
          <p className="text-sm text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)}
            <span className="ml-1 capitalize">{order.status}</span>
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <EnvelopeIcon className="w-4 h-4 mr-2" />
          {order.customer.name} ({order.customer.email})
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <PhoneIcon className="w-4 h-4 mr-2" />
          {order.customer.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPinIcon className="w-4 h-4 mr-2" />
          {order.customer.address.city}, {order.customer.address.state}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <CurrencyRupeeIcon className="w-4 h-4 mr-2" />
          ₹{order.total.toLocaleString()} ({order.paymentMethod})
        </div>
        {order.trackingNumber && (
          <div className="flex items-center text-sm text-gray-600">
            <TruckIcon className="w-4 h-4 mr-2" />
            Tracking: {order.trackingNumber}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {order.products.length} item(s)
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedOrder(order)}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            <EyeIcon className="w-4 h-4 inline mr-1" />
            View Details
          </button>
          <div className="relative group">
            <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
              Actions
            </button>
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="py-1">
                <button
                  onClick={() => updateOrderStatus(order.id, 'confirmed')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mark as Confirmed
                </button>
                <button
                  onClick={() => updateOrderStatus(order.id, 'shipped')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mark as Shipped
                </button>
                <button
                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mark as Delivered
                </button>
                <button
                  onClick={() => generateInvoice(order)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Generate Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const OrderDetailModal = ({ order }: { order: Order }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Order Details - {order.orderNumber}</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => generateInvoice(order)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                <PrinterIcon className="w-4 h-4 inline mr-1" />
                Invoice
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Status and Actions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Order Status</h3>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                <span className="ml-2 capitalize">{order.status}</span>
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => updateOrderStatus(order.id, 'confirmed')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={order.status === 'confirmed'}
              >
                Confirm Order
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, 'processing')}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                disabled={order.status === 'processing'}
              >
                Start Processing
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, 'shipped')}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                disabled={order.status === 'shipped'}
              >
                Mark Shipped
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, 'delivered')}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={order.status === 'delivered'}
              >
                Mark Delivered
              </button>
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Customer Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {order.customer.name}</p>
                <p><span className="font-medium">Email:</span> {order.customer.email}</p>
                <p><span className="font-medium">Phone:</span> {order.customer.phone}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Delivery Address</h3>
              <div className="text-sm text-gray-600">
                <p>{order.customer.address.street}</p>
                <p>{order.customer.address.city}, {order.customer.address.state}</p>
                <p>{order.customer.address.pincode}, {order.customer.address.country}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-medium mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.products.map(product => (
                <div key={product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={product.image || '/placeholder-product.jpg'} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                    {product.variant && (
                      <p className="text-sm text-gray-600">{product.variant}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Qty: {product.quantity}</p>
                    <p className="text-sm text-gray-600">₹{product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>₹{order.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₹{order.shipping.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-₹{order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-gray-300 pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Logistics & Tracking */}
          {order.trackingNumber && (
            <div>
              <h3 className="text-lg font-medium mb-3">Logistics & Tracking</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><span className="font-medium">Logistics Partner:</span> {order.logistics.partner}</p>
                    <p><span className="font-medium">Tracking Number:</span> {order.trackingNumber}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Expected Delivery:</span> {new Date(order.logistics.estimatedDelivery).toLocaleDateString()}</p>
                    {order.logistics.trackingUrl && (
                      <a 
                        href={order.logistics.trackingUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Track Package →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                onClick={() => processRefund(order, order.total)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Process Refund
              </button>
              <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
                Cancel Order
              </button>
            </div>
            <div className="flex space-x-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                <BellIcon className="w-4 h-4 inline mr-2" />
                Notify Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const OrderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100">
            <ClockIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Pending Orders</p>
            <p className="text-2xl font-semibold text-gray-900">23</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Completed Orders</p>
            <p className="text-2xl font-semibold text-gray-900">156</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100">
            <CurrencyRupeeIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">₹12.4L</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-orange-100">
            <ExclamationTriangleIcon className="w-6 h-6 text-orange-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Needs Attention</p>
            <p className="text-2xl font-semibold text-gray-900">7</p>
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            <DocumentArrowDownIcon className="w-4 h-4 inline mr-2" />
            Export Orders
          </button>
        </div>
      </div>

      {/* Order Statistics */}
      <OrderStats />

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
            className="border border-gray-300 rounded-lg px-3 py-2"
            placeholder="From Date"
          />
          
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
            className="border border-gray-300 rounded-lg px-3 py-2"
            placeholder="To Date"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && <OrderDetailModal order={selectedOrder} />}
    </div>
  )
}

export default OrderManagement