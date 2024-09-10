<template>
  <div class="min-h-[70vh] max-w-container mx-auto relative">
    <div v-if="searchItem.length > 0">
      <h2 class="text-center text-[2rem] my-[1.5rem]">검색 결과</h2>
      <div
        class="max-w-container mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3 text-[1.1rem]"
      >
        <div
          v-for="item in searchItem"
          class="border border-gray-200 cursor-pointer hover:border-gray-400"
          @click="() => useRouter().push(`/item/${item.id}`)"
        >
          <design-item-design :item="item" />
        </div>
      </div>
    </div>
    <!-- 아이템 못찾음 -->
    <div
      v-else
      class="min-h-[60vh] text-center flex flex-col justify-center gap-[1rem] mt-[3rem] text-gray-400"
    >
      <fa-icon
        class="border mx-auto w-[3rem] h-[3rem] p-[2rem] rounded-full "
        icon="exclamation"
        size="3x"
      />

      <p class="text-[1.5rem]">아이템을 찾을수 없습니다.</p>
    </div>
    <!-- 왼쪽 광고 -->
    <div
      class="hidden xl:block absolute top-0 w-[12rem] left-[-12.5rem] border"
    >
      <Adsense :width="12" :height="30" :ad-slot="5147197541" />
    </div>
    <!-- 오른쪽 광고 -->
    <div
      class="hidden xl:block absolute top-0 w-[12rem] right-[-12.5rem] border"
    >
      <Adsense :width="12" :height="30" :ad-slot="5147197541" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { searchItems } from "~~/api/item";

const query = useRoute().query;

const searchItem = useState<any[]>("searchItem", () => []);

onMounted(async () => {
  console.log(query);

  const { title, category } = query as { title: string; category: string };
  if (!title && !category) {
    searchItem.value = [];
    return;
  }
  const { ok, items } = await searchItems({
    title,
    category,
  });
  if (ok) {
    searchItem.value = items;
  }
});
</script>

<style lang="scss" scoped></style>
