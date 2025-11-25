<template>
  <div 
    class="section-separator"
    :class="direction"
  >
    <div 
      class="separator-mask"
      :style="{
        backgroundColor: fillColor,
        maskImage: `url('/images/separatorinspired.png')`,
        // @ts-ignore
        webkitMaskImage: `url('/images/separatorinspired.png')`,
        maskSize: '100% 100%',
        // @ts-ignore
        webkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        // @ts-ignore
        webkitMaskRepeat: 'no-repeat'
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: '#E6D6BC', // Warm Sand by default
  },
  direction: {
    type: String,
    default: 'top', // 'top' or 'bottom'
  },
});

const fillColor = computed(() => props.color);
</script>

<style scoped>
.section-separator {
  width: 100%;
  height: 60px;
  position: relative;
  z-index: 20;
  pointer-events: none;
}

.section-separator.top {
  margin-bottom: -40px; /* -mb-10 approx */
}

.section-separator.bottom {
  margin-top: -40px;
  transform: rotate(180deg);
}

.separator-mask {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: scaleY(-1);
}
</style>
