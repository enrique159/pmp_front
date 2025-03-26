<template>
  <div class="p-6 w-full h-full bg-white-1 space-y-4">
    <form @submit.prevent="handleSubmit" class="pb-12">
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0 mb-8">
        <div class="col-span-1 md:col-span-2 lg:col-span-3">
          <span class="text-md text-b-black-3 font-bold flex items-center gap-2">
            <IconInfoCircle :size="18" />
            Información General
          </span>
          <div class="divider my-0"></div>
        </div>
        <fieldset class="fieldset">
          <legend class="fieldset-legend required">Código</legend>
          <input
            v-model="editUserForm.code"
            type="text"
            class="input w-full"
            placeholder="Ej. X001"
          />
          <div class="flex flex-col text-b-tertiary text-xs font-medium">
            <span v-for="(error, index) in v$.code.$errors" :key="`error-code-${index}`">{{ error.$message }}</span>
          </div>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend required">Nombre</legend>
          <input
            v-model="editUserForm.name"
            type="text"
            class="input w-full"
            placeholder="Ej. José Eduardo"
          />
          <div class="flex flex-col text-b-tertiary text-xs font-medium">
            <span v-for="(error, index) in v$.name.$errors" :key="`error-name-${index}`">{{ error.$message }}</span>
          </div>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend required">Email</legend>
          <input
            v-model="editUserForm.email"
            type="email"
            class="input w-full"
            placeholder="Ej. joseeduardo@gmail.com"
          />
          <div class="flex flex-col text-b-tertiary text-xs font-medium">
            <span v-for="(error, index) in v$.email.$errors" :key="`error-email-${index}`">{{ error.$message }}</span>
          </div>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend required">NSS</legend>
          <input
            v-model="editUserForm.nss"
            type="text"
            class="input w-full"
            placeholder="Ej. 123456789"
            @keydown="validateOnlyNumbers"
          />
          <div class="flex flex-col text-b-tertiary text-xs font-medium">
            <span v-for="(error, index) in v$.nss.$errors" :key="`error-nss-${index}`">{{ error.$message }}</span>
          </div>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Registro Patrónal</legend>
          <input
            v-model="editUserForm.employer_registration"
            type="text"
            class="input w-full"
            placeholder="Ej. 123456789"
            @keydown="validateNumbersAndLetters"
          />
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Fecha de Ingreso</legend>
          <input
            v-model="editUserForm.hire_date"
            type="date"
            class="input w-full"
            placeholder="Ej. 2023-01-01"
          />
        </fieldset>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0 mb-8">
        <div class="col-span-1 md:col-span-2 lg:col-span-3">
          <span class="text-md text-b-black-3 font-bold flex items-center gap-2">
            <IconBriefcase2 :size="18" />
            Información de puesto
          </span>
          <div class="divider my-0"></div>
        </div>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Departamento</legend>
          <select
            class="select select-bordered w-full"
            :value="editUserForm.department_id"
            @change="handleDepartmentChange"
          >
            <option v-for="(department, index) in departments" :key="`option-department-${index}`" :value="department.id">
              {{ department.name }}
            </option>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend required">Puesto</legend>
          <input
            v-model="editUserForm.position"
            type="text"
            class="input w-full"
            placeholder="Ej. Supervisor mecánico"
          />
          <div class="flex flex-col text-b-tertiary text-xs font-medium">
            <span v-for="(error, index) in v$.position.$errors" :key="`error-position-${index}`">{{ error.$message }}</span>
          </div>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Salario Diario</legend>
          <div class="relative">
            <input
              v-model="editUserForm.daily_salary"
              type="number"
              class="input w-full pl-7"
              placeholder="Ej. 1000"
              @keydown="validateOnlyNumbers"
            />
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-black-2">$</span>
          </div>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Centro de costos</legend>
          <input
            v-model="editUserForm.cost_center"
            type="number"
            class="input w-full"
            placeholder="Ej. 940"
            @keydown="validateOnlyNumbers"
          />
        </fieldset>
      </section>

      <div class="flex justify-end">
        <button type="submit" class="btn btn-primary rounded-full px-6" :disabled="loadingUpdateUser">
          <span v-if="loadingUpdateUser" class="loading loading-spinner"></span>
          <IconDeviceFloppy v-else />
          Guardar cambios
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators'
import { IconInfoCircle, IconBriefcase2, IconDeviceFloppy, } from '@tabler/icons-vue'
import { useVuelidate } from '@vuelidate/core'
import { reactive, ref, onMounted } from 'vue'
import { useToast } from '@/composables/useToast'
import { validateNumbersAndLetters, validateOnlyNumbers } from '@/utils/InputValidators'
import { useUsers } from '@/composables/useUsers'
import { User } from '@/app/modules/users/domain/user'
import { useDepartments } from '@/composables/useDepartments'

