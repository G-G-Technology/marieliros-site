<template>
  <section class="relative w-full group">
    <div class="carousel-inner relative overflow-hidden w-full cursor-pointer" @click="next">
      <div
        v-for="(item, index) in carouselItems"
        :id="`slide-${index}`"
        :key="index"
        :class="`${active === index ? 'active' : 'left-full'}`"
        class="carousel-item inset-0 relative w-full transform transition-all duration-1000 ease-in-out"
      >
        <CarouselContent :picture-path="item.image" :content-items="item.contentItems" />
      </div>
    </div>

    <!-- Prev / Next arrows -->
    <button
      class="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-gold transition-colors rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300"
      aria-label="Slide anterior"
      @click.stop="prev"
    >
      <span class="pi pi-chevron-left text-cream text-sm" />
    </button>
    <button
      class="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-gold transition-colors rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300"
      aria-label="Próximo slide"
      @click.stop="next"
    >
      <span class="pi pi-chevron-right text-cream text-sm" />
    </button>

    <!-- Dot indicators -->
    <div
      class="absolute bottom-0 left-0 right-0 flex justify-center items-center h-16 bg-gradient-to-t from-cream/80 to-transparent pointer-events-none"
    >
      <ol class="z-50 flex justify-center gap-3 pointer-events-auto">
        <li
          v-for="(item, index) in carouselItems"
          :key="index"
          :class="`${active === index ? 'bg-gold' : 'bg-beige'}`"
          class="w-3 h-3 rounded-full cursor-pointer transition-colors ease-in-out"
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

function prev() {
  active.value = (active.value - 1 + carouselItems.value.length) % carouselItems.value.length;
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
