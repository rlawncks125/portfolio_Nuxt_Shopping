<template>
  <div>
    <LazyBaseHeader />
    <slot v-if="isToken" />
    <lazy-login-compo v-else />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUser } from "~~/sotre/user";

const { userToken: isToken } = storeToRefs(useUser());
</script>

<style lang="scss" scoped></style>
