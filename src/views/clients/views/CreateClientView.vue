
<template>
  <div class="p-6 w-full h-full bg-white-1 overflow-y-auto space-y-4">
    <header>
      <h1 class="text-3xl font-bold text-black-1">Crear Cliente</h1>
      <p class="text-black-2">Crea un nuevo cliente para el sistema</p>
    </header>

    <router-link
      to="/main/clients"
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
              <legend class="fieldset-legend required">Nombre de la Empresa</legend>
              <input
                v-model="createClientForm.company_name"
                type="text"
                class="input w-full"
                placeholder="Ej. Empresa ABC"
              />
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.company_name.$errors" :key="`error-company-name-${index}`">{{ error.$message }}</span>
              </div>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend required">Dirección</legend>
              <input
                v-model="createClientForm.address"
                type="text"
                class="input w-full"
                placeholder="Ej. Calle Principal #123"
              />
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.address.$errors" :key="`error-address-${index}`">{{ error.$message }}</span>
              </div>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend required">Ciudad</legend>
              <input
                v-model="createClientForm.city"
                type="text"
                class="input w-full"
                placeholder="Ej. Ciudad de México"
              />
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.city.$errors" :key="`error-city-${index}`">{{ error.$message }}</span>
              </div>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend required">Estado</legend>
              <input
                v-model="createClientForm.state"
                type="text"
                class="input w-full"
                placeholder="Ej. CDMX"
              />
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.state.$errors" :key="`error-state-${index}`">{{ error.$message }}</span>
              </div>
            </fieldset>
            <fieldset class="fieldset">
              <legend class="fieldset-legend required">País</legend>
              <input
                v-model="createClientForm.country"
                type="text"
                class="input w-full"
                placeholder="Ej. México"
              />
              <div class="flex flex-col text-b-tertiary text-xs font-medium">
                <span v-for="(error, index) in v$.country.$errors" :key="`error-country-${index}`">{{ error.$message }}</span>
              </div>
            </fieldset>
          </section>

          <div class="flex justify-end">
            <button type="submit" class="btn btn-primary rounded-full px-6" :disabled="loadingCreateClient">
              <span v-if="loadingCreateClient" class="loading loading-spinner"></span>
              <IconBrandZapier v-else />
              Crear cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators'
import { IconArrowLeft, IconBrandZapier, IconInfoCircle } from '@tabler/icons-vue'
import { useVuelidate } from '@vuelidate/core'
import { reactive, ref } from 'vue'
import { useToast } from '@/composables/useToast'
import { useClients } from '@/composables/useClients'
import { Client } from '@/app/modules/clients/domain/client'
import { useRouter } from 'vue-router'

const { warning, success, error } = useToast()
const createClientForm = reactive({
  company_name: '',
  address: '',
  city: '',
  state: '',
  country: '',
})

const rules = {
  company_name: {
    required: helpers.withMessage('El nombre de la empresa es obligatorio', required),
  },
  address: {
    required: helpers.withMessage('La dirección es obligatoria', required),
  },
  city: {
    required: helpers.withMessage('La ciudad es obligatoria', required),
  },
  state: {
    required: helpers.withMessage('El estado es obligatorio', required),
  },
  country: {
    required: helpers.withMessage('El país es obligatorio', required),
  },
}

const v$ = useVuelidate(rules, createClientForm)

const { createClient } = useClients()
const router = useRouter()

const loadingCreateClient = ref(false)
const handleSubmit = async() => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) return warning('Por favor, corrige los errores en el formulario')
  
  const payload: Partial<Client> = {
    ...createClientForm,
  }

  loadingCreateClient.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  await createClient(payload)
    .then(() => {
      success('Cliente creado exitosamente')
      router.push({ name: 'Clients' })
    })
    .catch((err) => {
      console.log(err)
      error('Ocurrió un error al crear el cliente')
    })
    .finally(() => {
      loadingCreateClient.value = false
    })
}
</script>

<style lang="scss" scoped></style>