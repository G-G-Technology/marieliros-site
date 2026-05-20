<template>
  <div class="relative w-full h-56 sm:h-72 md:h-[420px] lg:h-[540px] overflow-hidden">
    <NuxtImg
      :src="picturePath"
      alt="carousel slide"
      class="w-full h-full object-cover object-center"
      format="webp"
      loading="eager"
    />
    <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    <div class="absolute inset-x-0 bottom-8 md:bottom-16">
      <div class="max-w-[1200px] mx-auto px-10 md:px-16">
        <div
          v-for="(item, index) in contentItems"
          :key="index"
          class="text-cream font-cinzel font-bold text-lg md:text-5xl flex flex-col drop-shadow-md"
        >
          <span>{{ item.part1 }}</span>
          <span>{{ item.part2 }}</span>
          <span>{{ item.part3 }}</span>
          <NuxtLink
            v-if="item.id === 1"
            to="#AboutAppointment"
            class="bg-gold rounded-xl flex flex-col items-center text-cream capitalize font-abhayaLibre text-xs md:text-lg font-bold w-28 md:w-44 md:mt-4 py-1 md:py-2"
          >
            <span>quero falar sobre</span>
            <span>atendimentos</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface ContentItem {
  id: number;
  part1: string;
  part2: string;
  part3: string;
}

defineProps<{
  picturePath: string;
  contentItems: ContentItem[];
}>();
</script>
