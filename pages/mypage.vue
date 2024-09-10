<template>
  <div class="max-w-container mx-auto flex flex-col md:flex-row gap-2">
    <div class="border-b border-t md:border ">
      <label
        for="list-checked"
        class="flex md:hidden py-3 px-2 cursor-pointer items-center justify-start"
      >
        <span v-show="isChecked">
          <LazyFaIcon icon="angle-up" size="2x" />
        </span>
        <span v-show="!isChecked">
          <LazyFaIcon icon="angle-down" size="2x" />
        </span>

        <span
          class="ml-4 font-bold text-[1.5rem]"
          :style="{ lineHeight: '.5rem', order: 2 }"
          >더보기</span
        >
      </label>

      <div class="w-full md:w-[15rem] h-full overflow-hidden">
        <input
          class="hidden"
          type="checkbox"
          id="list-checked"
          v-model="isChecked"
        />
        <ul class="list-warp px-2 text-[1.6rem] h-full">
          <li>
            <NuxtLink class="block" to="/mypage">내정보</NuxtLink>
          </li>
          <li>
            <NuxtLink class="block" to="/mypage/infomationModify"
              >개인 정보 수정</NuxtLink
            >
          </li>
          <li>
            <NuxtLink class="block" to="/mypage/passwordModify"
              >비밀번호 변경</NuxtLink
            >
          </li>
          <li v-if="userInfo && userInfo.role === EnumUserInfoRole.company">
            <NuxtLink class="block" to="/mypage/sellerRegist"
              >판매자 등록</NuxtLink
            >
          </li>
          <li v-if="userInfo && userInfo.role === EnumUserInfoRole.company">
            <NuxtLink class="block" to="/mypage/sellerModify"
              >판매자 정보 수정</NuxtLink
            >
          </li>
          <li class="md:border-b">
            <NuxtLink class="block" to="/mypage/withdraw">회원 탈퇴</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-auto py-[2rem] min-h-[70vh]">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { EnumUserInfoRole } from "~~/api/swagger";

import { useUser } from "~~/sotre/user";

definePageMeta({
  layout: "login-required",
});

const { userInfo } = storeToRefs(useUser());

const isChecked = ref(true);

const resizeObs = () => {
  if ("innerWidth" in window) {
    isChecked.value = window.innerWidth >= 768 ? true : false;
  }
};

onMounted(async () => {
  resizeObs();

  window.addEventListener("resize", resizeObs);
});
onUnmounted(() => {
  window.removeEventListener("resize", resizeObs);
});
</script>

<style scoped lang="scss">
.list-warp {
  max-height: 0px;
  transition: max-height 0.3s;
  li {
    @apply py-[1rem];
  }
  li ~ li {
    @apply border-t border-gray-400;
  }
}

#list-checked:checked {
  & ~ .list-warp {
    max-height: 30rem;
  }
}
</style>
