<template>
  <div class="lg:w-full">
    <form class="" @submit.prevent="onFormSubmit">
      <h1 class="text-center mb-4 text-3xl font-cursive font-extrabold">Votre confirmation</h1>
      <TextInput
        id="lastname"
        v-model="state.lastname"
        label="Votre nom"
        placeholder="nom"
        :error-msg="v$?.lastname?.$errors[0]?.$message"
      ></TextInput>

      <TextInput
        id="firstname"
        v-model="state.firstname"
        label="Votre prénom"
        placeholder="prénom"
        :error-msg="v$?.firstname?.$errors[0]?.$message"
      ></TextInput>

      <TextInput
        id="phone"
        v-model="state.phone"
        label="Votre téléphone"
        placeholder="Numéro de telephone"
        :error-msg="v$?.phone?.$errors[0]?.$message"
      ></TextInput>

      <div class="mb-4">
        <label class="block text-sm font-bold mb-2" for="address"
        >Votre adresse postale</label
        >
        <textarea
          id="address"
          v-model="state.address"
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
          :class="v$?.address?.$errors[0]?.$message === '' ? '' : 'border-red'"
          rows="3"
        />
        <small class="text-red">{{ v$?.address?.$errors[0]?.$message }}</small>

      </div>
      <NumberInput
        id="adult"
        v-model="state.adult"
        label="Nombre d'adulte"
        placeholder="Nombre d'adulte"
        :error-msg="v$?.adult?.$errors[0]?.$message"

      ></NumberInput>
      <NumberInput
        id="children"
        v-model="state.children"
        label="Nombre d'enfant de moins de 10 ans"
        placeholder="Nombre d'enfant"
        :error-msg="v$?.children?.$errors[0]?.$message"
      ></NumberInput>
      <div class="mb-4 flex items-center">
        <input
          id="sunday"
          v-model="state.sunday"
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
          v-model="state.message"
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
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, minValue, numeric, required } from "@vuelidate/validators";
import Button from "../components/Button";
import DisabledButton from "../components/DisabledButton";
import confirmationApi from "../service/confirmationApi";
import authApi from "../service/authApi";
import TextInput from "../components/TextInput";
import NumberInput from "../components/NumberInput";

export default defineComponent({
  name: "Confirmation",
  components: { NumberInput, TextInput, DisabledButton, Button },
  setup() {
    const router = useRouter();
    const newUser = ref(true);
    const id = ref("");
    const isPending = ref(false);
    const state = reactive({
      lastname: "",
      firstname: "",
      phone: "",
      address: "",
      adult: 1,
      children: 0,
      sunday: false,
      message: ""
    });
    const rules = {
      lastname: {
        required: helpers.withMessage("Ce champ ne peut pas être vide", required),
        minLength: helpers.withMessage("Le nom doit être minimum de 2 lettres ", minLength(2))
      },
      firstname: { required: helpers.withMessage("Ce champ ne peut pas être vide", required),
        minLength: helpers.withMessage("Le prénom doit être minimum de 2 lettres ", minLength(2))
      },
      phone: {
        required: helpers.withMessage("Ce champ ne peut pas être vide", required),
        numeric: helpers.withMessage("Le numéro n'est pas valide", numeric),
        minLength: helpers.withMessage("Le numéro doit contenir 10 chiffres ", minLength(10))
      },
      address: { required: helpers.withMessage("Le champ adresse ne peut pas être vide", required) },
      adult: {
        minValue: helpers.withMessage("Le chiffre ne peut être négatif", minValue(0)),
        numeric: helpers.withMessage("Le nombre n'est pas valide", numeric)
      },
      children: {
        minValue: helpers.withMessage("Le chiffre ne peut être négatif", minValue(0)),
        numeric: helpers.withMessage("Le nombre n'est pas valide", numeric)
      },
      sunday: {},
      message: {}
    };

    const errors = reactive({
      lastname: "",
      firstname: "",
      phone: "",
      address: "",
      adult: "",
      children: ""
    });

    function eeeee(errors) {
      console.log(errors);
    }

    const v$ = useVuelidate(rules, state, { $lazy: true });

    const user = authApi.currentUser();

    if (!user) {
      alert("Vous devez vous connecter pour accéder à cette page");
      router.push("/");
    } else {
      confirmationApi.getConfirmationId(
        id,
        user,
        state,
        newUser
      );
    }

    const onFormSubmit = () => {
      v$.value.$validate();
      eeeee(v$.value.$errors);
      if (v$.value.$invalid) return;

      isPending.value = true;
      setTimeout(function() {
        if (newUser.value) {
          confirmationApi
            .create(
              state
            )
            .then(() => (isPending.value = false));
        } else {
          confirmationApi
            .update(
              id,
              state
            )
            .then(() => (isPending.value = false));
        }
      }, 2000);
    };

    return {
      v$,
      state,
      router,
      newUser,
      id,
      onFormSubmit,
      isPending,
      errors
    };
  }
});

export const phone = {
  $validator: value => {
    if (typeof value === "undefined" || value === null || value === "") {
      return true;
    }
    return /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(value);
  },
  $message: "Must be a valid phone number."
};
</script>
