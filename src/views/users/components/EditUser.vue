<template>
  <div class="p-6 w-full h-full bg-white-1 overflow-y-auto space-y-4">
    <form @submit.prevent="handleSubmit">
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0 mb-8">
        <div class="col-span-1 md:col-span-2 lg:col-span-3">
          <span class="text-md text-b-black-3 font-bold flex items-center gap-2">
            <IconInfoCircle :size="18" />
            Información General
          </span>
          <div class="divider my-0"></div>
        </div>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Código</legend>
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
          <legend class="fieldset-legend">Nombre</legend>
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
          <legend class="fieldset-legend">Email</legend>
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
          <legend class="fieldset-legend">Contraseña</legend>
          <div class="relative">
            <input
              v-model="editUserForm.password"
              :type="showPassword ? 'text' : 'password'"
              class="input w-full"
              placeholder="Ej. 12345678"
            />
            <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2" @click="showPassword = !showPassword">
              <IconEye v-if="showPassword" />
              <IconEyeOff v-else />
            </button>
          </div>
          <div class="flex flex-col text-b-tertiary text-xs font-medium">
            <span v-for="(error, index) in v$.password.$errors" :key="`error-password-${index}`">{{ error.$message }}</span>
          </div>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">NSS</legend>
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
          <div class="flex flex-col text-b-tertiary text-xs font-medium">
            <span v-for="(error, index) in v$.employer_registration.$errors" :key="`error-employer_registration-${index}`">{{ error.$message }}</span>
          </div>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Fecha de Ingreso</legend>
          <input
            v-model="editUserForm.hire_date"
            type="date"
            class="input w-full"
            placeholder="Ej. 2023-01-01"
          />
          <div class="flex flex-col text-b-tertiary text-xs font-medium">
            <span v-for="(error, index) in v$.hire_date.$errors" :key="`error-hire_date-${index}`">{{ error.$message }}</span>
          </div>
        </fieldset>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0 mb-8">
        <div class="col-span-1 md:col-span-2 lg:col-span-3">
          <span class="text-md text-b-black-3 font-bold flex items-center gap-2">
            <IconBusinessplan :size="18" />
            Información de Pago
          </span>
          <div class="divider my-0"></div>
        </div>

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
          <div class="flex flex-col text-b-tertiary text-xs font-medium">
            <span v-for="(error, index) in v$.daily_salary.$errors" :key="`error-daily_salary-${index}`">{{ error.$message }}</span>
          </div>
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
          <input
            v-model="editUserForm.department_id"
            type="text"
            class="input w-full"
            placeholder="Ej. Servicios Generales"
          />
          <div class="flex flex-col text-b-tertiary text-xs font-medium">
            <span v-for="(error, index) in v$.department_id.$errors" :key="`error-department_id-${index}`">{{ error.$message }}</span>
          </div>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Puesto</legend>
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
          <legend class="fieldset-legend">Centro de costos</legend>
          <input
            v-model="editUserForm.cost_center"
            type="number"
            class="input w-full"
            placeholder="Ej. 940"
            @keydown="validateOnlyNumbers"
          />
          <div class="flex flex-col text-b-tertiary text-xs font-medium">
            <span v-for="(error, index) in v$.cost_center.$errors" :key="`error-cost_center-${index}`">{{ error.$message }}</span>
          </div>
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
import { IconInfoCircle, IconBusinessplan, IconBriefcase2, IconDeviceFloppy, IconEye, IconEyeOff } from '@tabler/icons-vue'
import { useVuelidate } from '@vuelidate/core'
import { reactive, ref, onMounted } from 'vue'
import { useToast } from '@/composables/useToast'
import { validateNumbersAndLetters, validateOnlyNumbers } from '@/utils/InputValidators'
import { useUsers } from '@/composables/useUsers'
import { User } from '@/app/modules/users/domain/user'

const props = defineProps({
  selectedUser: {
    type: Object as () => User | null,
    required: true
  }
})

const emit = defineEmits(['update:user'])

const { warning, success, error } = useToast()

const showPassword = ref(false)

const editUserForm = reactive({
  code: '',
  name: '',
  email: '',
  password: '',
  nss: '',
  employer_registration: '',
  hire_date: new Date().toISOString().split('T')[0],
  daily_salary: 0,
  department_id: '',
  position: '',
  cost_center: '',
})

const strongPassword = (value: string) => {
  if (!value) return true
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
}

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
  password: {
    required: helpers.withMessage('La contraseña es obligatoria', required),
    strongPassword: helpers.withMessage('La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial', strongPassword),
  },
  nss: {
    required: helpers.withMessage('El NSS es obligatorio', required),
  },
  employer_registration: {
    required: helpers.withMessage('El registro patrónal es obligatorio', required),
  },
  hire_date: {
    required: helpers.withMessage('La fecha de ingreso es obligatoria', required),
  },
  daily_salary: {
    required: helpers.withMessage('El salario diario es obligatorio', required),
  },
  department_id: {
    required: helpers.withMessage('El departamento es obligatorio', required),
  },
  position: {
    required: helpers.withMessage('El puesto es obligatorio', required),
  },
  cost_center: {
    required: helpers.withMessage('El centro de costos es obligatorio', required),
  },
}

const v$ = useVuelidate(rules, editUserForm)

const { updateUser } = useUsers()
const loadingUpdateUser = ref(false)

onMounted(() => {
  // Populate form with selectedUser data
  if (props.selectedUser) {
    editUserForm.code = props.selectedUser.code
    editUserForm.name = props.selectedUser.name
    editUserForm.email = props.selectedUser.email
    editUserForm.password = props.selectedUser.password
    editUserForm.nss = props.selectedUser.nss
    editUserForm.hire_date = new Date(props.selectedUser.hire_date).toISOString().split('T')[0]
    editUserForm.daily_salary = props.selectedUser.daily_salary || 0
    editUserForm.department_id = props.selectedUser.department_id
    editUserForm.position = props.selectedUser.position
    editUserForm.cost_center = props.selectedUser.cost_center || ''
  }
})

const handleSubmit = async() => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) return warning('Por favor, corrige los errores en el formulario')
  
  const payload: User = {
    ...props.selectedUser, // Keep original data
    ...editUserForm, // Override with edited data
    hire_date: new Date(editUserForm.hire_date),
    status: props.selectedUser?.status || 'A', // Ensure estatus is always defined
  }

  loadingUpdateUser.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  await updateUser(payload)
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