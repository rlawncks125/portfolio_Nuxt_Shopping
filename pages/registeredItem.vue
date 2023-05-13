<template>
  <div>
    <h2 class="text-center font-bold text-[2rem] my-4">
      판매 등록한 아이템
    </h2>

    <div
      v-if="salesItems"
      class="max-w-container mx-auto grid grid-cols-1 gap-4"
    >
      <template v-for="(item, index) in salesItems" :key="index">
        <div
          class="flex flex-wrap md:flex-nowrap px-[2rem]  gap-[1rem] py-[2rem] border"
        >
          <div class="w-[10rem] order-0">
            <img :src="item.thumbnailSrc" alt="" />
          </div>
          <div class="flex-1 order-1">
            <p
              class="font-bold text-[1.5rem] cursor-pointer"
              @click="router.push(`/item/${item.id}`)"
            >
              {{ item.title }}
            </p>
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
            <div v-for="option in item.options" class="text-gray-400">
              <span
                >{{ option.name }}( {{ formatToWon(option.price) }}원 )
              </span>
            </div>
            <div class="flex justify-end">
              <button
                @click="openPopup(item.id)"
                class="bg-blue-200 p-2 border rounded-lg"
              >
                변경
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShopitemService, ShopItem } from "~~/api/swagger";
import { formatToWon } from "~~/utils/format";

let msgCallback;
const router = useRouter();
const salesItems = useState<ShopItem[] | undefined>(undefined);

definePageMeta({
  layout: "login-required",
  middleware: "validator-seller",
});

const changeItemInfo = (data: { type: string; data: { item: ShopItem } }) => {
  // console.log("변경아이템", data);

  const {
    type,
    data: { item: newItem },
  } = data;

  if (type !== "updateItem") return;

  salesItems.value = salesItems.value.map((item) => {
    if (item.id === newItem.id) {
      return newItem;
    }

    return item;
  });
};

const onHandleChnageItem = (d: MessageEvent) => {
  if (!d.data || d.data.type !== "updateItem") return;

  changeItemInfo(d.data);
};

const openPopup = (itemid: number) => {
  window.open(
    `${document.location.origin}/popup/patch/item-${itemid}`,
    "updateItem",
    windowFeatures()
  );
};

function windowFeatures() {
  const width = 600;
  const height = 600;
  // 포지션 center로 맞춘 값
  const left = (window.innerWidth - width) / 2 + window.screenX;
  const top = (window.innerHeight - height) / 2 + window.screenY;

  return `popup=true,width=${width},height=${height},left=${left},top=${top}`;
}

onMounted(async () => {
  const { ok, items } = await ShopitemService.shopItemControllerGetSalesItems();

  // console.log(ok, items);
  if (ok) {
    salesItems.value = items;
  }

  msgCallback = onHandleChnageItem;
  window.addEventListener("message", msgCallback);
});

onUnmounted(() => {
  window.removeEventListener("message", msgCallback);
});
</script>

<style scoped></style>
