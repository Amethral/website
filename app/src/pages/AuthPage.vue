<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-container">
        <div class="auth-header text-center">
          <h1 class="auth-title">{{ pageTitle }}</h1>
          <p class="auth-subtitle" v-if="webToken && deviceId">
            Session connected
          </p>
          <p class="auth-subtitle" v-else>
            Create an account or sign in to play
          </p>
        </div>

        <!-- Error if missing params -->
        <div v-if="!webToken || !deviceId" class="info-card card">
          <h3>Welcome to Amethral</h3>
          <p>
            This authentication page is typically accessed from the game client.
          </p>
          <p class="mt-md">
            You can still create an account or login below, but you'll need the game client to play.
          </p>
        </div>

        <!-- Auth Form -->
        <AuthForm
          :webToken="webToken || 'web-only'"
          :deviceId="deviceId || 'web-browser'"
          @success="handleAuthSuccess"
          @webSuccess="handleWebSuccess"
        />

        <!-- Success State -->
        <div v-if="authCompleted" class="success-card card text-center">
          <div class="success-icon">✓</div>
          <h2>Authentication Complete</h2>
          <p class="mt-md">
            Welcome back, <strong>{{ username }}</strong>
          </p>
          <p class="redirect-text mt-lg">Redirecting to game...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthForm from '../components/AuthForm.vue'

const route = useRoute()
const router = useRouter()

const webToken = ref<string>('')
const deviceId = ref<string>('')
const authCompleted = ref(false)
const sessionToken = ref<string>('')
const username = ref<string>('')

const pageTitle = computed(() => {
  return webToken.value && deviceId.value ? 'Player Login' : 'Get Started'
})

onMounted(() => {
  const token = route.query.token as string
  const device = route.query.deviceId as string

  if (token) webToken.value = token
  if (device) deviceId.value = device
})

const handleAuthSuccess = (token: string, user: string) => {
  authCompleted.value = true
  sessionToken.value = token
  username.value = user
}

const handleWebSuccess = () => {
  // For web-only logins, redirect to home page
  router.push('/')
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  padding: var(--spacing-2xl) 0;
  background: var(--color-bg);
}

.auth-container {
  max-width: 500px;
  margin: 0 auto;
}

.auth-header {
  margin-bottom: var(--spacing-2xl);
}

.auth-title {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
}

.auth-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-dim);
  margin-bottom: 0;
}

.info-card {
  margin-bottom: var(--spacing-xl);
}

.info-card h3 {
  margin-bottom: var(--spacing-md);
}

.info-card p {
  margin-bottom: var(--spacing-sm);
}

.success-card {
  margin-top: var(--spacing-xl);
  padding: var(--spacing-2xl);
}

.success-icon {
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
}

.success-card h2 {
  color: var(--color-text);
  margin-bottom: 0;
}

.success-card strong {
  color: var(--color-primary);
}

.redirect-text {
  color: var(--color-text-dim);
  font-size: 0.95rem;
}

/* Mobile */
@media (max-width: 768px) {
  .auth-title {
    font-size: 2rem;
  }

  .auth-container {
    padding: 0 var(--spacing-md);
  }
}
</style>
