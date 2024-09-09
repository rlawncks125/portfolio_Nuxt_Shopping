<template>
  <div class="p-2">
    <h2 class="text-[2rem] font-bold">
      판매아이템 상태 변경
    </h2>
    <select class="block border" v-model="status">
      <option value="" disabled>상태 선택</option>
      <option
        :disabled="+originStatus >= index"
        v-for="(status, index) in itemStatus"
        :value="index"
        >{{ status }}</option
      >
    </select>
    <!-- 화물 접수 -->
    <div v-if="+status >= 2">
      <p class="font-bold my-2">
        화물 접수
      </p>
      <div class="flex gap-2">
        <label for="parcelName">택배사</label>
        <input
          class="border px-2"
          type="text"
          name="parcelName"
          id="parcelName"
          v-model="parcelName"
          :disabled="+status !== 2"
        />
      </div>
      <div class="flex gap-2">
        <label for="parcelNumber">운송장번호</label>
        <input
          class="border px-2"
          type="text"
          name="parcelNumber"
          id="parcelNumber"
          v-model="parcelNumber"
          :disabled="+status !== 2"
        />
      </div>
    </div>
    <br />
    <button class="button-blue" @click="changeItem">
      상태 변경하기
    </button>
  </div>
</template>

<script setup lang="ts">
import { getItemById } from "~~/api/item";
import type { EnumShopSoldItemStatus } from "~~/api/swagger";

definePageMeta({
  layout: "no-header",
});

const route = useRoute();
const { status: originStatus, transportNumber } = route.query as {
  status: string;
  transportNumber: string;
};
const [originName, originNumber] = transportNumber.split("-");

const itemStatus = Object.keys(EnumShopSoldItemStatus);
const status = useState("changeItmeStatus", () => +originStatus + 1);

const parcelName = useState("parcelName", () => originName);
const parcelNumber = useState("parcelNumber", () => originNumber);

const changeItem = () => {
  window.opener.postMessage(
    {
      type: "chnageSoldItem",
      data: {
        status: status.value,
        transportNumber:
          +status.value === 2
            ? `${parcelName.value}-${parcelNumber.value}`
            : null,
      },
    },
    "*"
  );
  window.close();
};
</script>

<style scoped></style>
