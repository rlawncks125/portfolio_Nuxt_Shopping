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
          <div class="my-[.5rem]" v-if="+item.status === shipStatus.length - 1">
            <span
              v-if="!item.isReview"
              @click="openReivewPopup(item)"
              class="bg-blue-400 p-[.5rem] cursor-pointer"
            >
              리뷰달기
            </span>
            <span v-else class="text-green-700 p-[.5rem] border">
              리뷰을 작성 하셨습니다.
            </span>
          </div>
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
  AddReviewInputDto,
  EnumShopSoldItemStatus,
  ShopIreceipt,
  ShopitemService,
  ShopSoldItem,
} from "~~/api/swagger";
import { formatTelNumber } from "~~/utils/format";
import { windowFeatures } from "@/common/popup";
import { useLoading } from "~~/sotre/loading";

definePageMeta({
  layout: "login-required",
});

const items = useState<ShopIreceipt[]>("OrderItems", () => []);
const shipStatus = Object.keys(EnumShopSoldItemStatus);

let openitem: ShopSoldItem;
let reviewCallback: any;

console.log(shipStatus);

const openReivewPopup = async (soldItem: ShopSoldItem) => {
  openitem = soldItem;

  // 팝업 열기
  window.open(
    `${document.location.origin}/popup/review`,
    "review_window",
    windowFeatures()
  );
};

const HandleAddReview = async (d: any) => {
  if (!d.data || d.data.type !== "addReview") return;

  useLoading().on();
  console.log(openitem, d.data);

  const { star, text, title } = d.data.data as AddReviewInputDto;

  const { ok, err } = await ShopitemService.shopItemControllerAddReview({
    body: {
      soldId: +openitem.id,
      star,
      text,
      title,
      selectedOptions: openitem.soldItemsInfo.selectedOptions
        .map((v) => v.name)
        .join(" + "),
    },
  });

  if (ok) {
    await getIcreceipts();
  }

  useLoading().off();
};

const getIcreceipts = async () => {
  const {
    ok,
    ireceipts,
  } = await ShopitemService.shopItemControllerGetIreceipt();
  if (ok) {
    ireceipts.sort((a, b) => {
      const aT = new Date(a.createAt).valueOf();
      const bT = new Date(b.createAt).valueOf();

      return bT - aT;
    });

    items.value = ireceipts;
  }
};

onMounted(async () => {
  getIcreceipts();

  reviewCallback = HandleAddReview;
  window.addEventListener("message", reviewCallback);
});

onUnmounted(() => {
  window.removeEventListener("message", reviewCallback);
});
</script>

<style lang="scss" scoped></style>
