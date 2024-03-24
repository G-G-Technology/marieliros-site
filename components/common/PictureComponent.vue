<template>
  <div>
    <NuxtImg :src="picturePath" densities="x1 x2" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  picturePath: string;
}>();
</script>

<style></style>
