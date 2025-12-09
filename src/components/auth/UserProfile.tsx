// User profile component

'use client'

import React, { useState } from 'react'
import { User, Settings, LogOut, Edit2, Save, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { authService } from '@/lib/auth-service'

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const { user, token, logout, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleUpdateProfile = async () => {
    if (!token) return

    if (!name.trim() || name.trim().length < 2) {
      setError('Name must be at least 2 characters long')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await authService.updateProfile(token, { name: name.trim() })

      if (response.success) {
        updateUser(response.user)
        setSuccess('Profile updated successfully')
        setIsEditing(false)
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(response.message)
      }
    } catch (error) {
      setError('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    onClose()
  }

  const cancelEdit = () => {
    setName(user?.name || '')
    setIsEditing(false)
    setError('')
  }

  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <User className="w-5 h-5" />
            My Profile
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="space-y-3">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">{user.name}</span>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                )}
              </div>

              {/* Email/Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {user.loginMethod === 'email' ? 'Email' : 'Phone'}
                </label>
                <span className="text-gray-900">
                  {user.email || user.phone}
                </span>
              </div>

              {/* Login Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Login Method
                </label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {user.loginMethod === 'email' ? 'Email OTP' : 'Phone OTP'}
                </span>
              </div>

              {/* Verification Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Status
                </label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.isVerified 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.isVerified ? 'Verified' : 'Unverified'}
                </span>
              </div>
            </div>

            {/* Edit Actions */}
            {isEditing && (
              <div className="flex gap-2">
                <button
                  onClick={handleUpdateProfile}
                  disabled={isLoading}
                  className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={cancelEdit}
                  disabled={isLoading}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Messages */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              Account Settings
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}