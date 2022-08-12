<template>
  <div class="text-[1.4rem]">
    <div>Login 컴포넌트</div>
    <div
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
        class="border py-1 bg-gray-100 hover:bg-gray-200"
        @click="clickedLogin"
      >
        로그인
      </button>
      <div class="flex justify-center">
        <ReCAPTCHA />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userLogin } from "~~/api/user";
import { HangulValidation } from "~~/common/Validation";
import { useUser } from "~~/sotre/user";

const loginId = useState("loginId", () => "");
const loginPassword = useState("loginPassword", () => "");

const clickedLogin = async () => {
  console.log(loginId.value, loginPassword.value);

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
</script>

<style></style>
