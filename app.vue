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

  const config = useRuntimeConfig();
  const url = config.public.apiServer;

  console.log(config, url);
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
      name: "title",
      content: "Nuxt3 shopping test.",
    },
    {
      name: "description",
      content: "Nuxt3 shopping test.",
    },
    {
      name: "keywords",
      content: "kimjuchanTest, 포트폴리오테스트, nuxtShoppingTest",
    },
    {
      name: "og:title",
      property: "og:title",
      content: `Nuxt3 shopping test.`,
    },
    {
      name: "og:description",
      property: "og:description",
      content: "Nuxt3 shopping test.",
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
    {
      name: "google-site-verification",
      content: "vtqZyN4fnhpMU9K94e86xOtSp3kwew7-nWkHhsW0m_U",
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
