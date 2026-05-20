<template>
  <div class="min-h-screen bg-cream">
    <header class="bg-white border-b border-beige px-6 py-4 flex items-center gap-4">
      <NuxtLink to="/admin" class="text-dark-brown hover:text-gold transition-colors">
        <span class="pi pi-arrow-left" />
      </NuxtLink>
      <h1 class="font-cinzel font-bold text-dark-brown">Editar Contatos</h1>
    </header>

    <main class="max-w-2xl mx-auto px-6 py-8 space-y-6">
      <div>
        <label class="block font-abhayaLibre font-bold text-dark-brown mb-2">
          WhatsApp <span class="font-normal text-beige text-sm">(apenas números, ex: 554891507605)</span>
        </label>
        <input
          v-model="form.whatsapp"
          type="text"
          placeholder="554891507605"
          class="w-full border border-beige rounded-xl px-4 py-3 font-abhayaLibre text-dark-brown focus:outline-none focus:border-gold"
        />
      </div>

      <div>
        <label class="block font-abhayaLibre font-bold text-dark-brown mb-2">Email de contato</label>
        <input
          v-model="form.email"
          type="email"
          class="w-full border border-beige rounded-xl px-4 py-3 font-abhayaLibre text-dark-brown focus:outline-none focus:border-gold"
        />
      </div>

      <div>
        <label class="block font-abhayaLibre font-bold text-dark-brown mb-2">
          Instagram <span class="font-normal text-beige text-sm">(sem @, ex: psi.marieliros)</span>
        </label>
        <input
          v-model="form.instagram"
          type="text"
          placeholder="psi.marieliros"
          class="w-full border border-beige rounded-xl px-4 py-3 font-abhayaLibre text-dark-brown focus:outline-none focus:border-gold"
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

      <div class="border border-beige rounded-2xl p-6 bg-white mt-4 space-y-3">
        <p class="font-cinzel font-bold text-dark-brown text-sm mb-2">Pré-visualização dos links</p>
        <div class="flex items-center gap-3 font-abhayaLibre text-dark-brown">
          <span class="pi pi-whatsapp text-gold text-lg" />
          <span
            >wa.me/<strong>{{ form.whatsapp || '...' }}</strong></span
          >
        </div>
        <div class="flex items-center gap-3 font-abhayaLibre text-dark-brown">
          <span class="pi pi-envelope text-gold text-lg" />
          <span>{{ form.email || '...' }}</span>
        </div>
        <div class="flex items-center gap-3 font-abhayaLibre text-dark-brown">
          <span class="pi pi-instagram text-gold text-lg" />
          <span
            >instagram.com/<strong>{{ form.instagram || '...' }}</strong></span
          >
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: false });

const { data } = await useFetch('/api/content');

const form = reactive({
  whatsapp: data.value?.contact?.whatsapp ?? '',
  email: data.value?.contact?.email ?? '',
  instagram: data.value?.contact?.instagram ?? '',
});

const saving = ref(false);
const successMsg = ref('');
const errorMsg = ref('');

async function save() {
  saving.value = true;
  errorMsg.value = '';
  successMsg.value = '';
  try {
    await $fetch('/api/content', { method: 'PUT', body: { contact: { ...form } } });
    successMsg.value = 'Contatos salvos com sucesso!';
  } catch {
    errorMsg.value = 'Erro ao salvar. Tente novamente.';
  } finally {
    saving.value = false;
  }
}
</script>
