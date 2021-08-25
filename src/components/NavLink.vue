<template>
  <router-link
    class="nav-link font-medium text-gray-500 hover:text-gray-900"
    :to="props.to"
    >{{ props.name }}
  </router-link>
</template>
<script>
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
