<template>
  <div class="not-found-page">
    <div class="container text-center">
      <div class="card">
        <h1 class="title">404</h1>
        <p class="subtitle">Requested resource was not found.</p>
        <router-link to="/" class="btn btn-primary mt-lg">Go to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Simple Not Found page
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  padding: var(--spacing-2xl) var(--spacing-md);
}

.card {
  padding: var(--spacing-2xl);
}

.title {
  font-size: 4rem;
  margin: 0 0 var(--spacing-md);
  color: var(--color-primary);
}

.subtitle {
  color: var(--color-text-dim);
  margin-bottom: var(--spacing-xl);
  font-size: 1.05rem;
}

.btn {
  display: inline-block;
}
</style>
