<template>
  <div class="min-h-screen bg-cream">
    <header class="bg-white border-b border-beige px-6 py-4 flex items-center gap-4">
      <NuxtLink to="/admin" class="text-dark-brown hover:text-gold transition-colors">
        <span class="pi pi-arrow-left" />
      </NuxtLink>
      <h1 class="font-cinzel font-bold text-dark-brown flex-1">Editar Textos de Terapia</h1>
      <NuxtLink
        to="/"
        class="ml-auto font-abhayaLibre text-sm text-dark-brown hover:text-gold transition-colors flex items-center gap-1.5"
        ><span class="pi pi-home" />Ver site</NuxtLink
      >
    </header>

    <main class="max-w-2xl mx-auto px-6 py-8 space-y-6">
      <div
        class="bg-beige/20 border border-beige rounded-xl px-4 py-3 text-sm font-abhayaLibre text-dark-brown space-y-1"
      >
        <p>
          Os títulos <strong>"Sobre a Gestalt-Terapia"</strong> e <strong>"Sobre a Psicoterapia"</strong> aparecem
          automaticamente — escreva apenas o conteúdo de cada seção.
        </p>
      </div>

      <div>
        <label class="block font-abhayaLibre font-bold text-dark-brown mb-1">Sobre a Gestalt-Terapia</label>
        <p class="font-abhayaLibre text-beige text-xs mb-2">Texto explicativo sobre a abordagem gestáltica.</p>
        <textarea
          v-model="form.gestalt"
          rows="6"
          class="w-full border border-beige rounded-xl px-4 py-3 font-abhayaLibre text-dark-brown focus:outline-none focus:border-gold resize-none"
        />
      </div>

      <div>
        <label class="block font-abhayaLibre font-bold text-dark-brown mb-1">Sobre a Psicoterapia</label>
        <p class="font-abhayaLibre text-beige text-xs mb-2">Texto sobre o que é psicoterapia.</p>
        <textarea
          v-model="form.psicoterapia"
          rows="6"
          class="w-full border border-beige rounded-xl px-4 py-3 font-abhayaLibre text-dark-brown focus:outline-none focus:border-gold resize-none"
        />
      </div>

      <div class="flex gap-3 pt-2">
        <button
          class="bg-gold text-cream font-abhayaLibre font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          :disabled="saving"
          @click="save"
        >
          {{ saving ? 'Salvando...' : 'Salvar alterações' }}
        </button>
        <NuxtLink to="/admin" class="font-abhayaLibre text-beige py-3 hover:text-dark-brown transition-colors">
          Cancelar
        </NuxtLink>
      </div>

      <p v-if="successMsg" class="text-green-700 font-abhayaLibre text-sm">{{ successMsg }}</p>
      <p v-if="errorMsg" class="text-red-600 font-abhayaLibre text-sm">{{ errorMsg }}</p>

      <div class="border border-beige rounded-2xl p-6 bg-white mt-4 space-y-4">
        <p class="font-cinzel font-bold text-dark-brown text-sm uppercase tracking-wide">Pré-visualização</p>
        <div>
          <p class="text-dark-brown font-cinzel text-lg font-bold mb-2">SOBRE A GESTALT-TERAPIA</p>
          <p class="text-dark-brown font-abhayaLibre text-base text-justify whitespace-pre-wrap">{{ form.gestalt }}</p>
        </div>
        <div>
          <p class="text-dark-brown font-cinzel text-lg font-bold mb-2">SOBRE A PSICOTERAPIA</p>
          <p class="text-dark-brown font-abhayaLibre text-base text-justify whitespace-pre-wrap">
            {{ form.psicoterapia }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: false });

const { data } = await useFetch('/api/content');

const form = reactive({
  gestalt: data.value?.therapy?.gestalt ?? '',
  psicoterapia: data.value?.therapy?.psicoterapia ?? '',
});

const saving = ref(false);
const successMsg = ref('');
const errorMsg = ref('');

async function save() {
  saving.value = true;
  errorMsg.value = '';
  successMsg.value = '';
  try {
    await $fetch('/api/content', { method: 'PUT', body: { therapy: { ...form } } });
    successMsg.value = 'Alterações salvas com sucesso!';
  } catch {
    errorMsg.value = 'Erro ao salvar. Tente novamente.';
  } finally {
    saving.value = false;
  }
}
</script>
