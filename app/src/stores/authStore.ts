import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { jwtDecode } from 'jwt-decode'
import authService from '../services/authService'

interface JWTPayload {
  sub: string // userId
  unique_name: string // username
  email?: string
  exp: number
  [key: string]: any
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const jwt = ref<string | null>(null)
  const username = ref<string | null>(null)
  const userId = ref<string | null>(null)
  const email = ref<string | null>(null)
  const createdAt = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!jwt.value)
  const currentUser = computed(() => username.value)
  const userEmail = computed(() => email.value)
  const userCreatedAt = computed(() => createdAt.value)

  // Actions
  function setAuth(token: string, user?: string, id?: string) {
    jwt.value = token
    if (user) {
      username.value = user
      localStorage.setItem('amethral_username', user)
    }
    if (id) {
      userId.value = id
      localStorage.setItem('amethral_userId', id)
    }
    
    // Decode token to get email if not already set
    try {
      const decoded = jwtDecode<JWTPayload>(token)
      if (decoded.email) {
        email.value = decoded.email
        localStorage.setItem('amethral_email', decoded.email)
      }
      // Also update username/id from token if not provided
      if (!user && decoded.unique_name) {
        username.value = decoded.unique_name
        localStorage.setItem('amethral_username', decoded.unique_name)
      }
      if (!id && decoded.sub) {
        userId.value = decoded.sub
        localStorage.setItem('amethral_userId', decoded.sub)
      }
    } catch (e) {
      console.error('Failed to decode JWT', e)
    }
    
    // Store in localStorage and authService
    authService.storeJWT(token)
    
    // Fetch full profile
    fetchProfile()
  }

  async function fetchProfile() {
    if (!jwt.value) return
    try {
      const profile = await authService.getProfile()
      username.value = profile.username
      email.value = profile.email
      userId.value = profile.id
      createdAt.value = profile.createdAt
      
      localStorage.setItem('amethral_username', profile.username)
      localStorage.setItem('amethral_userId', profile.id)
      localStorage.setItem('amethral_email', profile.email)
      localStorage.setItem('amethral_createdAt', profile.createdAt)
    } catch (e) {
      console.error('Failed to fetch profile', e)
    }
  }

  function setUserInfo(user: string, id?: string) {
    username.value = user
    localStorage.setItem('amethral_username', user)
    if (id) {
      userId.value = id
      localStorage.setItem('amethral_userId', id)
    }
    // Try to decode email from existing token if available
    if (jwt.value) {
      try {
        const decoded = jwtDecode<JWTPayload>(jwt.value)
        if (decoded.email) {
          email.value = decoded.email
          localStorage.setItem('amethral_email', decoded.email)
        }
      } catch (e) {
        // Ignore
      }
    }
  }

  function logout() {
    jwt.value = null
    username.value = null
    userId.value = null
    authService.clearJWT()
    localStorage.removeItem('amethral_username')
    localStorage.removeItem('amethral_userId')
    localStorage.removeItem('amethral_email')
    localStorage.removeItem('amethral_createdAt')
    email.value = null
    createdAt.value = null
  }

  function loadStoredAuth() {
    const storedJWT = authService.getStoredJWT()
    const storedUsername = localStorage.getItem('amethral_username')
    const storedUserId = localStorage.getItem('amethral_userId')
    const storedEmail = localStorage.getItem('amethral_email')
    const storedCreatedAt = localStorage.getItem('amethral_createdAt')
    
    if (storedJWT) {
      jwt.value = storedJWT
      if (storedUsername) username.value = storedUsername
      if (storedUserId) userId.value = storedUserId
      if (storedEmail) email.value = storedEmail
      if (storedCreatedAt) createdAt.value = storedCreatedAt
      
      // If we have token but missing details, try to decode
      if (!storedEmail || !storedUsername || !storedUserId) {
        try {
          const decoded = jwtDecode<JWTPayload>(storedJWT)
          if (!storedEmail && decoded.email) {
            email.value = decoded.email
            localStorage.setItem('amethral_email', decoded.email)
          }
          if (!storedUsername && decoded.unique_name) {
            username.value = decoded.unique_name
            localStorage.setItem('amethral_username', decoded.unique_name)
          }
          if (!storedUserId && decoded.sub) {
            userId.value = decoded.sub
            localStorage.setItem('amethral_userId', decoded.sub)
          }
        } catch (e) {
          // Ignore
        }
      }
    }
  }

  // Initialize store with stored auth on creation
  loadStoredAuth()

  return {
    // State
    jwt,
    username,
    userId,
    email,
    // Getters
    isAuthenticated,
    currentUser,
    userEmail,
    userCreatedAt,
    // Actions
    setAuth,
    fetchProfile,
    setUserInfo,
    logout,
    loadStoredAuth
  }
})
