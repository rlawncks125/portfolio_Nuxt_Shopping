<template>
  <div>login</div>
  <nuxt-link to="/">goHoe</nuxt-link>
  <compo />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    useHead({
      title: "login",
    });
    return {};
  },
});
</script>
