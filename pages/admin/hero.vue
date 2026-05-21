<template>
  <div class="min-h-screen bg-cream">
    <header class="bg-white border-b border-beige px-6 py-4 flex items-center gap-4">
      <NuxtLink to="/admin" class="text-dark-brown hover:text-gold transition-colors">
        <span class="pi pi-arrow-left" />
      </NuxtLink>
      <div>
        <h1 class="font-cinzel font-bold text-dark-brown">Seção Hero</h1>
        <p class="font-abhayaLibre text-beige text-xs">Texto de destaque na página inicial</p>
      </div>
      <NuxtLink
        to="/"
        class="ml-auto font-abhayaLibre text-sm text-dark-brown hover:text-gold transition-colors flex items-center gap-1.5"
      >
        <span class="pi pi-home" />Ver site
      </NuxtLink>
    </header>

    <main class="max-w-2xl mx-auto px-6 py-8">
      <div class="bg-white rounded-2xl border border-beige shadow-sm p-6 flex flex-col gap-5">
        <div class="flex flex-col gap-1.5">
          <label class="font-abhayaLibre font-bold text-dark-brown text-sm">Frase Principal</label>
          <p class="font-abhayaLibre text-beige text-xs">Use Enter para quebrar linha. Exibida em fonte grande em destaque.</p>
          <textarea
            v-model="form.tagline"
            rows="3"
            class="border border-beige rounded-xl px-4 py-3 font-abhayaLibre text-dark-brown text-sm resize-none focus:outline-none focus:border-gold transition-colors"
            placeholder="LUGAR DE SER&#10;QUEM SE É"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="font-abhayaLibre font-bold text-dark-brown text-sm">Subtítulo</label>
          <p class="font-abhayaLibre text-beige text-xs">Use Enter para quebrar linha. Exibido abaixo da frase, com ícone de localização.</p>
          <textarea
            v-model="form.subtitle"
            rows="2"
            class="border border-beige rounded-xl px-4 py-3 font-abhayaLibre text-dark-brown text-sm resize-none focus:outline-none focus:border-gold transition-colors"
            placeholder="Atendimento presencial em Florianópolis e online para o mundo."
          />
        </div>

        <!-- Preview -->
        <div class="border border-beige rounded-xl overflow-hidden">
          <p class="font-abhayaLibre text-xs text-beige px-4 py-2 bg-beige/10 border-b border-beige">Pré-visualização</p>
          <div class="px-6 py-6 bg-cream flex flex-col gap-4">
            <p class="font-cinzel font-bold text-dark-brown text-2xl leading-snug whitespace-pre-line">
              {{ form.tagline || 'LUGAR DE SER\nQUEM SE É' }}
            </p>
            <p class="flex items-start gap-2 font-abhayaLibre text-dark-brown text-sm leading-relaxed whitespace-pre-line">
              <span class="pi pi-map-marker text-gold text-xs mt-1 shrink-0" />
              {{ form.subtitle || 'Atendimento presencial em Florianópolis e online para o mundo.' }}
            </p>
            <span class="bg-gold text-cream font-abhayaLibre font-bold text-xs px-4 py-2 rounded-xl inline-flex items-center gap-1.5 w-fit">
              <span class="pi pi-whatsapp" />Agendar Agora
            </span>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-1">
          <p v-if="successMsg" class="font-abhayaLibre text-sm text-green-600 flex items-center gap-1.5">
            <span class="pi pi-check-circle" />{{ successMsg }}
          </p>
          <p v-if="errorMsg" class="font-abhayaLibre text-sm text-red-600 flex items-center gap-1.5">
            <span class="pi pi-exclamation-triangle" />{{ errorMsg }}
          </p>
          <button
            class="bg-gold text-cream font-abhayaLibre font-bold text-sm px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            :disabled="saving"
            @click="save"
          >
            {{ saving ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: false });

const form = reactive({ tagline: '', subtitle: '' });
const saving = ref(false);
const successMsg = ref('');
const errorMsg = ref('');

const { data } = await useFetch('/api/content');
if (data.value?.hero) {
  form.tagline = data.value.hero.tagline ?? '';
  form.subtitle = data.value.hero.subtitle ?? '';
}

async function save() {
  saving.value = true;
  errorMsg.value = '';
  successMsg.value = '';
  try {
    await $fetch('/api/content', {
      method: 'PUT',
      body: { hero: { tagline: form.tagline, subtitle: form.subtitle } },
    });
    successMsg.value = 'Salvo!';
    setTimeout(() => (successMsg.value = ''), 3000);
  } catch {
    errorMsg.value = 'Erro ao salvar. Tente novamente.';
  } finally {
    saving.value = false;
  }
}
</script>
