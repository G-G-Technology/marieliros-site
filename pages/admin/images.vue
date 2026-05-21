<template>
  <div class="min-h-screen bg-cream">
    <header class="bg-white border-b border-beige px-6 py-4 flex items-center gap-4">
      <NuxtLink to="/admin" class="text-dark-brown hover:text-gold transition-colors">
        <span class="pi pi-arrow-left" />
      </NuxtLink>
      <div>
        <h1 class="font-cinzel font-bold text-dark-brown flex-1">Gerenciar Imagens</h1>
        <p class="font-abhayaLibre text-beige text-xs">Clique em uma imagem para substituí-la</p>
      </div>
      <NuxtLink
        to="/"
        class="ml-auto font-abhayaLibre text-sm text-dark-brown hover:text-gold transition-colors flex items-center gap-1.5"
        ><span class="pi pi-home" />Ver site</NuxtLink
      >
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8">
      <div v-if="loading" class="text-center py-12 font-abhayaLibre text-beige">Carregando imagens...</div>

      <!-- Hero slot — full-width row -->
      <div class="mb-6">
        <div
          v-for="slot in heroSlots"
          :key="slot.id"
          class="bg-white rounded-2xl overflow-hidden shadow-sm border"
          :class="slotErrors[slot.id] ? 'border-red-400' : 'border-beige'"
        >
          <div class="relative bg-beige/20 overflow-hidden" :class="getSlotAspect(slot.id)">
            <img
              v-if="images[slot.id]"
              :src="images[slot.id]"
              :alt="slot.label"
              class="w-full h-full object-cover object-[30%_top]"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-beige">
              <span class="pi pi-image text-3xl" />
            </div>
            <div
              class="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              @click="openUpload(slot.id)"
            >
              <span class="text-white font-abhayaLibre font-bold text-sm">Substituir</span>
            </div>
          </div>
          <div class="px-4 pt-4 pb-1 flex items-center justify-between">
            <div>
              <p class="font-abhayaLibre font-bold text-dark-brown text-sm">{{ slot.label }}</p>
              <p class="font-abhayaLibre text-xs text-beige">{{ SLOT_HINTS[slot.id] }}</p>
            </div>
            <button
              class="bg-gold text-cream text-xs font-abhayaLibre font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity shrink-0 ml-3"
              :disabled="uploading === slot.id"
              @click="openUpload(slot.id)"
            >
              {{ uploading === slot.id ? '...' : 'Trocar' }}
            </button>
          </div>
          <div v-if="slotErrors[slot.id]" class="px-4 pb-4 pt-1">
            <p class="text-red-600 font-abhayaLibre text-xs leading-snug">
              <span class="pi pi-exclamation-triangle mr-1" />
              {{ slotErrors[slot.id] }}
            </p>
          </div>
          <div v-else class="pb-3" />
        </div>
      </div>

      <!-- Remaining slots -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Warning between hero and appointment slots -->
        <div
          v-if="appointmentOrientationMixed"
          class="col-span-full bg-amber-50 border border-amber-300 text-amber-800 font-abhayaLibre text-sm px-4 py-3 rounded-xl flex items-start gap-2"
        >
          <span class="pi pi-exclamation-triangle mt-0.5 shrink-0" />
          <span>
            "Atendimento Presencial" e "Atendimento Online" estão em orientações diferentes (uma vertical, outra
            horizontal). Para melhor resultado, use duas fotos no mesmo formato.
          </span>
        </div>

        <div
          v-for="slot in otherSlots"
          :key="slot.id"
          class="bg-white rounded-2xl overflow-hidden shadow-sm border"
          :class="slotErrors[slot.id] ? 'border-red-400' : 'border-beige'"
        >
          <div class="relative bg-beige/20 overflow-hidden" :class="getSlotAspect(slot.id)">
            <img
              v-if="images[slot.id]"
              :src="
                getSlotFaceRatio(slot.id)
                  ? cloudinaryFaceUrl(images[slot.id], getSlotFaceRatio(slot.id)!)
                  : images[slot.id]
              "
              :alt="slot.label"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-beige">
              <span class="pi pi-image text-3xl" />
            </div>
            <div
              class="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              @click="openUpload(slot.id)"
            >
              <span class="text-white font-abhayaLibre font-bold text-sm">Substituir</span>
            </div>
          </div>

          <div class="px-4 pt-4 pb-1 flex items-center justify-between">
            <div>
              <p class="font-abhayaLibre font-bold text-dark-brown text-sm">{{ slot.label }}</p>
              <p
                class="font-abhayaLibre text-xs"
                :class="LANDSCAPE_ONLY_SLOTS.has(slot.id) ? 'text-amber-600' : 'text-beige'"
              >
                {{ SLOT_HINTS[slot.id] }}
              </p>
            </div>
            <button
              class="bg-gold text-cream text-xs font-abhayaLibre font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity shrink-0 ml-3"
              :disabled="uploading === slot.id"
              @click="openUpload(slot.id)"
            >
              {{ uploading === slot.id ? '...' : 'Trocar' }}
            </button>
          </div>

          <div v-if="slotErrors[slot.id]" class="px-4 pb-4 pt-1">
            <p class="text-red-600 font-abhayaLibre text-xs leading-snug">
              <span class="pi pi-exclamation-triangle mr-1" />
              {{ slotErrors[slot.id] }}
            </p>
          </div>
          <div v-else class="pb-3" />
        </div>
      </div>

      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
    </main>

    <div
      v-if="successMsg"
      class="fixed bottom-6 right-6 bg-dark-brown text-cream font-abhayaLibre text-sm px-4 py-3 rounded-xl shadow-lg"
    >
      {{ successMsg }}
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: false });

