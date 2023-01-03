<template>
  <ins
    class="adsbygoogle"
    :style="{
      display: 'inline-block',
      width: `${props.width}rem`,
      height: `${props.height}rem`,
    }"
    data-ad-client="ca-pub-9084840519993362"
    :data-ad-slot="props.adSlot"
  ></ins>
</template>

<script setup>
const props = defineProps({
  width: Number,
  height: Number,
  adSlot: Number,
});

onMounted(() => {
  (adsbygoogle = window.adsbygoogle || []).push({});
});
</script>

<style lang="scss"></style>
