<template>
  <section class="grid grid-cols-8 gap-1 md:grid-cols-12 md:gap-4 pt-16 md:pt-24">
    <div class="col-start-2 col-span-6 md:col-start-2 md:col-span-10">
      <div class="text-dark-brown font-cinzel text-xl md:text-3xl font-bold pb-3 capitalize">Como posso te ajudar?</div>
      <PictureComponent :picture-path="'./img/HowCanIHelp.png'" />
      <h3 class="text-brickred font-abhayaLibre text-xl md:text-1xl font-bold pt-6 pb-2 capitalize">Ansiedade</h3>

      <h3 class="text-brickred font-abhayaLibre text-xl md:text-1xl font-bold pb-2 capitalize">
        Problemas de autoestima
      </h3>

      <h3 class="text-brickred font-abhayaLibre text-xl md:text-1xl font-bold pb-2 capitalize">Depressão</h3>

      <h3 class="text-brickred font-abhayaLibre text-xl md:text-1xl font-bold pb-2 capitalize">
        Dificuldades de relacionamento
      </h3>

      <h3 class="text-brickred font-abhayaLibre text-xl md:text-1xl font-bold pb-2">
        Problemas de saúde comportamental
      </h3>
    </div>
    <div
      class="col-start-5 col-span-3 md:col-start-6 md:col-span-2 pt-0 pb-6 md:pb-12 flex flex-row items-center justify-self-center"
    >
      <ButtonComponent :button-lable="'Agendar Sessão'" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import PictureComponent from '../components/common/PictureComponent.vue';
import ButtonComponent from '../components/common/ButtonComponent.vue';
</script>

<style></style>
