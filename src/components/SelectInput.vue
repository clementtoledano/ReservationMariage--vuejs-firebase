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
      <option>10</option>
      <option>11</option>
      <option>12</option>
      <option>13</option>
      <option>14</option>
      <option>15</option>
      <option>16</option>
      <option>17</option>
      <option>18</option>
      <option>19</option>
      <option>20</option>
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
