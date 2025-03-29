<template>
  <div class="p-6 bg-white-1 container mx-auto">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-black-1">Usuarios</h1>
      <p class="text-black-2">Gestiona los usuarios y sus roles en el sistema</p>
    </header>

    <div class="card bg-white shadow-sm mb-8">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <h2 class="card-title">Lista de Usuarios</h2>
          <router-link class="btn btn-primary rounded-full" role="button" :to="{ name: 'CreateUser' }">
            <IconUserPlus />
            Nuevo Usuario
          </router-link>
        </div>

        <div v-if="loadingUsers || loadingDepartments" class="w-full grid place-items-center">
          <span class="loading loading-spinner text-b-secondary loading-xl"></span>
        </div>
        <!-- User list with roles and status -->
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Departamento</th>
                <th>Puesto</th>
                <th>Centro de Costos</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover" v-for="user in users" :key="`row-user-${user.id}`">
                <td>{{ user.code }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ getDepartmentById(user.department_id)?.name }}</td>
                <td>{{ user.position }}</td>
                <td><span v-if="user.cost_center" class="badge badge-ghost">{{ user.cost_center }}</span></td>
                <td>
                  <span class="badge" :class="{ 'badge-success text-white': user.status === UserStatus.ACTIVE, 'badge-neutral': user.status === UserStatus.INACTIVE }">
                    {{ user.status === UserStatus.ACTIVE ? 'activo' : 'inactivo' }}
                  </span>
                </td>
                <td class="flex justify-center gap-2 items-center">
                  <div class="tooltip tooltip-left" data-tip="Editar">
                    <button class="btn btn-ghost btn-circle btn-sm" @click="handleEditUser(user)">
                      <IconEdit />
                    </button>
                  </div>
                  <div class="tooltip tooltip-left" data-tip="Eliminar">
                    <button class="btn btn-ghost btn-circle btn-sm text-red-400" :disabled="loadingDeleteUser" @click="handleDeleteUser(user)">
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

  <!-- EDIT USER -->
  <BasicModal v-model="showEditUserModal" title="Editar Usuario" allow-close>
    <template #content>
      <EditUser :selected-user="selectedUser" @update:user="handleUpdateUser" />
    </template>
  </BasicModal>
</template>

<script lang="ts" setup>
import BasicModal from '@/components/BasicModal.vue';
import EditUser from '@/views/users/components/EditUser.vue';
import { IconUserPlus, IconEdit, IconTrash } from '@tabler/icons-vue';
import { useUsers } from '@/composables/useUsers';
import { ref } from 'vue';
import { User, UserStatus } from '@/app/modules/users/domain/user.d';
import { useDepartments } from '@/composables/useDepartments';
import { useToast } from '@/composables/useToast';

declare const confirm: (message: string) => boolean;

const { users, fetchUsers, deleteUser } = useUsers();
const { departments, getDepartments } = useDepartments();
const { success, error } = useToast();

const loadingUsers = ref(false);
const getUsers = async () => {
  loadingUsers.value = true;
  await fetchUsers({})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loadingUsers.value = false;
    });
};

const loadingDepartments = ref(false);
const fetchDepartments = async () => {
  loadingDepartments.value = true;
  await getDepartments({})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loadingDepartments.value = false;
    });
};

fetchDepartments();
getUsers();

const getDepartmentById = (id: string) => {
  return departments.value.find((department) => department.id === id);
};

// UPDATE USER
const showEditUserModal = ref(false);
const selectedUser = ref<User | null>(null);

const handleEditUser = (user: User) => {
  selectedUser.value = user;
  showEditUserModal.value = true;
};

const handleUpdateUser = (user: User) => {
  selectedUser.value = user;
  showEditUserModal.value = false;
  getUsers();
};

// DELETE USER
const loadingDeleteUser = ref(false);
const handleDeleteUser = async (user: User) => {
  loadingDeleteUser.value = true;
  if (!confirm('¿Está seguro de eliminar este usuario?')) return;
  await deleteUser(user.id ?? '')
    .then(() => {
      success('Usuario eliminado correctamente');
      getUsers();
    })
    .catch((err) => {
      console.log(err);
      error('Error al eliminar el usuario')
    })
    .finally(() => {
      loadingDeleteUser.value = false;
    });
};

</script>