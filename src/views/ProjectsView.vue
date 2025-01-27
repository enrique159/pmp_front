<template>
  <div class="p-6 w-full h-full bg-white-1 overflow-y-auto">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-black-1">Proyectos</h1>
      <p class="text-black-2">Gestiona y monitorea todos los proyectos</p>
    </header>

    <div class="card bg-white shadow-sm">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <h2 class="card-title">Lista de Proyectos</h2>
          <button class="btn btn-primary">Nuevo Proyecto</button>
        </div>
        <!-- Placeholder for project list/grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="card bg-base-100 shadow-sm">
            <div class="card-body">
              <h3 class="card-title text-black-1">Proyecto Example</h3>
              <p class="text-black-2">Descripción breve del proyecto</p>
              <div class="card-actions justify-end mt-4">
                <button class="btn btn-ghost btn-sm">Ver detalles</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Component logic will be added here
</script>