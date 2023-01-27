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
        <span>주소</span>
        <span>{{ userInfo.address }} , {{ userInfo.addressDetail }}</span>
      </div>
    </div>

    <h2 class="text-center text-[2rem] my-2">

      회사 정보
    </h2>
    <p v-if="sellerInfo" class="info-list">
      <div>
        <span>판매자</span>
        <span>{{ sellerInfo.represent }}</span>
      </div>
      <div>
        <span>회사 이름</span>
        <span>{{ sellerInfo.companyName }}</span>
      </div>

      <div>
        <span>회사 메일</span>
        <span>{{ sellerInfo.eMail }}</span>
      </div>
      <div>
        <span>전화 번호</span>
        <span>{{ sellerInfo.phone }}</span>
      </div>
      <div>
        <span>주소</span>
        <span>{{ sellerInfo.companyAddress }}</span>
      </div>
      
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
