import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import AuthPage from './pages/AuthPage.vue'
import OAuthCallbackPage from './pages/OAuthCallbackPage.vue'
import ProfileView from './pages/ProfileView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Auth',
    component: AuthPage
  },
  {
    path: '/oauth/success',
    name: 'OAuthCallback',
    component: OAuthCallbackPage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '/download',
    name: 'Download',
    component: () => import('./pages/DownloadPage.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('./pages/ShopPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
