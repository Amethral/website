import axios, { AxiosError } from 'axios'

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5298') + '/api/auth'

interface RegisterPayload {
  username: string
  email: string
  password: string
}

interface LoginPayload {
  email: string
  password: string
}

interface LoginResponse {
  token: string
}

interface ErrorResponse {
  message?: string
  error?: string
  errors?: Record<string, string[] | string>
  code?: string
}

export interface UserProfile {
  id: string
  username: string
  email: string
  createdAt: string
}

export interface AppError extends Error {
  status?: number
  code?: string
  userMessage: string
  details?: any
}

type OAuthProvider = 'Google' | 'Discord' | 'Steam'

// Build a standardized, user-friendly error from unknown/axios error
export function toAppError(error: unknown): AppError {
  let appErr: AppError
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>
    const status = axiosError.response?.status
    const data = axiosError.response?.data

    // Prefer backend-provided messages when sensible
    const backendMsg = data?.message || data?.error

    // Field-level validation errors (400)
    let validationMsg = ''
    if (data?.errors) {
      const parts: string[] = []
      for (const [field, msgs] of Object.entries(data.errors)) {
        const msgText = Array.isArray(msgs) ? msgs.join(', ') : msgs
        parts.push(`${capitalize(field)}: ${msgText}`)
      }
      if (parts.length) validationMsg = parts.join(' | ')
    }

    let userMessage = 'Something went wrong. Please try again.'

    switch (status) {
      case 400:
        userMessage = validationMsg || backendMsg || 'Invalid request. Please check your input.'
        break
      case 401:
        userMessage = backendMsg || 'Incorrect email or password.'
        break
      case 403:
        userMessage = backendMsg || 'You do not have permission to perform this action.'
        break
      case 404:
        userMessage = backendMsg || 'Requested resource was not found.'
        break
      case 409:
        // Common for register conflicts
        // Try to infer which field conflicts
        if (/email/i.test(backendMsg || '') || /email/i.test(validationMsg)) {
          userMessage = 'An account with this email already exists. Try signing in instead.'
        } else if (/username/i.test(backendMsg || '') || /user\s*name/i.test(validationMsg)) {
          userMessage = 'This username is already taken. Please choose another.'
        } else {
          userMessage = backendMsg || 'This account already exists. Try signing in.'
        }
        break
      case 429:
        userMessage = backendMsg || 'Too many attempts. Please wait a moment and try again.'
        break
      case 500:
      case 502:
      case 503:
      case 504:
        userMessage = backendMsg || 'Server error. Please try again later.'
        break
      default:
        userMessage = backendMsg || axiosError.message || 'An unexpected error occurred.'
    }

    appErr = Object.assign(new Error(userMessage), {
      name: 'AppError',
      status,
      code: data?.code,
      userMessage,
      details: data
    }) as AppError
  } else {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.'
    appErr = Object.assign(new Error(message), {
      name: 'AppError',
      userMessage: message
    }) as AppError
  }

  // Log a concise diagnostic to console for developers
  // Avoid spamming full response unless debugging
  // eslint-disable-next-line no-console
  console.error('[Auth] Error:', {
    status: (appErr as any).status,
    code: (appErr as any).code,
    message: appErr.userMessage
  })

  return appErr
}

function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s
}

// Helper to get user-facing message from any error
export function getAuthErrorMessage(error: unknown, fallback = 'Authentication failed. Please try again.'): string {
  return toAppError(error).userMessage || fallback
}

class AuthService {
  /**
   * Register a new user with email and password
   */
  async register(payload: RegisterPayload): Promise<{ message: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, payload)
      return response.data
    } catch (error) {
      throw toAppError(error)
    }
  }

  /**
   * Login an existing user with email and password
   */
  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, payload)
      return response.data
    } catch (error) {
      throw toAppError(error)
    }
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<UserProfile> {
    const jwt = this.getStoredJWT()
    if (!jwt) throw toAppError(new Error('You are not signed in.'))

    try {
      const response = await axios.get(`${API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      return response.data
    } catch (error) {
      throw toAppError(error)
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
  initiateOAuthLogin(provider: OAuthProvider): void {
    const url = `${API_BASE_URL}/oauth/${provider}/login`
    
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
