<template>
  <NuxtLink
    :to="`https://wa.me/${whatsapp}?text=Ol%C3%A1%20Marieli%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta.`"
    target="_blank"
    rel="noopener"
    class="fixed bottom-6 right-6 z-50 bg-gold hover:bg-dark-brown transition-colors duration-300 rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
    aria-label="Fale pelo WhatsApp"
  >
    <span class="pi pi-whatsapp text-cream text-2xl" />
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
  whatsapp?: string;
}>();

const whatsapp = computed(() => props.whatsapp ?? '554891507605');
</script>
