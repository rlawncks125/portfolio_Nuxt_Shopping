<template>
  <div>
    <h2 class="text-center text-[2rem] my-4">
      패스워드 변경
    </h2>
    <form @submit.prevent="onChange">
      <div>
        <label for="password-0">현재 비밀번호</label>
        <input
          class="input-example-0"
          type="password"
          name=""
          id="password-0"
          v-model="input.checkPassword"
        />
      </div>
      <div>
        <label for="password-1">변경 비밀번호</label>
        <input
          class="input-example-0"
          type="password"
          name=""
          id="password-1"
          v-model="input.password1"
        />
      </div>
      <div>
        <label for="password-2">변경 비밀번호 재확인</label>
        <input
          class="input-example-0"
          type="password"
          name=""
          id="password-2"
          v-model="input.password2"
        />
      </div>
      <button>변경</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { userPasswordChekced, userModify } from "@/api/user";

const input = reactive({
  checkPassword: null,
  password1: null,
  password2: null,
});

const onChange = async () => {
  const { ok } = await userPasswordChekced(input.checkPassword);

  if (!ok) {
    alert("현재 비밀번호가 일치하지 않습니다.");
    return;
  }

  if (input.password1 !== input.password2) {
    alert("비밀번호가 서로 맞지 않습니다.");
    return;
  }

  const { ok: modifyOk } = await userModify({ password: input.password1 });

  if (!modifyOk) {
    alert("변경하지 못하였습니다.");
    return;
  }

  alert("변경에 성공하였습니다.");
  useRouter().push("/mypage");
  console.log(input);
};
</script>

<style lang="scss" scoped>
form {
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
