'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  StarIcon, 
  HeartIcon, 
  ShoppingCartIcon, 
  TruckIcon, 
  ShieldCheckIcon,
  ArrowPathIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { massiveProductsData, EnhancedProduct } from '@/data/massive-products'
import { useCart } from '@/contexts/CartContext'

export default function ProductDetailPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<EnhancedProduct | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState<EnhancedProduct[]>([])

  useEffect(() => {
    const foundProduct = massiveProductsData.find(p => p.productId === params.id || p.id.toString() === params.id)
    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedSize(foundProduct.size)
      setSelectedColor(foundProduct.color)
      
      // Get related products from same category
      const related = massiveProductsData
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4)
      setRelatedProducts(related)
    }
  }, [params.id])

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link href="/categories" className="text-orange-600 hover:text-orange-700 font-semibold">
            Browse All Products
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    const priceNumber = parseInt(product.price.replace(/[₹,]/g, ''))
    addToCart({
      id: product.id,
      name: product.name,
      price: priceNumber,
      image: product.images[0]
    })
    alert('Product added to cart!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE8DB] via-[#FFF5F0] to-[#FFD9C8]">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white py-12">
        <div className="absolute inset-0">
          <Image
            src={product.images[0]}
            alt="Banner"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-orange-100 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white">Categories</Link>
            <span>/</span>
            <Link href={`/categories/${product.category.toLowerCase().replace(' ', '-')}`} className="hover:text-white">{product.category}</Link>
            <span>/</span>
            <span className="text-white font-semibold">{product.name}</span>
          </nav>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="relative h-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  NEW
                </span>
              )}
              {product.isOnSale && (
                <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {product.discount}% OFF
                </span>
              )}
              {product.has360View && (
                <span className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-full text-xs font-semibold flex items-center space-x-1">
                  <ArrowPathIcon className="w-4 h-4" />
                  <span>360° View</span>
                </span>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-24 rounded-xl overflow-hidden ${
                    selectedImage === idx ? 'ring-4 ring-orange-500' : 'ring-2 ring-gray-200'
                  }`}
                >
                  <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  i < Math.floor(product.rating) ? (
                    <StarIconSolid key={i} className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <StarIcon key={i} className="w-5 h-5 text-gray-300" />
                  )
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3 mb-6">
              <span className="text-4xl font-bold text-orange-600">{product.price}</span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-400 line-through">{product.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Size: {selectedSize}</label>
              <div className="flex flex-wrap gap-3">
                {['Single', 'Double', 'Queen', 'King'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-lg border-2 font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-orange-500 bg-orange-50 text-orange-600'
                        : 'border-gray-200 text-gray-700 hover:border-orange-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Color: {selectedColor}</label>
              <div className="flex flex-wrap gap-3">
                {[product.color, 'Natural Oak', 'Dark Walnut', 'White'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-2 rounded-lg border-2 font-semibold transition-all ${
                      selectedColor === color
                        ? 'border-orange-500 bg-orange-50 text-orange-600'
                        : 'border-gray-200 text-gray-700 hover:border-orange-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 font-bold text-gray-700 hover:border-orange-500 hover:text-orange-600"
                >
                  -
                </button>
                <span className="text-xl font-bold text-gray-900 w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 font-bold text-gray-700 hover:border-orange-500 hover:text-orange-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                <span>Add to Cart</span>
              </button>
              <button className="px-6 py-4 border-2 border-orange-500 text-orange-600 rounded-xl hover:bg-orange-50 transition-all">
                <HeartIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
              <div className="flex items-center space-x-3">
                <TruckIcon className="w-6 h-6 text-orange-500" />
                <span className="text-sm text-gray-700">Free Delivery within 50km</span>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="w-6 h-6 text-orange-500" />
                <span className="text-sm text-gray-700">1 Year Warranty Included</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-6 h-6 text-orange-500" />
                <span className="text-sm text-gray-700">Premium Quality Materials</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Specifications */}
        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
            <ul className="space-y-3">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-semibold">Material:</span>
                <span>{product.material}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-semibold">Style:</span>
                <span>{product.style}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-semibold">Size:</span>
                <span>{product.size}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-semibold">Color:</span>
                <span>{product.color}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.productId}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-56">
                    <Image
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{relatedProduct.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-orange-600">{relatedProduct.price}</span>
                      <div className="flex items-center">
                        <StarIconSolid className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
