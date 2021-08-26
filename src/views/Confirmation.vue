<template>
  <div class="lg:w-full">
    <form class="" @submit.prevent="onFormSubmit">
      <h1 class="text-center mb-4 text-3xl font-cursive font-extrabold">Votre confirmation</h1>
      <TextInput
        id="lastname"
        v-model="lastname"
        label="Votre nom"
        placeholder="nom"
      ></TextInput>
      <TextInput
        id="firstname"
        v-model="firstname"
        label="Votre prenom"
        placeholder="prénom"
      ></TextInput>
      <PhoneInput
        id="phone"
        v-model="phone"
        type="text"
        label="Votre telephone"
        placeholder="Numero de telephone"
      ></PhoneInput>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2" for="address"
        >Votre adresse postale</label
        >
        <textarea
          id="message"
          v-model="address"
          class="
            shadow-md
            border
            border-gold
            appearance-none
            rounded
            w-full
            py-2
            px-3
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          rows="3"
        />
      </div>
      <NumberInput
        id="adult"
        v-model="adult"
        label="Nombre d'adulte"
        placeholder="Nombre d'adulte"
      ></NumberInput>
      <NumberInput
        id="children"
        v-model="children"
        type="number"
        label="Nombre d'enfant de moins de 10 ans"
        placeholder="Nombre d'enfant"
      ></NumberInput>

      <div class="mb-4 flex items-center">
        <input
          id="sunday"
          v-model="sunday"
          class="mr-4"
          type="checkbox"
          placeholder=""
        />
        <label class="block text-sm font-bold" for="sunday"
        >Votre présence le dimanche midi</label
        >
      </div>
      <div class="mb-4">
        <label class="block text-sm font-bold mb-2" for="message"
        >Un message pour nous ?</label
        >
        <textarea
          id="message"
          v-model="message"
          class="
            shadow-md
            border
            border-gold
            appearance-none
            rounded
            w-full
            py-2
            px-3
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          rows="3"
        />
      </div>
      <Button v-if="!isPending">Confirmer</Button>
      <DisabledButton v-else>Enregistrement...</DisabledButton>
      <h3>Fin des modifications le 15 octobre</h3>
    </form>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
import Button from "../components/Button";
import DisabledButton from "../components/DisabledButton";
import confirmationApi from "../service/confirmationApi";
import authApi from "../service/authApi";
import TextInput from "../components/TextInput";
import NumberInput from "../components/NumberInput";
import PhoneInput from "../components/PhoneInput";

export default defineComponent({
  name: "Confirmation",
  components: { PhoneInput, NumberInput, TextInput, DisabledButton, Button },
  setup() {
    const router = useRouter();
    const lastname = ref("");
    const firstname = ref("");
    const phone = ref("");
    const address = ref("");
    const adult = ref(1);
    const children = ref(0);
    const message = ref("");
    const sunday = ref(false);
    const newUser = ref(true);
    const id = ref("");
    const isPending = ref(false);

    const user = authApi.currentUser();

    if (!user) {
      alert("Vous devez vous connecter pour accéder à cette page");
      router.push("/");
    } else {
      confirmationApi.getConfirmationId(
        id,
        user,
        lastname,
        firstname,
        phone,
        address,
        adult,
        children,
        message,
        sunday,
        newUser
      );
    }

    const onFormSubmit = () => {
      isPending.value = true;
      setTimeout(function() {
        if (newUser.value) {
          confirmationApi
            .create(
              lastname,
              firstname,
              phone,
              address,
              adult,
              children,
              message,
              sunday
            )
            .then(() => (isPending.value = false));
        } else {
          confirmationApi
            .update(
              id,
              lastname,
              firstname,
              phone,
              address,
              adult,
              children,
              message,
              sunday
            )
            .then(() => (isPending.value = false));
        }
      }, 2000);
    };

    return {
      router,
      lastname,
      firstname,
      phone,
      address,
      adult,
      children,
      message,
      sunday,
      newUser,
      id,
      onFormSubmit,
      isPending
    };
  }
});
</script>
