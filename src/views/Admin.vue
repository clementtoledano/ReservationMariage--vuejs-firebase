<template>
  <div class="bg-gray-100 grid grid-cols-2 sm:grid-cols-4 text-center">
    <div class="m-2 p-5 border-2 border-gray-400 font-bold">
      TOTAL<br />{{ totalCount }}
    </div>
    <div class="m-2 p-5 border-2 border-gray-400 font-bold">
      ADULTES<br />{{ adultCount }}
    </div>
    <div class="m-2 p-5 border-2 border-gray-400 font-bold">
      ENFANTS<br />{{ childrenCount }}
    </div>
    <div class="m-2 p-5 border-2 border-gray-400 font-bold">
      DIMANCHE<br />{{ sundayCount }}
    </div>
  </div>

  <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div class="w-full overflow-x-auto">
      <table class="table-fixed">
        <thead>
        <tr
           class="
              text-md
              font-semibold
              tracking-wide
              text-left text-gray-900
              bg-gray-100
              uppercase
              border-b
              border-gray-600
            "
        >
          <th class="px-4 py-3 w-15">Infos</th>
          <th class="px-4 py-3 w-24">Présence</th>
          <th class="px-4 py-3">Message</th>
        </tr>
        </thead>
        <tbody class="bg-white">
        <tr
          v-for="confirmation in confirmationList"
          :key="confirmation.id"
          class="text-gray-700 align-top"
        >
          <td class="px-5 py-3 border">
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
          </td>
          <td class="px-8 py-3 text-sm border">
            <p>
              Adulte : <span class="font-semibold">{{ confirmation.adult }}</span>
            </p>
            <p>
              Enfant : <span class="font-semibold">{{ confirmation.children }}</span>
            </p>
            <p>
              Dimanche midi :
              <span
                :class="
                  confirmation.sunday ? 'text-green-700 bg-green-100' : ''
                "
                class="px-0.5 py-0.5 font-semibold leading-tight rounded-sm"
              >
              {{ confirmation.sunday ? "présent" : "non" }}
              </span>
            </p>
          </td>
          <td class="px-4 py-3 text-sm border">{{ confirmation.message }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import firebase from "firebase";

export default defineComponent({
  name: "Admin",
  setup() {
    const totalCount = ref(0);
    const adultCount = ref(0);
    const childrenCount = ref(0);
    const sundayCount = ref(0);
    const confirmationList = ref([]);

    const confirmationCollection = firebase
      .firestore()
      .collection("confirmation");

    confirmationCollection.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      confirmationList.value = data;

      data.forEach((row) => {
        adultCount.value += +row["adult"];
        childrenCount.value += +row["children"];
        if (row.sunday === true) {
          sundayCount.value += +row["adult"] + +row["children"];
        }
      });
    });
    totalCount.value = computed(() => adultCount.value + childrenCount.value);

    return {
      totalCount,
      adultCount,
      childrenCount,
      sundayCount,
      confirmationList
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
