<template>
  <div class="profile-page">
    <div class="profile-container">
      <div class="profile-header">
        <h1 class="page-title">Adventurer Profile</h1>
        <div class="profile-avatar-large">
          {{ userInitials }}
        </div>
      </div>

      <div class="profile-card">
        <div class="profile-info-group">
          <label>Username</label>
          <div class="info-value">{{ authStore.currentUser || 'Unknown Adventurer' }}</div>
        </div>

        <div class="profile-info-group">
          <label>Email</label>
          <div class="info-value">{{ authStore.userEmail || 'No email linked' }}</div>
        </div>

        <div class="profile-info-group">
          <label>Member Since</label>
          <div class="info-value">{{ memberSince }}</div>
        </div>

        <div class="profile-actions">
          <button @click="handleLogout" class="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const userInitials = computed(() => {
  const name = authStore.currentUser || ''
  return name.slice(0, 2).toUpperCase()
})

const memberSince = computed(() => {
  if (!authStore.userCreatedAt) return 'Unknown'
  return new Date(authStore.userCreatedAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
})

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  padding-top: 80px; /* Account for fixed navbar */
  background: linear-gradient(to bottom, #0a0a0a, #1a1a1a);
  color: var(--color-text);
  display: flex;
  justify-content: center;
  padding-bottom: 4rem;
}

.profile-container {
  width: 100%;
  max-width: 600px;
  padding: 0 var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
}

.profile-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.page-title {
  font-family: 'Cinzel', serif;
  font-size: 2.5rem;
  color: var(--color-primary);
  text-shadow: 0 0 10px rgba(138, 62, 201, 0.3);
  margin: 0;
}

.profile-avatar-large {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), #4a1a75);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  border: 4px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(138, 62, 201, 0.4);
  font-family: 'Cinzel', serif;
}

.profile-card {
  width: 100%;
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.profile-info-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.profile-info-group label {
  color: var(--color-text-dim);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-value {
  font-size: 1.1rem;
  color: var(--color-text);
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.profile-actions {
  margin-top: var(--spacing-md);
  display: flex;
  justify-content: center;
}

.btn-logout {
  background: transparent;
  border: 1px solid var(--color-error, #ff4444);
  color: var(--color-error, #ff4444);
  padding: var(--spacing-sm) var(--spacing-xl);
  border-radius: var(--radius-sm);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-logout:hover {
  background: rgba(255, 68, 68, 0.1);
  box-shadow: 0 0 10px rgba(255, 68, 68, 0.2);
}
</style>
