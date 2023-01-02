<template>
  <div>
    <h2 class="text-center text-[2rem] my-2">
      내정보
    </h2>
    <div v-if="userInfo" class="info-list">
      <div>
        <span>닉네임</span>
        <span>{{ userInfo.nickName }}</span>
      </div>
      <div>
        <span>이메일</span>
        <span>{{ userInfo.email }}</span>
      </div>
      <div>
        <span>전화 번호</span>
        <span>{{ userInfo.tel }}</span>
      </div>
      <div>
        <span>우편전자</span>
        <span>{{ userInfo.postcode }}</span>
      </div>
      <div>
        <span>상세주소</span>
        <span>{{ userInfo.addressDetail }}</span>
      </div>
    </div>

    <p v-if="sellerInfo">
      회사 정보
      {{ sellerInfo }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "~~/sotre/user";

const { userInfo, sellerInfo } = useUser();
</script>

<style lang="scss" scoped>
.info-list {
  @apply w-[25rem] mx-auto p-4 border rounded-lg;
  & div {
    @apply flex gap-2 justify-start my-1 border-b pb-2 my-2;

    & span {
      @apply text-left;

      &:nth-child(1) {
        @apply w-[30%];
      }
    }
  }
}
</style>
