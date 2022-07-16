<template>
  <div ref="tostRef"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const tostRef = ref();
    const { $setToastEditor } = useNuxtApp();

    onMounted(() => {
      $setToastEditor(tostRef.value);
    });

    return { tostRef };
  },
});
</script>

<style scoped></style>
