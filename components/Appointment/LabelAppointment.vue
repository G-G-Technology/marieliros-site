<template>
  <div class="bg-beige bg-opacity-30 rounded-lg">
    <div class="text-dark-brown font-abhayaLibre font-bold text-lg md:text-l text-justify pt-3 pb-2 px-3">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  description: string;
}>();
</script>

<style></style>
