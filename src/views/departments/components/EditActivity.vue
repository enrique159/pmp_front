<template>
  <div class="md:min-w-[400px] px-4 pb-4">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- ADD A SELECTOR OF DEPARTMENTS -->
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Departamento</legend>
        <select
           class="select select-bordered w-full"
          :value="updateActivityForm.department_id"
          @change="handleDepartmentChange"
        >
          <option value="" disabled>-- Seleccione un departamento --</option>
          <option v-for="(department, index) in departments" :key="`option-department-${index}`" :value="department.id">
            {{ department.name }}
          </option>
        </select>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Código</legend>
        <input
          v-model="updateActivityForm.code"
          type="text"
          class="input w-full"
          placeholder="Ej. R001"
        />
        <div class="flex flex-col text-b-tertiary text-xs font-medium">
          <span v-for="(error, index) in v.code.$errors" :key="`error-code-${index}`">{{ error.$message }}</span>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Descripción</legend>
        <input
          v-model="updateActivityForm.description"
          type="text"
          class="input w-full"
          placeholder="Ej. Recursos Humanos"
        />
        <div class="flex flex-col text-b-tertiary text-xs font-medium">
          <span v-for="(error, index) in v.description.$errors" :key="`error-description-${index}`">{{ error.$message }}</span>
        </div>
      </fieldset>
      <div class="card-actions justify-end">
        <button type="submit" class="btn btn-primary rounded-full" :disabled="loadingUpdateActivity">
          <span v-if="loadingUpdateActivity" class="loading loading-spinner loading-xs"></span>
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
import { useDepartments } from '@/composables/useDepartments'
import { IconDeviceFloppy } from '@tabler/icons-vue'
import { Activity } from '@/app/modules/activities/domain/activity'

const { success, warning, error } = useToast()
const { updateActivity, departments } = useDepartments()

const emits = defineEmits(['updated'])

const props = defineProps<{
  selectedActivity: Activity | undefined | null
}>()

const updateActivityForm = reactive({
  department_id: '',
  code: '',
  description: '',
})

const rules = {
  code: {
    required: helpers.withMessage('El código es obligatorio', required),
  },
  description: {
    required: helpers.withMessage('La descripción es obligatoria', required),
  },
}

onMounted(() => {
  if (props.selectedActivity) {
    updateActivityForm.department_id = props.selectedActivity.department_id
    updateActivityForm.code = props.selectedActivity.code
    updateActivityForm.description = props.selectedActivity.description
  }
})

const v = useVuelidate(rules, updateActivityForm)

const handleDepartmentChange = (event: Event) => {
  const target = event.target as any
  updateActivityForm.department_id = target.value
}

const loadingUpdateActivity = ref(false)
const handleSubmit = async () => {
  const isFormValid = await v.value.$validate()
  if (!isFormValid) return warning('Por favor, corrige los errores en el formulario')
  loadingUpdateActivity.value = true
  await updateActivity(props.selectedActivity?.id ?? '', { ...updateActivityForm })
    .then(() => {
      success('Actividad actualizada exitosamente')
      emits('updated')
    })
    .catch((err) => {
      console.log(err)
      error('Ocurrió un error al actualizar la actividad')
    })
    .finally(() => {
      loadingUpdateActivity.value = false
    })
}

</script>

<style lang="scss" scoped>

</style>