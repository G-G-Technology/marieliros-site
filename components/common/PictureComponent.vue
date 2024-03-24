<template>
  <div>
    <img class="h-auto max-w-full" :src="picturePath" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  picturePath: string;
}>();
</script>

<style></style>
