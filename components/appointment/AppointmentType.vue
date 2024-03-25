<template>
  <div class="relative">
    <PictureComponent :picture-path="picturePath" />

    <div class="absolute bottom-0 left-0 right-0 min-h-12 bg-white bg-opacity-70 flex items-center">
      <div class="text-dark-brown font-abhayaLibre font-bold text-sm md:text-l text-left px-2">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PictureComponent from '../components/common/PictureComponent.vue';
defineProps<{
  picturePath: string;
  description: string;
}>();
</script>

<style></style>
