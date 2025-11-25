<template>
  <component
    :is="isExternal ? 'a' : (href ? 'router-link' : 'button')"
    :to="!isExternal && href ? href : undefined"
    :href="isExternal ? href : undefined"
    class="psx-button"
    :class="{ 'full-width': fullWidth }"
  >
    <!-- Texture overlay -->
    <div class="texture-overlay"></div>
    
    <!-- Inner bevel highlight -->
    <div class="bevel-highlight"></div>
    
    <!-- Content -->
    <span class="button-content">
      <slot></slot>
    </span>
    
    <!-- Shine effect on hover -->
    <div class="shine-effect"></div>
  </component>
</template>

<script setup lang="ts">
const props = defineProps({
  href: {
    type: String,
    default: null,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

import { computed } from 'vue';

const isExternal = computed(() => {
  return props.href?.startsWith('http') || props.href?.startsWith('https');
});
</script>

<style scoped>
.psx-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  font-family: 'Cinzel', serif;
  font-weight: 700;
  font-size: 1.125rem; /* text-lg */
  letter-spacing: 0.025em; /* tracking-wide */
  color: white;
  transition: all 0.3s ease;
  background-color: #8B6B43; /* bg-antique-bronze approximation */
  border: 2px solid #8B6B43;
  box-shadow: 0 4px 0 #5D4037;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
}

.psx-button:hover {
  background-color: #a88558;
  filter: brightness(1.1);
}

.psx-button:active {
  box-shadow: none;
  transform: translateY(4px);
}

.psx-button.full-width {
  width: 100%;
}

.texture-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.2;
  background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png');
  mix-blend-mode: overlay;
  pointer-events: none;
}

.bevel-highlight {
  position: absolute;
  inset: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  pointer-events: none;
}

.button-content {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06)); /* drop-shadow-md */
}

.shine-effect {
  position: absolute;
  inset: 0;
  transform: translateX(-100%) skewX(12deg);
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
  pointer-events: none;
}

.psx-button:hover .shine-effect {
  animation: shine 1s infinite;
}

@keyframes shine {
  100% {
    transform: translateX(100%) skewX(12deg);
  }
}
</style>
