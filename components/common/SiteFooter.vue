<template>
  <footer class="bg-dark-brown py-6 px-4">
    <div
      class="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-abhayaLibre text-sm"
    >
      <span class="text-beige">© {{ year }} Marieli Ros — CRP 12/17275</span>
      <div class="flex items-center gap-5">
        <NuxtLink
          :to="`https://www.instagram.com/${instagram}/`"
          target="_blank"
          rel="noopener"
          class="text-beige hover:text-gold transition-colors flex items-center gap-1.5"
        >
          <span class="pi pi-instagram" />
          @{{ instagram }}
        </NuxtLink>
        <NuxtLink
          :to="`https://wa.me/${whatsapp}`"
          target="_blank"
          rel="noopener"
          class="text-beige hover:text-gold transition-colors flex items-center gap-1.5"
        >
          <span class="pi pi-whatsapp" />
          WhatsApp
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const props = defineProps<{
  contact?: { whatsapp: string; email: string; instagram: string } | null;
}>();

const whatsapp = computed(() => props.contact?.whatsapp ?? '554891507605');
const instagram = computed(() => props.contact?.instagram ?? 'psi.marieliros');
const year = new Date().getFullYear();
</script>
