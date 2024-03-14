<template>
  <nav class="grid grid-cols-12 gap-4">
    <div class="py-4 pr-4 col-start-2 col-span-2">
      <div class="text-center text-dark-brown font-alexBrush text-4xl">Marieli Ros</div>
      <div class="text-center text-gold font-abhayaLibre text-xl">Psicóloga Clínica</div>
    </div>
    <div class="py-4 pl-4 col-start-5 col-end-12 flex flex-row">
      <div v-for="(item, index) in menuItems" :key="index" class="p-4 hover:bg-beige" :class="item.icon">
        <span class="ml-2 text-dark-brown font-abhayaLibre font-bold">{{ item.label }}</span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const menuItems = [
  { label: 'Home', id: '#home', icon: 'pi pi-home' },
  { label: 'Quem sou', id: '#quem-sou', icon: 'pi pi-heart' },
  { label: 'Psicoterapia', id: '#psicoterapia', icon: 'pi pi-star' },
  { label: 'Atendimento', id: '#atendimento', icon: 'pi pi-book' },
  { label: 'Agendamento', id: '#agendamento', icon: 'pi pi-whatsapp' },
  { label: 'Contato', id: '#contato', icon: 'pi pi-envelope' },
];
</script>
