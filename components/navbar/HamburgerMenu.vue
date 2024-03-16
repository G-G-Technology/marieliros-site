<template>
  <div class="md:hidden col-start-6 col-span-2 pt-4">
    <div class="flex justify-end pr-2">
      <button type="button" class="text-dark-brown font-extrabold" @click="toggleNav">
        <span class="pi pi-align-justify"></span>
      </button>
    </div>
    <div class="absolute bg-light-brown bg-opacity-40 rounded-md pt-6 px-2 flex flex-col items-end">
      <ul
        v-for="(item, index) in menuItems"
        :key="index"
        class="relative nav-items hover:bg-beige"
        :class="showMenu ? 'flex' : 'hidden'"
      >
        <li :class="item.icon" class="opacity-100 pb-3">
          <span class="ml-1 text-dark-brown font-abhayaLibre font-bold text-lg pr-3">{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const menuItems = [
  { label: 'Home', id: '#home', icon: 'pi pi-home' },
  { label: 'Quem sou', id: '#quem-sou', icon: 'pi pi-heart' },
  { label: 'Psicoterapia', id: '#psicoterapia', icon: 'pi pi-star' },
  { label: 'Atendimento', id: '#atendimento', icon: 'pi pi-book' },
  { label: 'Agendamento', id: '#agendamento', icon: 'pi pi-whatsapp' },
  { label: 'Contato', id: '#contato', icon: 'pi pi-envelope' },
];

const showMenu = ref(false);
const toggleNav = () => (showMenu.value = !showMenu.value);
</script>
