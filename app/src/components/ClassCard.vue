<template>
  <div class="class-card card pixel-border">
    <div class="class-header">
      <div class="class-icon">{{ icon }}</div>
      <h3 class="class-name">{{ name }}</h3>
    </div>
    <p class="class-role">{{ role }}</p>
    <p class="class-description">{{ description }}</p>
    <div class="class-stats">
      <div class="stat-bar">
        <span class="stat-label">ATK</span>
        <div class="stat-value">
          <div class="stat-fill" :style="{ width: `${attack}%` }"></div>
        </div>
      </div>
      <div class="stat-bar">
        <span class="stat-label">DEF</span>
        <div class="stat-value">
          <div class="stat-fill" :style="{ width: `${defense}%` }"></div>
        </div>
      </div>
      <div class="stat-bar">
        <span class="stat-label">SPD</span>
        <div class="stat-value">
          <div class="stat-fill" :style="{ width: `${speed}%` }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  name: string
  role: string
  description: string
  attack: number
  defense: number
  speed: number
}>()
</script>

<style scoped>
.class-card {
  padding: var(--spacing-xl);
  transition: all 0.3s ease;
  background: linear-gradient(
    135deg,
    rgba(90, 90, 90, 0.15) 0%,
    rgba(42, 42, 42, 0.15) 100%
  );
}

.class-card:hover {
  transform: translateY(-10px) rotate(-1deg);
  box-shadow: 
    0 0 0 2px var(--color-darker-bg),
    0 0 0 6px var(--color-primary),
    0 15px 40px rgba(157, 78, 221, 0.5);
}

.class-header {
  text-align: center;
  margin-bottom: var(--spacing-md);
}

.class-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-sm);
  filter: drop-shadow(0 0 10px rgba(157, 78, 221, 0.5));
}

.class-name {
  font-size: 1.3rem;
  color: var(--color-accent);
  margin-bottom: var(--spacing-xs);
}

.class-role {
  text-align: center;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.6rem;
  color: var(--color-crt-green);
  margin-bottom: var(--spacing-lg);
  letter-spacing: 2px;
}

.class-description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--color-text-dim);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.class-stats {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding-top: var(--spacing-md);
  border-top: 2px solid var(--color-ps1-gray);
}

.stat-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.stat-label {
  font-family: 'Press Start 2P', cursive;
  font-size: 0.6rem;
  color: var(--color-primary);
  width: 40px;
  flex-shrink: 0;
}

.stat-value {
  flex: 1;
  height: 16px;
  background: var(--color-darker-bg);
  border: 2px solid var(--color-ps1-gray);
  box-shadow: var(--shadow-bevel-in);
  position: relative;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-secondary),
    var(--color-primary),
    var(--color-accent)
  );
  transition: width 0.5s ease;
  box-shadow: 0 0 10px rgba(157, 78, 221, 0.5);
}

.class-card:hover .stat-fill {
  animation: stat-pulse 1s infinite;
}

@keyframes stat-pulse {
  0%, 100% { box-shadow: 0 0 10px rgba(157, 78, 221, 0.5); }
  50% { box-shadow: 0 0 20px rgba(157, 78, 221, 0.8); }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .class-icon {
    font-size: 3rem;
  }

  .class-name {
    font-size: 1.1rem;
  }

  .stat-label {
    font-size: 0.55rem;
    width: 35px;
  }
}
</style>
