import DefaultLayout from '@/layouts/DefaultLayout.vue'
// Modules
import UsersModule from '@/views/users/UsersModule.vue'
// Views
import SignInView from '@/views/auth/SignInView.vue'
import HomeView from '@/views/HomeView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import TasksView from '@/views/TasksView.vue'
import UsersView from '@/views/users/views/UsersView.vue'
import CreateUserView from '@/views/users/views/CreateUserView.vue'
import ReportsView from '@/views/ReportsView.vue'
import SettingsView from '@/views/SettingsView.vue'

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
        component: HomeView,
      },
      {
        path: '/main/projects',
        name: 'Projects',
        component: ProjectsView,
      },
      {
        path: '/main/tasks',
        name: 'Tasks',
        component: TasksView,
      },
      {
        path: '/main/users',
        name: 'UsersModule',
        component: UsersModule,
        children: [
          {
            path: '',
            name: 'Users',
            component: UsersView,
          },
          {
            path: 'create',
            name: 'CreateUser',
            component: CreateUserView,
          },
        ],
      },
      {
        path: '/main/reports',
        name: 'Reports',
        component: ReportsView,
      },
      {
        path: '/main/settings',
        name: 'Settings',
        component: SettingsView,
      },
    ],
  },
]

export default routes
