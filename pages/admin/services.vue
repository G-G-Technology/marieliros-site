<template>
  <div class="min-h-screen bg-cream">
    <header class="bg-white border-b border-beige px-6 py-4 flex items-center gap-4">
      <NuxtLink to="/admin" class="text-dark-brown hover:text-gold transition-colors">
        <span class="pi pi-arrow-left" />
      </NuxtLink>
      <h1 class="font-cinzel font-bold text-dark-brown">Editar Serviços</h1>
    </header>

    <main class="max-w-2xl mx-auto px-6 py-8">
      <p class="font-abhayaLibre text-beige text-sm mb-6">
        Estes são os temas listados na seção "Como posso te ajudar?".
      </p>

      <div class="space-y-3 mb-6">
        <div v-for="(service, index) in services" :key="index" class="flex items-center gap-3">
          <input
            v-model="services[index]"
            type="text"
            class="flex-1 border border-beige rounded-xl px-4 py-2 font-abhayaLibre text-dark-brown focus:outline-none focus:border-gold"
          />
          <button
            class="text-beige hover:text-red-500 transition-colors"
            title="Remover"
            @click="services.splice(index, 1)"
          >
            <span class="pi pi-times" />
          </button>
        </div>
      </div>

      <button
        class="flex items-center gap-2 text-gold font-abhayaLibre font-bold hover:opacity-80 transition-opacity mb-8"
        @click="services.push('')"
      >
        <span class="pi pi-plus" />
        Adicionar serviço
      </button>

      <div class="flex gap-3">
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

      <p v-if="successMsg" class="text-green-700 font-abhayaLibre text-sm mt-4">{{ successMsg }}</p>
      <p v-if="errorMsg" class="text-red-600 font-abhayaLibre text-sm mt-4">{{ errorMsg }}</p>

      <div class="border border-beige rounded-2xl p-6 bg-white mt-4">
        <p class="font-cinzel font-bold text-dark-brown text-sm mb-4">Pré-visualização</p>
        <p
          v-for="service in services.filter((s) => s.trim())"
          :key="service"
          class="text-brickred font-abhayaLibre font-bold text-lg py-1 capitalize"
        >
          {{ service }}
        </p>
        <p v-if="!services.filter((s) => s.trim()).length" class="text-beige font-abhayaLibre text-sm italic">
          Nenhum serviço adicionado ainda.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: false });

const { data } = await useFetch('/api/content');

const services = reactive<string[]>([...(data.value?.services ?? [])]);

const saving = ref(false);
const successMsg = ref('');
const errorMsg = ref('');

async function save() {
  saving.value = true;
  errorMsg.value = '';
  successMsg.value = '';
  try {
    await $fetch('/api/content', {
      method: 'PUT',
      body: { services: services.filter((s) => s.trim()) },
    });
    successMsg.value = 'Serviços salvos com sucesso!';
  } catch {
    errorMsg.value = 'Erro ao salvar. Tente novamente.';
  } finally {
    saving.value = false;
  }
}
</script>
