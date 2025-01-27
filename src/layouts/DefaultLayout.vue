<template>
  <div class="h-full w-full flex">
    <section
      class="h-full bg-white border-r border-b-white-3 transition-all relative"
      :class="[expandMenu ? 'w-[240px] p-4' : 'w-[64px] p-1']"
    >
      <ul v-if="expandMenu" class="menu rounded-box w-full px-0 gap-3">
        <li v-for="item in menuItems" :key="`menu-item-expand-${item.name}`">
          <router-link
            :to="item.path"
            :class="[
              isCurrentPath(item.path) ? 'text-b-tertiary' : 'text-b-black-2',
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
        >
          <div class="tooltip tooltip-right" :data-tip="item.name">
            <router-link
              :to="item.path"
              :class="[
                isCurrentPath(item.path) ? 'text-b-tertiary' : 'text-b-black-2',
              ]"
            >
              <component :is="item.icon" class="w-6 h-6" />
            </router-link>
          </div>
        </li>
      </ul>

      <button
        class="btn btn-circle btn-outline border-b-white-3 shadow-sm bg-white absolute -right-4 bottom-8 p-2 rounded-full"
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
  IconBrandAsana,
  IconSmartHome,
  IconTopologyRing3,
  IconChartBar,
  IconUsersGroup,
  IconSettings,
} from '@tabler/icons-vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const expandMenu = ref(false)
const currentPath = computed(() => route.path)

const menuItems = [
  {
    name: 'Inicio',
    path: '/main/home',
    icon: IconSmartHome,
  },
  {
    name: 'Proyectos',
    path: '/main/projects',
    icon: IconBrandAsana,
  },
  {
    name: 'Tareas',
    path: '/main/tasks',
    icon: IconTopologyRing3,
  },
  {
    name: 'Usuarios',
    path: '/main/users',
    icon: IconUsersGroup,
  },
  {
    name: 'Reportes',
    path: '/main/reports',
    icon: IconChartBar,
  },
  {
    name: 'Configuración',
    path: '/main/settings',
    icon: IconSettings,
  },
]

const isCurrentPath = (path: string) => path.includes(currentPath.value)
</script>

<style></style>
