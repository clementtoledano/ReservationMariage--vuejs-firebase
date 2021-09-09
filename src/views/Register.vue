<template>
  <div class="lg:w-full">
    <form class="" @submit.prevent="onFormSubmit">
      <h1 class="text-center mb-4 text-3xl font-cursive font-extrabold">Inscription</h1>
      <EmailInput
        id="email"
        v-model="email"
        label="Votre Email"
        placeholder="email"
      ></EmailInput>
      <PasswordInput
        id="password"
        v-model="password"
        label="Votre Password"
      ></PasswordInput>
      <PasswordInput
        id="rePassword"
        v-model="rePassword"
        label="Confirmer le password"
      ></PasswordInput>
      <p v-if="errMsg" class="mb-4 text-red-500 text-xs italic">{{ errMsg }}</p>
      <Button v-if="!isPending">Créer le compte</Button>
      <DisabledButton v-else>Creation...</DisabledButton>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/Button.vue";
import DisabledButton from "../components/DisabledButton.vue";
import AuthApi from "@/services/authApi";
import PasswordInput from "@/components/PasswordInput.vue";
import EmailInput from "@/components/EmailInput.vue";

export default defineComponent({
  name: "Register",
  components: { EmailInput, PasswordInput, DisabledButton, Button },
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const rePassword = ref("");
    const errMsg = ref("");
    const isPending = ref(false);

    const onFormSubmit = () => {
      errMsg.value = "";
      if (password.value !== rePassword.value) {
        errMsg.value = "La vérification du password n'est pas correcte";
      } else {
        isPending.value = true;
        setTimeout(function() {
          AuthApi.register(email.value, password.value)
            .then(() => {
              router.push("/confirmation");
            })
            .catch((error) => {
              isPending.value = false;
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
        }, 2000);
      }
    };
    return {
      email,
      password,
      rePassword,
      onFormSubmit,
      errMsg,
      isPending
    };
  }
});
</script>
