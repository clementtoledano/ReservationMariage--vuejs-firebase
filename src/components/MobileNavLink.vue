<template>
  <router-link
    class="
      nav-link
      block
      px-3
      py-2
      rounded-md
      text-base
      font-medium
      hover:text-gray-900 hover:bg-gray-50
    "
    :to="props.to"
  >{{ props.name }}
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MobileNavLink",
  props: { to: String, name: String },
  setup(props) {
    return {
      props,
    };
  },
});
</script>
