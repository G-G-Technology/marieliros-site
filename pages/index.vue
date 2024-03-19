<template>
  <div class="bg-cream">
    <NavBar />
    <AboutMe class="py-10" />
    <AboutAppointment class="py-10" />
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/navbar/NavBar.vue';
import AboutMe from '../components/about/AboutMe.vue';
import AboutAppointment from '../components/Appointment/AboutAppointment.vue';
</script>
