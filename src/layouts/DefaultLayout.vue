<template>
  <div class="h-full w-full flex">
    <section
      class="h-full bg-white border-r border-b-white-3 transition-all relative flex flex-col justify-between"
      :class="[expandMenu ? 'w-[240px] p-4 pb-6' : 'w-[64px] p-1 pb-3']"
    >
      <ul v-if="expandMenu" class="menu rounded-box w-full px-0 gap-3">
        <li v-for="item in menuItems" :key="`menu-item-expand-${item.name}`">
          <router-link
            :to="item.path"
            :class="[
              isCurrentPath(item.module) ? 'text-b-tertiary' : 'text-b-black-2',
            ]"
          >
            <component :is="item.icon" class="w-6 h-6" />
            <span class="font-bold">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>

      <ul v-else class="menu rounded-box w-full px-0 gap-3">
        <li
          v-for="item in menuItems"
          :key="`menu-item-${item.name}`"
          class="flex justify-center items-center"
          @click="goTo(item.path)"
        >
          <div class="tooltip tooltip-right" :data-tip="item.name">
            <a
              :class="[
                isCurrentPath(item.module) ? 'text-b-tertiary' : 'text-b-black-2',
              ]"
            >
              <component :is="item.icon" class="w-6 h-6" />
          </a>
          </div>
        </li>
      </ul>

      <div class="flex flex-col gap-y-4">
        <button class="cursor-pointer flex items-center" :class="{ 'justify-center items-center': !expandMenu, 'hover:bg-b-white-2 rounded-3xl p-2': expandMenu }">
          <div class="avatar avatar-placeholder">
            <div class="bg-neutral text-neutral-content w-10 rounded-full hover:outline-2 hover:outline-b-secondary hover:border-white hover:border-2 transition-all">
              <span>{{ getUserAbbreviation }}</span>
            </div>
          </div>
          <div v-if="expandMenu" class="flex flex-col justify-center items-start overflow-hidden">
            <span class="text-b-black-2 text-sm ml-2">{{ user.name }}</span>
            <span class="text-b-black-3 text-sm ml-2 text-ellipsis">Ver Perfil</span>
          </div>
        </button>
  
        <button class="btn btn-ghost btn-sm w-full text-b-black-2 p-2" @click="signOut">
          <IconLogout2 class="w-6 h-6" />
          <span v-if="expandMenu" class="font-bold">Cerrar Sesión</span>
        </button>
      </div>

      <button
        class="btn btn-circle btn-outline border-b-white-3 shadow-sm bg-white absolute -right-4 bottom-32 p-2 rounded-full"
        @click="expandMenu = !expandMenu"
      >
        <IconChevronRight
          class="w-6 h-6 transition-all text-b-primary"
          :class="[expandMenu ? 'rotate-180' : 'rotate-0']"
        />
      </button>
    </section>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import {
  IconChevronRight,
  IconFidgetSpinner,
  IconSmartHome,
  IconCategory,
  IconChartBar,
  IconUsersGroup,
  IconSettings,
  IconLogout2
} from '@tabler/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useApp } from '@/composables/useApp';

const route = useRoute()
const router = useRouter()
const { logout, getUserAbbreviation, user } = useApp()

const signOut = () => {
  logout()
  router.push({ name: 'SignIn' })
}

const expandMenu = ref(false)
const currentPath = computed(() => route.path.split('/')[2])

const menuItems = [
  {
    name: 'Inicio',
    path: '/main/home',
    module: 'home',
    icon: IconSmartHome,
  },
  {
    name: 'Proyectos',
    path: '/main/projects',
    module: 'projects',
    icon: IconFidgetSpinner,
  },
  {
    name: 'Departamentos',
    path: '/main/departments',
    module: 'departments',
    icon: IconCategory,
  },
  {
    name: 'Usuarios',
    path: '/main/users',
    module: 'users',
    icon: IconUsersGroup,
  },
  {
    name: 'Reportes',
    path: '/main/reports',
    module: 'reports',
    icon: IconChartBar,
  },
  {
    name: 'Configuración',
    path: '/main/settings',
    module: 'settings',
    icon: IconSettings,
  },
]

const isCurrentPath = (path: string) => path === currentPath.value

const goTo = (path: string) => {
  router.push(path)
}
</script>

<style></style>
