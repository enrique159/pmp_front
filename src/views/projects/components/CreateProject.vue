<template>
  <div class="md:min-w-[400px] px-4 pb-4">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Cliente</legend>
        <select
          v-model="createProjectForm.client_id"
          class="select select-bordered w-full"
        >
          <option value="" disabled>-- Seleccione un cliente --</option>
          <option v-for="(client, index) in clients" :key="`option-client-${index}`" :value="client.id">
            {{ client.company_name }}
          </option>
        </select>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Nombre del proyecto</legend>
        <input
          v-model="createProjectForm.name"
          type="text"
          class="input w-full"
          placeholder="Ej. Proyecto 1"
        />
        <div class="flex flex-col text-b-tertiary text-xs font-medium">
          <span v-for="(error, index) in v.name.$errors" :key="`error-name-${index}`">{{ error.$message }}</span>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Descripción</legend>
        <input
          v-model="createProjectForm.description"
          type="text"
          class="input w-full"
          placeholder="Ej. Proyecto de manufactura"
        />
        <div class="flex flex-col text-b-tertiary text-xs font-medium">
          <span v-for="(error, index) in v.description.$errors" :key="`error-description-${index}`">{{ error.$message }}</span>
        </div>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Tipo</legend>
        <select
          v-model="createProjectForm.type"
          class="select select-bordered w-full"
        >
          <option value="" disabled>-- Seleccione un tipo --</option>
          <option v-for="(type, index) in ProjectType" :key="`option-type-${index}`" :value="type">
            {{ type }}
          </option>
        </select>
      </fieldset>

      <div class="card-actions justify-end">
        <button type="submit" class="btn btn-primary rounded-full" :disabled="loadingCreateProject">
          <span v-if="loadingCreateProject" class="loading loading-spinner loading-xs"></span>
          <IconBrandZapier v-else />
          Crear proyecto
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { onMounted, reactive, ref } from 'vue'
import { useToast } from '@/composables/useToast'
import { IconBrandZapier } from '@tabler/icons-vue'
import { useClients } from '@/composables/useClients'
import { type Project, ProjectType } from '@/app/modules/projects/domain/project.d'
import { useProjects } from '@/composables/useProjects'

const { warning, success, error } = useToast()
const { clients, getClients } = useClients()
const { createProject } = useProjects()

const fetchClients = async () => {
  await getClients({})
    .catch(error => {
      warning(error.message)
    })
}

const props = defineProps<{
  clientId?: string
}>()

const emits = defineEmits(['project:created'])

const createProjectForm = reactive<Project>({
  client_id: '',
  name: '',
  description: '',
  type: ProjectType.CHICAGO_BLOWER,
})

onMounted(() => {
  createProjectForm.client_id = props.clientId || ''
  fetchClients()
})

const rules = {
  name: {
    required: helpers.withMessage('El nombre es obligatorio', required),
  },
  description: {
    required: helpers.withMessage('La descripción es obligatoria', required),
  },
}

const v = useVuelidate(rules, createProjectForm)

const loadingCreateProject = ref(false)
const handleSubmit = async () => {
  const isFormValid = await v.value.$validate()
  if (!isFormValid) return warning('Por favor, corrige los errores en el formulario')
  loadingCreateProject.value = true
  await createProject(createProjectForm)
    .then(() => {
      success('Proyecto creado exitosamente')
      emits('project:created')
    })
    .catch(err => {
      console.log(err)
      error('Ocurrió un error al crear el proyecto')
    })
    .finally(() => {
      loadingCreateProject.value = false
    })
}
</script>