<template>
  <div class="p-6 w-full h-full bg-white-1 overflow-y-auto">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-black-1">Reportes</h1>
      <p class="text-black-2">Visualiza y analiza los datos del sistema</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card bg-white shadow-sm">
        <div class="card-body">
          <h2 class="card-title">Resumen de Proyectos</h2>
          <div class="h-64 flex items-center justify-center bg-base-200 rounded-lg">
            <p class="text-black-2">Gráfico de estado de proyectos</p>
          </div>
        </div>
      </div>

      <div class="card bg-white shadow-sm">
        <div class="card-body">
          <h2 class="card-title">Distribución de Tareas</h2>
          <div class="h-64 flex items-center justify-center bg-base-200 rounded-lg">
            <p class="text-black-2">Gráfico de distribución de tareas</p>
          </div>
        </div>
      </div>

      <div class="card bg-white shadow-sm col-span-full">
        <div class="card-body">
          <div class="flex justify-between items-center mb-4">
            <h2 class="card-title">Actividad Reciente</h2>
            <div class="flex gap-2">
              <button class="btn btn-ghost btn-sm">Diario</button>
              <button class="btn btn-ghost btn-sm">Semanal</button>
              <button class="btn btn-ghost btn-sm">Mensual</button>
            </div>
          </div>
          <div class="h-96 flex items-center justify-center bg-base-200 rounded-lg">
            <p class="text-black-2">Gráfico de actividad en el tiempo</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Component logic will be added here
</script>