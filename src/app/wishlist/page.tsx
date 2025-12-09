'use client'

import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { WishlistContext } from '@/contexts/WishlistContext'
import { CartContext } from '@/contexts/CartContext'
import { 
  TrashIcon, 
  HeartIcon,
  ShoppingCartIcon,
  ArrowLeftIcon,
  StarIcon
} from '@heroicons/react/24/outline'

export default function WishlistPage() {
  const wishlist = useContext(WishlistContext)
  const cart = useContext(CartContext)
  
  if (!wishlist) {
    return <div>Loading wishlist...</div>
  }

  const { items, removeFromWishlist, clearWishlist, getItemCount } = wishlist

  const handleAddToCart = (item: any) => {
    if (cart) {
      cart.addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        category: item.category
      })
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <HeartIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Save items you love for later by clicking the heart icon.
            </p>
            <Link 
              href="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-2">
            {getItemCount()} {getItemCount() === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Saved Items</h2>
              <button
                onClick={clearWishlist}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Wishlist Items Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Product Image */}
                  <div className="relative aspect-w-4 aspect-h-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={225}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Remove from Wishlist Button */}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-red-500 hover:text-red-600"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    
                    <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                    
                    {/* Rating */}
                    {item.rating && (
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(item.rating || 0)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {item.rating} ({item.reviews} reviews)
                        </span>
                      </div>
                    )}
                    
                    {/* Price */}
                    <div className="flex items-center mb-4">
                      <span className="text-lg font-bold text-blue-600">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <>
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                          <span className="ml-2 text-sm text-green-600 font-medium">
                            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                          </span>
                        </>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <ShoppingCartIcon className="w-4 h-4 mr-2" />
                        Add to Cart
                      </button>
                      
                      <Link
                        href={`/products/${item.category ? `${item.category}-` : ''}${item.id}`}
                        className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center block"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <Link
                href="/products"
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Continue Shopping
              </Link>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // Add all wishlist items to cart
                    items.forEach(item => handleAddToCart(item))
                    clearWishlist()
                  }}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Add All to Cart
                </button>
                
                <Link
                  href="/cart"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}