<template>
  <div class="flex gap-2">
    <div class="w-[15rem]">
      <ul class="list-warp border text-[1.6rem] ">
        <li>
          <NuxtLink to="/mypage">주문 내역</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/mypage/infomationModify">개인 정보 수정</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/mypage/passwordModify">비밀번호 변경</NuxtLink>
        </li>
        <li v-if="userInfo && userInfo.role === EnumUserInfoRole.company">
          <NuxtLink to="/mypage/sellerRegist">판매자 등록</NuxtLink>
        </li>
        <li v-if="userInfo && userInfo.role === EnumUserInfoRole.company">
          <NuxtLink to="/mypage/sellerModify">판매자 정보 수정</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/mypage/withdraw">회원 탈퇴</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="flex-auto">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { EnumUserInfoRole } from "~~/api/swagger";
import { useUser } from "~~/sotre/user";

const { userInfo } = storeToRefs(useUser());

definePageMeta({
  layout: "login-required",
});
</script>

<style scoped lang="scss">
.list-warp {
  li ~ li {
    border-top: 1px solid black;
  }
}
</style>
