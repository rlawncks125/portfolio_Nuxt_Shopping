<template>
  <div>
    판매아이템 상태 변경
    <select class="block border" v-model="status">
      <option value="" disabled>상태 선택</option>
      <option v-for="(status, index) in itemStatus" :value="index">{{
        status
      }}</option>
    </select>
    <!-- 화물 접수 -->
    <div v-if="+status === 2">
      <p>
        화물 접수
      </p>
      <div>
        <label for="parcelName">택배사</label>
        <input
          class="border"
          type="text"
          name="parcelName"
          id="parcelName"
          v-model="parcelName"
        />
      </div>
      <div>
        <label for="parcelNumber">운송장번호</label>
        <input
          class="border"
          type="text"
          name="parcelNumber"
          id="parcelNumber"
          v-model="parcelNumber"
        />
      </div>
    </div>
    <br />
    <button class="border p-[1rem] bg-blue-400" @click="changeItem">
      상태 변경하기
    </button>
  </div>
</template>

<script setup lang="ts">
import { EnumShopSoldItemStatus } from "~~/api/swagger";

definePageMeta({
  layout: "no-header",
});

const itemStatus = Object.keys(EnumShopSoldItemStatus);
const status = useState("changeItmeStatus", () => "");

const parcelName = useState("parcelName");
const parcelNumber = useState("parcelNumber");

const changeItem = () => {
  window.opener.postMessage(
    {
      type: "chnageSoldItem",
      data: {
        status: status.value,
        transportNumber:
          +status.value === 2
            ? `${parcelName.value} ${parcelNumber.value}`
            : null,
      },
    },
    "*"
  );
  window.close();
};
</script>

<style scoped></style>
