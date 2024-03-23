<template>
  <Teleport to="body">
    <button
      type="button"
      class="sm:hidden text-dark-brown font-extrabold text-2xl right-6 top-6 fixed z-[100]"
      @click="toggleNav"
    >
      <span :class="showSidebar ? 'pi pi-times text-white' : 'pi pi-bars'"></span>
    </button>
  </Teleport>

  <Teleport to="body">
    <div
      class="fixed min-h-screen bg-light-brown bg-opacity-80 text-dark-brown w-full flex-col pt-16 z-[99]"
      :class="showSidebar ? 'flex' : 'hidden'"
    >
      <ul
        class="nav-items py-3 px-4 font-extrabold lex flex-col w-full text-center text-dark-brown text-xl divide-y divide-cream"
      >
        <li class="py-5">
          <NuxtLink to="/" exact-active-class="text-white" @click="toggleNav">
            <span class="pi pi-home mr-1" />
            Home
          </NuxtLink>
        </li>
        <li v-for="(item, index) in menuItems" :key="index" class="py-5">
          <NuxtLink :to="item.sectionId" active-class="text-white" @click="toggleNav">
            <span :class="item.icon" class="mr-1" />
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
interface MenuItem {
  label: string;
  sectionId: string;
  icon: number;
}

defineProps<{
  menuItems: MenuItem[];
}>();

const showSidebar = ref(false);
const toggleNav = () => (showSidebar.value = !showSidebar.value);
</script>
