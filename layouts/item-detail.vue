<template>
  <!-- <ClientOnly> -->
  <BaseHeader />
  <Suspense>
    <slot />

    <template #fallback>
      <!-- 아이템이 존재하지않음 -->
      <div class="h-[100vh]"></div>
    </template>
  </Suspense>
  <BaseFooter />
  <!-- </ClientOnly> -->
</template>

<script setup lang="ts">
// import type { ShopItem } from '~/api/swagger';

// const {
//   params: { id },
// } = useRoute();
// const { $axios } = useNuxtApp();

// if(id){

//   const data = await useAsyncData("itemMetaData", () =>
//     $axios.get(`shop-item/${id}`)
//     .then((res) => res.data as { ok: boolean; item: ShopItem })
//   );

//   const {title,thumbnailSrc,price} = data.data.value?.item!;

//   useSeoMeta({
//     title : `아이템 :  ${id}`,
//     description : `쇼핑 데이터 ${id}`,
//     ogTitle : title,
//     ogDescription : `${title}의 가격은 ${price}입니다.`,
//     ogImage : thumbnailSrc
//   })
// }
</script>

<style lang="scss"></style>
