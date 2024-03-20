<template>
  <nav class="grid grid-cols-8 gap-1 sm:grid-cols-12 sm:gap-4">
    <div class="py-4 pr-4 col-start-2 col-span-3">
      <div class="text-center text-dark-brown font-alexBrush text-3xl sm:text-4xl">Marieli Ros</div>
      <div class="text-center text-gold font-abhayaLibre text-sm sm:text-1xl">Psicóloga Clínica</div>
    </div>
    <div class="max-sm:hidden col-start-6 col-end-12 flex flex-row flex-nowrap items-center justify-center py-3 pl-3">
      <div v-for="(item, index) in menuItems" :key="index" class="p-3 hover:bg-beige" :class="item.icon">
        <span class="ml-2 text-dark-brown font-abhayaLibre font-bold">{{ item.label }}</span>
      </div>
    </div>
    <div class="col-span-1 col-start-8 col-end-8">
      <div class="pt-6 col-end-8">
        <button type="button" class="sm:hidden text-dark-brown font-extrabold" @click="toggleNav">
          <span :class="showSidebar ? 'pi pi-times' : 'pi pi-bars'"></span>
        </button>
      </div>
    </div>
    <SideBar :menu-items="menuItems" :show-sidebar="showSidebar" class="col-start-5"></SideBar>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SideBar from '../components/navbar/SideBar.vue';
const menuItems = [
  { label: 'Sobre', id: '#quem-sou', icon: 'pi pi-heart' },
  { label: 'Psicoterapia', id: '#psicoterapia', icon: 'pi pi-star' },
  { label: 'Atendimento', id: '#atendimento', icon: 'pi pi-book' },
  { label: 'Agendamento', id: '#agendamento', icon: 'pi pi-whatsapp' },
  { label: 'Contato', id: '#contato', icon: 'pi pi-envelope' },
];
const showSidebar = ref(false);
const toggleNav = () => (showSidebar.value = !showSidebar.value);
</script>
