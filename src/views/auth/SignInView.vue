<template>
  <div class="min-h-screen flex">
    <!-- Left side - Image section -->
    <div class="hidden lg:block w-1/2 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');"></div>

    <!-- Right side - Login form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-base-100">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center">
          <h2 class="text-4xl font-bold text-primary mb-2">Bienvenido</h2>
          <p class="text-base-content/60">Ingresa a tu cuenta para continuar</p>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Usuario</span>
            </label>
            <input
              type="text"
              v-model="username"
              placeholder="Ingrese su usuario"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Contraseña</span>
            </label>
            <input
              type="password"
              v-model="password"
              placeholder="Ingrese su contraseña"
              class="input input-bordered w-full"
              required
            />
            <label class="label mt-2 text-sm font-medium text-b-secondary">
              <a href="#" class="label-text-alt link link-hover">Olvidé mi contraseña</a>
            </label>
          </div>

          <button
            type="submit" class="btn bg-b-primary border-b-0 text-white w-full"
            :disabled="loading === LoadState.loading"
          >
            <span v-if="loading === LoadState.loading" class="loading loading-spinner loading-xs"></span>
            {{ loading === LoadState.loading ? 'Ingresando...' : 'Ingresar' }}
          </button>

          <div class="text-center text-sm">
            <span class="text-base-content/60">¿No tienes una cuenta?</span>
            <a href="#" class="link link-primary">Registrate</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from '@/composables/useToast';
import { useApp } from '@/composables/useApp';
import { LoadState } from '@/types/LoadState';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { setToken, setUser } = useApp()
const { toast } = useToast()
const router = useRouter()

const username = ref('')
const password = ref('')

const loading = ref<LoadState>(LoadState.idle)

const handleSubmit = async () => {
  if(!validateForm()) return
  loading.value = LoadState.loading
  await new Promise(resolve => setTimeout(resolve, 2000))
  setToken('hello_world')
  setUser({
    id: '1',
    name: 'Enrique',
    email: 'enrique@gmail.com',
  })
  loading.value = LoadState.success
  router.push({ name: 'Home' })
}


// ***************** Form validation ******************
const validateForm = () => {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  if (!username.value || !password.value) {
    toast.error('Todos los campos son obligatorios')
    return false
  }

  if (!regexEmail.test(username.value)) {
    toast.error('El usuario ingresado no es válido')
    return false
  }

  if (password.value.length < 8) {
    toast.error('La contraseña debe tener al menos 8 caracteres')
    return false
  }
  
  return true
}
</script>