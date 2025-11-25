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
          <router-link to="/profile" class="user-avatar" title="Go to Profile">
            {{ userInitials }}
          </router-link>
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
import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const userInitials = computed(() => {
  const name = authStore.currentUser || ''
  return name.slice(0, 2).toUpperCase()
})
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

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), #4a1a75);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  box-shadow: 0 0 10px rgba(138, 62, 201, 0.3);
}

.user-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(138, 62, 201, 0.5);
  border-color: rgba(255, 255, 255, 0.3);
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
