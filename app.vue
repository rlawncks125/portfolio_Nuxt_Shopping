<template>
  <NuxtLayout>
    <NuxtPage :key="$route.fullPath" />
  </NuxtLayout>
</template>

<script setup>
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
        "https://res.cloudinary.com/dhdq4v4ar/image/upload/v1654624758/%ED%8F%AC%ED%94%841_isxw3h.jpg",
    },
    {
      name: "og:type",
      property: "og:type",
      content: "website",
    },
  ],
});
</script>

<style>
html {
  @apply text-[10px] md:text-[14px];
}

input {
  @apply border;
}
</style>
