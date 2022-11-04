<template>
  <NuxtLayout>
    <LazyLoadingBar :size="3" :is-show="loadingStatus" class="text-[2rem]" />
    <NuxtPage :key="$route.fullPath" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ShopitemService } from "./api/swagger";
import { useLoading } from "./sotre/loading";

const { loadingStatus } = storeToRefs(useLoading());

onMounted(async () => {
  // swagger사용
  // const saerch = await ShopitemService.shopItemControllerSearchItems({
  //   take: 10,
  //   createTimeOrder: "ASC",
  // });
  // console.log(saerch);
});

useHead({
  titleTemplate: (titleChunk) => {
    const baseTitle = "쇼핑몰포트폴리오";
    return titleChunk ? `${baseTitle} - ${titleChunk}` : baseTitle;
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  meta: [
    {
      name: "description",
      content: "Nuxt3 shopping.",
    },
    {
      name: "og:title",
      property: "og:title",
      content: `Nuxt3 shopping.`,
    },
    {
      name: "og:description",
      property: "og:description",
      content: "Nuxt3 shopping.",
    },
    {
      name: "og:image",
      property: "og:image",
      content:
        "https://res.cloudinary.com/dhdq4v4ar/image/upload/v1661371113/transparent-bg_-no-shadow-designify_wst7my.png",
    },
    {
      name: "og:type",
      property: "og:type",
      content: "website",
    },
    {
      name: "naver-site-verification",
      property: "naver-site-verification",
      content: "51613a340a3645bde340073b44cf092001efc192",
    },
  ],
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR&display=swap");

html {
  @apply text-[12px] md:text-[16px];
}

body {
  font-family: "IBM Plex Sans KR", sans-serif;
}
</style>
