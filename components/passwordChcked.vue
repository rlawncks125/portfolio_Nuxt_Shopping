<template>
  <div class="w-full ">
    <form
      @submit.prevent="onChecked"
      class="max-w-[25rem] border-t border-t-gray-100 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          비밀번호 확인
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="password"
          placeholder="password"
          v-model="password"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          확인
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { userPasswordChekced } from "@/api/user";

const emit = defineEmits<{
  (e: "checked", isBoolean: boolean): void;
}>();
const password = useState("checkedPassword", () => null);

const onChecked = async () => {
  if (!password.value) return;
  const { ok } = await userPasswordChekced(password.value);

  if (!ok) {
    password.value = null;
    alert("비밀번호가 다릅니다.");
    return;
  }
  emit("checked", true);
};

onMounted(() => {
  password.value = null;
});
</script>

<style scoped></style>
