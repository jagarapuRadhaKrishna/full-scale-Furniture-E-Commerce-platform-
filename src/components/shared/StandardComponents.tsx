'use client'

import React from 'react'

interface StandardCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

interface StandardButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  onClick?: () => void
  href?: string
  className?: string
}

const StandardCard: React.FC<StandardCardProps> = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'md',
  size = 'md'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const sizeClasses = {
    sm: 'min-h-[200px]',
    md: 'min-h-[300px]',
    lg: 'min-h-[400px]',
    xl: 'min-h-[500px]'
  }

  const hoverClass = hover ? 'hover:shadow-lg hover:scale-105' : ''

  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${paddingClasses[padding]} ${sizeClasses[size]} ${hoverClass} transition-all duration-200 ${className}`}>
      {children}
    </div>
  )
}

const StandardButton: React.FC<StandardButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  href,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 disabled:border-blue-300 disabled:text-blue-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-300'
  }

  const widthClass = fullWidth ? 'w-full' : ''
  const disabledClass = disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'

  const allClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`

  if (href) {
    return (
      <a href={href} className={allClasses}>
        {children}
      </a>
    )
  }

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={allClasses}
    >
      {children}
    </button>
  )
}

export { StandardCard, StandardButton }