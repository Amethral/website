<template>
  <div class="download-page">
    <div class="hero-overlay"></div>
    <div class="container">
      <div class="content">
        <h1 class="title">Enter the Realm</h1>
        <p class="description">
          Prepare yourself, traveler. The gates of Amethral are open. Download the client to begin your adventure.
        </p>
        
        <div class="download-area">
          <PSXButton href="https://github.com/Amethral/game/releases" target="_blank" class="download-btn">
            Download Launcher
          </PSXButton>
          <p class="sub-text">Available for Windows & Mac</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PSXButton from '../components/PSXButton.vue'
</script>

<style scoped>
.download-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('/images/menu.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  padding-top: 80px; /* Clear navbar */
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%);
  z-index: 1;
}

.container {
  position: relative;
  z-index: 2;
  max-width: 800px;
  text-align: center;
  padding: var(--spacing-xl);
}

.title {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
  text-shadow: 0 4px 8px rgba(0,0,0,0.9);
}

.description {
  font-size: 1.5rem;
  color: #cccccc;
  margin-bottom: var(--spacing-2xl);
  font-family: 'Garamond', serif;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

.download-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.download-btn {
  font-size: 1.5rem !important;
  padding: 1.5rem 4rem !important;
}

.sub-text {
  color: var(--color-text-dim);
  font-size: 0.9rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  
  .description {
    font-size: 1.2rem;
  }
}
</style>
