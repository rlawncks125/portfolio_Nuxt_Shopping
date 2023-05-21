<template>
  <div>
    <h2 class="my-2 text-center text-[3rem]">판매한 아이템</h2>
    <!-- warp -->
    <div class="max-w-container mx-auto flex flex-col gap-2 px-4">
      <!-- 물품정보 -->
      <div
        class="border-4 p-[1rem] rounded-3xl "
        v-if="soldItems"
        v-for="item in soldItems"
        :key="item.id"
      >
        <div
          class="flex flex-wrap md:flex-nowrap px-[2rem]  gap-[1rem] py-[2rem] cursor-pointer"
          @click="router.push(`/item/${item.soldItemsInfo.item.id}`)"
        >
          <div class="w-[10rem] order-0">
            <img :src="item.soldItemsInfo.item.thumbnailSrc" alt="" />
          </div>
          <div class="flex-1 order-1">
            <p>
              판매번호 <span>{{ item.id }}</span>
            </p>
            <p class="font-bold text-[1.5rem]">
              {{ item.soldItemsInfo.item.title }}
            </p>
            <p v-if="item.soldItemsInfo.selectedOptions.length > 0">추가옵션</p>
            <div
              v-for="option in item.soldItemsInfo.selectedOptions"
              class="text-gray-400"
            >
              <span
                >- {{ option.name }}( {{ formatToWon(option.price) }}원 ) -
              </span>
              <span>{{ option.count }}개 구매</span>
            </div>
          </div>
        </div>
        <!-- 결제 금액 -->
        <p>
          결제금액 : <span>{{ formatToWon(item.payment) }}원</span>
        </p>
        <!-- 주문자 정보 -->
        <div class="border p-[1rem]">
          <h1>주문자 정보</h1>
          <p>닉네임 : {{ item.purchasedUser.nickName }}</p>
          <p>이메일 : {{ item.purchasedUser.email }}</p>
          <p>전화번호 : {{ formatTelNumber(item.purchasedUser.tel) }}</p>
        </div>
        <!-- 배송정보 -->
        <div class="border p-[1rem]">
          <h1>배송정보</h1>
          <p>{{ item.shipInfo.postcode }}</p>
          <p>
            {{ item.shipInfo.address }}
            <span> ,{{ item.shipInfo.addressDetail }} </span>
          </p>
        </div>
        <!-- 배송 상태 -->
        <div>
          <p>상태 : {{ itemStatus[+item.status] }}</p>
          <div v-if="+item.status > 1">
            운송장 번호 : {{ item.transportNumber }}
          </div>
        </div>
        <!-- 상태 변경 -->
        <button
          @click="openPopup(+item.id)"
          class="border p-[1rem] bg-green-400"
        >
          변경
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  EnumShopSoldItemStatus,
  ShopitemService,
  ShopSoldItem,
} from "~~/api/swagger";
import { formatToWon, formatTelNumber } from "~~/utils/format";
import { useLoading } from "~~/sotre/loading";

definePageMeta({
  layout: "login-required",
  middleware: "validator-seller",
});

const router = useRouter();

const soldItems = useState<ShopSoldItem[]>("soldItems", () => []);
const itemStatus = Object.keys(EnumShopSoldItemStatus);
let msgCallback: any;
let openItemid: number;
// useLoading().on();

const changeSoldItemInfo = async (data: {
  status: number;
  transportNumber?: string;
}) => {
  console.log(openItemid, data);

  // 판매아이템 정보변경
  useLoading().on();
  const {
    ok,
    soldItem,
  } = await ShopitemService.shopItemControllerPatchSolditem({
    body: {
      itemId: openItemid,
      status: data.status,
      transportNumber: data.transportNumber || "",
    },
  });

  if (ok) {
    soldItems.value = soldItems.value.map((v) => {
      if (v.id === openItemid) return soldItem!;
      return v;
    });
  }
  useLoading().off();
};

const onHandleChnageItem = (d: MessageEvent) => {
  if (!d.data || d.data.type !== "chnageSoldItem") return;

  changeSoldItemInfo(d.data.data);
};

const openPopup = (itemid: number) => {
  openItemid = itemid;
  window.open(
    `${document.location.origin}/popup/solditem_status`,
    "change_status",
    windowFeatures()
  );
};

onMounted(async () => {
  const { ok, items } = await ShopitemService.shopItemControllerGetSoldItem();

  if (ok) {
    soldItems.value = items;
  }
  console.log(items);

  msgCallback = onHandleChnageItem;
  window.addEventListener("message", msgCallback);
});
onUnmounted(() => {
  window.removeEventListener("message", msgCallback);
});

function windowFeatures() {
  const width = 300;
  const height = 300;
  // 포지션 center로 맞춘 값
  const left = (window.innerWidth - width) / 2 + window.screenX;
  const top = (window.innerHeight - height) / 2 + window.screenY;

  return `popup=true,width=${width},height=${height},left=${left},top=${top}`;
}
</script>

<style scoped></style>
