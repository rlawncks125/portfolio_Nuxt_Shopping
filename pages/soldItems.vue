<template>
  <div>
    <h2 class="text-center font-bold text-[3rem] my-4">판매한 아이템</h2>
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
              판매번호 <span class="font-bold">{{ item.id }}</span>
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
          <span class="font-bold">결제금액</span> :
          <span>{{ formatToWon(item.payment) }}원</span>
        </p>
        <!-- 주문자 정보 -->
        <div class="border p-[1rem] my-1">
          <h4 class="font-bold">주문자 정보</h4>
          <p>닉네임 : {{ item.purchasedUser.nickName }}</p>
          <p>이메일 : {{ item.purchasedUser.email }}</p>
          <p>전화번호 : {{ formatTelNumber(item.purchasedUser.tel) }}</p>
        </div>
        <!-- 배송정보 -->
        <div class="border p-[1rem] my-1">
          <h4 class="font-bold">배송정보</h4>
          <p>우편번호 : {{ item.shipInfo.postcode }}</p>
          <p>
            상세 주소 : {{ item.shipInfo.address }}
            <span> ,{{ item.shipInfo.addressDetail }} </span>
          </p>
        </div>
        <!-- 배송 상태 -->
        <div class="my-1 flex flex-col gap-1">
          <p>
            <span class="font-bold">상태</span> : {{ itemStatus[+item.status] }}
          </p>
          <div v-if="+item.status > 1">
            <span class="font-bold">운송장 번호</span> :
            {{ item.transportNumber }}
          </div>
        </div>
        <!-- 상태 변경 -->
        <button
          v-if="+item.status !== 6"
          @click="openPopup(+item.id)"
          class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
        >
          변경
        </button>
        <div v-else class="my-4">
          <span
            class="bg-transparent  text-gray-700 font-semibold  py-2 px-4 border border-gray-500"
          >
            운송 완료
          </span>
        </div>
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
  const sItem = soldItems.value.find((v) => v.id === openItemid);
  window.open(
    `${document.location.origin}/popup/solditem_status?status=${sItem?.status}&transportNumber=${sItem?.transportNumber}`,
    "change_status",
    windowFeatures()
  );
};

onMounted(async () => {
  const { ok, items } = await ShopitemService.shopItemControllerGetSoldItem();

  if (ok) {
    soldItems.value = items.sort(
      (a, b) => new Date(b.createAt).valueOf() - new Date(a.createAt).valueOf()
    );
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
