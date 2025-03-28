import DefaultLayout from '@/layouts/DefaultLayout.vue'
// Modules
import UsersModule from '@/views/users/UsersModule.vue'
import DepartmentsModule from '@/views/departments/DepartmentsModule.vue'
import ClientsModule from '@/views/clients/ClientsModule.vue'
import ProjectsModule from '@/views/projects/ProjectsModule.vue'
// Views
import SignInView from '@/views/auth/SignInView.vue'
import HomeView from '@/views/HomeView.vue'
import ProjectsView from '@/views/projects/views/ProjectsView.vue'
import ProjectDetailsView from '@/views/projects/views/ProjectDetailsView.vue'
import TasksView from '@/views/TasksView.vue'
import UsersView from '@/views/users/views/UsersView.vue'
import CreateUserView from '@/views/users/views/CreateUserView.vue'
import ReportsView from '@/views/ReportsView.vue'
import SettingsView from '@/views/SettingsView.vue'
import ClientsView from '@/views/clients/views/ClientsView.vue'
import DepartmentsView from '@/views/departments/views/DepartmentsView.vue'
import CreateClientView from '@/views/clients/views/CreateClientView.vue'


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
        path: '/main/clients',
        name: 'ClientsModule',
        component: ClientsModule,
        children: [
          {
            path: '',
            name: 'Clients',
            component: ClientsView,
          },
          {
            path: 'create',
            name: 'CreateClient',
            component: CreateClientView,
          },
        ],
      },
      {
        path: '/main/projects',
        name: 'ProjectsModule',
        component: ProjectsModule,
        children: [
          {
            path: '',
            name: 'Projects',
            component: ProjectsView,
          },
          {
            path: 'details/:id',
            name: 'ProjectDetails',
            component: ProjectDetailsView,
          }
        ],
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
        path: '/main/departments',
        name: 'DepartmentsModule',
        component: DepartmentsModule,
        children: [
          {
            path: '',
            name: 'Departments',
            component: DepartmentsView,
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
