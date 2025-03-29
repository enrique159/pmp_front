<template>
  <div class="md:min-w-[400px] px-4 pb-4">
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      <!-- ADD A SELECTOR OF DEPARTMENTS -->
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Departamento</legend>
        <select
          v-model="departmentSelectedId"
          class="select select-bordered w-full"
        >
          <option value="" disabled>-- Seleccione un departamento --</option>
          <option v-for="(department, index) in departments" :key="`option-department-${index}`" :value="department.id">
            {{ department.name }}
          </option>
        </select>
      </fieldset>
      <!-- ADD A SELECTOR OF ACTIVITIES -->
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Actividad</legend>
        <select
          v-model="createTaskForm.activity_id"
          class="select select-bordered w-full"
        >
          <option value="" disabled>-- Seleccione una actividad --</option>
          <option v-for="(activity, index) in filteredActivities" :key="`option-activity-${index}`" :value="activity.id">
            {{ activity.code }} - {{ activity.description }}
          </option>
        </select>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Descripción</legend>
        <input
          v-model="createTaskForm.description"
          type="text"
          class="input w-full"
          placeholder="Ej. Proceso de acabado de 2000 metros cuadrados de lámina"
        />
        <div class="flex flex-col text-b-tertiary text-xs font-medium">
          <span v-for="(error, index) in v.description.$errors" :key="`error-description-${index}`">{{ error.$message }}</span>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Horas</legend>
        <input
          v-model="createTaskForm.hours"
          type="number"
          class="input w-full"
          step="0.5"
          placeholder="Ej. 10"
        />
        <div class="flex flex-col text-b-tertiary text-xs font-medium">
          <span v-for="(error, index) in v.hours.$errors" :key="`error-hours-${index}`">{{ error.$message }}</span>
        </div>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Horas extra</legend>
        <input
          v-model="createTaskForm.extra_hours"
          type="number"
          class="input w-full"
          step="0.5"
          placeholder="Ej. 10"
        />
        <div class="flex flex-col text-b-tertiary text-xs font-medium">
          <span v-for="(error, index) in v.extra_hours.$errors" :key="`error-extra_hours-${index}`">{{ error.$message }}</span>
        </div>
      </fieldset>
      <div class="card-actions col-span-1 md:col-span-2 lg:col-span-3 justify-end">
        <button type="submit" class="btn btn-primary rounded-full" :disabled="loadingCreateTask">
          <span v-if="loadingCreateTask" class="loading loading-spinner loading-xs"></span>
          <IconBrandZapier v-else />
          Registrar tarea
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { computed, onMounted, reactive, ref } from 'vue'
import { useToast } from '@/composables/useToast'
import { useDepartments } from '@/composables/useDepartments'
import { IconBrandZapier } from '@tabler/icons-vue'
import { useProjects } from '@/composables/useProjects'

const { success, warning, error } = useToast()
const { departments, activities } = useDepartments()
const { createTask } = useProjects()

const props = defineProps<{
  projectId: string | undefined
}>()

const emits = defineEmits(['created'])

const departmentSelectedId = ref('')
const createTaskForm = reactive({
  project_id: '',
  user_id: '1',
  activity_id: '',
  description: '',
  hours: 0,
  extra_hours: 0,
})

onMounted(() => {
  createTaskForm.project_id = props.projectId || ''
})

const filteredActivities = computed(() => {
  if (!departmentSelectedId.value) return activities.value
  return activities.value.filter(activity => activity.department_id === departmentSelectedId.value)
})

const rules = {
  description: {
    required: helpers.withMessage('La descripción es obligatoria', required),
  },
  hours: {
    required: helpers.withMessage('Las horas son obligatorias', required),
  },
  extra_hours: {
    required: helpers.withMessage('Las horas extra son obligatorias', required),
  },
  activity_id: {
    required: helpers.withMessage('La actividad es obligatoria', required),
  },
}

const v = useVuelidate(rules, createTaskForm)

const loadingCreateTask = ref(false)
const handleSubmit = async () => {
  const isFormValid = await v.value.$validate()
  if (!isFormValid) return warning('Por favor, corrige los errores en el formulario')
  loadingCreateTask.value = true
  await createTask(createTaskForm)
    .then(() => {
      success('Tarea creada exitosamente')
      emits('created')
    })
    .catch(err => {
      console.log(err)
      error('Ocurrió un error al crear la tarea')
    })
    .finally(() => {
      loadingCreateTask.value = false
    })
}
</script>