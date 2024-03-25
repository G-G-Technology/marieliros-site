<template>
  <section>
    <div
      class="grid grid-cols-8 gap-1 md:grid-cols-12 md:gap-4 bg-[url('./img/ContactPage.png')] w-full h-full bg-cover bg-center bg-no-repeat"
    >
      <div class="col-span-8 md:col-span-12 bg-white bg-opacity-80 flex flex-col items-center">
        <h1 class="text-dark-brown font-cinzel font-bold text-xs md:text-lg pt-12 md:pt-32 text-center">
          Dúvidas, Perguntas, Agendar uma Sessão
        </h1>
        <h2 class="text-dark-brown font-cinzel font-bold text-xs md:text-lg pt-4 md:pt-16 text-center">
          <p>Escolha a sua forma preferida de contato.</p>
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

        <NuxtLink to="/" class="max-sm:hidden bg-cream rounded-full h-8 w-8 text-center mx-2 ml-auto mr-24 mb-16">
          <span :class="'pi pi-home text-gold h-8 w-8'" class="px-2 py-2"></span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style></style>
