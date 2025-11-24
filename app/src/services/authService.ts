import axios, { AxiosError } from 'axios'

const API_BASE_URL = 'http://localhost:5298/api/auth'

interface RegisterPayload {
  username: string
  email: string
  password: string
  webToken: string
}

interface LoginPayload {
  email: string
  password: string
  webToken: string
}

interface FinalizePayload {
  webToken: string
  deviceId: string
}

interface FinalizeResponse {
  sessionToken: string
  username: string
  userId: string
}

interface LoginResponse {
  token: string
}

interface ErrorResponse {
  message?: string
  error?: string
}

class AuthService {
  /**
   * Register a new user with email and password
   */
  async register(payload: RegisterPayload): Promise<{ message: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/register-email`, payload)
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  /**
   * Login an existing user with email and password
   */
  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/login-email`, payload)
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  /**
   * Link an existing account using a stored JWT token
   */
  async linkAccount(jwt: string, webToken: string): Promise<{ message: string }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/link-existing-account`,
        { webToken },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      )
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  /**
   * Finalize the authentication and get the session token for Unity
   */
  async finalize(payload: FinalizePayload): Promise<FinalizeResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/finalize`, payload)
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  /**
   * Handle errors from API calls
   */
  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>
      const message = axiosError.response?.data?.message || 
                     axiosError.response?.data?.error || 
                     axiosError.message ||
                     'An unexpected error occurred'
      console.error('API Error:', message)
    } else {
      console.error('Unknown error:', error)
    }
  }

  /**
   * Store JWT token in localStorage
   */
  storeJWT(token: string): void {
    localStorage.setItem('amethral_jwt', token)
  }

  /**
   * Get stored JWT token from localStorage
   */
  getStoredJWT(): string | null {
    return localStorage.getItem('amethral_jwt')
  }

  /**
   * Clear stored JWT token
   */
  clearJWT(): void {
    localStorage.removeItem('amethral_jwt')
  }
}

export default new AuthService()
