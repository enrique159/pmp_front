<template>
  <div class="p-6 container mx-auto bg-white-1 overflow-y-auto">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-black-1">Dashboard</h1>
      <p class="text-black-2">Bienvenido al panel de control</p>
    </header>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="card bg-white shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-black-2">Mis proyectos</p>
              <h3 class="text-2xl font-bold text-black-1">{{ currentProjects.length }}</h3>
            </div>
            <div class="text-b-primary">
              <IconStackMiddle class="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-white shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-black-2">Actividades activas</p>
              <h3 class="text-2xl font-bold text-black-1">{{ currentTasks.length }}</h3>
            </div>
            <div class="text-b-tertiary">
              <IconTopologyRing3 class="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="card bg-white shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-black-2">Equipos en Servicio</p>
              <h3 class="text-2xl font-bold text-black-1">38</h3>
            </div>
            <div class="text-b-secondary">
              <IconUsersGroup class="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-white shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-black-2">Servicios Completados</p>
              <h3 class="text-2xl font-bold text-black-1">156</h3>
            </div>
            <div class="text-b-accent">
              <IconClockHour4 class="w-8 h-8" />
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Activity -->
      <div class="lg:col-span-2 card bg-white shadow-sm">
        <div class="card-body">
          <h2 class="card-title mb-4">Actividad Reciente</h2>
          <div class="space-y-4">
            <div class="flex items-start gap-3" v-for="activity in currentTasks" :key="activity.id">
              <div class="badge badge-primary badge-sm"></div>
              <div class="border-l-2 border-b-white-3 pl-3">
                <p class="text-b-black-2 font-bold">{{ activity.activity?.code }} - {{ activity.activity?.description }}</p>
                <p class="text-black-2 text-xs">{{ formatDateLong(activity.date) }}</p>
                <p class="text-black-1 font-medium">{{ activity.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-white shadow-sm">
        <div class="card-body">
          <h2 class="card-title mb-4">Proyectos</h2>
          <div class="space-y-4">
            <div class="flex items-start justify-between gap-3" v-for="project in currentProjects" :key="`project-${project.id}`">
              <div class="border-l-2 border-b-white-3 pl-3">
                <p class="text-b-black-2 font-bold">{{ project.name }}</p>
                <p class="text-black-1 font-medium">{{ project.description }}</p>
              </div>
              <button class="btn btn-ghost btn-sm" @click="goToProject(project.id)">
                ver detalles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconStackMiddle, IconTopologyRing3 } from '@tabler/icons-vue'
import { useProjects } from '@/composables/useProjects';
import { useUsers } from '@/composables/useUsers';
import { computed, onMounted, ref } from 'vue';
import { User } from '@/app/modules/users/domain/user';
import { useDepartments } from '@/composables/useDepartments';
import { useDate } from '@/composables/useDate';
import { useRouter } from 'vue-router';

const { formatDateLong } = useDate();

const { projects, getProjects, getTasks, tasks } = useProjects();
const { users, fetchUsers } = useUsers();
const { activities, getActivities } = useDepartments();

const currentUser = ref<User | null>(null);

const loadingData = ref(false);
const fetchData = async () => {
  loadingData.value = true;
  await Promise.all([
    getProjects({}),
    fetchUsers({}),
    getTasks({}),
    getActivities({})
  ]);
  currentUser.value = users.value.length > 0 ? users.value[0] : null;
  loadingData.value = false;
}

const currentTasks = computed(() => tasks.value.filter(t => t.user_id == currentUser.value?.id).map(t => ({
  ...t,
  activity: activities.value.find(a => a.id === t.activity_id) || null,
})))
const currentProjects = computed(() => projects.value.filter(p => currentTasks.value.some(t => t.project_id === p.id)));

onMounted(() => {
  fetchData();
})

const router = useRouter()
const goToProject = (id: string | undefined) => {
  if (id) {
    router.push({ name: 'ProjectDetails', params: { id } })
  }
}
</script>
