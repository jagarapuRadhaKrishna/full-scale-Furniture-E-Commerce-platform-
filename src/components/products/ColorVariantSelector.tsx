'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ColorVariant {
  color: string
  images: string[]
  available: boolean
}

interface ColorVariantSelectorProps {
  productId: string
  productName: string
  colorVariants: ColorVariant[]
  onColorChange?: (color: string, images: string[]) => void
}

export default function ColorVariantSelector({ 
  productId, 
  productName, 
  colorVariants, 
  onColorChange 
}: ColorVariantSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(colorVariants[0]?.color || '')
  const [selectedImages, setSelectedImages] = useState(colorVariants[0]?.images || [])

  const handleColorChange = (color: string) => {
    const variant = colorVariants.find(v => v.color === color)
    if (variant && variant.available) {
      setSelectedColor(color)
      setSelectedImages(variant.images)
      onColorChange?.(color, variant.images)
    }
  }

  const getColorDisplay = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'Brown': '#8B4513',
      'Grey': '#808080', 
      'Gray': '#808080',
      'Blue': '#4169E1',
      'Beige': '#F5F5DC',
      'Black': '#000000',
      'White': '#FFFFFF'
    }
    return colorMap[color] || color.toLowerCase()
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Available Colors
        </h3>
        <div className="flex flex-wrap gap-3">
          {colorVariants.map((variant) => (
            <button
              key={variant.color}
              onClick={() => handleColorChange(variant.color)}
              disabled={!variant.available}
              className={`
                relative w-12 h-12 rounded-full border-2 transition-all duration-200
                ${selectedColor === variant.color 
                  ? 'border-blue-500 scale-110 shadow-lg' 
                  : 'border-gray-300 hover:border-gray-400'
                }
                ${!variant.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              style={{ backgroundColor: getColorDisplay(variant.color) }}
              title={variant.color}
            >
              {selectedColor === variant.color && (
                <div className="absolute inset-0 rounded-full border-2 border-white shadow-inner" />
              )}
              {!variant.available && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-0.5 bg-red-500 rotate-45" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600">
          Selected: <span className="font-medium text-gray-900">{selectedColor}</span>
        </p>
      </div>

      {/* Color-specific images preview */}
      {selectedImages.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-2">
            {selectedColor} Variant Images
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {selectedImages.slice(0, 4).map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={image}
                  alt={`${productName} - ${selectedColor} - View ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
