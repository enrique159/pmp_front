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
              <legend class="fieldset-legend">Nombre</legend>
              <input
                v-model="createUserForm.nombre"
                type="text"
                class="input w-full"
                placeholder="Ej. José Eduardo"
              />
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.nombre.$errors" :key="`error-nombre-${index}`">{{ error.$message }}</span>
              </div>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">NSS</legend>
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
                v-model="createUserForm.registro_patronal"
                type="text"
                class="input w-full"
                placeholder="Ej. 123456789"
                @keydown="validateNumbersAndLetters"
              />
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.registro_patronal.$errors" :key="`error-registro_patronal-${index}`">{{ error.$message }}</span>
              </div>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Fecha de Ingreso</legend>
              <input
                v-model="createUserForm.fecha_ingreso"
                type="date"
                class="input w-full"
                placeholder="Ej. 2023-01-01"
              />
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.fecha_ingreso.$errors" :key="`error-fecha_ingreso-${index}`">{{ error.$message }}</span>
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
                  v-model="createUserForm.salario_diario"
                  type="number"
                  class="input w-full pl-7"
                  placeholder="Ej. 1000"
                  @keydown="validateOnlyNumbers"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-black-2">$</span>
              </div>
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.salario_diario.$errors" :key="`error-salario_diario-${index}`">{{ error.$message }}</span>
              </div>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend">Salario Diario Integrado</legend>
              <div class="relative">
                <input
                  v-model="createUserForm.salario_diario_integrado"
                  type="number"
                  class="input w-full pl-7"
                  placeholder="Ej. 1000"
                  @keydown="validateOnlyNumbers"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-black-2">$</span>
              </div>
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.salario_diario_integrado.$errors" :key="`error-salario_diario_integrado-${index}`">{{ error.$message }}</span>
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
                v-model="createUserForm.departamento"
                type="text"
                class="input w-full"
                placeholder="Ej. Servicios Generales"
              />
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.departamento.$errors" :key="`error-departamento-${index}`">{{ error.$message }}</span>
              </div>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">Puesto</legend>
              <input
                v-model="createUserForm.puesto"
                type="text"
                class="input w-full"
                placeholder="Ej. Supervisor mecánico"
              />
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.puesto.$errors" :key="`error-puesto-${index}`">{{ error.$message }}</span>
              </div>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend">Centro de costos</legend>
              <input
                v-model="createUserForm.centro_costos"
                type="number"
                class="input w-full"
                placeholder="Ej. 940"
                @keydown="validateOnlyNumbers"
              />
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.centro_costos.$errors" :key="`error-centro_costos-${index}`">{{ error.$message }}</span>
              </div>
            </fieldset>
          </section>

          <div class="flex justify-end">
            <button type="submit" class="btn btn-primary rounded-full px-6">
              <IconBrandZapier />
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
import { IconArrowLeft, IconBrandZapier, IconInfoCircle, IconBusinessplan, IconBriefcase2 } from '@tabler/icons-vue'
import { useVuelidate } from '@vuelidate/core'
import { reactive } from 'vue'
import { useToast } from '@/composables/useToast'
import { validateNumbersAndLetters, validateOnlyNumbers } from '@/utils/InputValidators'

const { warning } = useToast()

const createUserForm = reactive({
  nombre: '',
  nss: '',
  registro_patronal: '',
  fecha_ingreso: '',
  salario_diario: 0,
  salario_diario_integrado: 0,
  departamento: '',
  puesto: '',
  centro_costos: '',
  estatus: '',
})

const rules = {
  nombre: {
    required: helpers.withMessage('El nombre es obligatorio', required),
  },
  nss: {
    required: helpers.withMessage('El NSS es obligatorio', required),
  },
  registro_patronal: {
    required: helpers.withMessage('El registro patrónal es obligatorio', required),
  },
  fecha_ingreso: {
    required: helpers.withMessage('La fecha de ingreso es obligatoria', required),
  },
  salario_diario: {
    required: helpers.withMessage('El salario diario es obligatorio', required),
  },
  salario_diario_integrado: {
    required: helpers.withMessage('El salario diario integrado es obligatorio', required),
  },
  departamento: {
    required: helpers.withMessage('El departamento es obligatorio', required),
  },
  puesto: {
    required: helpers.withMessage('El puesto es obligatorio', required),
  },
  centro_costos: {
    required: helpers.withMessage('El centro de costos es obligatorio', required),
  },
  estatus: {
    required: helpers.withMessage('El estatus es obligatorio', required),
  },
}

const v$ = useVuelidate(rules, createUserForm)

const handleSubmit = async() => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) return warning('Por favor, corrige los errores en el formulario')
}
</script>

<style lang="scss" scoped></style>
