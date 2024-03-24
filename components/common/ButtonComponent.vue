<template>
  <NuxtLink
    to="https://wa.me/554891507605?text=Ol%C3%A1%20Marieli%2C%20%0AVenho%20atrav%C3%A9s%20to%20seu%20website%20e%20gostaria%20de%20agendar%20uma%20consulta.%0A"
    target="_blank"
    class="bg-gold rounded-xl flex flex-row items-center py-2"
  >
    <span :class="'pi pi-whatsapp'" class="text-cream pl-3"></span>
    <span class="ml-2 text-cream capitalize font-abhayaLibre text-xs md:text-sm font-bold pr-3">
      {{ buttonLable }}</span
    >
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{
  buttonLable: string;
}>();
</script>

<style></style>
