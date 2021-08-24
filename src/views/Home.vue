<template>
  <Navbar :is-logged-in=isLoggedIn @sign-out=signOut></Navbar>
  <div class="m-5 grid grid-cols-1 md:grid-cols-2">
    <router-view class="bg-gray-200 p-4 md:rounded-l-2xl"></router-view>
    <div class="relative">
      <img
        class="w-full object-cover w-full h-full opacity-90 md:rounded-r-2xl"
        src="../assets/picture.jpg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import firebase from "firebase";
import { useRouter } from "vue-router";
import Navbar from "./../components/Navbar";

export default defineComponent({
  name: "App",
  components: { Navbar },
  setup() {

    const router = useRouter();
    const isLoggedIn = ref(false);
// runs after firebase is initialized
    firebase.auth().onAuthStateChanged(function(user) {
      isLoggedIn.value = !!user; // bool
    });

    const signOut = () => {
      firebase.auth().signOut();
      router.push("/");
    };

    return {
      signOut,
      isLoggedIn
    };
  }
});
</script>

<style></style>
