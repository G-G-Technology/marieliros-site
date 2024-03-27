<template>
  <div class="bg-cream m-auto">
    <header>
      <NavBar class="max-w-[1200px] mx-auto" />
    </header>
    <main>
      <BannerCarouselMobile v-if="$viewport.isLessThan('tablet')" id="BannerCarouselMobile" />
      <BannerCarousel v-else id="BannerCarousel" class="max-w-[1200px] mx-auto" />

      <AboutMe id="AboutMe" class="max-w-[1200px] mx-auto" />
      <AboutAppointment id="AboutAppointment" class="max-w-[1200px] mx-auto" />
      <GestaltTherapy id="GestaltTherapy" class="max-w-[1200px] mx-auto" />
      <OfferedServices id="OfferedServices" class="max-w-[1200px] mx-auto" />
      <div class="bg-[url('/img/ContactPage.png')] bg-cover bg-center bg-no-repeat">
        <div class="bg-white bg-opacity-80 flex flex-col items-center">
          <div class="max-w-[1200px] mx-auto">
            <ContactSection id="ContactSection" class="" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import NavBar from '../components/navbar/NavBar.vue';
import AboutMe from '../components/about/AboutMe.vue';
import AboutAppointment from '../components/appointment/AboutAppointment.vue';
import GestaltTherapy from '../components/therapy/GestaltTherapy.vue';
import OfferedServices from '../components/services/OfferedServices.vue';
import ContactSection from '../components/contacts/ContactSection.vue';
import BannerCarousel from '../components/banner-carousel/BannerCarousel.vue';
import BannerCarouselMobile from '../components/banner-carousel/BannerCarouselMobile.vue';

const { $viewport } = useNuxtApp();

watch($viewport.breakpoint, (newBreakpoint, oldBreakpoint) => {
  console.log('Breakpoint updated:', oldBreakpoint, '->', newBreakpoint);
});
</script>
