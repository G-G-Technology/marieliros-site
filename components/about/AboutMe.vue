<template>
  <div class="grid grid-cols-8 gap-1 sm:grid-cols-12 sm:gap-4">
    <div class="col-start-2 col-span-4 max-sm:hidden">
      <PictureComponent :picture-path="'/img/About.png'" />
    </div>
    <div class="col-start-2 col-span-6 md:col-start-6 md:col-span-6 flex flex-col items-start">
      <div class="text-dark-brown font-cinzel text-xl md:text-3xl font-bold pb-2">Muito Prazer,</div>
      <div class="text-gold font-alexBrush text-xl md:text-3xl font-bold pb-4">Eu sou a Marieli</div>
      <div class="col-start-2 col-span-4 md:hidden">
        <PictureComponent :picture-path="'/img/About.png'" />
      </div>
      <div class="text-dark-brown font-abhayaLibre text-lg md:text-xl text-justify pt-3 pb-2">
        Sou Psicóloga e Gestalt-terapeuta, com meu trabalho busco auxiliar os pacientes a enfrentarem seus desafios e
        descobrirem novas formas de enfrentamento, ampliando as possibilidades de uma vida com maior qualidade e bem
        estar, compreendendo melhor o mundo dentro e fora de si.
      </div>
      <div class="text-gold font-abhayaLibre text-xl md:text-1xl font-bold pb-2">Formação</div>
      <div class="text-dark-brown font-abhayaLibre text-lg md:text-xl text-justify pb-2">
        Psicóloga (CRP 12/17275), graduada em 2018 pela Universidade do Sul de Santa Catarina (UNISUL), especialização
        em Psicologia Clínica Gestáltica em andamento pelo Instituto Granzotto de Psicologia Clínica.
      </div>
      <div class="text-gold font-abhayaLibre text-xl md:text-1xl font-bold pb-2">Atuação</div>
      <div class="text-dark-brown font-abhayaLibre text-lg md:text-xl text-justify pb-2">
        Trabalho com atendimentos individuais, a partir dos 16 anos. Atendo presencialmente em Florianópolis - SC e na
        modalidade online para brasileiros residentes no Brasil ou em outros lugares do mundo.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PictureComponent from '../components/common/PictureComponent.vue';
</script>

<style></style>
