<template>
  <div class="md:min-w-[400px] px-4 pb-4">
    <form @submit.prevent="handleSubmit" class="space-y-4">
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
          <IconBrandZapier v-else class="mr-2" />
          Crear actividad
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { reactive, ref } from 'vue'
import { useToast } from '@/composables/useToast'
import { useDepartments } from '@/composables/useDepartments'
import { IconBrandZapier } from '@tabler/icons-vue'

const { success, warning, error } = useToast()
const { createActivity } = useDepartments()

const props = defineProps<{
  departmentId: string | undefined
}>()

const createActivityForm = reactive({
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

const v = useVuelidate(rules, createActivityForm)

const loadingCreateActivity = ref(false)
const handleSubmit = async () => {
  const isFormValid = await v.value.$validate()
  if (!isFormValid) return warning('Por favor, corrige los errores en el formulario')
  loadingCreateActivity.value = true
  await createActivity({ ...createActivityForm, department_id: props.departmentId ?? '' })
    .then(() => {
      success('Actividad creada exitosamente')
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