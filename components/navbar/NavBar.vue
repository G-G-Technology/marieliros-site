<template>
  <nav class="grid grid-cols-8 gap-1 sm:grid-cols-12 sm:gap-4">
    <div class="py-4 pr-4 col-start-2 col-span-3">
      <div class="text-center text-dark-brown font-alexBrush text-3xl sm:text-4xl">Marieli Ros</div>
      <div class="text-center text-gold font-abhayaLibre text-sm sm:text-1xl">Psicóloga Clínica</div>
    </div>
    <div class="max-sm:hidden py-3 pl-3 col-start-5 col-end-12 flex flex-row flex-nowrap items-center justify-center">
      <div v-for="(item, index) in menuItems" :key="index" class="p-3 hover:bg-beige" :class="item.icon">
        <span class="ml-2 text-dark-brown font-abhayaLibre font-bold">{{ item.label }}</span>
      </div>
    </div>
    <HamburgerMenu :menu-items="menuItems" />
  </nav>
</template>

<script setup lang="ts">
import HamburgerMenu from '../components/navbar/HamburgerMenu.vue';
const menuItems = [
  { label: 'Home', id: '#home', icon: 'pi pi-home' },
  { label: 'Sobre Mim', id: '#quem-sou', icon: 'pi pi-heart' },
  { label: 'Psicoterapia', id: '#psicoterapia', icon: 'pi pi-star' },
  { label: 'Atendimento', id: '#atendimento', icon: 'pi pi-book' },
  { label: 'Agendamento', id: '#agendamento', icon: 'pi pi-whatsapp' },
  { label: 'Contato', id: '#contato', icon: 'pi pi-envelope' },
];
</script>
