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
          <button class="btn btn-primary">Nuevo Usuario</button>
        </div>
        <!-- User list with roles and status -->
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover">
                <td class="flex items-center gap-2">
                  <div class="avatar avatar-placeholder">
                    <div class="bg-neutral text-neutral-content w-8 rounded-full">
                      <span>AA</span>
                    </div>
                  </div>
                  <span>Ana Alvarez</span>
                </td>
                <td>ana.alvarez@example.com</td>
                <td><span class="badge badge-ghost">Administrador</span></td>
                <td><span class="badge badge-success">Activo</span></td>
                <td>
                  <button class="btn btn-ghost btn-xs">Editar</button>
                  <button class="btn btn-ghost btn-xs text-error">Desactivar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Component logic will be added here
</script>