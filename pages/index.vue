<template>
  <div class="bg-cream m-auto">
    <header>
      <NavBar class="max-w-[1200px]" />
    </header>
    <main>
      <AboutMe id="AboutMe" class="pt-16 md:pt-24" />
      <AboutAppointment id="AboutAppointment" class="pt-16 md:pt-24" />
      <GestaltTherapy id="GestaltTherapy" class="pt-16 md:pt-24" />
      <OfferedServices id="OfferedServices" class="pt-16 md:pt-24" />
      <div class="bg-[url('~/img/ContactPage.png')] bg-cover bg-center bg-no-repeat">
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
</script>
