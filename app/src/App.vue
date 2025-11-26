<template>
  <div id="app">
    <Navbar v-if="!route.meta.hideNavbar" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()
</script>

<style>
/* Global app styles are in index.css */
</style>
