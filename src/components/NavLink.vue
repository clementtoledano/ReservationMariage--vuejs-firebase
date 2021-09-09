<template>
  <router-link
    class="nav-link font-medium"
    :to="props.to"
  >{{ props.name }}
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavLink",
  props: { to: String, name: String },
  setup(props) {
    return {
      props,
    };
  },
});
</script>
