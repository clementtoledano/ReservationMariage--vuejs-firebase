<template>
  <nav class="bg-white shadow-lg">
    <div class="flex justify-between">
      <div class="flex space-x-7 mx-auto items-center">
        <!-- Website Logo -->
        <h1 class="py-4 px-2 font-serif font-semibold text-gray-500 text-lg">
          MARIAGE DE MANON & CLEMENT
        </h1>
        <!-- Navbar items -->
        <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
          <NavLink to="/" name="Accueil"></NavLink>
          <NavLink to="/confirmation" name="Confirmation"></NavLink>
          <span v-if="!props.isLoggedIn" class="md:space-x-8">
            <NavLink to="/register" name="Inscription"></NavLink>
            <NavLink to="/sign-in" name="Connection"></NavLink>
          </span>
          <NavLink
            v-if="props.isLoggedIn"
            to="#"
            @click="signOut"
            name="Déconnection"
          ></NavLink>
        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button class="outline-none mobile-menu-button" @click="menu = !menu">
            <svg
              class="w-6 h-6 text-gray-500 hover:text-green-500"
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
        <MobileNavLink to="/confirmation" name="Confirmation"></MobileNavLink>
        <span v-if="!props.isLoggedIn" class="md:space-x-8">
          <MobileNavLink to="/register" name="Inscription"></MobileNavLink>
          <MobileNavLink to="/sign-in" name="Connection"></MobileNavLink>
        </span>
        <MobileNavLink
          v-if="props.isLoggedIn"
          to="#"
          @click="signOut"
          name="Déconnection"
        ></MobileNavLink>
      </div>
    </transition>
  </nav>
</template>
<script>
import { defineComponent, ref } from "vue";
import NavLink from "./NavLink";
import MobileNavLink from "./MobileNavLink";

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
