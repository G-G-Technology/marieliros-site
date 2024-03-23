<template>
  <div class="bg-cream m-auto">
    <div class="max-w-[1200px] mx-auto">
      <NavBar />
      <main>
        <AboutMe id="AboutMe" class="py-10" />
        <AboutAppointment id="AboutAppointment" class="py-10" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/navbar/NavBar.vue';
import AboutMe from '../components/about/AboutMe.vue';
import AboutAppointment from '../components/appointment/AboutAppointment.vue';
</script>
