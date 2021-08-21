<template>
  <div class="">
    <div class="text-center font-bold mb-10">
      <h1 class="text-5xl text-blue-400">Manon <br />&<br />Clement</h1>
      <h2 class="text-xl">30 Octobre 2021</h2>
      <h1 class="text-3xl text-blue-400">J - {{ jour() }}</h1>
    </div>

    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci autem
      consequatur consequuntur dicta dignissimos error expedita impedit ipsum,
      iste iure laudantium natus, nisi odio officia quas quod tempore temporibus
      voluptas?
    </div>
    <div>
      Assumenda, autem consequatur consequuntur, corporis eius eligendi esse est
      eveniet exercitationem fugit hic illum ipsum maxime nostrum numquam omnis
      quae ratione repellat sequi similique veniam, voluptates voluptatum.
      Incidunt, sapiente voluptatem?
    </div>
    <router-link to="/confirmation" class="text-center"
      ><h1>Confirmer votre présence</h1></router-link
    >
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