const props = defineProps({
  selectedUser: {
    type: Object as () => User | null,
    required: true
  }
})

const emit = defineEmits(['update:user'])

const { warning, success, error } = useToast()

const editUserForm = reactive({
  code: '',
  name: '',
  email: '',
  nss: '',
  employer_registration: '',
  hire_date: new Date().toISOString().split('T')[0],
  daily_salary: 0,
  department_id: '',
  position: '',
  cost_center: '',
})

const rules = {
  code: {
    required: helpers.withMessage('El código es obligatorio', required),
  },
  name: {
    required: helpers.withMessage('El nombre es obligatorio', required),
  },
  email: {
    required: helpers.withMessage('El email es obligatorio', required),
  },
  nss: {
    required: helpers.withMessage('El NSS es obligatorio', required),
  },
  department_id: {
    required: helpers.withMessage('El departamento es obligatorio', required),
  },
  position: {
    required: helpers.withMessage('El puesto es obligatorio', required),
  },
}

const v$ = useVuelidate(rules, editUserForm)

const { updateUser } = useUsers()
const { departments, getDepartments } = useDepartments()
const loadingUpdateUser = ref(false)
const loadingDepartments = ref(false)

const handleDepartmentChange = (event: Event) => {
  const target = event.target as any
  editUserForm.department_id = target.value
}

const fetchDepartments = async () => {
  loadingDepartments.value = true
  await getDepartments({})
    .catch(() => {
      error('Ocurrió un error al cargar los departamentos')
    })
    .finally(() => {
      loadingDepartments.value = false
    })
}

onMounted(() => {
  // Populate form with selectedUser data
  if (props.selectedUser) {
    editUserForm.code = props.selectedUser.code
    editUserForm.name = props.selectedUser.name
    editUserForm.email = props.selectedUser.email
    editUserForm.nss = props.selectedUser.nss
    editUserForm.hire_date = new Date(props.selectedUser.hire_date).toISOString().split('T')[0]
    editUserForm.daily_salary = props.selectedUser.daily_salary || 0
    editUserForm.department_id = props.selectedUser.department_id
    editUserForm.position = props.selectedUser.position
    editUserForm.cost_center = props.selectedUser.cost_center || ''
  }
  fetchDepartments()
})

const handleSubmit = async() => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) return warning('Por favor, corrige los errores en el formulario')
  
  const payload: Partial<User> = {
    ...props.selectedUser, // Keep original data
    ...editUserForm, // Override with edited data
    hire_date: new Date(editUserForm.hire_date),
    status: props.selectedUser?.status || 'A', // Ensure estatus is always defined
  }

  loadingUpdateUser.value = true
  await updateUser(props.selectedUser?.id ?? '', payload)
    .then(() => {
      success('Usuario actualizado exitosamente')
      emit('update:user', payload)
    })
    .catch((err) => {
      console.log(err)
      error('Ocurrió un error al actualizar el usuario')
    })
    .finally(() => {
      loadingUpdateUser.value = false
    })
}
</script>

<style lang="scss" scoped></style>