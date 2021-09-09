<template>
  <div class="mb-4">
    <label class="block text-sm font-bold mb-2" :for="props.id">{{
        props.label
      }}</label>
    <input
      :id="props.id"
      :value="modelValue"
      type="text"
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
      :class="props.errorMsg ? 'border-red' : 'border-gold'"
      autocomplete="off"
      :placeholder="props.placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <small class="text-red">{{ props.errorMsg }}</small>
    <div
      class="input-errors"
      v-for="(error, index) of props.errorMsg"
      :key="index"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BaseInput",
  props: {
    modelValue: { type: [String, Number], default: "" },
    errorMsg: { type: String, default: "" },
    id: { type: String, default: "", required: true },
    label: { type: String, default: "", required: true },
    placeholder: { type: [String, Number], default: "", required: true },
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
