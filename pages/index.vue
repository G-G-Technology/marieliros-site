<template>
  <div class="bg-cream m-auto">
    <div class="max-w-[1200px] mx-auto">
      <header>
        <NavBar />
      </header>
      <main>
        <AboutMe id="AboutMe" class="py-10" />
        <AboutAppointment id="AboutAppointment" class="py-10" />
        <GestaltTherapy id="GestaltTherapy" class="py-10" />
        <ContactSection id="ContactSection" class="py-10" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/navbar/NavBar.vue';
import AboutMe from '../components/about/AboutMe.vue';
import AboutAppointment from '../components/appointment/AboutAppointment.vue';
import GestaltTherapy from '../components/therapy/GestaltTherapy.vue';
import ContactSection from '../components/contacts/ContactSection.vue';
</script>
