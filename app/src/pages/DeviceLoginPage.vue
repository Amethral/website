<template>
  <div class="device-login-page">
    <div class="container">
      <div class="auth-container">
        <div class="auth-header text-center">
          <h1 class="auth-title">Device Login</h1>
          <p class="auth-subtitle">Sign in to connect your device</p>
        </div>

        <!-- Auth Form -->
        <AuthForm
          :webToken="webToken"
          :deviceId="deviceId"
          @success="handleAuthSuccess"
          @webSuccess="handleWebSuccess"
        />

        <!-- Success State -->
        <div v-if="authCompleted" class="success-card card text-center">
          <div class="success-icon">✓</div>
          <h2>Connected!</h2>
          <p class="mt-md">
            You are now logged in as <strong>{{ username }}</strong>
          </p>
          <p class="redirect-text mt-lg">Please check your game client.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import AuthForm from "../components/AuthForm.vue";

const route = useRoute();

const webToken = ref<string>("");
const deviceId = ref<string>("unity-device"); // Default to ensure AuthForm treats it as client
const authCompleted = ref(false);
const username = ref<string>("");

onMounted(() => {
  const token = route.query.token as string;
  if (token) webToken.value = token;

  // We don't strictly need deviceId from URL for the linking to work,
  // but if it were passed, we could use it.
  // For now, we hardcode a value to ensure AuthForm knows we are in "device mode".
});

const handleAuthSuccess = (_token: string, user: string) => {
  authCompleted.value = true;
  username.value = user;
};

const handleWebSuccess = () => {
  authCompleted.value = true;
};
</script>

<style scoped>
.device-login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  /* Ensure it sits on top of everything if needed, though routing handles that */
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
