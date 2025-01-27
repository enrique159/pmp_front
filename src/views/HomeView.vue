<template>
  <div class="p-6 w-full h-full bg-white-1 overflow-y-auto">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-black-1">Dashboard</h1>
      <p class="text-black-2">Bienvenido al panel de control</p>
    </header>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="card bg-white shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-black-2">Inspecciones Activas</p>
              <h3 class="text-2xl font-bold text-black-1">15</h3>
            </div>
            <div class="text-b-primary">
              <IconBrandAsana class="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-white shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-black-2">Mantenimientos Programados</p>
              <h3 class="text-2xl font-bold text-black-1">24</h3>
            </div>
            <div class="text-b-tertiary">
              <IconTopologyRing3 class="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-white shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-black-2">Equipos en Servicio</p>
              <h3 class="text-2xl font-bold text-black-1">38</h3>
            </div>
            <div class="text-b-secondary">
              <IconUsersGroup class="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-white shadow-sm">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-black-2">Servicios Completados</p>
              <h3 class="text-2xl font-bold text-black-1">156</h3>
            </div>
            <div class="text-b-accent">
              <IconClockHour4 class="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Project Progress -->
      <div class="lg:col-span-2">
        <div class="card bg-white shadow-sm">
          <div class="card-body">
            <h2 class="card-title mb-4">Progreso de Proyectos</h2>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-black-2">Mantenimiento Preventivo - Grúas</span>
                  <span class="text-black-1 font-medium">75%</span>
                </div>
                <progress class="progress progress-primary w-full" value="75" max="100"></progress>
              </div>
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-black-2">Inspección de Ventiladores</span>
                  <span class="text-black-1 font-medium">45%</span>
                </div>
                <progress class="progress progress-secondary w-full" value="45" max="100"></progress>
              </div>
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-black-2">Reparación de Motores</span>
                  <span class="text-black-1 font-medium">90%</span>
                </div>
                <progress class="progress progress-tertiary w-full" value="90" max="100"></progress>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card bg-white shadow-sm">
        <div class="card-body">
          <h2 class="card-title mb-4">Actividad Reciente</h2>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="badge badge-primary badge-sm"></div>
              <div>
                <p class="text-black-1 font-medium">Inspección de Grúa Completada</p>
                <p class="text-black-2 text-sm">Hace 2 horas</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="badge badge-secondary badge-sm"></div>
              <div>
                <p class="text-black-1 font-medium">Mantenimiento Programado</p>
                <p class="text-black-2 text-sm">Hace 4 horas</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="badge badge-tertiary badge-sm"></div>
              <div>
                <p class="text-black-1 font-medium">Reparación de Motor Completada</p>
                <p class="text-black-2 text-sm">Hace 5 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconBrandAsana, IconTopologyRing3, IconUsersGroup, IconClockHour4 } from '@tabler/icons-vue'
</script>

<style scoped>
.progress-tertiary {
  --progress-color: var(--tertiary);
}
</style>