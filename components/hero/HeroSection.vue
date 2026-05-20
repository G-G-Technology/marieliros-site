<template>
  <section class="w-full">
    <!-- Full-width hero image with headline -->
    <div class="relative w-full h-64 sm:h-80 md:h-[480px] lg:h-[580px] overflow-hidden">
      <NuxtImg
        :src="heroImage"
        alt="Marieli Ros — Psicóloga Clínica"
        class="w-full h-full object-cover object-center"
        format="webp"
        loading="eager"
      />
      <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
      <div class="absolute inset-x-0 bottom-8 md:bottom-14">
        <div class="max-w-[1200px] mx-auto px-10 md:px-16">
          <p class="text-cream font-cinzel font-bold text-2xl md:text-5xl drop-shadow-md leading-snug">
            Lugar de Ser<br />Quem Se É
          </p>
        </div>
      </div>
    </div>

    <!-- Service highlights + CTA -->
    <div class="bg-white border-b border-beige/60">
      <div
        class="max-w-[1200px] mx-auto px-10 md:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <div class="flex flex-col sm:flex-row gap-4 md:gap-10">
          <div class="flex items-center gap-2 font-abhayaLibre text-dark-brown text-sm md:text-base">
            <span class="pi pi-globe text-gold text-sm" />
            Atendimento Online para o Mundo
          </div>
          <div class="flex items-center gap-2 font-abhayaLibre text-dark-brown text-sm md:text-base">
            <span class="pi pi-map-marker text-gold text-sm" />
            Atendimento Presencial em Florianópolis
          </div>
        </div>
        <NuxtLink
          :to="`https://wa.me/${whatsapp}?text=Ol%C3%A1%20Marieli%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta.`"
          target="_blank"
          rel="noopener"
          class="bg-gold text-cream font-abhayaLibre font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0"
        >
          <span class="pi pi-whatsapp" />
          Agendar Agora
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  images?: Record<string, string>;
  contact?: { whatsapp: string; email: string; instagram: string } | null;
}>();

const heroImage = computed(() => props.images?.['carousel-1'] || '/img/FirstImageCarousel.png');
const whatsapp = computed(() => props.contact?.whatsapp ?? '554891507605');
</script>
