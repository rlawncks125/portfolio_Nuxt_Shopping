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
  setUserToken("Login");
};
</script>

<style></style>
