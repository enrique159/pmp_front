import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import SignInView from '@/views/auth/SignInView.vue'
import { useApp } from '@/composables/useApp'

const routes = [
  {
    path: '/',
    redirect: '/main/home',
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignInView,
  },
  {
    path: '/main',
    component: DefaultLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/main/home',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/main/projects',
        name: 'Projects',
        component: () => import('@/views/ProjectsView.vue'),
      },
      {
        path: '/main/tasks',
        name: 'Tasks',
        component: () => import('@/views/TasksView.vue'),
      },
      {
        path: '/main/users',
        name: 'Users',
        component: () => import('@/views/UsersView.vue'),
      },
      {
        path: '/main/reports',
        name: 'Reports',
        component: () => import('@/views/ReportsView.vue'),
      },
      {
        path: '/main/settings',
        name: 'Settings',
        component: () => import('@/views/SettingsView.vue'),
      },
    ],
  },
]

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