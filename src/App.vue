<template>
  <div>
    <nav>
      <router-link to="/">Accueil</router-link>
      |
      <span>
        <router-link to="/confirmation">Confirmation</router-link> |
      </span>
      <span v-if="isLoggedIn">
        <button @click="signOut">Déconnection</button>
      </span>
      <span v-else>
        <router-link to="/register">S'inscrire</router-link> |
        <router-link to="/sign-in">Se Connecter</router-link>
      </span>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { ref } from "vue";
import firebase from "firebase";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(true);
// runs after firebase is initialized
firebase.auth().onAuthStateChanged(function (user) {
  isLoggedIn.value = !!user; // bool
});
const signOut = () => {
  firebase.auth().signOut();
  router.push("/");
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
