<template>
  <div class="md:min-w-[400px] px-4 pb-4">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- ADD A SELECTOR OF CLIENTS -->
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Cliente</legend>
        <select
           class="select select-bordered w-full"
          :value="updateProjectForm.client_id"
          @change="handleClientChange"
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
          v-model="updateProjectForm.name"
          type="text"
          class="input w-full"
          placeholder="Ej. R001"
        />
        <div class="flex flex-col text-b-tertiary text-xs font-medium">
          <span v-for="(error, index) in v.name.$errors" :key="`error-name-${index}`">{{ error.$message }}</span>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Descripción</legend>
        <input
          v-model="updateProjectForm.description"
          type="text"
          class="input w-full"
          placeholder="Ej. Recursos Humanos"
        />
        <div class="flex flex-col text-b-tertiary text-xs font-medium">
          <span v-for="(error, index) in v.description.$errors" :key="`error-description-${index}`">{{ error.$message }}</span>
        </div>
      </fieldset>
      <div class="card-actions justify-end">
        <button type="submit" class="btn btn-primary rounded-full" :disabled="loadingUpdateProject">
          <span v-if="loadingUpdateProject" class="loading loading-spinner loading-xs"></span>
          <IconDeviceFloppy v-else />
          Guardar
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
import { IconDeviceFloppy } from '@tabler/icons-vue'
import { Project, ProjectType } from '@/app/modules/projects/domain/project'
import { useClients } from '@/composables/useClients'

const { warning } = useToast()
const { clients } = useClients()

const emits = defineEmits(['updated'])

const props = defineProps<{
  selectedProject: Project | undefined | null
}>()

const updateProjectForm = reactive<Project>({
  client_id: '',
  name: '',
  description: '',
  type: ProjectType.CHICAGO_BLOWER,
})

const rules = {
  name: {
    required: helpers.withMessage('El nombre es obligatorio', required),
  },
  description: {
    required: helpers.withMessage('La descripción es obligatoria', required),
  },
}

onMounted(() => {
  if (props.selectedProject) {
    updateProjectForm.client_id = props.selectedProject.client_id
    updateProjectForm.name = props.selectedProject.name
    updateProjectForm.description = props.selectedProject.description
    updateProjectForm.type = props.selectedProject.type
  }
})

const v = useVuelidate(rules, updateProjectForm)

const handleClientChange = (event: Event) => {
  const target = event.target as any
  updateProjectForm.client_id = target.value
}

const loadingUpdateProject = ref(false)
const handleSubmit = async () => {
  const isFormValid = await v.value.$validate()
  if (!isFormValid) return warning('Por favor, corrige los errores en el formulario')
}

</script>

<style lang="scss" scoped>

</style>