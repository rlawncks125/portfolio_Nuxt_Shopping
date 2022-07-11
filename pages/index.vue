<template>
  <div>
    <FaIcon icon="ban" size="sm" />

    <p class="text-red-700">index vue</p>
    <NuxtLink to="/login">login</NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
