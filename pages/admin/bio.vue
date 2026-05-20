<template>
  <div class="min-h-screen bg-cream">
    <header class="bg-white border-b border-beige px-6 py-4 flex items-center gap-4">
      <NuxtLink to="/admin" class="text-dark-brown hover:text-gold transition-colors">
        <span class="pi pi-arrow-left" />
      </NuxtLink>
      <h1 class="font-cinzel font-bold text-dark-brown">Editar Sobre Mim</h1>
    </header>

    <main class="max-w-2xl mx-auto px-6 py-8 space-y-6">
      <div
        class="bg-beige/20 border border-beige rounded-xl px-4 py-3 text-sm font-abhayaLibre text-dark-brown space-y-1"
      >
        <p>
          O título <strong>"Muito Prazer, Eu sou a Marieli"</strong> já aparece automaticamente no site — não precisa
          escrevê-lo aqui.
        </p>
        <p>
          Os títulos <strong>Formação</strong> e <strong>Atuação</strong> também aparecem automaticamente — escreva
          apenas o conteúdo de cada seção.
        </p>
      </div>

      <div>
        <label class="block font-abhayaLibre font-bold text-dark-brown mb-1">Apresentação</label>
        <p class="font-abhayaLibre text-beige text-xs mb-2">
          Parágrafo que aparece logo abaixo do seu nome. Fale sobre sua abordagem e missão.
        </p>
        <textarea
          v-model="form.mainParagraph"
          rows="4"
          placeholder="Ex: Sou Psicóloga e Gestalt-terapeuta, com meu trabalho busco auxiliar..."
          class="w-full border border-beige rounded-xl px-4 py-3 font-abhayaLibre text-dark-brown focus:outline-none focus:border-gold resize-none"
        />
      </div>

      <div>
        <label class="block font-abhayaLibre font-bold text-dark-brown mb-1">Formação</label>
        <p class="font-abhayaLibre text-beige text-xs mb-2">
          Apenas o texto — o título "Formação" já aparece automaticamente no site.
        </p>
        <textarea
          v-model="form.education"
          rows="4"
          placeholder="Ex: Psicóloga (CRP 12/17275), graduada em 2018 pela Universidade..."
          class="w-full border border-beige rounded-xl px-4 py-3 font-abhayaLibre text-dark-brown focus:outline-none focus:border-gold resize-none"
        />
      </div>

      <div>
        <label class="block font-abhayaLibre font-bold text-dark-brown mb-1">Atuação</label>
        <p class="font-abhayaLibre text-beige text-xs mb-2">
          Apenas o texto — o título "Atuação" já aparece automaticamente no site.
        </p>
        <textarea
          v-model="form.practice"
          rows="3"
          placeholder="Ex: Trabalho com atendimentos individuais, a partir dos 16 anos..."
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

      <div class="border border-beige rounded-2xl p-6 bg-white mt-4">
        <p class="font-cinzel font-bold text-dark-brown text-sm mb-4 uppercase tracking-wide">Pré-visualização</p>
        <p class="font-cinzel font-bold text-dark-brown text-lg">Muito Prazer,</p>
        <p class="font-cinzel font-bold text-gold text-lg mb-3">Eu sou a Marieli</p>
        <p class="text-dark-brown font-abhayaLibre text-base text-justify whitespace-pre-wrap">
          {{ form.mainParagraph }}
        </p>
        <p class="text-gold font-abhayaLibre font-bold text-lg mt-5 mb-1">Formação</p>
        <p class="text-dark-brown font-abhayaLibre text-base text-justify whitespace-pre-wrap">{{ form.education }}</p>
        <p class="text-gold font-abhayaLibre font-bold text-lg mt-5 mb-1">Atuação</p>
        <p class="text-dark-brown font-abhayaLibre text-base text-justify whitespace-pre-wrap">{{ form.practice }}</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: false });

const { data } = await useFetch('/api/content');

const form = reactive({
  mainParagraph: data.value?.bio?.mainParagraph ?? '',
  education: data.value?.bio?.education ?? '',
  practice: data.value?.bio?.practice ?? '',
});

const saving = ref(false);
const successMsg = ref('');
const errorMsg = ref('');

async function save() {
  saving.value = true;
  errorMsg.value = '';
  successMsg.value = '';
  try {
    await $fetch('/api/content', { method: 'PUT', body: { bio: { ...form } } });
    successMsg.value = 'Alterações salvas com sucesso!';
  } catch {
    errorMsg.value = 'Erro ao salvar. Tente novamente.';
  } finally {
    saving.value = false;
  }
}
</script>
