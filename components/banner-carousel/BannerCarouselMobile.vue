<template>
  <section class="relative w-full group">
    <div class="carousel-inner relative overflow-hidden w-full cursor-pointer" @click="next">
      <div
        v-for="(item, index) in carouselItems"
        :id="`slide-mobile-${index}`"
        :key="index"
        :class="`${active === index ? 'active' : 'left-full'}`"
        class="carousel-item inset-0 relative w-full transform transition-all duration-1000 ease-in-out"
      >
        <CarouselContent :picture-path="item.image" :content-items="item.contentItems" />
      </div>
    </div>

    <!-- Dot indicators -->
    <div
      class="absolute bottom-0 left-0 right-0 flex justify-center items-center h-12 bg-gradient-to-t from-cream/80 to-transparent pointer-events-none"
    >
      <ol class="z-50 flex justify-center gap-2 pointer-events-auto">
        <li
          v-for="(item, index) in carouselItems"
          :key="index"
          :class="`${active === index ? 'bg-gold' : 'bg-beige'}`"
          class="w-2 h-2 rounded-full cursor-pointer transition-colors ease-in-out"
          @click.stop="setActive(index)"
        ></li>
      </ol>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const props = defineProps<{
  images?: Record<string, string>;
}>();

const carouselItems = computed(() => [
  {
    image: props.images?.['carousel-1'] || '/img/FirstImageCarousel.png',
    contentItems: [{ id: 1, part1: 'LUGAR DE SER', part2: 'QUEM SE É', part3: '' }],
  },
  {
    image: props.images?.['carousel-2'] || '/img/SecondImageCarousel.png',
    contentItems: [{ id: 2, part1: 'Atendimento Online', part2: 'para o Mundo', part3: '' }],
  },
  {
    image: props.images?.['carousel-3'] || '/img/ThirdImageCarousel.png',
    contentItems: [{ id: 3, part1: 'Atendimento', part2: 'Online e Presencial', part3: 'Florianópolis' }],
  },
]);

const active = ref(0);

onMounted(() => {
  let index = 0;
  setInterval(() => {
    if (index > carouselItems.value.length - 1) index = 0;
    active.value = index;
    index++;
  }, 5000);
});

function setActive(index: number) {
  active.value = index;
}

function next() {
  active.value = (active.value + 1) % carouselItems.value.length;
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
