<template>
  <div>
    <h2 class="text-center text-[2rem] my-2">
      판매자 등록
    </h2>
    <div v-if="passowrdCheck">
      <div v-if="sellerInfo">
        <p>이미 등록되었습니다.</p>
      </div>
      <div v-else>
        <SellerRegister />
      </div>
    </div>
    <div v-else>
      <PasswordChcked @checked="(isChecked) => (passowrdCheck = isChecked)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUser } from "~~/sotre/user";

const passowrdCheck = useState("passwordCheck", () => false);

const { sellerInfo } = storeToRefs(useUser());

onMounted(() => {
  passowrdCheck.value = false;
});
</script>

<style scoped></style>
