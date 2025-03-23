import { createRouter, createWebHistory } from 'vue-router'
import { useApp } from '@/composables/useApp'
import routes from './routes'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, _, next) => {
  const app = useApp()
  if (to.name === 'SignIn' && app.isAuthenticated.value) {
    return next({ name: 'Home' })
  } else if (to.meta.requiresAuth && !app.isAuthenticated.value) {
    return next({ name: 'SignIn' })
  }
  return next()
})

export default router