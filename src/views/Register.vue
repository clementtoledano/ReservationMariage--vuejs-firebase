<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Mot de passe" v-model="password" /></p>
  <p>
    <button @click="register">S'inscrire</button>
  </p>
</template>

<script setup>
import { ref } from "vue";
import firebase from "firebase";
import { useRouter } from "vue-router"; // import router
const email = ref("");
const password = ref("");
const router = useRouter(); // get a reference to our vue router
const register = () => {
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
