<template>
  <div>
    <div>Login 컴포넌트</div>
    <button @click="clickedLogin">로그인</button>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "~~/sotre/user";

const clickedLogin = () => {
  const { setUserToken } = useUser();
  setUserToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU3OTA5OTY2fQ.CmJm8KORHZ9PoVP0d3pMCYlNIh_IfrDZsm9k2mkUUQ0"
  );
};
</script>

<style></style>
