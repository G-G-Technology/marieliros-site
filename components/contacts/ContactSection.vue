<template>
  <section class="grid grid-cols-8 gap-1 md:grid-cols-12 md:gap-4 w-full h-full pt-16 md:pt-24 pb-24">
    <div class="col-span-8 md:col-span-12 flex flex-col items-center justify-center justify-self-center">
      <h1 class="text-dark-brown font-cinzel font-bold text-xs md:text-lg text-center">
        Dúvidas, Perguntas, Agendar uma Sessão
      </h1>
      <h2 class="text-dark-brown font-cinzel font-bold text-xs md:text-lg text-center">
        <p>Entre em contato.</p>
        <p>Retornaremos a você em menos de 24 horas.</p>
      </h2>

      <div class="flex flex-row pt-3 md:pt-8 pb-12 md:pb-20">
        <NuxtLink
          to="mailto:psi.marieliros@gmail.com?subject=Agendamento%20de%20consulta&body=Ol%C3%A1%20Marieli%2C%20%0AVenho%20atrav%C3%A9s%20to%20seu%20website%20e%20gostaria%20de%20agendar%20uma%20consulta.%0A"
          target="_blank"
          class="bg-gold rounded-full h-8 w-8 text-center mx-2"
        >
          <span :class="'pi pi-envelope h-8 w-8'" class="text-cream px-2 py-2"></span>
        </NuxtLink>

        <NuxtLink
          to="https://wa.me/554891507605?text=Ol%C3%A1%20Marieli%2C%20%0AVenho%20atrav%C3%A9s%20to%20seu%20website%20e%20gostaria%20de%20agendar%20uma%20consulta.%0A"
          target="_blank"
          class="bg-gold rounded-full h-8 w-8 text-center mx-2"
        >
          <span :class="'pi pi-whatsapp h-8 w-8'" class="text-cream px-2 py-2"></span>
        </NuxtLink>

        <NuxtLink
          to="https://www.instagram.com/psi.marieliros/"
          target="_blank"
          class="bg-gold rounded-full h-8 w-8 text-center mx-2"
        >
          <span :class="'pi pi-instagram height-24px'" class="text-cream px-2 py-2"></span>
        </NuxtLink>
      </div>

      <NuxtLink to="/" class="max-sm:hidden bg-cream rounded-full h-8 w-8 text-center ml-auto mr-0 mt-12">
        <span :class="'pi pi-home text-gold h-8 w-8'" class="px-2 py-2"></span>
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style></style>
