<template>
  <div v-if="loadingProjects" class="w-full grid place-items-center h-[160px]">
    <span class="loading loading-spinner text-b-secondary loading-xl"></span>
    <p class="text-b-black-2 font-bold text-center">Cargando proyectos...</p>
  </div>
  <div v-else-if="!projects.length" class="p-4 flex flex-col justify-center items-center h-[160px]">
    <p class="text-b-black-2 font-bold">No hay proyectos asignados aún</p>
    <p class="text-sm text-b-black-3">Puedes comenzar creando un nuevo proyecto o asignando un proyecto existente</p>
  </div>
  <div v-else class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="card bg-white shadow-lg" v-for="project in projects" :key="`project-${project.id}`">
      <div class="card-body">
        <h3 class="card-title text-b-black-1">{{ project.name }}</h3>
        <p class="text-b-black-3 text-xs font-bold uppercase">{{ project.type }}</p>
        <p class="text-b-black-2 description-text">{{ project.description }}</p>
        <div class="card-actions justify-end mt-4">
          <button class="btn btn-ghost btn-sm" @click="goToProject(project.id)">Ver detalles</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Client } from '@/app/modules/clients/domain/client';
import { useProjects } from '@/composables/useProjects';
import { Project } from '@/app/modules/projects/domain/project';
import { useToast } from '@/composables/useToast';
import { useRouter } from 'vue-router';

const { error } = useToast()

const props = defineProps<{
  selectedClient: Client | null
}>()

const { getProjectsByClientId } = useProjects()
const projects = ref<Project[]>([])
const loadingProjects = ref(false)

onMounted(async () => {
  if (props.selectedClient) {
    fetchProjects()
  }
})

const fetchProjects = async () => {
  loadingProjects.value = true
  await getProjectsByClientId(props.selectedClient?.id ?? '')
    .then((response) => {
      projects.value = response
    })
    .catch((err) => {
      console.log(err)
      error('Ocurrió un error al cargar los proyectos')
    })
    .finally(() => {
      loadingProjects.value = false
    })
}

const router = useRouter()
const goToProject = (id: string | undefined) => {
  if (id) {
    router.push({ name: 'ProjectDetails', params: { id } })
  }
}

defineExpose({
  fetchProjects
})
</script>