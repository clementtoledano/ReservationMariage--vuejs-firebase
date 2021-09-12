<template>
  <nav class="text-gold shadow-lg py-2">
    <div class="flex justify-between">
      <div class="flex space-x-7 mx-auto items-center">
        <!-- Website Logo -->
        <h1 class="py-4 px-2 font-serif font-semibold text-xl">
          Mariage de Manon & Clément
        </h1>
        <!-- Navbar items -->
        <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
          <NavLink to="/" name="Accueil"></NavLink>
          <NavLink to="/confirmation" name="Confirmer"></NavLink>
          <span v-if="!props.isLoggedIn" class="md:space-x-8">
            <NavLink to="/register" name="S'inscrire"></NavLink>
            <NavLink to="/sign-in" name="Se connecter"></NavLink>
          </span>
          <NavLink
            v-if="props.isLoggedIn"
            to="#"
            @click="signOut"
            name="Se déconnecter"
          ></NavLink>
          <NavLink to="/contact" name="Nous contacter"></NavLink>

        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button class="outline-none mobile-menu-button" @click="menu = !menu">
            <svg
              class="w-7 h-7  mx-4"
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
    <transition
      enter-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="menu" class="p-2 transition-all transform md:hidden">
        <MobileNavLink to="/" name="Accueil"></MobileNavLink>
        <MobileNavLink to="/confirmation" name="Confirmer"></MobileNavLink>
        <span v-if="!props.isLoggedIn" class="md:space-x-8">
          <MobileNavLink to="/register" name="S'inscrire"></MobileNavLink>
          <MobileNavLink to="/sign-in" name="Se connecter"></MobileNavLink>
        </span>
        <MobileNavLink
          v-if="props.isLoggedIn"
          to="#"
          @click="signOut"
          name="Se déconnecter"
        ></MobileNavLink>
        <MobileNavLink to="/contact" name="Contact"></MobileNavLink>
      </div>
    </transition>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavLink from "@/components/NavLink.vue";
import MobileNavLink from "@/components/MobileNavLink.vue";

export default defineComponent({
  name: "Navbar",
  components: { MobileNavLink, NavLink },
  props: {
    isLoggedIn: Boolean,
  },
  emits: ["signOut"],
  setup(props, context) {
    const menu = ref(false);

    function signOut() {
      context.emit("signOut");
    }

    return {
      props,
      menu,
      signOut,
    };
  },
});
</script>
