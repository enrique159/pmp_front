<template>
  <div class="md:min-w-[400px] px-4 pb-4">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- ADD A SELECTOR OF DEPARTMENTS -->
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Departamento</legend>
        <select
          v-model="createActivityForm.department_id"
          class="select select-bordered w-full"
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
          v-model="createActivityForm.code"
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
          v-model="createActivityForm.description"
          type="text"
          class="input w-full"
          placeholder="Ej. Recursos Humanos"
        />
        <div class="flex flex-col text-b-tertiary text-xs font-medium">
          <span v-for="(error, index) in v.description.$errors" :key="`error-description-${index}`">{{ error.$message }}</span>
        </div>
      </fieldset>
      <div class="card-actions justify-end">
        <button type="submit" class="btn btn-primary rounded-full" :disabled="loadingCreateActivity">
          <span v-if="loadingCreateActivity" class="loading loading-spinner loading-xs"></span>
          <IconBrandZapier v-else />
          Crear
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
import { IconBrandZapier } from '@tabler/icons-vue'

const { success, warning, error } = useToast()
const { createActivity, departments } = useDepartments()

const props = defineProps<{
  departmentId: string | undefined
}>()

const emits = defineEmits(['created'])

const createActivityForm = reactive({
  department_id: '',
  code: '',
  description: '',
})

onMounted(() => {
  createActivityForm.department_id = props.departmentId || ''
})

const rules = {
  code: {
    required: helpers.withMessage('El código es obligatorio', required),
  },
  description: {
    required: helpers.withMessage('La descripción es obligatoria', required),
  },
}

const v = useVuelidate(rules, createActivityForm)

const loadingCreateActivity = ref(false)
const handleSubmit = async () => {
  const isFormValid = await v.value.$validate()
  if (!isFormValid) return warning('Por favor, corrige los errores en el formulario')
  loadingCreateActivity.value = true
  await createActivity({ ...createActivityForm })
    .then(() => {
      success('Actividad creada exitosamente')
      emits('created')
    })
    .catch((err) => {
      console.log(err)
      error('Ocurrió un error al crear la actividad')
    })
    .finally(() => {
      loadingCreateActivity.value = false
    })
}

</script>

<style lang="scss" scoped>

</style>