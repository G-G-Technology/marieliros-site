<template>
  <section class="grid grid-cols-8 gap-1 md:grid-cols-12 md:gap-4 pt-16 md:pt-24">
    <div class="col-start-2 col-span-6 md:col-start-2 md:col-span-10">
      <div class="text-dark-brown font-cinzel text-xl md:text-3xl font-bold pb-3 capitalize">Como posso te ajudar?</div>
      <PictureComponent :picture-path="howCanIHelpImage" alt="Como posso te ajudar" />
      <div class="mt-6 space-y-2">
        <div v-for="service in displayServices" :key="service" class="flex items-center gap-3">
          <span class="text-gold font-abhayaLibre font-bold text-lg leading-none">✦</span>
          <span class="text-brickred font-abhayaLibre text-xl font-bold capitalize">{{ service }}</span>
        </div>
      </div>
    </div>
    <div
      class="col-start-5 col-span-3 md:col-start-6 md:col-span-2 pt-0 pb-6 md:pb-12 flex flex-row items-center justify-self-center"
    >
      <ButtonComponent :button-lable="'Agendar Sessão'" />
    </div>
  </section>
</template>

<script lang="ts" setup>
const DEFAULT_SERVICES = [
  'Ansiedade',
  'Problemas de autoestima',
  'Depressão',
  'Dificuldades de relacionamento',
  'Problemas de saúde comportamental',
];

const props = defineProps<{
  services?: string[];
  images?: Record<string, string>;
}>();

const displayServices = computed(() => (props.services?.length ? props.services : DEFAULT_SERVICES));
const howCanIHelpImage = computed(() => props.images?.['how-can-i-help'] || '/img/HowCanIHelp.png');
</script>
