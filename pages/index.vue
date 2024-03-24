<template>
  <div class="bg-cream m-auto">
    <div class="max-w-[1200px] mx-auto">
      <header>
        <NavBar class="pt-4 md:pt-8" />
      </header>
      <main>
        <AboutMe id="AboutMe" class="pt-16 md:pt-24" />
        <AboutAppointment id="AboutAppointment" class="pt-16 md:pt-24" />
        <GestaltTherapy id="GestaltTherapy" class="pt-16 md:pt-24" />
        <OfferedServices id="OfferedServices" class="pt-16 md:pt-24" />
        <ContactSection id="ContactSection" class="pt-16 md:pt-24" />
      </main>
    </div>
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
