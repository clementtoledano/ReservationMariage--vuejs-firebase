<template>
  <div @click="$emit('isToggle', !presence)">
    <div
      class="w-16 h-7 flex items-center rounded-full p-1 transform duration-300 ease-in-out"
      :class="presence ? 'bg-gold' : 'bg-red'"
    >
      <div
        class="bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out"
        :class="{ 'translate-x-8': presence }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Toggle",
  props: {
    presence: { type: Boolean },
  },
  emits: ["isToggle"],
});
</script>
