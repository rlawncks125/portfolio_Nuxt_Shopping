<template>
  <div>
    {{ query }}
  </div>
</template>

<script setup>
const query = useRoute().query;
</script>

<style lang="scss" scoped></style>
