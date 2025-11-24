<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">
        AMETHRAL
      </router-link>

      <div class="navbar-links">
        <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
          Home
        </router-link>
        
        <!-- Authenticated User -->
        <template v-if="authStore.isAuthenticated">
          <span class="user-greeting">
            Welcome, <strong>{{ authStore.currentUser }}</strong>
          </span>
          <button @click="handleLogout" class="nav-link logout-btn">
            Logout
          </button>
        </template>
        
        <!-- Not Authenticated -->
        <router-link v-else to="/login" class="nav-link nav-cta" :class="{ active: $route.path === '/login' }">
          Play Now
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  background: rgba(10, 10, 10, 0.95);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
  letter-spacing: 1px;
  transition: color 0.2s ease;
}

.navbar-brand:hover {
  color: var(--color-primary);
}

.navbar-links {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.nav-link {
  font-size: 0.95rem;
  color: var(--color-text-dim);
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--color-text);
  background: var(--color-bg-light);
}

.nav-link.active {
  color: var(--color-text);
}

.nav-cta {
  background: var(--color-primary);
  color: white;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-sm);
}

.nav-cta:hover {
  background: #8A3EC9;
  color: white;
  box-shadow: var(--shadow-glow);
}

.user-greeting {
  color: var(--color-text-dim);
  font-size: 0.95rem;
  padding: var(--spacing-sm) var(--spacing-md);
}

.user-greeting strong {
  color: var(--color-primary);
  font-weight: 600;
}

.logout-btn {
  background: transparent;
  border: 1px solid var(--color-border);
  cursor: pointer;
}

.logout-btn:hover {
  background: var(--color-bg-light);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* Mobile */
@media (max-width: 768px) {
  .navbar-container {
    padding: var(--spacing-md) var(--spacing-lg);
  }

  .navbar-brand {
    font-size: 1.1rem;
  }

  .nav-link {
    font-size: 0.9rem;
  }
}
</style>
