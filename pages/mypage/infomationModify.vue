<template>
  <div>
    <h2 class="text-center text-[2rem] my-4">
      개인 정보 수정
    </h2>
    <div v-if="passowrdCheck">
      <!-- 개인 정보 수정 폼-->
      <div class="form-style" @submit.prevent="onChange">
        <div>
          <label for="nickName">nickName</label>
          <input
            class="input-example-0"
            type="text"
            name=""
            id="nickName"
            v-model="input.nickName"
          />
        </div>
        <div>
          <label for="email">email</label>
          <input
            class="input-example-0"
            type="text"
            name=""
            id="email"
            v-model="input.email"
          />
        </div>
        <div>
          <label for="tel">tel</label>
          <input
            class="input-example-0"
            type="text"
            name=""
            id="tel"
            v-model="input.tel"
          />
        </div>
        <div>
          <label for="postcode">postcode</label>
          <input
            class="input-example-0"
            type="text"
            name=""
            id="postcode"
            v-model="input.postcode"
          />
        </div>
        <div>
          <label for="addr">
            <span>
              addr
            </span>

            <button @click="findAddr">찾기</button>
          </label>
          <input
            class="input-example-0"
            type="text"
            name=""
            id="addr"
            v-model="input.address"
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
import { useUser } from "~~/sotre/user";
import { userModify } from "@/api/user";
import { storeToRefs } from "pinia";

const passowrdCheck = useState("passwordCheck", () => null);

const { userInfo: input } = storeToRefs(useUser());
const { reFresh } = useUser();

const onChange = async () => {
  const { ok } = await userModify(input.value);

  if (ok) {
    reFresh();
    alert("수정 되었습니다.");
  }
};

const findAddr = () => {
  const { $daumAddress } = useNuxtApp();
  $daumAddress(({ address, zonecode }) => {
    input.value.address = address;
    console.log(address, zonecode);
  });
};
onMounted(() => {
  passowrdCheck.value = null;
});
</script>

<style lang="scss" scoped>
.form-style {
  @apply max-w-[25rem] mx-auto border-t border-t-gray-100  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4;
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
