<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h1 class="text-center">Enregistrez-vous</h1>
      <form @submit.prevent="onFormSubmit">
        <div class="mb-3">
          <label>Votre email</label>
          <input
            v-model="email"
            type="text"
            class="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-3">
          <label>Votre mot de passe</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Mot de passe"
            required
          />
        </div>
        <div class="mb-3">
          <button class="btn btn-primary btn-block">S'inscrire</button>
        </div>
      </form>
    </div>
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
