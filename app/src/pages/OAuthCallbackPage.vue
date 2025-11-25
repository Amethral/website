<template>
  <div class="oauth-callback-page">
    <div class="container">
      <div class="callback-container">
        <div v-if="isProcessing" class="processing-state">
          <div class="spinner"></div>
          <h2>Completing Authentication...</h2>
          <p class="text-dim">Please wait while we log you in</p>
        </div>

        <div v-else-if="error" class="error-state card">
          <div class="error-icon">✕</div>
          <h2>Authentication Failed</h2>
          <p class="error-message">{{ error }}</p>
          <router-link to="/login" class="btn btn-primary">
            Try Again
          </router-link>
        </div>

        <div v-else class="success-state card">
          <div class="success-icon">✓</div>
          <h2>Authentication Successful!</h2>
          <p v-if="username" class="welcome-text">
            Welcome back, <strong>{{ username }}</strong>
          </p>
          <p class="redirect-text">Redirecting you now...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authService'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const isProcessing = ref(true)
const error = ref<string>('')
const username = ref<string>('')

onMounted(async () => {
  try {
    // Extract token from URL query params
    const token = authService.handleOAuthCallback()
    
    if (!token) {
      error.value = 'No authentication token received'
      isProcessing.value = false
      return
    }

    // Store the token in the auth store
    authStore.setAuth(token)
    
    // Optional: You could decode the JWT to get username
    // For now, we'll just mark as successful
    isProcessing.value = false

    // Redirect to home page after a brief delay
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (err: any) {
    error.value = err.message || 'An unexpected error occurred'
    isProcessing.value = false
  }
})
</script>

<style scoped>
.oauth-callback-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  padding: var(--spacing-xl);
}

.callback-container {
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.processing-state,
.error-state,
.success-state {
  padding: var(--spacing-2xl);
}

.spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto var(--spacing-xl);
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.processing-state h2,
.error-state h2,
.success-state h2 {
  margin-bottom: var(--spacing-md);
  font-size: 1.75rem;
}

.text-dim {
  color: var(--color-text-dim);
  margin: 0;
}

.error-icon,
.success-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
}

.error-icon {
  color: #EF4444;
}

.success-icon {
  color: var(--color-primary);
}

.error-message {
  color: #FCA5A5;
  margin-bottom: var(--spacing-xl);
}

.welcome-text {
  font-size: 1.1rem;
  margin: var(--spacing-lg) 0;
}

.welcome-text strong {
  color: var(--color-primary);
}

.redirect-text {
  color: var(--color-text-dim);
  font-size: 0.95rem;
  margin-top: var(--spacing-lg);
}

.btn {
  display: inline-block;
  margin-top: var(--spacing-lg);
}
</style>
