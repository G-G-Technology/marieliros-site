<template>
  <section>
    <div class="relative grid grid-cols-8 gap-1 sm:grid-cols-12 sm:gap-4">
      <!-- <div class="bg-[url('/img/ContactPage.png')] col-span-8 md:col-span-12"></div> -->
      <PictureComponent
        :picture-path="'img/ContactPage.png'"
        class="relative col-start-2 col-span-6 md:col-start-2 md:col-span-10"
      />
      <div
        class="absolute col-start-2 col-span-6 md:col-start-2 md:col-span-10 w-full h-full bg-white bg-opacity-80 flex flex-col items-center"
      >
        <h1 class="text-dark-brown font-cinzel font-bold text-xs md:text-lg pt-6 md:pt-16 text-center">
          Dúvidas, Perguntas, Agendar uma Sessão
        </h1>
        <h2 class="text-dark-brown font-cinzel font-bold text-xs md:text-lg pt-4 md:pt-16 text-center">
          Escolha a sua forma preferida de contato. <br />
          Retornaremos a você em menos de 24 horas.
        </h2>

        <div class="flex flex-row pt-3 md:pt-8 pb-6">
          <div class="bg-gold rounded-full h-8 w-8 text-center mx-2">
            <span :class="'pi pi-envelope h-8 w-8'" class="text-cream px-2 py-2"></span>
          </div>
          <div class="bg-gold rounded-full h-8 w-8 text-center mx-2">
            <span :class="'pi pi-whatsapp h-8 w-8'" class="text-cream px-2 py-2"></span>
          </div>
          <div class="bg-gold rounded-full h-8 w-8 text-center mx-2">
            <span :class="'pi pi-instagram height-24px'" class="text-cream px-2 py-2"></span>
          </div>
        </div>
        <div class="max-sm:hidden bg-cream rounded-full h-8 w-8 text-center mx-2 ml-auto mr-16 mt-36">
          <NuxtLink to="/">
            <span :class="'pi pi-home text-gold h-8 w-8'" class="px-2 py-2"></span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import PictureComponent from '../components/common/PictureComponent.vue';
</script>

<style></style>
