<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h1 class="text-center">Login to Your Account</h1>
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
            placeholder="Password"
            required
          />
        </div>
        <p v-if="errMsg">{{ errMsg }}</p>
        <div class="mb-3">
          <button class="btn btn-primary btn-block">Submit</button>
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
const errMsg = ref(); // ERROR MESSAGE
const router = useRouter(); // get a reference to our vue router
const onFormSubmit = () => {
  // we also renamed this method
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value) // THIS LINE CHANGED
    .then(() => {
      router.push("/confirmation"); // redirect to the confirmation
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
    });
};
</script>
