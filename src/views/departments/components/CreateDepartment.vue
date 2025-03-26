<template>
  <div class="md:min-w-[400px] px-4 pb-4">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Nombre</legend>
        <input
          v-model="createDepartmentForm.name"
          type="text"
          class="input w-full"
          placeholder="Ej. Recursos Humanos"
        />
        <div class="flex flex-col text-b-tertiary text-xs font-medium">
          <span v-for="(error, index) in v.name.$errors" :key="`error-name-${index}`">{{ error.$message }}</span>
        </div>
      </fieldset>
      <div class="card-actions justify-end">
        <button type="submit" class="btn btn-primary rounded-full" :disabled="loadingCreateDepartment">
          <span v-if="loadingCreateDepartment" class="loading loading-spinner loading-xs"></span>
          <IconBrandZapier v-else />
          Crear
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength } from '@vuelidate/validators'
import { reactive, ref } from 'vue'
import { useToast } from '@/composables/useToast'
import { useDepartments } from '@/composables/useDepartments'
import { IconBrandZapier } from '@tabler/icons-vue'

const { success, warning, error } = useToast()
const { createDepartment } = useDepartments()

const emits = defineEmits(['created'])

const createDepartmentForm = reactive({
  name: '',
})

const rules = {
  name: {
    required: helpers.withMessage('El nombre es obligatorio', required),
    minLength: helpers.withMessage('El nombre debe tener al menos 3 caracteres', minLength(3)),
  },
}

const v = useVuelidate(rules, createDepartmentForm)

const loadingCreateDepartment = ref(false)
const handleSubmit = async () => {
  const isFormValid = await v.value.$validate()
  if (!isFormValid) return warning('Por favor, corrige los errores en el formulario')
  loadingCreateDepartment.value = true
  await createDepartment(createDepartmentForm)
    .then(() => {
      success('Departamento creado exitosamente')
      emits('created')
    })
    .catch((err) => {
      console.log(err)
      error('Ocurrió un error al crear el departamento')
    })
    .finally(() => {
      loadingCreateDepartment.value = false
    })
}

</script>

<style lang="scss" scoped>

</style>