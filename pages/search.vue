<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <NuxtPage :key="route.fullPath" />
</template>

<style lang="scss" scoped></style>
