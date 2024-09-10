<template>
  <NuxtLayout>
    <LazyLoadingBar :size="3" :is-show="loadingStatus" class="text-[2rem]" />
    <NuxtPage class="min-h-[75vh]" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLoading } from "./sotre/loading";

const { loadingStatus } = storeToRefs(useLoading());

onMounted(() => {
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
    const baseTitle = "김주찬쇼핑몰포트폴리오";
    return titleChunk ? `${baseTitle} - ${titleChunk}` : baseTitle;
  },
  meta: [
    {
      name: "title",
      content: "김주찬쇼핑몰포트폴리오",
    },
    {
      name: "description",
      content: "김주찬 쇼핑몰 포트폴리오 사이트 입니다.",
    },

    {
      name: "og:title",
      property: "og:title",
      content: `김주찬 쇼핑몰 포트폴리오 사이트 입니다.`,
    },
    {
      name: "og:description",
      property: "og:description",
      content: "김주찬 쇼핑몰 포트폴리오 사이트 입니다.",
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
      content: "c6133382bba6ab68544963359e13d5ea08ae5f25",
    },
    {
      name: "google-site-verification",
      content: "XYcTcfWhtK72ndzC_OAqfQaLr_KZaZI8UjqSWNU5Ag8",
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
