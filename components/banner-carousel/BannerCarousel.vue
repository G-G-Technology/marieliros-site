<template>
  <section class="grid grid-cols-8 gap-1 md:grid-cols-12 md:gap-4">
    <div class="relative slide col-start-2 col-span-6 md:col-start-2 md:col-span-10">
      <div class="carousel-indicators absolute bottom-0 flex bg-cream h-24 w-full justify-center items-center">
        <ol class="z-50 flex w-4/12 justify-center">
          <li
            v-for="(item, index) in carouselItems"
            :key="index"
            :class="`${active === index ? 'bg-gold' : 'bg-beige'}`"
            class="md:w-4 md:h-4 rounded-full cursor-pointer mx-2 ease-in-out"
            @click="setActive(index)"
          ></li>
        </ol>
      </div>
      <div class="carousel-inner relative overflow-hidden w-full">
        <div
          v-for="(item, index) in carouselItems"
          :id="`slide-${index}`"
          :key="index"
          :class="`${active === index ? 'active' : 'left-full'}`"
          class="carousel-item inset-0 relative w-full transform transition-all duration-1000 ease-in-out"
        >
          <CarouselContent :picture-path="item.image" :content-items="item.contentItems"></CarouselContent>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CarouselContent from '../components/banner-carousel/CarouselContent.vue';

const carouselItems = [
  {
    image: './img/FirstImageCarousel.png',
    contentItems: [{ id: 1, part1: 'LUGAR DE SER', part2: 'QUEM SE É', part3: '' }],
  },
  {
    image: './img/SecondImageCarousel.png',
    contentItems: [{ id: 2, part1: 'Atendimento Online', part2: 'para o Mundo', part3: '' }],
  },
  {
    image: './img/ThirdImageCarousel.png',
    contentItems: [{ id: 3, part1: 'Atendimento', part2: 'Online e Presencial', part3: 'Florianópolis' }],
  },
];

const active = ref(0);

onMounted(() => {
  let index = 0;
  setInterval(() => {
    if (index > carouselItems.length - 1) {
      index = 0;
    }
    active.value = index;
    index++;
  }, 5000);
});

function setActive(index: number) {
  active.value = index;
}
</script>

<style>
.left-full {
  left: -100%;
}

.carousel-item {
  float: left;
  position: relative;
  display: block;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
}

.carousel-item.active {
  left: 0;
}
</style>
