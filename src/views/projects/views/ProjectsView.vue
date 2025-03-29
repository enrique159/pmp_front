<template>
  <div class="p-6 bg-white-1 container mx-auto">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-black-1">Proyectos</h1>
      <p class="text-black-2">Gestiona y monitorea todos los proyectos</p>
    </header>

    <div class="card bg-white shadow-sm mb-8">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <h2 class="card-title">Lista de Proyectos</h2>
          <button
            class="btn btn-primary rounded-full"
            @click="showCreateProjectModal = true"
          >
            <IconPlus />
            Nuevo Proyecto
          </button>
        </div>

        <div class="w-full flex justify-between items-center gap-4">
          <div class="flex items-center gap-2 input input-bordered w-full max-w-xs">
            <IconSearch :size="24" class="text-b-black-3" />
            <input
              type="text"
              placeholder="Buscar proyecto"
              class="w-full"
              v-model="search"
            />
          </div>
          <select
            class="select select-bordered w-full max-w-xs"
            :value="selectedClient"
            @change="handleClientChange"
          >
            <option selected value="">Mostrar todos los proyectos</option>
            <hr>
            <option
              v-for="client in clients"
              :key="client.id"
              :value="client.id"
            >
              {{ client.company_name }}
            </option>
          </select>
        </div>

        <div class="divider"></div>
        <!-- Placeholder for project list/grid -->
        <div
          v-if="!loadingProjects"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div
            class="card bg-base-100 shadow-md hover:shadow-lg  border-2 border-base-300 hover:scale-[1.01] transition-all"
            v-for="project in filteredProjects"
            :key="`project-${project.id}`"
          >
            <div class="card-body px-5 pt-5 pb-3">
              <h3 class="card-title text-black-1">{{ project.name }}</h3>
              <p class="text-b-black-3 text-xs font-bold uppercase">
                <span class="text-b-secondary">{{
                  clients.find((c) => c.id === project.client_id)?.company_name
                }}</span>
                {{ ` - ${project.type}` }}
              </p>
              <p class="text-black-2 description-text">
                {{ project.description }}
              </p>
              <div class="card-actions justify-end mt-4">
                <button
                  class="btn btn-neutral rounded-full shadow-none btn-sm px-1 pr-3"
                  @click="goToProject(project.id)"
                >
                  <IconNoDerivatives />
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else-if="!projects.length"
          class="p-4 flex flex-col justify-center items-center h-[160px]"
        >
          <p class="text-black-2 font-bold">No hay proyectos</p>
          <p class="text-sm text-black-3">
            Puedes comenzar creando un nuevo proyecto
          </p>
        </div>
        <div v-else class="w-full grid place-items-center h-[160px]">
          <span
            class="loading loading-spinner text-b-secondary loading-xl"
          ></span>
          <p class="text-b-black-2 font-bold text-center">
            Cargando proyectos...
          </p>
        </div>
      </div>
    </div>
  </div>

  <basic-modal
    v-model="showCreateProjectModal"
    title="Nuevo Proyecto"
    allow-close
    fit-to-content
  >
    <template #content>
      <create-project @project:created="() => {
        showCreateProjectModal = false
        fetchData()
      }" />
    </template>
  </basic-modal>
</template>

<script lang="ts" setup>
import BasicModal from '@/components/BasicModal.vue'
import CreateProject from '../components/CreateProject.vue'
import { useProjects } from '@/composables/useProjects'
import { useClients } from '@/composables/useClients'
import { IconPlus, IconNoDerivatives, IconSearch } from '@tabler/icons-vue'
import { computed, ref } from 'vue'
import { useToast } from '@/composables/useToast'
import { useRouter } from 'vue-router'

const { error } = useToast()

const router = useRouter()

const { getClients, clients } = useClients()
const { getProjects, projects } = useProjects()

const showCreateProjectModal = ref(false)

const loadingProjects = ref(false)

const fetchData = async () => {
  loadingProjects.value = true
  await getProjects({}).catch((err) => {
    console.log(err)
    error('Ocurrió un error al cargar los proyectos')
  })
  await getClients({}).catch((err) => {
    console.log(err)
    error('Ocurrió un error al cargar los clientes')
  })
  loadingProjects.value = false
}

fetchData()

// FILTERS
const search = ref('')
const selectedClient = ref('')

const filteredProjects = computed(() => {
  return projects.value.filter((project) => {
    return (
      project.name.toLowerCase().includes(search.value.toLowerCase()) &&
      (selectedClient.value === '' ||
        project.client_id === selectedClient.value)
    )
  })
})

const handleClientChange = (event: Event) => {
  const target = event.target as any
  selectedClient.value = target.value
}

const goToProject = (id: string | undefined) => {
  if (!id) return
  router.push({ name: 'ProjectDetails', params: { id } })
}
</script>
