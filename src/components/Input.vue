<template>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" :for="props.id">{{
      props.label
    }}</label>
    <input
      :id="props.id"
      :value="modelValue"
      :type="props.type"
      class="
        shadow
        appearance-none
        border
        rounded
        w-full
        py-2
        px-3
        text-gray-700
        leading-tight
        focus:outline-none focus:shadow-outline
      "
      :placeholder="props.placeholder"
      required
      @input="updateValue"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Input",
  props: {
    modelValue: { type: String, default: "" },
    type: { type: String, default: "", required: true },
    id: { type: String, default: "", required: true },
    label: { type: String, default: "", required: true },
    placeholder: { type: String, default: "", required: true },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const data = ref();

    function updateValue(event) {
      emit("update:modelValue", event.target.value);
    }
    return {
      data,
      props,
      updateValue,
    };
  },
});
</script>
