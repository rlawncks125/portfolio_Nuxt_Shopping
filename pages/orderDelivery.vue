<template>
  <div class="max-w-container mx-auto">
    <p class="mb-[5rem]">
      주문 배송
    </p>
    <div v-for="v in items" class="flex flex-col px-2">
      <div>
        <!-- 주문날짜 -->
        <p class="h-[1px] w-[100%] bg-gray-400"></p>
        <div
          class="w-[10rem] py-[1rem] text-center mx-auto translate-y-[-50%] bg-white border border-gray-400 rounded-full"
        >
          {{ new Date(v.createAt).toLocaleDateString().replace(/.\s*$/, "") }}
        </div>
      </div>
      <!-- 정보 -->
      <div
        v-for="item in v.soldItems"
        class="flex justify-between px-[1rem] gap-[1rem] mb-[2rem] pb-[3rem] last:border-none border-b border-gray-400"
      >
        <!-- 이미지 -->
        <div class="w-[20%] flex-0">
          <img :src="item.soldItemsInfo.item.thumbnailSrc" alt="" />
        </div>
        <!-- 아이템 정보 -->
        <div class="w-auto flex-1 flex flex-col gap-[.3rem]">
          <p>
            {{ item.soldItemsInfo.item.title }}
          </p>
          <div>
            <p
              v-for="option in item.soldItemsInfo.selectedOptions"
              class="text-gray-400 text-[.8rem]"
            >
              {{ option.name }} {{ option.count }}개
            </p>
          </div>
          <p class="text-green-500">
            {{ shipStatus[+item.status] }}
          </p>
          <p v-if="+item.status > 1">운송장 : {{ item.transportNumber }}</p>
        </div>
        <!-- 판매처 -->
        <div>
          <p>
            {{ item.sellUserInfo.companyName }}
          </p>
          <p>
            {{ formatTelNumber(item.sellUserInfo.phone) }}
          </p>
        </div>

        <!-- <DesignItemDesign :item="item.soldItemsInfo.item" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  EnumShopSoldItemStatus,
  ShopIreceipt,
  ShopitemService,
} from "~~/api/swagger";
import { formatTelNumber } from "@/common/format";

definePageMeta({
  layout: "login-required",
});

const items = useState<ShopIreceipt[]>("OrderItems", () => []);
const shipStatus = Object.keys(EnumShopSoldItemStatus);

console.log(shipStatus);

onMounted(async () => {
  const {
    ok,
    ireceipts,
  } = await ShopitemService.shopItemControllerGetIreceipt();
  if (ok) {
    items.value = ireceipts;
    console.log(ireceipts);
  }
});
</script>

<style lang="scss" scoped></style>
