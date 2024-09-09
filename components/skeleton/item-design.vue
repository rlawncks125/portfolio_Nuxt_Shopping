<template>
  <div>
    <NuxtImg class="skeleton thumbnail-container " />
    <div class="skeleton p-4">
      <p class="skeleton-text"></p>
      <div class="skeleton-text gap-2"></div>
    </div>
  </div>
</template>

<style scoped>
.thumbnail-container {
  position: relative;
  width: 100%;
  padding-top: 60%; /* Aspect ratio of 3:5 */
  overflow: hidden;
}
</style>
