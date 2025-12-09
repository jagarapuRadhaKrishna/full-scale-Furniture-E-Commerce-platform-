'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Html, useProgress } from '@react-three/drei'
import * as THREE from 'three'
import { ArrowPathIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon, CameraIcon } from '@heroicons/react/24/outline'
import { type EnhancedProduct } from '@/data/enhanced-products'

interface Product3DViewerProps {
  product: EnhancedProduct
  className?: string
  autoRotate?: boolean
  showControls?: boolean
  enableAR?: boolean
}

interface FurnitureModelProps {
  product: EnhancedProduct
  scale?: number
}

// Loading component
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="animate-spin w-6 h-6 border-2 border-furniture-brown border-t-transparent rounded-full"></div>
          <div>
            <p className="text-sm font-medium text-gray-900">Loading 3D Model</p>
            <p className="text-xs text-gray-500">{progress.toFixed(0)}% loaded</p>
          </div>
        </div>
      </div>
    </Html>
  )
}

// Fallback component for loading errors
function ModelFallback({ product }: { product: EnhancedProduct }) {
  return (
    <Html center>
      <div className="bg-gray-100 rounded-lg p-6 text-center max-w-sm">
        <div className="w-16 h-16 bg-furniture-brown/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <CameraIcon className="w-8 h-8 text-furniture-brown" />
        </div>
        <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4">3D model preparing...</p>
        <div className="text-xs text-gray-500">
          <p>Category: {product.category}</p>
          <p>Material: {product.material}</p>
        </div>
      </div>
    </Html>
  )
}

// Procedural furniture model generator
function FurnitureModel({ product, scale = 1 }: FurnitureModelProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)
  const [material, setMaterial] = useState<THREE.Material | null>(null)

  useEffect(() => {
    // Generate procedural geometry based on furniture type
    const geo = generateFurnitureGeometry(product)
    const mat = generateFurnitureMaterial(product)
    
    setGeometry(geo)
    setMaterial(mat)
  }, [product])

  // Gentle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  if (!geometry || !material) {
    return <ModelFallback product={product} />
  }

  return (
    <group ref={meshRef} scale={scale}>
      <mesh geometry={geometry} material={material} castShadow receiveShadow>
        {/* Additional furniture-specific details */}
        {product.subCategory === 'Beds' && <BedDetails product={product} />}
        {product.subCategory === 'Sofas' && <SofaDetails product={product} />}
        {product.subCategory === 'Dining Tables' && <TableDetails product={product} />}
        {product.subCategory === 'Office Chairs' && <ChairDetails product={product} />}
      </mesh>
    </group>
  )
}

// Furniture-specific detail components
function BedDetails({ product }: { product: EnhancedProduct }) {
  return (
    <group>
      {/* Headboard */}
      <mesh position={[0, 0.5, -0.4]}>
        <boxGeometry args={[1.8, 1, 0.1]} />
        <meshStandardMaterial color={getMaterialColor(product.material)} />
      </mesh>
      {/* Mattress */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.8, 0.2, 2]} />
        <meshStandardMaterial color="#f8f8f8" />
      </mesh>
    </group>
  )
}

function SofaDetails({ product }: { product: EnhancedProduct }) {
  return (
    <group>
      {/* Cushions */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[-0.6 + i * 0.6, 0.1, 0]}>
          <boxGeometry args={[0.5, 0.2, 0.6]} />
          <meshStandardMaterial color={getMaterialColor(product.material)} />
        </mesh>
      ))}
      {/* Armrests */}
      <mesh position={[-1, 0.3, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.8]} />
        <meshStandardMaterial color={getMaterialColor(product.material)} />
      </mesh>
      <mesh position={[1, 0.3, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.8]} />
        <meshStandardMaterial color={getMaterialColor(product.material)} />
      </mesh>
    </group>
  )
}

function TableDetails({ product }: { product: EnhancedProduct }) {
  return (
    <group>
      {/* Table legs */}
      {[
        [-0.8, -0.4, -0.4] as [number, number, number],
        [0.8, -0.4, -0.4] as [number, number, number],
        [-0.8, -0.4, 0.4] as [number, number, number],
        [0.8, -0.4, 0.4] as [number, number, number]
      ].map((position, i) => (
        <mesh key={i} position={position}>
          <cylinderGeometry args={[0.05, 0.05, 0.8]} />
          <meshStandardMaterial color={getMaterialColor(product.material)} />
        </mesh>
      ))}
    </group>
  )
}

function ChairDetails({ product }: { product: EnhancedProduct }) {
  return (
    <group>
      {/* Chair legs */}
      {[
        [-0.3, -0.4, -0.3] as [number, number, number],
        [0.3, -0.4, -0.3] as [number, number, number],
        [-0.3, -0.4, 0.3] as [number, number, number],
        [0.3, -0.4, 0.3] as [number, number, number]
      ].map((position, i) => (
        <mesh key={i} position={position}>
          <cylinderGeometry args={[0.03, 0.03, 0.8]} />
          <meshStandardMaterial color={getMaterialColor(product.material)} />
        </mesh>
      ))}
      {/* Backrest */}
      <mesh position={[0, 0.2, -0.3]}>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color={getMaterialColor(product.material)} />
      </mesh>
    </group>
  )
}

