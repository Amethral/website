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

export interface UserProfile {
  id: string
  username: string
  email: string
  createdAt: string
}

type OAuthProvider = 'Google' | 'Discord' | 'Steam'

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
   * Get current user profile
   */
  async getProfile(): Promise<UserProfile> {
    const jwt = this.getStoredJWT()
    if (!jwt) throw new Error('No JWT token found')

    try {
      const response = await axios.get(`${API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
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

  /**
   * Initiate OAuth login by redirecting to the backend OAuth endpoint
   */
  initiateOAuthLogin(provider: OAuthProvider, webToken?: string, deviceId?: string): void {
    const params = new URLSearchParams()
    if (webToken) params.append('webToken', webToken)
    if (deviceId) params.append('deviceId', deviceId)
    
    const queryString = params.toString()
    const url = `${API_BASE_URL}/oauth/${provider}/login${queryString ? '?' + queryString : ''}`
    
    // Redirect the user to the OAuth login endpoint
    window.location.href = url
  }

  /**
   * Handle OAuth callback and extract token from URL
   */
  handleOAuthCallback(): string | null {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('token')
  }
}

export default new AuthService()
