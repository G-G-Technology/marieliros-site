<template>
  <section class="grid grid-cols-8 gap-1 md:grid-cols-12 md:gap-4 pt-16 md:pt-24">
    <div class="col-start-2 col-span-6 md:col-start-2 md:col-span-10">
      <div class="text-dark-brown font-cinzel text-xl md:text-3xl font-bold pb-3 capitalize">Como posso te ajudar?</div>
      <PictureComponent :picture-path="'./img/HowCanIHelp.png'" />
      <h3 class="text-brickred font-abhayaLibre text-xl md:text-1xl font-bold pt-6 pb-2 capitalize">Ansiedade</h3>
      <div class="text-dark-brown font-abhayaLibre text-lg md:text-xl text-justify pb-2">
        A Gestalt-terapia ajuda as pessoas a se concentrarem no presente. Isso permite que os indivíduos descubram quais
        pensamentos, sentimentos ou comportamentos imediatos podem deixá-los ansiosos.
      </div>

      <h3 class="text-brickred font-abhayaLibre text-xl md:text-1xl font-bold pb-2 capitalize">
        Problemas de autoestima
      </h3>
      <div class="text-dark-brown font-abhayaLibre text-lg md:text-xl text-justify pb-2">
        A Gestalt-terapia ajuda as pessoas com baixa autoestima a identificar e superar os fatores subjacentes que
        contribuem para sua baixa autoestima.
      </div>

      <h3 class="text-brickred font-abhayaLibre text-xl md:text-1xl font-bold pb-2 capitalize">Depressão</h3>
      <div class="text-dark-brown font-abhayaLibre text-lg md:text-xl text-justify pb-2">
        Como a gestalt-terapia se concentra na autoconsciência, ela pode ajudar as pessoas com depressão a tomarem
        consciência de possíveis situações estressantes que desencadeiam sua depressão.
      </div>

      <h3 class="text-brickred font-abhayaLibre text-xl md:text-1xl font-bold pb-2 capitalize">
        Dificuldades de relacionamento
      </h3>
      <div class="text-dark-brown font-abhayaLibre text-lg md:text-xl text-justify pb-2">
        A Gestalt-terapia pode ajudar os casais a reconhecer comportamentos destrutivos subjacentes que podem estar
        impactando negativamente seus relacionamentos. Isso pode ajudá-los a trabalhar no sentido de fazer mudanças
        positivas em seus relacionamentos e estilos de vida individuais.
      </div>

      <h3 class="text-brickred font-abhayaLibre text-xl md:text-1xl font-bold pb-2">
        Problemas de saúde comportamental
      </h3>
      <div class="text-dark-brown font-abhayaLibre text-lg md:text-xl text-justify pb-0">
        A Gestalt-terapia pode ajudar pessoas com problemas comportamentais, como transtorno bipolar. É também um método
        terapêutico eficaz para tratar abuso de substâncias, jogo compulsivo e TEPT. Pessoas que lutam com essas
        condições podem desenvolver uma nova visão da vida por meio da Gestalt-terapia e ver uma mudança positiva em seu
        estilo de vida.
      </div>
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
