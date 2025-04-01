<template>
  <div class="p-6 w-full h-full bg-white-1 overflow-y-auto space-y-4">
    <header>
      <h1 class="text-3xl font-bold text-black-1">Crear Usuario</h1>
      <p class="text-black-2">Crea un nuevo usuario con sus roles y permisos</p>
    </header>

    <router-link
      to="/main/users"
      class="flex items-center gap-2 text-b-black-2 text-sm hover:underline hover:text-black"
    >
      <IconArrowLeft :size="18" /> volver
    </router-link>

    <div class="card bg-white shadow-sm">
      <div class="card-body">
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
              <legend class="fieldset-legend required">Código</legend>
              <input
                v-model="createUserForm.code"
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
                v-model="createUserForm.name"
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
                v-model="createUserForm.email"
                type="email"
                class="input w-full"
                placeholder="Ej. joseeduardo@gmail.com"
              />
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.email.$errors" :key="`error-email-${index}`">{{ error.$message }}</span>
              </div>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend required">Contraseña</legend>
              <div class="relative">
                <input
                  v-model="createUserForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="input w-full"
                  placeholder="Ej. 12345678"
                />
                <button type="button" tabindex="-1" class="absolute right-2 top-1/2 -translate-y-1/2" @click="showPassword = !showPassword">
                  <IconEye v-if="showPassword" />
                  <IconEyeOff v-else />
                </button>
              </div>
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.password.$errors" :key="`error-password-${index}`">{{ error.$message }}</span>
              </div>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend required">NSS</legend>
              <input
                v-model="createUserForm.nss"
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
                v-model="createUserForm.employer_registration"
                type="text"
                class="input w-full"
                placeholder="Ej. 123456789"
                @keydown="validateNumbersAndLetters"
              />
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Fecha de Ingreso</legend>
              <input
                v-model="createUserForm.hire_date"
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
                :value="createUserForm.department_id"
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
                v-model="createUserForm.position"
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
                  v-model="createUserForm.daily_salary"
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
                v-model="createUserForm.cost_center"
                type="number"
                class="input w-full"
                placeholder="Ej. 940"
                @keydown="validateOnlyNumbers"
              />
            </fieldset>
          </section>

          <div class="flex justify-end">
            <button type="submit" class="btn btn-primary rounded-full px-6" :disabled="loadingCreateUser">
              <span v-if="loadingCreateUser" class="loading loading-spinner"></span>
              <IconBrandZapier v-else />
              Crear usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators'
import { IconArrowLeft, IconBrandZapier, IconInfoCircle, IconBriefcase2, IconEye, IconEyeOff } from '@tabler/icons-vue'
import { useVuelidate } from '@vuelidate/core'
import { onMounted, reactive, ref } from 'vue'
import { useToast } from '@/composables/useToast'
import { validateNumbersAndLetters, validateOnlyNumbers } from '@/utils/InputValidators'
import { useUsers } from '@/composables/useUsers'
import { User } from '@/app/modules/users/domain/user'
import { useDepartments } from '@/composables/useDepartments'
import { useRouter } from 'vue-router'

const { warning, success, error } = useToast()
const showPassword = ref(false)
const createUserForm = reactive({
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
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(value)
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
  department_id: {
    required: helpers.withMessage('El departamento es obligatorio', required),
  },
  position: {
    required: helpers.withMessage('El puesto es obligatorio', required),
  },
}

const v$ = useVuelidate(rules, createUserForm)

const { createUser } = useUsers()
const { departments, getDepartments } = useDepartments()

const loadingFetchDepartments = ref(false)
const fetchDepartments = async () => {
  loadingFetchDepartments.value = true
  await getDepartments({})
    .then(() => {
      createUserForm.department_id = departments.value[0].id || ''
    })
    .catch((err) => {
      console.log(err)
      error('Ocurrió un error al cargar los departamentos')
    })
    .finally(() => {
      loadingFetchDepartments.value = false
    })
}

const handleDepartmentChange = (event: Event) => {
  const target = event.target as any
  createUserForm.department_id = target.value
}

onMounted(() => {
  fetchDepartments()
})

const router = useRouter()
const loadingCreateUser = ref(false)
const handleSubmit = async() => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) return warning('Por favor, corrige los errores en el formulario')
  const payload: User = {
    ...createUserForm,
    hire_date: new Date(createUserForm.hire_date),
    status: 'A',
  }

  loadingCreateUser.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  await createUser(payload)
    .then(() => {
      success('Usuario creado exitosamente')
      router.push({ name: 'Users' })
    })
    .catch((err) => {
      console.log(err)
      error('Ocurrió un error al crear el usuario')
    })
    .finally(() => {
      loadingCreateUser.value = false
    })
}
</script>

<style lang="scss" scoped></style>
