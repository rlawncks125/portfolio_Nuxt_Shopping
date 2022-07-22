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

    <p>Async Data</p>
    <div v-if="pending">Async Data Loading ...</div>
    <div v-else>Async Data : {{ data }}</div>

    <p>Ref Data</p>
    <div v-if="!axiosData">Ref Data Loading...</div>
    <div v-else>Ref Data : {{ axiosData }}</div>
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
    const axiosData = ref();

    const { data, pending } = useLazyAsyncData("restaurtInfo", () =>
      $axios.get("restaurant/11").then((res) => res.data)
    );

    onMounted(async () => {
      axiosData.value = await $axios
        .get("restaurant/11")
        .then((res) => res.data);
    });

    return { subScribe, unSubScribe, data, pending, axiosData };
  },
});
</script>

<style scoped></style>
