<template>
  <div>
    <p>reCAPTCHA테스트</p>
    <div ref="reCAPTCHARef"></div>
  </div>
</template>

<script setup>
const reCAPTCHARef = useState("reCAPTCHARef");

onMounted(() => {
  const { $reCAPTCHA } = useNuxtApp();
  $reCAPTCHA(reCAPTCHARef.value, (res) => {
    console.log(res);
  });
});
</script>

<style lang="scss" scoped></style>
