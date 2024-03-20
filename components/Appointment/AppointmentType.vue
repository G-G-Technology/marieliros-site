<template>
  <div class="relative">
    <NuxtImg :src="picturePath" size="w-778 h-372 sm:w-214 sm:h-421" densities="x1 x2" />

    <div class="absolute bottom-0 left-0 right-0 min-h-12 bg-white bg-opacity-70 rounded-b-lg flex items-center">
      <div class="text-dark-brown font-abhayaLibre font-bold text-sm md:text-l text-left px-2">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  picturePath: string;
  description: string;
}>();
</script>

<style></style>
