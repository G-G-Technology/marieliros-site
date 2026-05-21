<template>
  <section class="w-full">
    <!-- Full-bleed photo with gradient overlay -->
    <div class="relative w-full overflow-hidden" style="height: clamp(420px, 60vw, 640px)">
      <NuxtImg
        :src="heroImage"
        alt="Marieli Ros — Psicóloga Clínica"
        class="absolute inset-0 w-full h-full object-cover object-[30%_top]"
        format="webp"
        loading="eager"
      />

      <!-- Desktop: gradient from right -->
      <div class="absolute inset-0 hidden md:block bg-gradient-to-l from-cream/95 via-cream/60 to-transparent" />
      <!-- Mobile: gradient from bottom -->
      <div class="absolute inset-0 md:hidden bg-gradient-to-t from-cream/95 via-cream/50 to-transparent" />

      <!-- Logo — top left, aligned with content column -->
      <div class="absolute top-6 md:top-8 inset-x-0">
        <div class="max-w-[1200px] mx-auto px-6 md:px-16">
        <div class="flex items-center gap-0 w-fit mx-auto md:mx-0">
          <img
            src="/img/logo.png"
            alt=""
            aria-hidden="true"
            class="h-14 md:h-20 w-auto flex-shrink-0 mix-blend-multiply select-none pointer-events-none"
          />
          <div class="-ml-2">
            <div class="text-dark-brown font-alexBrush text-3xl md:text-5xl leading-tight whitespace-nowrap drop-shadow-sm">
              Marieli Ros
            </div>
            <div class="text-gold font-abhayaLibre text-sm md:text-base whitespace-nowrap">Psicóloga Clínica</div>
          </div>
        </div>
        </div>
      </div>

      <!-- Text content — right side on desktop, bottom on mobile -->
      <div class="absolute inset-0 flex items-center">
        <div class="max-w-[1200px] w-full mx-auto px-6 md:px-16 flex md:justify-end">
          <div class="flex flex-col items-start gap-4 w-full md:w-[52%] mt-auto mb-10 md:mt-0 md:mb-0">
            <p
              class="font-cinzel font-bold text-dark-brown text-3xl sm:text-4xl md:text-5xl leading-snug whitespace-pre-line drop-shadow-sm"
            >
              {{ tagline }}
            </p>
            <div class="flex items-start gap-2 font-abhayaLibre text-dark-brown text-base md:text-lg leading-relaxed whitespace-pre-line">
              <span class="pi pi-map-marker text-gold text-sm shrink-0 mt-1" />
              {{ subtitle }}
            </div>
            <NuxtLink
              :to="`https://wa.me/${whatsapp}?text=Ol%C3%A1%20Marieli%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta.`"
              target="_blank"
              rel="noopener"
              class="mt-1 self-end md:self-start bg-gold text-cream font-abhayaLibre font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span class="pi pi-whatsapp" />
              Agendar Agora
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  images?: Record<string, string>;
  hero?: { tagline?: string; subtitle?: string } | null;
  contact?: { whatsapp: string; email: string; instagram: string } | null;
}>();

const heroImage = computed(() => props.images?.['hero'] || '/img/Hero.png');
const tagline = computed(() => props.hero?.tagline || 'LUGAR DE SER\nQUEM SE É');
const subtitle = computed(
  () => props.hero?.subtitle || 'Atendimento presencial em Florianópolis e online para o mundo.',
);
const whatsapp = computed(() => props.contact?.whatsapp ?? '554891507605');
</script>
