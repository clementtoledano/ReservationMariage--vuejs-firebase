<template>
  <div class="bg-gray-100 grid grid-cols-2 sm:grid-cols-4 text-center">
    <div class="m-2 p-5 border-2 border-gray-400 font-bold">TOTAL<br>{{ totalCount }}</div>
    <div class="m-2 p-5 border-2 border-gray-400 font-bold">ADULTES<br>{{ adultCount }}</div>
    <div class="m-2 p-5 border-2 border-gray-400 font-bold">ENFANTS<br>{{ childrenCount }}</div>
    <div class="m-2 p-5 border-2 border-gray-400 font-bold">DIMANCHE<br>{{ sundayCount }}</div>
  </div>
  <div class="w-full mt-4 mb-4 overflow-hidden rounded-lg">
    <div class="w-full">
      <table class="w-full">
        <thead>
        <tr
          class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
          <th class="px-4 py-3">Nom</th>
          <th class="px-4 py-3">Adulte</th>
          <th class="px-4 py-3">Enfant</th>
          <th class="px-4 py-3">Dimanche</th>
          <th class="px-4 py-3">Message</th>
        </tr>
        </thead>
        <tbody class="bg-white">
        <tr v-for="confirmation in confirmationList" :key="confirmation.id" class="text-gray-700">
          <td class="px-4 py-3 border">
            <div class="flex items-center text-sm">
              <div>
                <p class="font-semibold text-black">{{ confirmation.firstname }} {{ confirmation.lastname }}</p>
                <p class="text-xs text-gray-600">{{ confirmation.userEmail }}</p>
              </div>
            </div>
          </td>
          <td class="px-4 py-3 text-ms font-semibold border text-center">{{ confirmation.adult }}</td>
          <td class="px-4 py-3 text-ms font-semibold border text-center">{{ confirmation.children }}</td>
          <td class="px-4 py-3 text-xs border">
            <span
              :class="confirmation.sunday ? 'text-green-700 bg-green-100' : '' "
              class="px-2 py-1 font-semibold leading-tight  rounded-sm"> {{ confirmation.sunday ? "présent" : "non" }} </span>
          </td>
          <td class="px-4 py-3 text-sm border">{{ confirmation.message }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import firebase from "firebase";

export default defineComponent({
  name: "Admin",
  setup() {
    const totalCount = ref(88);
    const adultCount = ref(55);
    const childrenCount = ref(33);
    const sundayCount = ref(50);
    const confirmationList = ref([]);

    const confirmationCollection = firebase
      .firestore()
      .collection("confirmation");

    confirmationCollection.get()
      .then((snapshot) => {
        confirmationList.value = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(confirmationList.value);
      });


    return {
      totalCount, adultCount, childrenCount, sundayCount, confirmationList
    };
  },
  beforeRouteEnter(to, from, next) {
    if (prompt("password", "aze") !== "aze") {
      next("/");
    }
    next();
  }
});

</script>
