<template>
  <div class="bg-gold rounded-xl flex items-center">
    <div class="text-cream px-2 py-2" :class="'pi pi-whatsapp'">
      <span class="ml-2 text-cream capitalize font-abhayaLibre text-sm font-bold"> {{ buttonLable }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  buttonLable: string;
}>();
</script>

<style></style>