// Face-detection crop ratio applied in the preview — mirrors cloudinaryFaceUrl calls in site components
const SLOT_FACE_RATIO: Record<string, string> = {
  'about-online': '4:3',
  'about-presencial': '4:3',
};

// Returns the correct aspect class for a slot, using detected orientation for appointment slots
function getSlotAspect(id: string): string {
  if (id === 'hero') return 'aspect-video';
  if (id === 'about') return 'aspect-[3/4]';
  if (id === 'about-online' || id === 'about-presencial') {
    return presencialPortrait.value || onlinePortrait.value ? 'aspect-[3/4]' : 'aspect-[4/3]';
  }
  return 'aspect-video';
}

// Returns the correct face-crop ratio for a slot — only applied for portrait images
function getSlotFaceRatio(id: string): string | undefined {
  if (id === 'about-online' || id === 'about-presencial') {
    return presencialPortrait.value || onlinePortrait.value ? '3:4' : undefined;
  }
  return SLOT_FACE_RATIO[id];
}

const SLOT_LABELS: Record<string, string> = {
  hero: 'Hero — Foto Principal',
  about: 'Sobre mim',
  'about-online': 'Atendimento Online',
  'about-presencial': 'Atendimento Presencial',
  'how-can-i-help': 'Como posso te ajudar',
  contact: 'Seção de Contato (fundo)',
};

const SLOT_HINTS: Record<string, string> = {
  hero: 'Retrato recomendado (vertical)',
  about: 'Retrato ou paisagem',
  'about-online': 'Retrato ou paisagem',
  'about-presencial': 'Retrato ou paisagem',
  'how-can-i-help': 'Apenas paisagem (horizontal)',
  contact: 'Apenas paisagem (horizontal)',
};

// Portrait photos break these layouts — width must be greater than height.
const LANDSCAPE_ONLY_SLOTS = new Set(['how-can-i-help', 'contact']);

const allSlots = Object.entries(SLOT_LABELS).map(([id, label]) => ({ id, label }));
const heroSlots = allSlots.filter((s) => s.id === 'hero');
const otherSlots = allSlots.filter((s) => s.id !== 'hero');

const images = ref<Record<string, string>>({});
const slotErrors = ref<Record<string, string>>({});
const loading = ref(true);
const uploading = ref<string | null>(null);
const activeSlot = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const successMsg = ref('');

const { data } = await useFetch('/api/images/list');
if (data.value?.images) images.value = data.value.images;
loading.value = false;

function detectPortrait(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.naturalHeight > img.naturalWidth);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

const presencialPortrait = ref(false);
const onlinePortrait = ref(false);
const appointmentOrientationMixed = computed(
  () =>
    !!images.value['about-presencial'] &&
    !!images.value['about-online'] &&
    presencialPortrait.value !== onlinePortrait.value,
);

async function checkAppointmentOrientations() {
  const p = images.value['about-presencial'];
  const o = images.value['about-online'];
  if (p) presencialPortrait.value = await detectPortrait(p);
  if (o) onlinePortrait.value = await detectPortrait(o);
}

onMounted(checkAppointmentOrientations);
watch(() => [images.value['about-presencial'], images.value['about-online']], checkAppointmentOrientations);

function openUpload(slot: string) {
  activeSlot.value = slot;
  delete slotErrors.value[slot];
  fileInput.value?.click();
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Não foi possível ler a imagem.'));
    };
    img.src = url;
  });
}

function setSlotError(slot: string, msg: string) {
  slotErrors.value[slot] = msg;
  setTimeout(() => delete slotErrors.value[slot], 10000);
}

async function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file || !activeSlot.value) return;

  const slot = activeSlot.value;

  if (LANDSCAPE_ONLY_SLOTS.has(slot)) {
    try {
      const { width, height } = await getImageDimensions(file);
      if (height > width) {
        setSlotError(
          slot,
          `Esta foto está na vertical (${width}×${height}px). Use uma foto na horizontal — mais larga do que alta.`,
        );
        if (fileInput.value) fileInput.value.value = '';
        return;
      }
    } catch {
      // Can't read dimensions — allow upload
    }
  }

  uploading.value = slot;
  const formData = new FormData();
  formData.append('slot', slot);
  formData.append('file', file);

  try {
    const result = await $fetch<{ url: string; slot: string }>('/api/images/upload', {
      method: 'POST',
      body: formData,
    });
    images.value[result.slot] = result.url;
    showSuccess(`"${SLOT_LABELS[result.slot]}" atualizada!`);
  } catch {
    setSlotError(slot, 'Erro ao fazer upload. Tente novamente.');
  } finally {
    uploading.value = null;
    if (fileInput.value) fileInput.value.value = '';
  }
}

function showSuccess(msg: string) {
  successMsg.value = msg;
  setTimeout(() => (successMsg.value = ''), 4000);
}
</script>
