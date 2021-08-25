<template>
  <div class="lg:w-full">
    <form class="" @submit.prevent="onFormSubmit">
      <h1 class="text-center mb-4 text-xl">Inscription</h1>
      <Input
        id="email"
        v-model="email"
        type="text"
        label="Votre Email"
        placeholder="email"
      ></Input>
      <Input
        id="password"
        v-model="password"
        type="password"
        label="Votre Password"
        placeholder="*****"
      ></Input>
      <Input
        id="rePassword"
        v-model="rePassword"
        type="password"
        label="Confirmer le password"
        placeholder="*****"
      ></Input>
      <p v-if="errMsg" class="mb-4 text-red-500 text-xs italic">{{ errMsg }}</p>
      <Button v-if="!isPending">Créer le compte</Button>
      <DisabledButton v-else>Creation...</DisabledButton>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../components/Button";
import Input from "../components/Input";
import DisabledButton from "../components/DisabledButton";
import AuthApi from "../service/authApi";

export default defineComponent({
  name: "Register",
  components: { DisabledButton, Button, Input },
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
        setTimeout(function () {
          AuthApi.register(email, password, errMsg).then(
            () => (isPending.value = false)
          );
        }, 2000);
      }
    };
    return {
      email,
      password,
      rePassword,
      router,
      onFormSubmit,
      errMsg,
      isPending,
    };
  },
});
</script>
