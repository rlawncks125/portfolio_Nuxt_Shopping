<template>
  <ins
    class="adsbygoogle"
    :style="{
      display: 'inline-block',
      width: `${width}rem`,
      height: `${height}rem`,
    }"
    data-ad-client="ca-pub-9084840519993362"
    :data-ad-slot="slot"
  ></ins>
</template>

<script setup>
const props = defineProps({
  width: Number,
  height: Number,
  slot: Number,
});

const { width, height, slot } = toRefs(props);

onMounted(() => {
  (adsbygoogle = window.adsbygoogle || []).push({});
});
</script>

<style lang="scss"></style>
