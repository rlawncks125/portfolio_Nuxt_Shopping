<template>
  <div class="text-[1.4rem]">
    <!-- <div>Login 컴포넌트</div> -->
    <form
      @submit.prevent="clickedLogin"
      class="border flex flex-col max-w-[30rem] gap-[1rem] mx-auto mt-[4rem] p-4"
    >
      <div class="flex flex-wrap px-2 gap-2">
        <label for="userid">아이디 :</label>
        <input
          v-model="loginId"
          class="border flex-1"
          type="text"
          id="userid"
        />
      </div>
      <div class="flex flex-wrap px-2 gap-2">
        <label for="password">패스워드 :</label>
        <input
          v-model="loginPassword"
          class="border flex-1"
          type="password"
          id="password"
        />
      </div>
      <button
        class="border py-1 "
        :class="
          isRobotCheked ? 'bg-blue-400  hover:bg-blue-500' : 'bg-gray-100'
        "
        :disabled="!isRobotCheked"
      >
        로그인
      </button>
      <div class="flex justify-end">
        <NuxtLink to="/findpassword" class="text-[0.8rem] border p-1"
          >비밀번호 찾기</NuxtLink
        >
      </div>
      <div class="flex justify-center">
        <ReCAPTCHA @success="(e) => (isRobotCheked = e)" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { userLogin } from "~~/api/user";
import { HangulValidation } from "~~/utils/Validation";
import { useUser } from "~~/sotre/user";

const loginId = useState("loginId", () => "");
const loginPassword = useState("loginPassword", () => "");
const isRobotCheked = useState("isRobotChked", () => false);

const clickedLogin = async () => {
  if (!isRobotCheked.value) {
    alert("유효하지 않은 접근 방법입니다.");
    return;
  }

  if (HangulValidation(loginId.value)) {
    alert("유효하지 않은 아이디 형식 입니다.");
    return;
  }

  const { ok, err, token, userInfo, sellerInfo } = await userLogin({
    username: loginId.value,
    password: loginPassword.value,
  });

  if (!ok) {
    alert(err);
    return;
  }

  const { setUserToken, setUser, setSeller } = useUser();
  setUserToken(token);
  setUser(userInfo);
  setSeller(sellerInfo);

  loginId.value = "";
  loginPassword.value = "";

  // 로그인 페이지일시 홈 화면으로 다이렉트
  if (useRoute().path === "/login") {
    useRouter().push("/");
  }
};

onMounted(() => {
  isRobotCheked.value = false;
});
</script>

<style></style>