// Utility functions
function generateFurnitureGeometry(product: EnhancedProduct): THREE.BufferGeometry {
  const { subCategory } = product

  switch (subCategory) {
    case 'Beds':
      return new THREE.BoxGeometry(1.8, 0.4, 2)
    case 'Sofas':
      return new THREE.BoxGeometry(2, 0.8, 1)
    case 'Dining Tables':
      return new THREE.BoxGeometry(2, 0.1, 1)
    case 'Coffee Tables':
      return new THREE.BoxGeometry(1.2, 0.05, 0.6)
    case 'Office Chairs':
      return new THREE.BoxGeometry(0.6, 0.1, 0.6)
    case 'Wardrobes':
      return new THREE.BoxGeometry(1.2, 2, 0.6)
    default:
      return new THREE.BoxGeometry(1, 1, 1)
  }
}

function generateFurnitureMaterial(product: EnhancedProduct): THREE.Material {
  const color = getMaterialColor(product.material)
  const roughness = getMaterialRoughness(product.material)
  const metalness = getMaterialMetalness(product.material)

  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    envMapIntensity: 1,
  })
}

function getMaterialColor(material: string): string {
  const colorMap: Record<string, string> = {
    'Solid Wood': '#8B4513',
    'Teak Wood': '#654321',
    'Oak': '#D2691E',
    'Walnut': '#5D4037',
    'Pine Wood': '#DEB887',
    'Metal': '#C0C0C0',
    'Steel': '#708090',
    'Leather': '#8B4513',
    'Fabric': '#D3D3D3',
    'Glass': '#E6F3FF',
    'Marble': '#F8F8FF'
  }
  return colorMap[material] || '#8B4513'
}

function getMaterialRoughness(material: string): number {
  const roughnessMap: Record<string, number> = {
    'Metal': 0.1,
    'Steel': 0.2,
    'Glass': 0.05,
    'Leather': 0.3,
    'Fabric': 0.9,
    'Marble': 0.1
  }
  return roughnessMap[material] || 0.7 // Default for wood
}

function getMaterialMetalness(material: string): number {
  const metalnessMap: Record<string, number> = {
    'Metal': 0.9,
    'Steel': 0.8,
    'Glass': 0.0,
    'Leather': 0.0,
    'Fabric': 0.0,
    'Marble': 0.0
  }
  return metalnessMap[material] || 0.0 // Default for wood
}

// Main 3D Viewer Component
export default function Product3DViewer({ 
  product, 
  className = '', 
  autoRotate = true, 
  showControls = true,
  enableAR = true 
}: Product3DViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [resetTrigger, setResetTrigger] = useState(0)

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5))
  const handleReset = () => {
    setZoom(1)
    setResetTrigger(prev => prev + 1)
  }

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  const containerClass = isFullscreen 
    ? 'fixed inset-0 z-50 bg-black' 
    : `relative ${className}`

  return (
    <div className={containerClass}>
      <div className="w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden relative">
        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          shadows
          className="cursor-grab active:cursor-grabbing"
        >
          <Suspense fallback={<Loader />}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />

            {/* Environment */}
            <Environment preset="apartment" />

            {/* Furniture Model */}
            <FurnitureModel product={product} scale={zoom} />

            {/* Ground and Shadows */}
            <ContactShadows
              position={[0, -1, 0]}
              opacity={0.3}
              scale={10}
              blur={2}
              far={4}
            />

            {/* Controls */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={autoRotate}
              autoRotateSpeed={1}
              maxPolarAngle={Math.PI / 2}
              minDistance={2}
              maxDistance={8}
              key={resetTrigger} // Force reset when key changes
            />
          </Suspense>
        </Canvas>

        {/* Control Overlay */}
        {showControls && (
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button
              onClick={handleZoomIn}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-colors"
              title="Zoom In"
            >
              <MagnifyingGlassPlusIcon className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-colors"
              title="Zoom Out"
            >
              <MagnifyingGlassMinusIcon className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-colors"
              title="Reset View"
            >
              <ArrowPathIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}

        {/* Product Info Overlay */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md max-w-xs">
          <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
          <p className="text-xs text-gray-600 mt-1">
            {product.category} • {product.material} • {product.style}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-furniture-brown">{product.price}</span>
            {enableAR && (
              <button className="text-xs bg-furniture-brown text-white px-2 py-1 rounded hover:bg-furniture-brown/90 transition-colors">
                View in AR
              </button>
            )}
          </div>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          <div className="w-5 h-5 border-2 border-gray-700 rounded">
            {isFullscreen ? (
              <div className="w-2 h-2 border border-gray-700 ml-1 mt-1"></div>
            ) : (
              <div className="w-full h-full border border-gray-700 border-dashed"></div>
            )}
          </div>
        </button>

        {/* Loading Indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-600">
            3D Model • Interactive
          </div>
        </div>
      </div>

      {/* Close button for fullscreen */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors z-10"
          title="Close Fullscreen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}