<template>
  <nav class="grid grid-cols-8 gap-1 sm:grid-cols-12 sm:gap-4">
    <div class="py-4 pr-4 col-start-2 col-span-3">
      <div class="text-center text-dark-brown font-alexBrush text-3xl sm:text-4xl">Marieli Ros</div>
      <div class="text-center text-gold font-abhayaLibre text-sm sm:text-1xl">Psicóloga Clínica</div>
    </div>
    <div class="max-sm:hidden col-start-6 col-end-12 flex flex-row flex-nowrap items-center justify-center py-3 pl-3">
      <div v-for="(item, index) in menuItems" :key="index" class="p-3 hover:bg-beige">
        <NuxtLink :to="item.sectionId" :class="item.icon">
          <span class="ml-1 text-dark-brown font-abhayaLibre font-bold">{{ item.label }}</span>
        </NuxtLink>
      </div>
    </div>
    <div class="col-span-1 col-start-8 col-end-8 pt-6">
      <SideBar :menu-items="menuItems"></SideBar>
    </div>
  </nav>
</template>

<script setup lang="ts">
import SideBar from '../components/navbar/SideBar.vue';
const menuItems = [
  { label: 'Sobre', sectionId: '#AboutMe', icon: 'pi pi-heart' },
  { label: 'Psicoterapia', sectionId: '#GestaltTherapy', icon: 'pi pi-star' },
  { label: 'Atendimento', sectionId: '#AboutAppointment', icon: 'pi pi-book' },
  {
    label: 'Agendamento',
    sectionId:
      'https://api.whatsapp.com/send?phone=554891507605&text=Ol%C3%A1%20Marieli%2C%20%0AVenho%20atrav%C3%A9s%20to%20seu%20website%20e%20gostaria%20de%20agendar%20uma%20consulta.%0A',
    icon: 'pi pi-whatsapp',
  },
  { label: 'Contatos', sectionId: '#ContactSection', icon: 'pi pi-envelope' },
];
</script>
