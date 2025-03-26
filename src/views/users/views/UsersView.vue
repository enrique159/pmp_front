<template>
  <div class="p-6 w-full h-full bg-white-1 overflow-y-auto">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-black-1">Usuarios</h1>
      <p class="text-black-2">Gestiona los usuarios y sus roles en el sistema</p>
    </header>

    <div class="card bg-white shadow-sm">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <h2 class="card-title">Lista de Usuarios</h2>
          <router-link class="btn btn-primary rounded-full" role="button" :to="{ name: 'CreateUser' }">
            <IconUserPlus />
            Nuevo Usuario
          </router-link>
        </div>
        <!-- User list with roles and status -->
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
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
                <td>{{ user.department_id }}</td>
                <td>{{ user.position }}</td>
                <td><span class="badge badge-ghost">{{ user.cost_center }}</span></td>
                <td>
                  <span class="badge" :class="{ 'badge-success text-white': user.status === 'A', 'badge-neutral': user.status === 'R' }">
                    {{ user.status === 'A' ? 'activo' : 'inactivo' }}
                  </span>
                </td>
                <td>
                  <button class="btn btn-ghost btn-xs" @click="handleEditUser(user)">Editar</button>
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
import { IconUserPlus } from '@tabler/icons-vue';
import { useUsers } from '@/composables/useUsers';
import { ref } from 'vue';
import { User } from '@/app/modules/users/domain/user';

const { users, fetchUsers } = useUsers();

const loadingUsers = ref(false);
const getUsers = async () => {
  loadingUsers.value = true;
  await new Promise(resolve => setTimeout(resolve, 2000));
  await fetchUsers()
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

getUsers();


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
};
</script>