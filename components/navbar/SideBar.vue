<template>
  <div class="sm:hidden">
    <div
      class="absolute min-h-screen bg-light-brown bg-opacity-80 text-dark-brown pt-10 px-2 flex flex-col items-start ease-in-out"
      :class="showSidebar ? 'flex' : 'hidden'"
    >
      <ul v-for="(item, index) in menuItems" :key="index" class="nav-items py-3 px-4 font-extrabold">
        <li :class="item.icon" class="opacity-100 pb-3">
          <span class="ml-1 text-dark-brown font-abhayaLibre font-extrabold text-lg pr-3">{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface MenuItem {
  label?: string;
  id?: number;
  icon?: number;
}

defineProps<{
  menuItems: MenuItem[];
  showSidebar: string;
}>();
</script>
