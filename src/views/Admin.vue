<template>
  <div class="bg-gray-100 grid grid-cols-3 sm:grid-cols-3 text-center shadow-lg">
    <div class="m-2 p-5 border-2 border-gray-400 font-bold">
      TOTAL<br />{{ totalCount }}
    </div>
    <div class="m-2 p-5 border-2 border-gray-400 font-bold">
      ADULTES<br />{{ adultCount }}
    </div>
    <div class="m-2 p-5 border-2 border-gray-400 font-bold">
      ENFANTS<br />{{ childrenCount }}
    </div>
  </div>

  <div class="w-full mb-8 overflow-hidden ">
    <div
      v-for="confirmation in confirmationList"
      :key="confirmation.lastname"
      class="align-top my-4 rounded-lg shadow-lg"
    >
      <div class="grid grid-cols-2">
        <div class="px-5 py-3 border">
          <p class="font-semibold text-black">
            {{ confirmation.firstname }} {{ confirmation.lastname }}
          </p>
          <p class="text-xs text-gray-600">
            {{ confirmation.userEmail }}
          </p>
          <p class="text-xs text-gray-600">
            {{ confirmation.phone }}
          </p>
          <p class="text-xs text-gray-600">
            {{ confirmation.address }}
          </p>
        </div>
        <div class="px-5 py-3 text-sm border ">
          <p class="">
            Adulte : <span class="font-semibold">{{ confirmation.adult }}</span>
          </p>
          <p>
            Enfant : <span class="font-semibold">{{ confirmation.children }}</span>
          </p>
        </div>
      </div>
      <div class="px-4 py-3 text-sm border">{{ confirmation.message }}</div>
    </div>

  </div>

</template>

<script>
import { computed, defineComponent, ref } from "vue";
import confirmationApi from "../service/confirmationApi";

export default defineComponent({
  name: "Admin",
  setup() {
    const totalCount = ref(0);
    const adultCount = ref(0);
    const childrenCount = ref(0);
    const confirmationList = ref([]);

    confirmationApi.getAllConfirmation().then(data => {
      confirmationList.value = data;
      data.forEach(userConfirmation => {
        adultCount.value += Number(userConfirmation["adult"]);
        childrenCount.value += Number(userConfirmation["children"]);
      });
    });

    totalCount.value = computed(() => Number(adultCount.value) + Number(childrenCount.value));

    return {
      totalCount,
      adultCount,
      childrenCount,
      confirmationList
    };
  },
  beforeRouteEnter(to, from, next) {
    // Seulement pour un petit site entre amis ;)
    if (prompt("password") !== "azeqsdaze") {
      next("/");
    }
    next();
  }
});
</script>
