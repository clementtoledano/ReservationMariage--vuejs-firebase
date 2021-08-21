<template>
    <nav class="bg-white shadow-lg">
        <div class="flex justify-between">
          <div class="flex space-x-7 mx-auto items-center">
            <!-- Website Logo -->
            <h1 class="py-4 px-2 font-semibold text-gray-500 text-lg">MARIAGE DE MANON & CLEMENT</h1>
            <!-- Navbar items -->
            <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
              <router-link class="nav-link font-medium text-gray-500 hover:text-gray-900" to="/">Accueil</router-link>
              <router-link class="nav-link font-medium text-gray-500 hover:text-gray-900" to="/confirmation">
                Confirmation
              </router-link>
              <router-link v-if="!isLoggedIn" class="nav-link font-medium text-gray-500 hover:text-gray-900"
                           to="/register">S'inscrire
              </router-link>
              <router-link v-if="!isLoggedIn" class="nav-link font-medium text-gray-500 hover:text-gray-900"
                           to="/sign-in">Se Connecter
              </router-link>
              <a v-if="isLoggedIn" class="nav-link font-medium text-gray-500 hover:text-gray-900" href="#"
                 @click="signOut">Déconnection</a>
            </div>
            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
              <button class="outline-none mobile-menu-button" @click="menu = !menu">
                <svg class=" w-6 h-6 text-gray-500 hover:text-green-500 "
                     fill="none"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="2"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      <!-- mobile menu -->
      <transition enter-active-class="transition-opacity duration-150"
                  enter-from-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="transition-opacity duration-150"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0">
        <div v-show="menu" class="p-2 transition-all transform md:hidden">
          <router-link
            class="nav-link block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            to="/">Accueil
          </router-link>
          <router-link
            class="nav-link block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            to="/confirmation">Confirmation
          </router-link>
          <router-link v-if="!isLoggedIn"
                       class="nav-link block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                       to="/register">S'inscrire
          </router-link>
          <router-link v-if="!isLoggedIn"
                       class="nav-link block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                       to="/sign-in">Se Connecter
          </router-link>
          <a v-if="isLoggedIn"
             class="nav-link block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
             href="#" @click="signOut">Déconnection</a>
        </div>
      </transition>
    </nav>
    <div class="container mt-5">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from "vue";
import firebase from "firebase";
import { useRouter } from "vue-router";

const router = useRouter();
const menu = ref(false);


const isLoggedIn = ref(false);
// runs after firebase is initialized
firebase.auth().onAuthStateChanged(function(user) {
  isLoggedIn.value = !!user; // bool
});
const signOut = () => {
  firebase.auth().signOut();
  router.push("/");
};
</script>

<style>

</style>
