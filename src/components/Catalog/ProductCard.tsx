import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product.types';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentVariant = product.variants[currentVariantIndex];
  const currentImage = currentVariant.images[currentImageIndex];

  return (
    <div 
      className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={currentImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Image navigation dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {currentVariant.images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-600 text-sm">
            {product.model}
          </p>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600 ml-1">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Variant selection */}
        <div className="flex gap-2 mb-3">
          {product.variants.map((variant, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full border-2 ${
                index === currentVariantIndex
                  ? 'border-blue-500'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: variant.color }}
              onClick={() => setCurrentVariantIndex(index)}
            />
          ))}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-gray-900">
              ₹{currentVariant.price.toLocaleString()}
            </p>
            {product.isCustomizable && (
              <span className="text-xs text-blue-600">Customizable</span>
            )}
          </div>
          
          <Link
            href={`/products/${product.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}