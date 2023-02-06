<template>
  <div>
    <div
      v-if="isSend"
      class="min-h-[60vh] text-center flex flex-col justify-center gap-[1rem] mt-[3rem] text-gray-400"
    >
      <p class="text-[1.5rem]">성공적으로 메일을 발송하였습니다.</p>
    </div>
    <div v-else class="find-email-warp">
      <h2 class="text-center text-[2rem] my-4">
        비밀번호 찾기
      </h2>
      <div>
        <label for="findEmail-0">가입한 이메일을 입력하세요.</label>
        <input
          class="input-example-0"
          type="text"
          name=""
          id="findEmail-0"
          v-model="findEmail"
        />
      </div>

      <button @click="snedFindEmail">메일 보내기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoading } from "~~/sotre/loading";
import { findUserPassword } from "@/api/user";

const isSend = useState<boolean>("emailSend", () => false);
const findEmail = useState<string>("findEmail");

const snedFindEmail = async () => {
  if (!findEmail.value) return;

  useLoading().on();
  console.log(findEmail.value);

  const { ok, err } = await findUserPassword({ email: findEmail.value });
  console.log(ok, err);
  isSend.value = ok;

  findEmail.value = "";

  useLoading().off();

  if (err) {
    alert(err);
  }
};
</script>

<style lang="scss" scoped>
.find-email-warp {
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
