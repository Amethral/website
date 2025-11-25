<template>
  <div class="auth-form">
    <!-- Error Message -->
    <div v-if="errorMessage" class="message error-message">
      {{ errorMessage }}
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="message success-message">
      {{ successMessage }}
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p>{{ loadingText }}</p>
    </div>

    <!-- Form -->
    <form v-show="!isLoading && mode !== 'link'" @submit.prevent="handleSubmit" class="form card">
      <h2 class="form-title">{{ formTitle }}</h2>

      <!-- Username (Register only) -->
      <div v-if="mode === 'register'" class="form-group">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="formData.username"
          type="text"
          class="input"
          placeholder="Your username"
          required
          maxlength="20"
        />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          class="input"
          placeholder="your@email.com"
          required
        />
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="formData.password"
          type="password"
          class="input"
          placeholder="••••••••"
          required
          minlength="6"
        />
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary submit-btn">
        {{ submitButtonText }}
      </button>

      <!-- Mode Toggle -->
      <div class="mode-toggle text-center">
        <button
          type="button"
          class="toggle-link"
          @click="toggleMode"
        >
          {{ toggleText }}
        </button>
      </div>

      <!-- OAuth Buttons -->
      <OAuthButtons 
        :webToken="isUnityClient ? props.webToken : undefined" 
        :deviceId="isUnityClient ? props.deviceId : undefined"
        :isLoading="isLoading"
      />
    </form>

    <!-- Link Mode Message -->
    <div v-if="mode === 'link' && !isLoading" class="card text-center">
      <p>Connecting to your existing account...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import authService from '../services/authService'
import { useAuthStore } from '../stores/authStore'
import OAuthButtons from './OAuthButtons.vue'

const authStore = useAuthStore()

interface Props {
  webToken: string
  deviceId: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  success: [sessionToken: string, username: string]
  webSuccess: []
}>()

const mode = ref<'login' | 'register' | 'link'>('login')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const loadingText = ref('Processing...')

const formData = ref({
  username: '',
  email: '',
  password: ''
})

// Check if we're coming from Unity client or just web-only login
const isUnityClient = computed(() => {
  return props.webToken !== 'web-only' && props.deviceId !== 'web-browser'
})

const formTitle = computed(() => {
  return mode.value === 'register' ? 'Create Account' : 'Sign In'
})

const submitButtonText = computed(() => {
  return mode.value === 'register' ? 'Create Account' : 'Sign In'
})

const toggleText = computed(() => {
  return mode.value === 'register' 
    ? 'Already have an account? Sign in'
    : 'Need an account? Create one'
})

const toggleMode = () => {
  mode.value = mode.value === 'register' ? 'login' : 'register'
  errorMessage.value = ''
  successMessage.value = ''
}

  const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  try {
    if (mode.value === 'register') {
      loadingText.value = 'Creating account...'
      await authService.register({
        username: formData.value.username,
        email: formData.value.email,
        password: formData.value.password,
        webToken: props.webToken
      })
      // Store username for registered user
      authStore.setUserInfo(formData.value.username)
      successMessage.value = 'Account created!'
    } else {
      loadingText.value = 'Signing in...'
      const response = await authService.login({
        email: formData.value.email,
        password: formData.value.password,
        webToken: props.webToken
      })
      // Store JWT in both authService and Pinia store
      authStore.setAuth(response.token)
      successMessage.value = 'Signed in successfully!'
    }

    isLoading.value = false
    emit('webSuccess')
  } catch (error: any) {
    isLoading.value = false
    errorMessage.value = error.response?.data?.message || 'Authentication failed. Please try again.'
  }
}

const attemptLinkAccount = async () => {
  // Only attempt to link if coming from Unity client
  if (!isUnityClient.value) {
    mode.value = 'login'
    return
  }

  const storedJWT = authService.getStoredJWT()
  if (!storedJWT) {
    mode.value = 'login'
    return
  }

  mode.value = 'link'
  isLoading.value = true
  loadingText.value = 'Connecting account...'

  try {
    await authService.linkAccount(storedJWT, props.webToken)
    successMessage.value = 'Account linked!'
    isLoading.value = false
    emit('webSuccess')
  } catch (error: any) {
    mode.value = 'login'
    isLoading.value = false
  }
}

onMounted(() => {
  attemptLinkAccount()
})
</script>

<style scoped>
.auth-form {
  margin-top: var(--spacing-lg);
}

.message {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
}

.error-message {
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #FCA5A5;
}

.success-message {
  background: rgba(157, 78, 221, 0.1);
  border: 1px solid rgba(157, 78, 221, 0.3);
  color: var(--color-primary);
}

.loading-container {
  text-align: center;
  padding: var(--spacing-2xl);
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto var(--spacing-lg);
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-container p {
  color: var(--color-text-dim);
  margin: 0;
}

.form {
  margin-bottom: var(--spacing-lg);
}

.form-title {
  margin-bottom: var(--spacing-xl);
  font-size: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-size: 0.95rem;
  color: var(--color-text);
  font-weight: 500;
}

.submit-btn {
  width: 100%;
  padding: var(--spacing-md);
  font-size: 1rem;
  margin-top: var(--spacing-md);
}

.mode-toggle {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
}

.toggle-link {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
  padding: var(--spacing-sm);
}

.toggle-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}
</style>
