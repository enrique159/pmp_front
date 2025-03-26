<template>
  <div v-if="show" class="fixed w-screen h-screen top-0 left-0 bg-black/20 z-[999] grid place-items-center backdrop-blur-xs" @click.self="handleClickOutside">
    <slot v-if="custom" name="custom" />
    <div
      v-else
      class="bg-white max-md:w-screen md:w-[90vw] min-h-[200px] h-fit md:max-h-[90vh] max-md:h-screen max-w-4xl p-4 md:rounded-3xl overflow-y-auto"
      :class="[ fitToContent ? 'md:max-w-fit' : '']"
    >
      <!-- HEADER -->
      <slot name="header" />
        <header class="flex justify-between items-center h-[32px] pl-4">
          <div class="flex items-center gap-2">
            <component :is="icon" v-if="icon" :size="24" class="text-b-black-3" />
            <h4 class="text-lg font-bold">{{ title }}</h4>
          </div>

          <button v-if="allowClose" class="btn btn-ghost btn-circle btn-sm" @click="show = false">
            <IconX :size="21" class="text-b-black-2" />
          </button>
        </header>
      <slot />

      <!-- CONTENT -->
      <slot name="content" default />
      
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'
import { computed } from 'vue'

const props =defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  custom: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  allowClose: {
    type: Boolean,
    default: true
  },
  icon: {
    type: Function,
    default: null
  },
  fitToContent: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const show = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const handleClickOutside = () => {
  if (props.allowClose) {
    show.value = false
  }
}
</script>

<style lang="scss" scoped>

</style>