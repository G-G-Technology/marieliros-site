<template>
  <div class="grid grid-cols-8 gap-1 sm:grid-cols-12 sm:gap-4">
    <div class="col-start-2 col-span-6 md:col-start-2 md:col-span-10 flex flex-col items-start">
      <div class="text-dark-brown font-cinzel text-xl md:text-3xl font-bold pb-2">Como Funcinam Os Atendimentos?</div>
      <div class="text-dark-brown font-abhayaLibre text-lg md:text-xl text-justify pt-3">
        Os encontros acontecem após agendamento prévio e costumam durar aproximadamente 50 minutos, tendo periodicidade
        semanal ou quinzenal, dependendo da necessidade.
      </div>
      <div class="text-dark-brown font-abhayaLibre font-bold text-lg md:text-xl text-justify pb-4">
        Podendo ser realizado em duas modalidades:
      </div>

      <div class="flex flex-col md:flex-row justify-items-start">
        <div class="col-start-2 col-span-6 md:col-start-2 md:col-span-10 pr-2 pb-4">
          <ImageAppointment :picture-path="'/img/AboutPresencial.png'" />
          <LabelAppointment
            :description="'Presencial: o consulente se desloca até o consultório no dia e horário agendado.'"
          />
        </div>

        <div class="col-start-2 col-span-6 md:col-start-7 md:col-span-10 pl-2">
          <ImageAppointment :picture-path="'/img/AboutOnline.png'" />
          <LabelAppointment :description="'Online: no dia e horario agendado a sessao e realizada via google meet.'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ImageAppointment from '../components/Appointment/ImageAppointment.vue';
import LabelAppointment from '../components/Appointment/LabelAppointment.vue';
// const imageInPerson = '/img/AboutPresencial.png';
// const lableInPerson = ' Presencial: o consulente se desloca até o consultório no dia e horário agendado.';

// const imageOnline = '/img/AboutPresencial.png';
// const lableOnline = ' Presencial: o consulente se desloca até o consultório no dia e horário agendado.';
</script>

<style></style>
