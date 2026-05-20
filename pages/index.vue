<template>
  <div class="bg-cream m-auto">
    <header>
      <NavBar class="max-w-[1200px] mx-auto" />
    </header>
    <main>
      <BannerCarouselMobile v-if="$viewport.isLessThan('tablet')" id="BannerCarouselMobile" :images="images" />
      <BannerCarousel v-else id="BannerCarousel" :images="images" />

      <AboutMe id="AboutMe" class="max-w-[1200px] mx-auto fade-section" :bio="bio" :images="images" />
      <AboutAppointment id="AboutAppointment" class="max-w-[1200px] mx-auto fade-section" :images="images" />
      <GestaltTherapy id="GestaltTherapy" class="max-w-[1200px] mx-auto fade-section" :therapy="therapy" />
      <OfferedServices
        id="OfferedServices"
        class="max-w-[1200px] mx-auto fade-section"
        :services="services"
        :images="images"
      />
      <div class="bg-cover bg-center bg-no-repeat fade-section" :style="contactBg">
        <div class="bg-white bg-opacity-80 flex flex-col items-center">
          <div class="max-w-[1200px] mx-auto">
            <ContactSection id="ContactSection" :contact="contact" />
          </div>
        </div>
      </div>
    </main>
    <SiteFooter :contact="contact" />
    <WhatsAppFloat :whatsapp="contact?.whatsapp" />
  </div>
</template>

<script setup lang="ts">
const { $viewport } = useNuxtApp();

const { data } = await useFetch('/api/content');

const bio = computed(() => data.value?.bio ?? null);
const therapy = computed(() => data.value?.therapy ?? null);
const services = computed(() => data.value?.services ?? []);
const contact = computed(() => data.value?.contact ?? null);
const images = computed(() => data.value?.images ?? {});

const contactBg = computed(() => {
  const url = images.value.contact || '/img/ContactPage.png';
  return { backgroundImage: `url('${url}')` };
});
</script>
