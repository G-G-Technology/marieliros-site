<template>
  <NuxtImg
    :src="picturePath"
    :alt="alt"
    class="w-full h-auto"
    format="webp"
    loading="lazy"
  />
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    picturePath: string;
    alt?: string;
  }>(),
  { alt: '' },
);
</script>
