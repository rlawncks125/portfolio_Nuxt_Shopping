<template>
  <div>
    판매자 정보 수정
    <div v-if="passowrdCheck">
      <p>판매자 정보 수정 폼</p>
      <div>
        <label for="represent">대표자</label>
        <input
          class="input-example-0"
          type="text"
          name=""
          id="represent"
          v-model="input.represent"
        />
      </div>
      <div>
        <label for="phone">핸드폰 번호</label>
        <input
          class="input-example-0"
          type="text"
          name=""
          id="phone"
          v-model="input.phone"
        />
      </div>
      <div>
        <label for="email">이메일</label>
        <input
          class="input-example-0"
          type="text"
          name=""
          id="email"
          v-model="input.eMail"
        />
      </div>
      <div>
        <label for="companyName">회사명</label>
        <input
          class="input-example-0"
          type="text"
          name=""
          id="companyName"
          v-model="input.companyName"
        />
      </div>
      <div>
        <label for="companyAddress">회사 주소</label>
        <input
          class="input-example-0"
          type="text"
          name=""
          id="companyAddress"
          v-model="input.companyAddress"
        />
      </div>
      <button @click="onChange">수정하기</button>
    </div>
    <div v-else>
      <PasswordChcked @checked="(isChecked) => (passowrdCheck = isChecked)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUser } from "~~/sotre/user";
import { userSellerModify } from "@/api/user";

const passowrdCheck = useState("passwordCheck", () => null);

const { sellerInfo: input } = storeToRefs(useUser());
const { reFresh } = useUser();

const onChange = async () => {
  console.log(input.value);

  const { ok } = await userSellerModify(input.value);
  if (ok) {
    reFresh();
    alert("수정 되었습니다.");
  }
};
onMounted(() => {
  passowrdCheck.value = null;
});

onMounted(() => {
  passowrdCheck.value = null;
});
</script>

<style scoped></style>
