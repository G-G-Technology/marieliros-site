<template>
  <div class="bg-cream m-auto">
    <header>
      <NavBar class="max-w-[1200px] mx-auto" />
    </header>
    <main>
      <BannerCarousel id="BannerCarousel" class="max-sm:hidden max-w-[1200px] mx-auto" />
      <BannerCarouselMobile id="BannerCarouselMobile" class="md:hidden" />
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
import NavBar from '../components/navbar/NavBar.vue';
import AboutMe from '../components/about/AboutMe.vue';
import AboutAppointment from '../components/appointment/AboutAppointment.vue';
import GestaltTherapy from '../components/therapy/GestaltTherapy.vue';
import OfferedServices from '../components/services/OfferedServices.vue';
import ContactSection from '../components/contacts/ContactSection.vue';
import BannerCarousel from '../components/banner-carousel/BannerCarousel.vue';
import BannerCarouselMobile from '../components/banner-carousel/BannerCarouselMobile.vue';
</script>
