<template>
  <section class="grid grid-cols-8 gap-1 md:grid-cols-12 md:gap-4 pt-16 md:pt-24">
    <div class="col-start-2 col-span-6 md:col-start-2 md:col-span-10 flex flex-col items-start">
      <h1 class="text-dark-brown font-cinzel text-xl md:text-3xl font-bold pb-2">Como Funcionam Os Atendimentos?</h1>
      <div class="text-dark-brown font-abhayaLibre text-lg md:text-xl text-justify pt-3">
        Os encontros acontecem após agendamento prévio e costumam durar aproximadamente 50 minutos, tendo periodicidade
        semanal ou quinzenal, dependendo da necessidade.
      </div>
      <div class="text-dark-brown font-abhayaLibre font-bold text-lg md:text-xl text-justify pb-4">
        Podendo ser realizado em duas modalidades:
      </div>

      <div class="flex flex-col md:flex-row gap-4 w-full">
        <div class="flex-1">
          <AppointmentType
            :picture-path="presencialSrc"
            :description="'Presencial: o consulente se desloca até o consultório no dia e horário agendado.'"
            :is-portrait="portraitWins"
          />
        </div>
        <div class="flex-1">
          <AppointmentType
            :picture-path="onlineSrc"
            :description="'Online: no dia e horário agendado a sessão é realizada via Google Meet.'"
            :is-portrait="portraitWins"
          />
        </div>
      </div>
    </div>
    <div
      class="col-start-5 col-span-3 md:col-start-6 md:col-span-2 pt-2 md:pt-0 pb-6 md:pb-12 flex flex-row items-center justify-self-center"
    >
      <ButtonComponent :button-lable="'Agendar Agora'" />
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  images?: Record<string, string>;
}>();

const presencialSrc = computed(() => props.images?.['about-presencial'] || '/img/AboutPresencial.png');
const onlineSrc = computed(() => props.images?.['about-online'] || '/img/AboutOnline.png');

const presencialPortrait = ref(false);
const onlinePortrait = ref(false);

function detectPortrait(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.naturalHeight > img.naturalWidth);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

async function detectOrientations() {
  [presencialPortrait.value, onlinePortrait.value] = await Promise.all([
    detectPortrait(presencialSrc.value),
    detectPortrait(onlineSrc.value),
  ]);
}

const portraitWins = computed(() => presencialPortrait.value || onlinePortrait.value);

onMounted(detectOrientations);
watch([presencialSrc, onlineSrc], detectOrientations);
</script>
