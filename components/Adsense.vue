<template>
  <div>
    <ins
      class="adsbygoogle"
      :style="{
        display: 'inline-block',
        width: `${props.width}rem`,
        height: `${props.height}rem`,
      }"
      data-ad-client="ca-pub-1234567890123456"
      data-ad-slot="1234567890"
    ></ins>
  </div>
</template>

<script setup>
const props = defineProps({
  width: Number,
  height: Number,
});

onMounted(() => {
  (adsbygoogle = window.adsbygoogle || []).push({});
});
</script>

<style lang="scss" scoped></style>
