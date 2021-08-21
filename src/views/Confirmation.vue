<template>
  <div class="lg:w-full">
    <form class="" @submit.prevent="onFormSubmit">
      <h1 class="text-center mb-4 text-xl">Votre confirmation</h1>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="lastname"
          >Votre nom</label
        >
        <input
          id="lastname"
          v-model="lastname"
          type="text"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          placeholder="Nom"
          required
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="firstname"
          >Votre prénom</label
        >
        <input
          id="firstname"
          v-model="firstname"
          type="text"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          placeholder="Prénom"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="adult"
          >Nombre d'adulte</label
        >
        <input
          id="adult"
          v-model="adult"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          type="number"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="children"
          >Nombre d'enfant</label
        >
        <input
          id="children"
          v-model="children"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          type="number"
          required
        />
      </div>
      <div class="mb-4 flex items-center">
        <input id="sunday" v-model="sunday" class="mr-4" type="checkbox" />
        <label class="block text-gray-700 text-sm font-bold" for="sunday"
          >Votre présence le dimanche midi</label
        >
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="message"
          >Un message pour nous ?</label
        >
        <textarea
          id="message"
          v-model="message"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          rows="3"
        ></textarea>
      </div>
      <div class="mb-3">
        <button
          class="
            w-full
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded
            focus:outline-none focus:shadow-outline
          "
        >
          Enregistrer
        </button>
      </div>
      <h3>Fin des modifications le 15 octobre</h3>
    </form>
  </div>
</template>

<script setup>
import firebase from "firebase";

import { useRouter } from "vue-router";
import { onBeforeUnmount, ref } from "vue";

const router = useRouter();

const lastname = ref("");
const firstname = ref("");
const adult = ref(1);
const children = ref(0);
const message = ref("");
const sunday = ref(false);
const newUser = ref(true);
const id = ref("");

const authListener = firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    // not logged in
    alert("Vous devez vous connecter pour accéder à cette page");
    router.push("/");
  } else {
    const query = firebase.firestore().collection("confirmation");
    query.onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        const data = change.doc.data();

        if (user.email === data.userEmail) {
          lastname.value = data.lastname;
          firstname.value = data.firstname;
          adult.value = data.adult;
          children.value = data.children;
          message.value = data.message;
          sunday.value = data.sunday;
          newUser.value = false;
          id.value = change.doc.id;
        }
      });
    });
  }
});

const onFormSubmit = (event) => {
  event.preventDefault();
  if (newUser.value) {
    createConfirmation();
  } else {
    updateConfirmation();
  }
};

const createConfirmation = async () => {
  await firebase
    .firestore()
    .collection("confirmation")
    .add({
      userEmail: firebase.auth().currentUser.email,
      lastname: lastname.value,
      firstname: firstname.value,
      adult: adult.value,
      children: children.value,
      message: message.value,
      sunday: sunday.value,
    })
    .then(() => {
      alert("User successfully created!");
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateConfirmation = async () => {
  await firebase
    .firestore()
    .collection("confirmation")
    .doc(id.value)
    .update({
      lastname: lastname.value,
      firstname: firstname.value,
      adult: adult.value,
      children: children.value,
      message: message.value,
      sunday: sunday.value,
    })
    .then(() => {
      alert("La confirmation a été mise à jour!");
    })
    .catch((error) => {
      console.log(error);
    });
};

onBeforeUnmount(() => {
  // clear up listener
  authListener();
});
</script>
