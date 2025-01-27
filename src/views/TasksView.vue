<template>
  <div class="p-6 w-full h-full bg-white-1 overflow-y-auto">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-black-1">Tareas</h1>
      <p class="text-black-2">Administra y da seguimiento a las tareas del equipo</p>
    </header>

    <div class="card bg-white shadow-sm">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <h2 class="card-title">Lista de Tareas</h2>
          <button class="btn btn-primary">Nueva Tarea</button>
        </div>
        <!-- Task list with status indicators -->
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Tarea</th>
                <th>Proyecto</th>
                <th>Estado</th>
                <th>Asignado a</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover">
                <td>Ejemplo de Tarea</td>
                <td>Proyecto A</td>
                <td><span class="badge badge-info">En Progreso</span></td>
                <td>Usuario Example</td>
                <td>
                  <button class="btn btn-ghost btn-xs">Editar</button>
                  <button class="btn btn-ghost btn-xs">Ver</button>
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