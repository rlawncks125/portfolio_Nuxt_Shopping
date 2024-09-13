<template>
  <div>
    <BaseHeader />
    <slot v-if="isToken" />
    <login-compo v-else />
    <BaseFooter />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUser } from "~~/sotre/user";

const { userToken: isToken } = storeToRefs(useUser());
</script>

<style lang="scss" scoped></style>
