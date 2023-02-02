<template>
  <!-- <div class="!flex justify-between pr-4" @click="onClick">
    <div>구독과 알림 설정</div>
    <div :style="status === 'granted' ? { color: 'green' } : { color: 'red' }">
      {{ status }}
    </div>
    <div :style="isPush ? { color: 'green' } : { color: 'red' }">상태</div>
  </div> -->
  <div
    class="!flex hover:cursor-pointer items-center justify-between text-gray-900 dark:text-white"
    :class="status ? '' : 'cursor-not-allowed hover:cursor-not-allowed'"
    @click="onClick"
  >
    <span class=" text-sm font-medium">알림 설정</span>
    <label
      class="inline-flex relative items-center cursor-pointer pointer-events-none"
    >
      <input
        type="checkbox"
        :checked="isPush"
        class="sr-only peer"
        :disabled="status !== 'granted'"
      />
      <div
        class="w-10 h-4 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[1rem] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"
      ></div>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { useNotification } from "@/sotre/notification";
import { storeToRefs } from "pinia";

const { isPush, status } = storeToRefs(useNotification());

const onClick = () => {
  if (status.value) {
    status.value === "granted" ? onChnageIsNotification() : requestPermission();
  }
};

/** 알림 권한 요청 */
const requestPermission = () => {
  useNotification().requestPermission();
};

const onChnageIsNotification = async () => {
  await useNotification().changeIsPush();
};

onMounted(() => {
  useNotification().init();
});
</script>

<style scoped></style>
