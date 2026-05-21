<template>
  <div class="min-h-screen bg-cream flex items-center justify-center px-4">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
      <div class="text-center mb-8">
        <h1 class="font-alexBrush text-3xl text-dark-brown">Marieli Ros</h1>
        <p class="font-abhayaLibre text-gold text-sm mt-1">Painel Administrativo</p>
      </div>

      <div v-if="!codeSent">
        <label class="block font-abhayaLibre text-dark-brown text-sm mb-1">Seu email</label>
        <input
          v-model="email"
          type="email"
          placeholder="seu@email.com"
          class="w-full border border-beige rounded-xl px-4 py-3 text-dark-brown focus:outline-none focus:border-gold"
          @keyup.enter="sendCode"
        />
        <button
          class="w-full bg-gold text-cream font-abhayaLibre font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-4"
          :disabled="loading || !email"
          @click="sendCode"
        >
          {{ loading ? 'Enviando...' : 'Enviar código' }}
        </button>
      </div>

      <div v-else>
        <p class="font-abhayaLibre text-dark-brown text-center mb-2 text-sm">
          Código enviado para <strong>{{ email }}</strong
          >. Verifique seu email.
        </p>
        <input
          v-model="otp"
          type="text"
          inputmode="numeric"
          maxlength="6"
          placeholder="000000"
          class="w-full border border-beige rounded-xl px-4 py-3 text-center text-2xl font-bold tracking-widest text-dark-brown focus:outline-none focus:border-gold mt-4"
          @keyup.enter="verifyCode"
        />
        <button
          class="w-full bg-gold text-cream font-abhayaLibre font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-4"
          :disabled="loading || otp.length < 6"
          @click="verifyCode"
        >
          {{ loading ? 'Verificando...' : 'Entrar' }}
        </button>
        <button class="w-full text-center text-sm text-beige mt-3 hover:text-dark-brown" @click="codeSent = false">
          Usar outro email
        </button>
      </div>

      <p v-if="errorMsg" class="text-red-600 text-sm text-center mt-4 font-abhayaLibre">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

const { fetch: fetchSession, loggedIn } = useUserSession();
if (loggedIn.value) await navigateTo('/admin');

const email = ref('');
const codeSent = ref(false);
const otp = ref('');
const loading = ref(false);
const errorMsg = ref('');

async function sendCode() {
  if (!email.value) return;
  loading.value = true;
  errorMsg.value = '';
  try {
    await $fetch('/api/auth/send-otp', { method: 'POST', body: { email: email.value } });
    codeSent.value = true;
  } catch (err: unknown) {
    const e = err as { data?: { message?: string } };
    errorMsg.value = e.data?.message || 'Erro ao enviar o código. Tente novamente.';
  } finally {
    loading.value = false;
  }
}

async function verifyCode() {
  if (otp.value.length < 6) return;
  loading.value = true;
  errorMsg.value = '';
  try {
    await $fetch('/api/auth/verify-otp', { method: 'POST', body: { email: email.value, otp: otp.value } });
    await fetchSession();
    await navigateTo('/admin');
  } catch (err: unknown) {
    const e = err as { data?: { message?: string } };
    errorMsg.value = e.data?.message || 'Código incorreto. Tente novamente.';
    otp.value = '';
  } finally {
    loading.value = false;
  }
}
</script>
