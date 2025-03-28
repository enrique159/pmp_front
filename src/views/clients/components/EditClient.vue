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
          <legend class="fieldset-legend required">Nombre de la Empresa</legend>
          <input
            v-model="editClientForm.company_name"
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
            v-model="editClientForm.address"
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
            v-model="editClientForm.city"
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
            v-model="editClientForm.state"
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
            v-model="editClientForm.country"
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
        <button type="submit" class="btn btn-primary rounded-full px-6" :disabled="loadingUpdateClient">
          <span v-if="loadingUpdateClient" class="loading loading-spinner"></span>
          <IconDeviceFloppy v-else />
          Guardar cambios
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators'
import { IconInfoCircle, IconDeviceFloppy } from '@tabler/icons-vue'
import { useVuelidate } from '@vuelidate/core'
import { reactive, ref, onMounted } from 'vue'
import { useToast } from '@/composables/useToast'
import { useClients } from '@/composables/useClients'
import { Client } from '@/app/modules/clients/domain/client'

const props = defineProps({
  selectedClient: {
    type: Object as () => Client | null,
    required: true
  }
})

const emit = defineEmits(['update:client'])

const { warning, success, error } = useToast()

const editClientForm = reactive({
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

const v$ = useVuelidate(rules, editClientForm)

const { updateClient } = useClients()
const loadingUpdateClient = ref(false)

onMounted(() => {
  // Populate form with selectedClient data
  if (props.selectedClient) {
    editClientForm.company_name = props.selectedClient.company_name
    editClientForm.address = props.selectedClient.address
    editClientForm.city = props.selectedClient.city
    editClientForm.state = props.selectedClient.state
    editClientForm.country = props.selectedClient.country
  }
})

const handleSubmit = async() => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) return warning('Por favor, corrige los errores en el formulario')
  
  const payload: Partial<Client> = {
    ...props.selectedClient, // Keep original data
    ...editClientForm, // Override with edited data
  }

  loadingUpdateClient.value = true
  await updateClient(props.selectedClient?.id ?? '', payload)
    .then(() => {
      success('Cliente actualizado exitosamente')
      emit('update:client', payload)
    })
    .catch((err) => {
      console.log(err)
      error('Ocurrió un error al actualizar el cliente')
    })
    .finally(() => {
      loadingUpdateClient.value = false
    })
}
</script>

<style lang="scss" scoped></style>
