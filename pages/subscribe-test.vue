<template>
  <div>
    <LazyFaIcon icon="ban" size="sm" />
    <LazyFaIcon :icon="'bacon'" :size="'2xl'" />

    <p class="text-red-700">index vue</p>
    <NuxtLink to="/login">login</NuxtLink>
    <br />
    <button @click="subScribe">구독 버튼</button>
    <br />
    <button @click="unSubScribe">구독 취소</button>

    {{ data }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Worker } from "@/plugins/sw.client";

export default defineComponent({
  setup() {
    const subScribe = async () => {
      const sub = await Worker.instance.subscribe();
      console.log(sub);
    };
    const unSubScribe = async () => {
      const isDelete = await Worker.instance.unSubcribe();
      console.log(isDelete);
    };

    const { $axios } = useNuxtApp();

    const { data } = useAsyncData("restaurtInfo", () =>
      $axios.get("restaurant/11").then((res) => res.data)
    );

    return { subScribe, unSubScribe, data };
  },
});
</script>

<style scoped></style>
