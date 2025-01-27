<template>
  <div class="p-6 w-full h-full bg-white-1 overflow-y-auto">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-black-1">Configuración</h1>
      <p class="text-black-2">Administra la configuración general del sistema</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card bg-white shadow-sm">
        <div class="card-body">
          <h2 class="card-title">Configuración General</h2>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Nombre de la Organización</span>
            </label>
            <input type="text" placeholder="Nombre de la organización" class="input input-bordered w-full" />
          </div>
          <div class="form-control w-full mt-4">
            <label class="label">
              <span class="label-text">Zona Horaria</span>
            </label>
            <select class="select select-bordered w-full">
              <option>America/Lima</option>
              <option>America/Bogota</option>
              <option>America/Santiago</option>
            </select>
          </div>
        </div>
      </div>

      <div class="card bg-white shadow-sm">
        <div class="card-body">
          <h2 class="card-title">Notificaciones</h2>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Notificaciones por correo</span>
              <input type="checkbox" class="toggle" checked />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Notificaciones del sistema</span>
              <input type="checkbox" class="toggle" checked />
            </label>
          </div>
        </div>
      </div>

      <div class="card bg-white shadow-sm col-span-full">
        <div class="card-body">
          <h2 class="card-title">Roles y Permisos</h2>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Rol</th>
                  <th>Descripción</th>
                  <th>Permisos</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover">
                  <td>Administrador</td>
                  <td>Control total del sistema</td>
                  <td><span class="badge badge-primary">Todos los permisos</span></td>
                  <td>
                    <button class="btn btn-ghost btn-xs">Editar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Component logic will be added here
</script>