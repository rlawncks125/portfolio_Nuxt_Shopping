<template>
  <div>
    <div ref="reCAPTCHARef"></div>
  </div>
</template>

<script setup>
const emit = defineEmits(["success"]);
const reCAPTCHARef = useState("reCAPTCHARef");

onMounted(() => {
  const { $reCAPTCHA } = useNuxtApp();
  $reCAPTCHA(reCAPTCHARef.value, (res) => {
    if ("success" in res) {
      emit("success", res["success"]);
    }
  });
});
</script>

<style lang="scss" scoped></style>
