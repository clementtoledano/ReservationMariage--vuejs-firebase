<template>
  <div class="lg:w-full">
    <form class="" @submit.prevent="onFormSubmit">
      <h1 class="text-center mb-4 text-xl">Inscription</h1>
      <Input id="email" v-model="email" type="text" label="Votre Email" placeholder="email"></Input>
      <Input id="password" v-model="password" type="password" label="Votre Password" placeholder="*****"></Input>
      <Input id="rePassword" v-model="rePassword" type="password" label="Confirmer le password"
             placeholder="*****"></Input>
      <p v-if="errMsg" class="mb-4 text-red-500 text-xs italic">{{ errMsg }}</p>
      <Button v-if="!isPending">Créer le compte</Button>
      <Button v-else>Creation...</Button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import firebase from "firebase";
import Button from "../components/Button";
import Input from "../components/Input";


export default defineComponent({
  name: "Register",
  components: { Button, Input },
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const rePassword = ref("");
    const errMsg = ref("");
    const isPending = ref(false);

    const onFormSubmit = (event) => {
      isPending.value = true;
      event.preventDefault();
      setTimeout(function() {
        if (password.value === rePassword.value) {
          firebase
            .auth() // get the auth api
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(() => {
              router.push("/confirmation");
            })
            .catch((error) => {
              console.log(error);
              switch (error.code) {
                case "auth/invalid-email":
                  errMsg.value = "Email invalide";
                  break;
                case "auth/weak-password":
                  errMsg.value = "le password doit faire au moins 6 caractères";
                  break;
                case "auth/email-already-in-use":
                  errMsg.value = "l'email est déjà utilisé";
                  break;
                default:
                  errMsg.value = "Email ou password incorrect";
                  break;
              }
            });
        } else {
          errMsg.value = "La vérification du password n'est pas correcte";
        }
        isPending.value = false;
      }, 2000);
    };
    return { email, password, rePassword, router, onFormSubmit, errMsg, isPending };
  }
});


</script>
