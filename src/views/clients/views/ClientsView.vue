<template>
  <div class="p-6 w-full h-full bg-white-1 container mx-auto">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-black-1">Clientes</h1>
      <p class="text-black-2">Gestiona los clientes y sus datos</p>
    </header>

    <div class="card bg-white shadow-sm">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <h2 class="card-title">Lista de Clientes</h2>
          <router-link class="btn btn-primary rounded-full" role="button" :to="{ name: 'CreateClient' }">
            <IconPlus />
            Nuevo cliente
          </router-link>
        </div>

        <div v-if="loadingClients" class="w-full grid place-items-center">
          <span class="loading loading-spinner text-b-secondary loading-xl"></span>
        </div>
        <!-- User list with roles and status -->
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th class="w-12"></th>
                <th>Nombre de empresa</th>
                <th>Dirección</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>País</th>
                <th class="w-10">Proyectos</th>
                <th class="w-10">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover" v-for="(client, index) in clients" :key="`row-client-${client.id}`">
                <td>{{ index + 1 }}</td>
                <td>{{ client.company_name }}</td>
                <td>{{ client.address }}</td>
                <td>{{ client.city }}</td>
                <td>{{ client.state }}</td>
                <td>{{ client.country }}</td>
                <td>
                  <div class="flex justify-center gap-2 items-center">
                    <div class="tooltip tooltip-left" data-tip="Mostrar proyectos">
                      <button class="btn btn-ghost btn-circle btn-sm" @click="handleShowProjects(client)">
                        <IconStackMiddle class="text-b-secondary" />
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="flex justify-center gap-2 items-center">
                    <div class="tooltip tooltip-left" data-tip="Editar">
                      <button class="btn btn-ghost btn-circle btn-sm" @click="handleEditClient(client)">
                        <IconEdit />
                      </button>
                    </div>
                    <div class="tooltip tooltip-left" data-tip="Eliminar">
                      <button class="btn btn-ghost btn-circle btn-sm text-red-400" :disabled="loadingDeleteClient" @click="handleDeleteClient(client)">
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- EDIT CLIENT -->
  <BasicModal v-model="showEditClientModal" title="Editar Cliente" allow-close>
    <template #content>
      <EditClient :selected-client="selectedClient" @update:client="handleUpdateClient" />
    </template>
  </BasicModal>

  <!-- PROJECTS CLIENT -->
  <BasicModal v-model="showProjectsClientModal" :icon="IconStackMiddle" title="Proyectos asociados" allow-close>
    <template #content>
      <ProjectsClient ref="projectsClientRef" :selected-client="selectedClient"/>
    </template>

    <!-- ATTACH PROJECT -->
    <template #footer>
      <div class="flex justify-end gap-4">
        <button class="btn btn-ghost rounded-full px-4" @click="showNewProjectModal = true">
          <IconPlus />
          Nuevo proyecto
        </button>
        <button class="btn btn-primary rounded-full px-4">
          <IconStackPush />
          Asociar proyecto
        </button>
      </div>
    </template>
  </BasicModal>

  <basic-modal v-model="showNewProjectModal" title="Nuevo proyecto" allow-close fit-to-content>
    <template #content>
      <create-project :client-id="selectedClient?.id" @project:created="() => {
        showNewProjectModal = false
        projectsClientRef?.fetchProjects()
      }"/>
    </template>
  </basic-modal>
</template>

<script setup lang="ts">
import CreateProject from '@/views/projects/components/CreateProject.vue';
import ProjectsClient from '@/views/clients/components/ProjectsClient.vue';
import { IconEdit, IconTrash, IconPlus, IconStackMiddle, IconStackPush } from '@tabler/icons-vue';
import { useClients } from '@/composables/useClients';
import { useToast } from '@/composables/useToast';
import { ref } from 'vue';
import { Client } from '@/app/modules/clients/domain/client';
import BasicModal from '@/components/BasicModal.vue';
import EditClient from '@/views/clients/components/EditClient.vue';

declare const confirm: (message: string) => boolean;

const projectsClientRef = ref()

const { clients, getClients, deleteClient } = useClients();
const { success, error } = useToast();

const loadingClients = ref(false);

const handleGetClients = async () => {
  loadingClients.value = true;
  await getClients({})
    .catch((err) => {
      console.log(err)
      error('Ocurrió un error al cargar los clientes')
    })
    .finally(() => {
      loadingClients.value = false;
    })
};

handleGetClients();

// EDIT CLIENT
const showEditClientModal = ref(false);
const selectedClient = ref<Client | null>(null);

// PROJECTS CLIENT
const showProjectsClientModal = ref(false);

const handleEditClient = (client: Client) => {
  selectedClient.value = client;
  showEditClientModal.value = true;
};

const handleUpdateClient = (client: Client) => {
  selectedClient.value = client;
  showEditClientModal.value = false;
  handleGetClients();
};

// DELETE CLIENT
const loadingDeleteClient = ref(false);
const handleDeleteClient = async (client: Client) => {
  if (!confirm('¿Está seguro de eliminar este cliente?')) return;
  
  loadingDeleteClient.value = true;
  await deleteClient(client.id ?? '')
    .then(() => {
      success('Cliente eliminado correctamente');
      handleGetClients();
    })
    .catch((err) => {
      console.log(err);
      error('Error al eliminar el cliente')
    })
    .finally(() => {
      loadingDeleteClient.value = false;
    });
};

const handleShowProjects = (client: Client) => {
  selectedClient.value = client;
  showProjectsClientModal.value = true;
};

// CREATE PROJECT
const showNewProjectModal = ref(false)

</script>

<style lang="scss" scoped>

</style>