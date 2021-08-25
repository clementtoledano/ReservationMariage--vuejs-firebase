<template>
  <div class="">
    <div class="font-serif text-center font-bold mb-10">
      <p class="text-5xl text-blue-400 mb-5">Manon <br />&<br />Clement</p>
      <p class="text-xl">30 Octobre 2021</p>
      <p class="text-3xl text-blue-400">J - {{ jour() }}</p>
    </div>
    <div class="text-xl mb-3">
      <p class="font-extrabold font-serif">1 / Mairie de BEZIERS</p>
      <p class="mb-3 ml-6">15h30 - 16h00</p>
    </div>
    <div class="text-xl mb-3">
      <p class="font-extrabold font-serif">2 / Aperitif dinatoire</p>
      <p class="mb-3 ml-6">
        Salle George Campo / Stade de football <br />
        Rue de la source / D37 <br />
        34420 Villeneuve-les-Beziers
      </p>
      <p class="mb-3 ml-6">A partir de 18h00</p>
    </div>
    <p class="text-center font-bold text-2xl text-blue-400">
      Confirmer votre présence !
    </p>
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
