<template>
  <div>
    <p>
      내정보

      {{ userInfo }}
    </p>
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

<style lang="scss" scoped></style>
