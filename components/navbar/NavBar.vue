<template>
  <nav class="grid grid-cols-12 gap-4">
    <div class="py-4 pr-4 col-start-2 col-span-2">
      <div>Marieli</div>
    </div>
    <div class="col-start-5 col-end-12 flex flex-row">
      <div v-for="(item, index) in menuItems" :key="index" class="p-4 hover:bg-red-500">
        {{ item.label }}
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const menuItems = [
  { label: 'Home', id: '#home' },
  { label: 'Quem sou', id: '#quem-sou' },
  { label: 'Psicoterapia', id: '#psicoterapia' },
  { label: 'Home', id: '#home' },
];
</script>
