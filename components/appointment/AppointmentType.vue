<template>
  <div class="relative overflow-hidden rounded-sm" :class="isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3]'">
    <NuxtImg
      :src="faceAwareSrc"
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
const props = defineProps<{
  picturePath: string;
  description: string;
  isPortrait?: boolean;
}>();

const faceAwareSrc = computed(() =>
  props.isPortrait ? cloudinaryFaceUrl(props.picturePath, '3:4') : props.picturePath,
);
</script>

<style></style>
