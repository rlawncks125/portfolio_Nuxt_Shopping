<template>
  <div v-if="item">
    <img class="w-full h-[60%]" :src="item.thumbnailSrc" alt="" />
    <div class="p-4">
      <p>{{ item.title }}</p>
      <div class="flex gap-2 items-center">
        <span class="text-red-500">{{ item.sale }}%</span>
        <p>
          <span class="font-bold">
            {{
              formatToWon(+item.price * ((100 - item.sale) / 100) + "")
            }}</span
          ><span class="text-[0.9rem]">원</span>
        </p>
        <p class="text-gray-400 text-[0.8rem]">
          <del> {{ formatToWon(item.price) }}<span>원</span> </del>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShopItem } from "~~/api/swagger";
import { formatToWon } from "~~/utils/format";

const { item } = defineProps({
  item: Object as () => ShopItem,
});
</script>

<style scoped></style>
