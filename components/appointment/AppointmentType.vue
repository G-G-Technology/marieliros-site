<template>
  <div class="relative aspect-[4/3] overflow-hidden rounded-sm">
    <NuxtImg
      :src="picturePath"
      :alt="description"
      class="w-full h-full object-cover object-center"
      format="webp"
      loading="lazy"
    />
    <div class="absolute bottom-0 left-0 right-0 min-h-12 bg-white bg-opacity-70 flex items-center">
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
