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
      />

      <TextInput
        id="firstname"
        v-model="state.firstname"
        label="Votre prénom"
        placeholder="prénom"
        :error-msg="v$?.firstname?.$errors[0]?.$message"
      />

      <TextInput
        id="phone"
        v-model="state.phone"
        label="Votre téléphone"
        placeholder="Numéro de telephone"
        :error-msg="v$?.phone?.$errors[0]?.$message"
      />

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
            appearance-none
            rounded
            w-full
            py-2
            px-3
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          :class="v$?.address?.$errors[0] ? 'border-red' : 'border-gold'"
          rows="3"
        />
        <small class="text-red">{{ v$?.address?.$errors[0]?.$message }}</small>
      </div>
      <div class="text-3xl text-center font-cursive pb-4">
        <p class="">Serez vous présent ?</p>
        <Toggle v-model="presence" class="m-5" />
        <p :class=" presence ? 'border-2 border-gold text-gold' : 'border-2 border-red text-red'"
           class="mx-auto px-2 m-1">{{ presence ? "Oui, vous serez là" : "Non, vous ne le serez pas" }}</p>
      </div>

      <transition
        enter-active-class="transition-opacity duration-250"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-250"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-show="presence" class="transition-all mb-5">

          <div class="mb-4 block font-bold mb-2">
            Vous serez :
          </div>
          <div class="mb-4 block font-bold mb-2">
            <select class="border-2 text-gold w-14 h-8 mr-2 font-bold" v-model="state.adult">
              <option disabled value="">Adulte</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </select>
            adulte(s) et enfant(s) de plus de 10 ans
          </div>
          <div class="mb-4 block font-bold mb-2">
            <select class="border-2 text-gold w-14 h-8 mr-2 p-1 font-bold" v-model="state.children">
              <option disabled value="">Adulte</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </select>
            enfant(s) de moins de 10 ans
          </div>
        </div>
      </transition>
      <div class="my-4">
        <label class="block font-bold mb-2" for="message"
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
          :class="v$?.message?.$errors[0] ? 'border-red' : 'border-gold'"
          rows="6"
        />
        <small class="text-red">{{ v$?.message?.$errors[0]?.$message }}</small>
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
import Toggle from "@vueform/toggle";
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, minLength, numeric, required } from "@vuelidate/validators";
import Button from "../components/Button";
import DisabledButton from "../components/DisabledButton";
import confirmationApi from "../service/confirmationApi";
import authApi from "../service/authApi";
import TextInput from "../components/TextInput";
import NumberInput from "../components/NumberInput";

export default defineComponent({
  name: "Confirmation",
  components: { NumberInput, TextInput, DisabledButton, Button, Toggle },
  setup() {
    const router = useRouter();
    const newUser = ref(true);
    const id = ref("");
    const isPending = ref(false);
    const presence = ref(true);

    const state = reactive({
      lastname: "",
      firstname: "",
      phone: "",
      address: "",
      adult: "1",
      children: "0",
      sunday: false,
      message: ""
    });
    const rules = {
      lastname: {
        required: helpers.withMessage("Ce champ ne peut pas être vide", required),
        minLength: helpers.withMessage("Le nom doit être minimum de 2 lettres", minLength(2)),
        maxLength: helpers.withMessage("Le nom doit être maximum de 15 lettres", maxLength(15))
      },
      firstname: {
        required: helpers.withMessage("Ce champ ne peut pas être vide", required),
        minLength: helpers.withMessage("Le prénom doit être minimum de 2 lettres ", minLength(2)),
        maxLength: helpers.withMessage("Le prénom doit être maximum de 15 lettres", maxLength(15))

      },
      phone: {
        required: helpers.withMessage("Ce champ ne peut pas être vide", required),
        numeric: helpers.withMessage("Le numéro n'est pas valide", numeric),
        minLength: helpers.withMessage("Le numéro doit contenir 10 chiffres ", minLength(10)),
        maxLength: helpers.withMessage("Le numéro doit être maximum de 10 lettres", maxLength(10))
      },
      address: {
        required: helpers.withMessage("L'adresse ne peut pas être vide", required),
        minLength: helpers.withMessage("Minimum 10 caractères", minLength(10)),
        maxLength: helpers.withMessage("maximum 100 caractères", maxLength(100))
      },
      message: {
        maxLength: helpers.withMessage("maximum 400 caractères chiffres ", maxLength(400))
      }
    };

    const errors = reactive({
      lastname: "",
      firstname: "",
      phone: "",
      address: "",
      adult: "",
      children: ""
    });


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
      ).then(() => {

        (state.adult === "0") ? presence.value = false : presence.value = true;
      });
    }

    const onFormSubmit = () => {
      v$.value.$validate();
      if (!presence.value) {
        state.adult = "0";
        state.children = "0";
        state.sunday = false;
      }
      (state.adult === "0") ? presence.value = false : presence.value = true;
      console.log(presence.value);

      if (v$.value.$invalid) return;

      console.log(state);

      isPending.value = true;
      setTimeout(function() {
        if (newUser.value) {
          confirmationApi
            .create(
              state
            )
            .then(() => {
              isPending.value = false;
              alert("Vous avez confirmé votre presence, merci !");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          confirmationApi
            .update(
              id,
              state
            )
            .then(() => {
              isPending.value = false;
              alert("Votre confirmation a été mise à jour!");
            })
            .catch((error) => {
              console.log(error);
            });
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
      errors,
      presence
    };
  }
})
;

</script>

<style src="@vueform/toggle/themes/default.css"></style>
