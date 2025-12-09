// Authentication service for frontend API calls

import { LoginRequest, OTPVerifyRequest, SignupRequest, AuthResponse } from '@/lib/auth-types'

class AuthService {
  private baseURL = '/api/auth'

  async initiateAuth(data: LoginRequest | SignupRequest): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        purpose: 'type' in data ? 'login' : 'signup'
      }),
    })

    return response.json()
  }

  async verifyOTP(data: OTPVerifyRequest & { name?: string }): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }

  async getCurrentUser(token: string) {
    const response = await fetch(`${this.baseURL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    return response.json()
  }

  async updateProfile(token: string, data: { name: string }) {
    const response = await fetch(`${this.baseURL}/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }

  async logout(token: string) {
    const response = await fetch(`${this.baseURL}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    return response.json()
  }
}

export const authService = new AuthService()