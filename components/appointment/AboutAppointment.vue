<template>
  <section>
    <div class="grid grid-cols-8 gap-1 md:grid-cols-12 md:gap-4">
      <div class="col-start-2 col-span-6 md:col-start-2 md:col-span-10 flex flex-col items-start">
        <h1 class="text-dark-brown font-cinzel text-xl md:text-3xl font-bold pb-2">Como Funcinam Os Atendimentos?</h1>
        <div class="text-dark-brown font-abhayaLibre text-lg md:text-xl text-justify pt-3">
          Os encontros acontecem após agendamento prévio e costumam durar aproximadamente 50 minutos, tendo
          periodicidade semanal ou quinzenal, dependendo da necessidade.
        </div>
        <div class="text-dark-brown font-abhayaLibre font-bold text-lg md:text-xl text-justify pb-4">
          Podendo ser realizado em duas modalidades:
        </div>

        <div class="flex flex-col md:flex-row">
          <div class="col-start-2 col-span-6 md:col-start-2 md:col-span-5 pr-2 pb-4">
            <AppointmentType
              :picture-path="'./img/AboutPresencial.png'"
              :description="'Presencial: o consulente se desloca até o consultório no dia e horário agendado.'"
            />
          </div>

          <div class="col-start-2 col-span-6 md:col-start-7 md:col-span-5 pl-2">
            <AppointmentType
              :picture-path="'./img/AboutOnline.png'"
              :description="'Online: no dia e horario agendado a sessao e realizada via google meet.'"
            />
          </div>
        </div>
      </div>
      <div class="col-start-2 col-span-3 md:col-start-6 md:col-span-2 pt-4 md:pt-0">
        <ButtonComponent :button-lable="'Agendar Agora'" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import AppointmentType from '../components/appointment/AppointmentType.vue';
import ButtonComponent from '../components/common/ButtonComponent.vue';
</script>

<style></style>
