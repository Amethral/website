import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  // State
  const jwt = ref<string | null>(null)
  const username = ref<string | null>(null)
  const userId = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!jwt.value)
  const currentUser = computed(() => username.value)

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
    
    // Store in localStorage and authService
    authService.storeJWT(token)
  }

  function setUserInfo(user: string, id?: string) {
    username.value = user
    localStorage.setItem('amethral_username', user)
    if (id) {
      userId.value = id
      localStorage.setItem('amethral_userId', id)
    }
  }

  function logout() {
    jwt.value = null
    username.value = null
    userId.value = null
    authService.clearJWT()
    localStorage.removeItem('amethral_username')
    localStorage.removeItem('amethral_userId')
  }

  function loadStoredAuth() {
    const storedJWT = authService.getStoredJWT()
    const storedUsername = localStorage.getItem('amethral_username')
    const storedUserId = localStorage.getItem('amethral_userId')
    
    if (storedJWT) {
      jwt.value = storedJWT
      if (storedUsername) username.value = storedUsername
      if (storedUserId) userId.value = storedUserId
    }
  }

  // Initialize store with stored auth on creation
  loadStoredAuth()

  return {
    // State
    jwt,
    username,
    userId,
    // Getters
    isAuthenticated,
    currentUser,
    // Actions
    setAuth,
    setUserInfo,
    logout,
    loadStoredAuth
  }
})
