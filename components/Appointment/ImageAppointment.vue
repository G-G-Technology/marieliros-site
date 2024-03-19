<template>
  <div class="">
    <NuxtImg :src="picturePath" size="w-778 h-472 sm:w-214 sm:h-421" densities="x1 x2" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  picturePath: string;
}>();
</script>

<style></style>
