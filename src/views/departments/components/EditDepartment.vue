<template>
  <div class="md:min-w-[400px] px-4 pb-4">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Nombre</legend>
        <input
          v-model="editDepartmentForm.name"
          type="text"
          class="input w-full"
          placeholder="Ej. Recursos Humanos"
        />
        <div class="flex flex-col text-b-tertiary text-xs font-medium">
          <span v-for="(error, index) in v.name.$errors" :key="`error-name-${index}`">{{ error.$message }}</span>
        </div>
      </fieldset>
      <div class="card-actions justify-end">
        <button type="submit" class="btn btn-primary rounded-full" :disabled="loadingUpdateDepartment">
          <span v-if="loadingUpdateDepartment" class="loading loading-spinner loading-xs"></span>
          <IconDeviceFloppy v-else />
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength } from '@vuelidate/validators'
import { reactive, ref, onMounted } from 'vue'
import { useToast } from '@/composables/useToast'
import { useDepartments } from '@/composables/useDepartments'
import { IconDeviceFloppy } from '@tabler/icons-vue'
import { Department } from '@/app/modules/departments/domain/department'

const { success, warning, error } = useToast()
const { updateDepartment } = useDepartments()

const emits = defineEmits(['updated'])

const props = defineProps<{
  selectedDepartment: Department | undefined | null
}>()

const editDepartmentForm = reactive({
  name: '',
})

const rules = {
  name: {
    required: helpers.withMessage('El nombre es obligatorio', required),
    minLength: helpers.withMessage('El nombre debe tener al menos 3 caracteres', minLength(3)),
  },
}

onMounted(() => {
  if (props.selectedDepartment) {
    editDepartmentForm.name = props.selectedDepartment.name
  }
})

const v = useVuelidate(rules, editDepartmentForm)

const loadingUpdateDepartment = ref(false)
const handleSubmit = async () => {
  const isFormValid = await v.value.$validate()
  if (!isFormValid) return warning('Por favor, corrige los errores en el formulario')
  loadingUpdateDepartment.value = true
  await updateDepartment(props.selectedDepartment?.id ?? '', editDepartmentForm)
    .then(() => {
      success('Departamento actualizado exitosamente')
      emits('updated')
    })
    .catch((err) => {
      console.log(err)
      error('Ocurrió un error al actualizar el departamento')
    })
    .finally(() => {
      loadingUpdateDepartment.value = false
    })
}

</script>

<style lang="scss" scoped>

</style>