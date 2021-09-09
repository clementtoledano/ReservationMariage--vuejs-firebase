<template>
  <div class="mb-2 block font-bold">
    <select
      class="border-2 text-gold w-14 h-8 mr-2 font-bold"
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
    >
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SelectInput",
  props: {
    modelValue: { type: Number },
    id: { type: String, required: true },
  },
  emits: ["update:modelValue"],
  setup() {
    return {};
  },
});
</script>
