<template>
  <div>
    판매자 정보 수정
    <div v-if="passowrdCheck">
      <p>판매자 정보 수정 폼</p>
      <div class="form-style" v-if="input">
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
          <label for="companyAddress"
            >회사 주소
            <button @click="findAddr">찾기</button>
          </label>
          <input
            class="input-example-0"
            type="text"
            name=""
            id="companyAddress"
            v-model="input.companyAddress"
          />
        </div>
        <button @click.prevent="onChange">수정하기</button>
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
import { userSellerModify } from "@/api/user";

const passowrdCheck = useState("passwordCheck", () => false);

const { sellerInfo: input } = storeToRefs(useUser());
const { reFresh } = useUser();

const onChange = async () => {
  console.log(input.value);

  const { ok } = await userSellerModify(input.value!);
  if (ok) {
    reFresh();
    alert("수정 되었습니다.");
  }
};

const findAddr = () => {
  const { $daumAddress } = useNuxtApp();
  $daumAddress(({ address, zonecode }) => {
    input.value!.companyAddress = address;
    console.log(address, zonecode);
  });
};

onMounted(() => {
  passowrdCheck.value = false;
});
</script>

<style lang="scss" scoped>
.form-style {
  @apply max-w-[25rem] mx-auto border-t border-t-gray-100 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4;
}

label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-red-400;
}

button {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2;
}
</style>
