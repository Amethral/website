<template>
  <div class="activate-page">
    <div class="container">
      <div class="auth-container">
        <div class="auth-header text-center">
          <h1 class="auth-title">Connect Device</h1>
          <p class="auth-subtitle">
            Enter the code displayed on your device
          </p>
        </div>

        <!-- Code Entry Form -->
        <form @submit.prevent="handleSubmit" class="form card" v-if="!success">
          <div class="form-group">
            <label for="userCode">Device Code</label>
            <input
              id="userCode"
              v-model="userCode"
              type="text"
              class="input code-input"
              placeholder="ABCD-1234"
              maxlength="9"
              required
              @input="formatCode"
            />
          </div>

          <div v-if="error" class="message error-message">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-primary submit-btn" :disabled="isLoading">
            {{ isLoading ? 'Connecting...' : 'Connect' }}
          </button>
        </form>

        <!-- Success State -->
        <div v-if="success" class="success-card card text-center">
          <div class="success-icon">✓</div>
          <h2>Device Connected!</h2>
          <p class="mt-md">
            You have successfully linked your device.
          </p>
          <p class="redirect-text mt-lg">Check your game screen.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import authService from '../services/authService'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const userCode = ref('')
const isLoading = ref(false)
const error = ref('')
const success = ref(false)

const formatCode = () => {
  // Auto-uppercase
  let val = userCode.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
  
  // Auto-insert dash
  if (val.length > 4) {
    val = val.slice(0, 4) + '-' + val.slice(4, 8)
  }
  
  userCode.value = val
}

const handleSubmit = async () => {
  if (!authStore.isAuthenticated) {
    // If not logged in, redirect to login first, then come back
    router.push(`/login?redirect=/activate&code=${userCode.value}`)
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    await authService.linkAccount(authStore.jwt!, userCode.value)
    success.value = true
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Invalid or expired code.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.activate-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
}

.auth-container {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
}

.auth-header {
  margin-bottom: var(--spacing-xl);
}

.auth-title {
  font-size: 2rem;
  margin-bottom: var(--spacing-sm);
  color: var(--color-primary);
}

.auth-subtitle {
  color: var(--color-text-dim);
}

.code-input {
  font-family: monospace;
  font-size: 1.5rem;
  text-align: center;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.success-card {
  margin-top: var(--spacing-xl);
  padding: var(--spacing-2xl);
  animation: fadeIn 0.5s ease;
}

.success-icon {
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
}

.message {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  text-align: center;
}

.error-message {
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #FCA5A5;
}

.submit-btn {
  width: 100%;
  padding: var(--spacing-md);
  font-size: 1.1rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
