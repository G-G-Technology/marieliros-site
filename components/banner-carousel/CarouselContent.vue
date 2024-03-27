<template>
  <div class="relative">
    <PictureComponent :picture-path="picturePath" class="block w-full" alt="slide" />

    <div
      v-for="(item, index) in contentItems"
      :key="index"
      class="absolute bottom-8 left-10 md:bottom-16 md:left-16 text-dark-brown font-cinzel font-bold text-lg md:text-5xl flex flex-col justify-items-start"
    >
      <span> {{ item.part1 }}</span>
      <span> {{ item.part2 }}</span>
      <span> {{ item.part3 }}</span>
      <NuxtLink
        v-if="item.id === 1"
        to="#AboutAppointment"
        class="bg-gold rounded-xl flex flex-col items-center justify-self-center text-cream capitalize font-abhayaLibre text-xs md:text-lg font-bold w-28 md:w-44 md:mt-4 py-1 md:py-2"
      >
        <span> quero falar sobre </span>
        <span> atendimentos</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PictureComponent from '../components/common/PictureComponent.vue';

interface ContentItem {
  id: number;
  part1: string;
  part2: string;
  part3: string;
}

defineProps<{
  picturePath: string;
  contentItems: ContentItem[];
  hideButton: boolean;
}>();
</script>

<style></style>
