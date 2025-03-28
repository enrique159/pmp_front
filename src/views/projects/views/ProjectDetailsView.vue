<template>
  <div class="p-6 w-full h-full bg-white-1 container mx-auto">
    <header class="mb-4">
      <h1 class="text-3xl font-bold text-black-1">
        Proyecto {{ currentProject?.name }}
      </h1>
      <p class="text-black-2">
        Gestiona las actividades registradas en el proyecto
      </p>
    </header>


    <router-link
      to="/main/projects"
      class="flex items-center gap-2 text-b-black-2 text-sm hover:underline hover:text-black mb-4"
    >
      <IconArrowLeft :size="18" /> volver
    </router-link>

    <div class="card bg-white shadow-sm mb-8">
      <div class="card-body">
        <div class="flex justify-between items-center gap-2">
          <h2 class="card-title text-black-1">
            <IconExclamationCircle :size="24" class="text-b-black-3" />
            Información del Proyecto
          </h2>
          <div class="tooltip tooltip-left" data-tip="Editar Proyecto">
            <button
              class="btn btn-ghost btn-circle rounded-full"
              @click="showEditProjectModal = true"
            >
              <IconEditCircle :size="24" class="text-b-secondary" />
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div class="space-y-2">
            <p class="text-b-black-2 font-bold">
              Nombre:
              <span class="text-b-black-1 font-normal">{{
                currentProject?.name
              }}</span>
            </p>
            <p class="text-b-black-2 font-bold">
              Tipo:
              <span class="text-b-black-1 font-normal">{{
                currentProject?.type
              }}</span>
            </p>
            <p class="text-b-black-2 font-bold">
              Cliente:
              <span class="text-b-black-1 font-normal">{{
                currentClient?.company_name
              }}</span>
            </p>
          </div>

          <div class="space-y-2">
            <p class="text-b-black-2 font-bold">
              Descripción:
              <span class="text-b-black-1 font-normal">{{
                currentProject?.description
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ACTIVITES -->
    <div class="card bg-white shadow-sm">
      <div class="card-body">
        <div class="flex justify-between items-center flex-wrap mb-4">
          <h2 class="card-title">Actividades</h2>
          <button
            class="btn bg-b-primary text-white rounded-full"
          >
            <IconPlus />
            Registrar actividad
          </button>
        </div>
        <!-- User list with roles and status -->
        <!-- <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th class="w-12"></th>
                <th class="w-28">Código</th>
                <th>Descripción</th>
                <th>Departamento</th>
                <th class="w-10">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="hover"
                v-for="(activity, index) in filterActivitiesByDepartment"
                :key="`row-activity-${activity.id}`"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="badge badge-neutral badge-ghost rounded-full">
                    <span class="text-xs font-medium">{{ activity.code }}</span>
                  </div>
                </td>
                <td>{{ activity.description }}</td>
                <td>{{ activity.department }}</td>
                <td class="flex justify-center gap-2 items-center">
                  <div class="tooltip tooltip-left" data-tip="Editar">
                    <button
                      class="btn btn-ghost btn-circle btn-sm"
                      @click="handleEditActivity(activity)"
                    >
                      <IconEdit />
                    </button>
                  </div>
                  <div class="tooltip tooltip-left" data-tip="Eliminar">
                    <button
                      class="btn btn-ghost btn-circle btn-sm text-red-400"
                      :disabled="loadingDeleteActivity"
                      @click="handleDeleteActivity(activity)"
                    >
                      <IconTrash />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClients } from '@/composables/useClients'
import { useProjects } from '@/composables/useProjects'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { IconExclamationCircle, IconEditCircle, IconArrowLeft } from '@tabler/icons-vue'

const route = useRoute()
const { projects, getProjects } = useProjects()
const { clients, getClients } = useClients()

const projectId = route.params.id

const currentProject = computed(() =>
  projects.value.find((p) => p.id === projectId)
)
const currentClient = computed(() =>
  clients.value.find((c) => c.id === currentProject.value?.client_id)
)

const fetchData = async () => {
  if (!projects.value.length || !clients.value.length) {
    await getProjects({})
    await getClients({})
  }
}

fetchData()

// EDIT PROJECT
const showEditProjectModal = ref(false)
</script>
