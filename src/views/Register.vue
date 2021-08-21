<template>
  <div class="lg:w-full">
    <form class="" @submit.prevent="onFormSubmit">
      <h1 class="text-center mb-4 text-xl">Inscription</h1>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Votre email</label>
        <input
          v-model="email"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Email"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Votre mot de passe</label>
        <input
          v-model="password"
          type="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Password"
          required
        />
      </div>
      <p class="mb-4 text-red-500 text-xs italic" v-if="errMsg">{{ errMsg }}</p>
      <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">S'inscrire</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import firebase from "firebase";
import { useRouter } from "vue-router"; // import router
const email = ref("");
const password = ref("");
const router = useRouter();
const onFormSubmit = () => {
  firebase
    .auth() // get the auth api
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((data) => {
      console.log("Successfully registered!" + data);
      router.push("/confirmation");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
