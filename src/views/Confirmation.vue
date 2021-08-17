<template>
  <h1>Votre confirmation</h1>
  <div>
    <label for="lastname">Votre nom</label>
    <input id="lastname" type="text" placeholder="Nom" v-model="lastname" />
  </div>
  <div>
    <label for="firstname">Votre prénom</label>
    <input
      id="firstname"
      type="text"
      placeholder="Prénom"
      v-model="firstname"
    />
  </div>
  <div>
    <label for="adult">Nombre d'adulte</label>
    <input id="adult" type="number" v-model="adult" />
  </div>
  <div>
    <label for="children">Nombre d'enfant</label>
    <input id="children" type="number" v-model="children" />
  </div>
  <div>
    <label for="sunday">Votre présence le dimanche midi</label>
    <input id="sunday" type="checkbox" v-model="sunday" />
  </div>
  <label for="message">Un message pour nous ?</label>
  <br />
  <textarea
    id="message"
    v-model="message"
    placeholder="un message a notre attention ?"
  ></textarea>
  <div>
    <button @click="submit">Enregistrer</button>
  </div>
  <h3>Fin des modifications le 15 octobre</h3>
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

const submit = (event) => {
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
