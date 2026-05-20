<template>
  <div class="min-h-screen bg-cream">
    <header class="bg-white border-b border-beige px-6 py-4 flex items-center justify-between">
      <div>
        <h1 class="font-alexBrush text-2xl text-dark-brown">Marieli Ros</h1>
        <p class="font-abhayaLibre text-gold text-xs">Painel Administrativo</p>
        <p v-if="user?.email" class="font-abhayaLibre text-beige text-xs mt-0.5">{{ user.email }}</p>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink
          to="/"
          class="font-abhayaLibre text-sm text-dark-brown hover:text-gold transition-colors flex items-center gap-2"
        >
          <span class="pi pi-home" />
          Ver site
        </NuxtLink>
        <button
          class="font-abhayaLibre text-sm text-dark-brown hover:text-gold transition-colors flex items-center gap-2"
          @click="logout"
        >
          <span class="pi pi-sign-out" />
          Sair
        </button>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-10">
      <h2 class="font-cinzel text-xl font-bold text-dark-brown mb-2">Bem-vinda!</h2>
      <p class="font-abhayaLibre text-dark-brown mb-8">O que você gostaria de atualizar hoje?</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.href"
          :to="item.href"
          class="bg-white rounded-2xl p-6 shadow-sm border border-beige hover:border-gold transition-colors group"
        >
          <span :class="item.icon" class="text-2xl text-gold mb-3 block" />
          <h3 class="font-cinzel font-bold text-dark-brown group-hover:text-gold transition-colors">
            {{ item.title }}
          </h3>
          <p class="font-abhayaLibre text-sm text-beige mt-1">{{ item.description }}</p>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin', layout: false });

const { clear, user } = useUserSession();

const menuItems = [
  {
    href: '/admin/images',
    icon: 'pi pi-images',
    title: 'Imagens',
    description: 'Substituir fotos do carrossel e seções',
  },
  {
    href: '/admin/bio',
    icon: 'pi pi-user',
    title: 'Sobre mim',
    description: 'Editar bio, formação e áreas de atuação',
  },
  {
    href: '/admin/services',
    icon: 'pi pi-list',
    title: 'Serviços',
    description: 'Adicionar ou editar os serviços oferecidos',
  },
  {
    href: '/admin/contact',
    icon: 'pi pi-phone',
    title: 'Contatos',
    description: 'Atualizar WhatsApp, email e Instagram',
  },
  {
    href: '/admin/therapy',
    icon: 'pi pi-book',
    title: 'Textos de Terapia',
    description: 'Editar textos sobre Gestalt e Psicoterapia',
  },
];

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' });
  await clear();
  await navigateTo('/admin/login');
}
</script>
