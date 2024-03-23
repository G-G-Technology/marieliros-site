<template>
  <div>
    <NuxtImg :src="picturePath" size="100vw sm:50vw md:400px" densities="x1 x2" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  picturePath: string;
}>();
</script>

<style></style>
