<template>
  <div class="mb-4">
    <label class="block text-sm font-bold mb-2" :for="props.id">{{
        props.label
      }}</label>
    <input
      :id="props.id"
      :value="modelValue"
      type="password"
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
      placeholder="*****"
      min="6"
      required
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PasswordInput",
  props: {
    modelValue: { type: String, default: "" },
    id: { type: String, default: "", required: true },
    label: { type: String, default: "", required: true },
  },
  emits: ["update:modelValue"],
  setup(props) {
    const data = ref();

    return {
      data,
      props,
    };
  },
});
</script>
