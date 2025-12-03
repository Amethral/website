<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-container">
        <div class="auth-header text-center">
          <h1 class="auth-title">Get Started</h1>
          <p class="auth-subtitle">
            Create an account or sign in to play
          </p>
        </div>

        <!-- Auth Form -->
        <AuthForm
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
          <p class="redirect-text mt-lg">Redirecting...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthForm from '../components/AuthForm.vue'

const route = useRoute()
const router = useRouter()

const authCompleted = ref(false)
const sessionToken = ref<string>('')
const username = ref<string>('')

onMounted(() => {
  const redirect = route.query.redirect as string
  if (redirect) localStorage.setItem('auth_redirect', redirect)
})

const handleAuthSuccess = (token: string, user: string) => {
  authCompleted.value = true
  sessionToken.value = token
  username.value = user
  
  // Redirect after short delay
  setTimeout(() => {
    handleWebSuccess()
  }, 1500)
}

const handleWebSuccess = () => {
  const redirect = route.query.redirect as string
  if (redirect) {
    router.push(redirect)
  } else {
    router.push('/')
  }
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
