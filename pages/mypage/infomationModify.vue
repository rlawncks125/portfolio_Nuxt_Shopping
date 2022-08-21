<template>
  <div>
    개인 정보 수정
    <div v-if="passowrdCheck">
      <p>개인 정보 수정 폼</p>
      <div>
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
          <label for="addr">addr</label>
          <input
            class="input-example-0"
            type="text"
            name=""
            id="addr"
            v-model="input.addr"
          />
        </div>
        <button @click="onChange">수정하기</button>
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
onMounted(() => {
  passowrdCheck.value = null;
});
</script>

<style scoped></style>
