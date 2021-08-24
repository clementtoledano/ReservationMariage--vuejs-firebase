<template>
  <div class="">
    <div class="text-center font-bold mb-10">
      <p class="text-5xl text-blue-400">Manon <br />&<br />Clement</p>
      <p class="text-xl">30 Octobre 2021</p>
      <p class="text-3xl text-blue-400">J - {{ jour() }}</p>
    </div>
    <p class="text-xl mb-3">
      1 / Passage à la Mairie de BEZIERS à 15h30
    </p>
    <p class="text-xl">2 / Rendez vous à 17h00</p>
    <p class="mb-3 ml-5">
      Salle George Campo / Stade de football <br>
      Rue de la source / D37 <br>
      34420 Villeneuve-les-Beziers
    </p>
    <p class="text-center font-bold text-2xl text-blue-400">Confirmer votre présence !</p>
  </div>
</template>
<script setup>
const jour = () => {
  const date1 = new Date();
  const date2 = new Date("Oct 30 00:00:00 2021");
  const sec = (date2 - date1) / 1000;
  const n = 24 * 3600;
  if (sec > 0) {
    return Math.floor(sec / n);
  }
};
</script>

<style lang="scss" scoped></style>
