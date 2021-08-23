<template>
  <div class="lg:w-full">
    <form class="" @submit.prevent="onFormSubmit">
      <h1 class="text-center mb-4 text-xl">Connexion</h1>
      <Input id="email" v-model="email" type="text" label="Votre Email" placeholder="email"></Input>
      <Input id="password" v-model="password" type="password" label="Votre Password" placeholder="*****"></Input>

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
import Input from "../components/Input";
import Button from "../components/Button";
import DisabledButton from "../components/DisabledButton";

export default defineComponent({
  name: "SignIn",
  components: { DisabledButton, Button, Input },
  setup() {
    const email = ref("");
    const password = ref("");
    const errMsg = ref();
    const router = useRouter();
    const isPending = ref(false);

    const onFormSubmit = () => {
      isPending.value = true;
      setTimeout(function() {
        AuthApi.signIn(email, password, errMsg);
        isPending.value = false;
      }, 2000);
    };
    return {
      email, password, errMsg, router, onFormSubmit, isPending
    };
  }
});

</script>
