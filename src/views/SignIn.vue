<template>
  <div class="lg:w-full">
    <form class="" @submit.prevent="onFormSubmit">
      <h1 class="text-center mb-4 text-3xl font-cursive font-extrabold">Connexion</h1>
      <EmailInput
        id="email"
        v-model="email"
        type="text"
        label="Votre Email"
        placeholder="email"
      ></EmailInput>
      <PasswordInput
        id="password"
        v-model="password"
        label="Votre Password"
      ></PasswordInput>

      <p v-if="errMsg" class="mb-4 text-red-500 text-xs italic">{{ errMsg }}</p>
      <Button v-if="!isPending">Se connecter</Button>
      <DisabledButton v-else>Connection...</DisabledButton>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import AuthApi from "../service/authApi";
import { useRouter } from "vue-router";
import Button from "../components/Button";
import DisabledButton from "../components/DisabledButton";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";

export default defineComponent({
  name: "SignIn",
  components: { EmailInput, PasswordInput, DisabledButton, Button },
  setup() {
    const email = ref("");
    const password = ref("");
    const errMsg = ref();
    const router = useRouter();
    const isPending = ref(false);

    const onFormSubmit = () => {
      errMsg.value = "";
      isPending.value = true;
      setTimeout(function() {
        AuthApi.signIn(email, password, errMsg)
          .then(() => {
            router.push("/confirmation");
          })
          .catch((error) => {
            isPending.value = false;
            switch (error.code) {
              case "auth/invalid-email":
                errMsg.value = "Email invalide";
                break;
              case "auth/user-not-found":
                errMsg.value = "Le compte n'éxiste pas avec cet email";
                break;
              case "auth/wrong-password":
                errMsg.value = "Password incorrect";
                break;
              default:
                errMsg.value = "Email ou password incorrect";
                break;
            }
                });
      }, 2000);
    };
    return {
      email,
      password,
      errMsg,
      router,
      onFormSubmit,
      isPending
    };
  }
});
</script>
