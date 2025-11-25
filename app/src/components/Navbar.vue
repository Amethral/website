<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled || !isHomePage, 'navbar-transparent': !isScrolled && isHomePage }">
    <div class="navbar-container">
      <div class="navbar-links">
        <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
          Home
        </router-link>
        <router-link to="/leaderboard" class="nav-link" :class="{ active: $route.path === '/leaderboard' }">
          Leaderboard
        </router-link>
        <router-link to="/shop" class="nav-link" :class="{ active: $route.path === '/shop' }">
          Shop
        </router-link>
        <router-link to="/updates" class="nav-link" :class="{ active: $route.path === '/updates' }">
          Updates
        </router-link>
        <router-link to="/community" class="nav-link" :class="{ active: $route.path === '/community' }">
          Community
        </router-link>
        
        <!-- Authenticated User -->
        <!-- Play Now (Download) -->
        <PSXButton href="/download" class="nav-cta-btn">
          Play Now
        </PSXButton>

        <!-- Profile Icon (Login/Profile) -->
        <router-link :to="authStore.isAuthenticated ? '/profile' : '/login'" class="user-avatar" :title="authStore.isAuthenticated ? 'Profile' : 'Login'">
          <template v-if="authStore.isAuthenticated">
            {{ userInitials }}
          </template>
          <template v-else>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon-user">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
            </svg>
          </template>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import PSXButton from './PSXButton.vue'

const authStore = useAuthStore()
const route = useRoute()
const isScrolled = ref(false)

const isHomePage = computed(() => route.path === '/')

const userInitials = computed(() => {
  const name = authStore.currentUser || ''
  return name.slice(0, 2).toUpperCase()
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed; /* Changed to fixed for transparency over hero */
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.3s ease;
  z-index: 1000;
  border-bottom: 1px solid transparent;
}

.navbar-transparent {
  background: transparent;
  backdrop-filter: none;
  box-shadow: none;
}

.navbar-scrolled {
  background: rgba(5, 5, 5, 0.95);
  border-bottom: 1px solid var(--color-border-gold);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.8);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-sm) var(--spacing-xl);
  display: flex;
  justify-content: center; /* Centered content */
  align-items: center;
  height: 80px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.navbar-brand:hover {
  opacity: 0.8;
}

.navbar-logo {
  height: 60px; /* Slightly larger for the graphic logo */
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5));
}

.navbar-links {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.nav-link {
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-dim);
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-link:hover {
  color: var(--color-accent-gold);
  text-shadow: 0 0 8px rgba(197, 160, 89, 0.3);
}

.nav-link.active {
  color: var(--color-accent-gold);
  border-bottom: 1px solid var(--color-accent-gold);
}

/* PSXButton handles its own styling, but we can add specific overrides if needed */
.nav-cta-btn {
  font-size: 0.9rem !important;
  padding: 0.5rem 1.5rem !important;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), #2a082e);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-gold);
  font-weight: 700;
  font-size: 1rem;
  font-family: 'Cinzel', serif;
  text-decoration: none;
  border: 1px solid var(--color-accent-gold);
  transition: all 0.2s ease;
  box-shadow: 0 0 5px rgba(197, 160, 89, 0.2);
}

.user-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(197, 160, 89, 0.4);
  border-color: #fff;
}

.icon-user {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

/* Mobile */
@media (max-width: 768px) {
  .navbar-container {
    padding: var(--spacing-md) var(--spacing-lg);
    height: auto;
  }

  .navbar-logo {
    height: 40px;
  }

  .nav-link {
    font-size: 0.9rem;
  }
}
</style>
