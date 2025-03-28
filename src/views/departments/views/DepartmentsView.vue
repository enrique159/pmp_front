<template>
  <div class="p-6 bg-white-1 container mx-auto">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-black-1">Departamentos</h1>
      <p class="text-black-2">Gestiona los departamentos y áreas</p>
    </header>

    <div class="card bg-white shadow-sm mb-8">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4 flex-wrap">
          <div class="flex items-center gap-2">
            <h2 class="card-title">Lista de Departamentos</h2>
          </div>
          <button
            class="btn btn-primary rounded-full"
            :class="{ 'btn-sm btn-circle': isMobile }"
            @click="showCreateDepartmentModal = true"
          >
            <IconPlus />
            <span v-if="!isMobile">Nuevo Departamento</span>
          </button>
        </div>

        <div v-if="loading" class="w-full grid place-items-center">
          <span class="loading loading-spinner text-b-secondary loading-xl"></span>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div 
            v-for="department in departments" 
            :key="`card-department-${department.id}`"
            class="card bg-base-100 shadow-sm cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all"
            :class="[
              selectedDepartment?.id === department.id ? 'border-2 border-primary' : 'border-2 border-base-300'
            ]"
            @click="selectDepartment(department)"
          >
            <div class="card-body p-4 pb-0">
              <h3 class="card-title font-bold">{{ department.name }}</h3>
            </div>
            <div class="card-footer flex justify-end px-2 pb-2">
              <button class="btn btn-ghost btn-circle btn-sm" @click="handleEditDepartment(department)">
                <IconEdit />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-white shadow-sm">
      <div class="card-body">
        <div class="flex justify-between items-center flex-wrap mb-4">
          <h2 class="card-title">Actividades</h2>
          <a class="btn btn-ghost btn-sm" @click="selectedDepartment = null">Mostrar todas</a>
          <button class="btn bg-b-primary text-white rounded-full" :class="{ 'btn-sm btn-circle': isMobile }" @click="showCreateActivityModal = true">
            <IconPlus />
            <span v-if="!isMobile">Nueva Actividad</span>
          </button>
        </div>
        <!-- User list with roles and status -->
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th class="w-12"></th>
                <th class="w-28">Código</th>
                <th>Descripción</th>
                <th>Departamento</th>
                <th class="w-10">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover" v-for="(activity, index) in filterActivitiesByDepartment" :key="`row-activity-${activity.id}`">
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="badge badge-neutral badge-ghost rounded-full">
                    <span class="text-xs font-medium">{{ activity.code }}</span>
                  </div>
                </td>
                <td>{{ activity.description }}</td>
                <td>{{ activity.department }}</td>
                <td class="flex justify-center gap-2 items-center">
                  <div class="tooltip tooltip-left" data-tip="Editar">
                    <button class="btn btn-ghost btn-circle btn-sm" @click="handleEditActivity(activity)">
                      <IconEdit />
                    </button>
                  </div>
                  <div class="tooltip tooltip-left" data-tip="Eliminar">
                    <button class="btn btn-ghost btn-circle btn-sm text-red-400" :disabled="loadingDeleteActivity" @click="handleDeleteActivity(activity)">
                      <IconTrash />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <basic-modal v-model="showCreateDepartmentModal" :icon="IconCategory" title="Nuevo Departamento" allow-close fit-to-content>
    <template #content>
      <create-department @created="() => {
        showCreateDepartmentModal = false
        fetchData()
      }" />
    </template>
  </basic-modal>

  <basic-modal v-model="showCreateActivityModal" title="Nueva Actividad" allow-close fit-to-content>
    <template #content>
      <create-activity :departmentId="selectedDepartment?.id" @created="() => {
        showCreateActivityModal = false
        fetchData()
      }" />
    </template>
  </basic-modal>

  <basic-modal v-model="showEditDepartmentModal" title="Editar Departamento" allow-close fit-to-content>
    <template #content>
      <edit-department :selected-department="selectedEditDepartment" @updated="() => {
        showEditDepartmentModal = false
        fetchData()
      }" />
    </template>
  </basic-modal>

  <basic-modal v-model="showEditActivityModal" title="Editar Actividad" allow-close fit-to-content>
    <template #content>
      <edit-activity :selected-activity="selectedEditActivity" @updated="() => {
        showEditActivityModal = false
        fetchData()
      }" />
    </template>
  </basic-modal>
</template>

<script setup lang="ts">
import BasicModal from '@/components/BasicModal.vue'
import CreateDepartment from '../components/CreateDepartment.vue'
import CreateActivity from '../components/CreateActivity.vue'
import EditDepartment from '../components/EditDepartment.vue'
import EditActivity from '../components/EditActivity.vue'
import { Department } from '@/app/modules/departments/domain/department'
import { IconPlus, IconEdit, IconCategory, IconTrash } from '@tabler/icons-vue'
import { useDepartments } from '@/composables/useDepartments'
import { computed, ref } from 'vue'
import { Activity } from '@/app/modules/activities/domain/activity'
import { useWindowSize } from '@vueuse/core'
import { useToast } from '@/composables/useToast'

// Declaración para TypeScript
declare const confirm: (message: string) => boolean;

const { width } = useWindowSize()
const { success, error } = useToast()
const isMobile = computed(() => width.value < 768)

const { getDepartments, departments, getActivities, activities, deleteActivity } = useDepartments()

const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  await getDepartments({})
    .catch((error) => {
      console.log(error)
    })

  await getActivities({})
    .catch((error) => {
      console.log(error)
    })

  loading.value = false
}

fetchData()

const filterActivitiesByDepartment = computed(() => {
  if (!selectedDepartment.value) return activities.value.map((activity: Activity) => ({
    ...activity,
    department: departments.value.find((d: Department) => d.id === activity.department_id)?.name || ''
  }))
  return activities.value.filter((activity: Activity) => activity.department_id === selectedDepartment.value?.id).map((activity: Activity) => ({
    ...activity,
    department: departments.value.find((d: Department) => d.id === activity.department_id)?.name || ''
  }))
})

// Select department
const selectedDepartment = ref<Department | null>(null)
const selectDepartment = (department: Department) => {
  selectedDepartment.value = department
}

// Create department
const showCreateDepartmentModal = ref(false)

// Create activity
const showCreateActivityModal = ref(false)

// Edit department
const showEditDepartmentModal = ref(false)
const selectedEditDepartment = ref<Department | null>(null)

const handleEditDepartment = (department: Department) => {
  selectedEditDepartment.value = department
  showEditDepartmentModal.value = true
}

// Edit activity
const showEditActivityModal = ref(false)
const selectedEditActivity = ref<Activity | null>(null)

const handleEditActivity = (activity: Activity) => {
  selectedEditActivity.value = activity
  showEditActivityModal.value = true
}

// Delete activity
const loadingDeleteActivity = ref(false)
const handleDeleteActivity = async (activity: Activity) => {
  if (!confirm('¿Está seguro de eliminar esta actividad?')) return
  loadingDeleteActivity.value = true
  await deleteActivity(activity.id || '')
    .then(() => {
      fetchData()
      success('Actividad eliminada exitosamente')
    })
    .catch((err) => {
      console.log(err)
      error('Error al eliminar la actividad')
    })
    .finally(() => {
      loadingDeleteActivity.value = false
    })
}
</script>

<style lang="scss" scoped></style>
