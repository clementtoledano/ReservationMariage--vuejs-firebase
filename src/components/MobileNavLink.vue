<template>
  <router-link
    class="            nav-link
            block
            px-3
            py-2
            rounded-md
            text-base
            font-medium
            text-gray-700
            hover:text-gray-900 hover:bg-gray-50"
    :to="props.to"
  >{{ props.name }}
  </router-link
  >
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MobileNavLink",
  props: { to: String, name : String },
  setup(props){
    return{
      props
    }
  }
});
</script>
