<template>
  <div>
    <p>판매자 등록하기</p>
    <div class="form-style">
      <div>
        <label for="represent">대표자 명의 </label>
        <input
          type="text"
          name=""
          id="represent"
          v-model="inputDto.represent"
        />
      </div>
      <div>
        <label for="phone">연락처 </label>
        <input type="text" name="" id="phone" v-model="inputDto.phone" />
      </div>
      <p class="text-red-500" v-if="validationErrorLists.phone">
        {{ validationErrorLists.phone }}
      </p>
      <div>
        <label for="email">이메일 주소 </label>
        <input type="text" name="" id="email" v-model="inputDto.eMail" />
      </div>
      <p class="text-red-500" v-if="validationErrorLists.eMail">
        {{ validationErrorLists.eMail }}
      </p>
      <div>
        <label for="companName">회사명 </label>
        <input
          type="text"
          name=""
          id="companName"
          v-model="inputDto.companyName"
        />
      </div>
      <div>
        <label for="companAddress">
          <span>
            회사주소
          </span>
          <button @click="findAddr">찾기</button>
        </label>
        <input
          type="text"
          name=""
          id="companAddress"
          v-model="inputDto.companyAddress"
        />
      </div>
      <button @click="onAddCompany">회사 추가</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AddCompanyInputDto } from "~~/api/swagger";
import { EmailValidation, TelValidation } from "~~/utils/Validation";
import { userAddCompany } from "@/api/user";
import { useUser } from "~~/sotre/user";

const inputDto = reactive({
  represent: "",
  phone: "",
  eMail: "",
  companyName: "",
  companyAddress: "",
}) as AddCompanyInputDto;

const validationErrorLists = reactive({
  phone: null as string | null,
  eMail: null as string | null,
});

watch(
  () => inputDto.eMail,
  () => {
    const isValidation = EmailValidation(inputDto.eMail);

    !isValidation
      ? (validationErrorLists.eMail = "이메일 형식이 틀립니다.")
      : (validationErrorLists.eMail = null);
  }
);
watch(
  () => inputDto.phone,
  () => {
    const isValidation = TelValidation(inputDto.phone);

    !isValidation
      ? (validationErrorLists.phone = "핸드폰 형식이 틀립니다.")
      : (validationErrorLists.phone = null);
  }
);

const onAddCompany = async () => {
  const isBinStringChecked =
    Object.entries(inputDto).filter((v) => v[1] === "").length > 0;

  if (isBinStringChecked) {
    alert("형식을 채워주세요");
    return;
  }

  const isErrorChecked =
    Object.entries(validationErrorLists).filter((v) => {
      return v[1] !== null;
    }).length > 0;

  if (isErrorChecked) {
    alert("잘못된 형식이 포함되어있습니다.");
    return;
  }

  const { ok, sellerInfo, err } = await userAddCompany(inputDto);

  if (!ok) {
    alert(err);
    return;
  }

  alert("등록하였습니다.");
  const { setSeller } = useUser();
  setSeller(sellerInfo);

  console.log(inputDto, isBinStringChecked, isErrorChecked);
};

const findAddr = () => {
  const { $daumAddress } = useNuxtApp();
  $daumAddress(({ address, zonecode }) => {
    inputDto.companyAddress = address;
    console.log(address, zonecode);
  });
};
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
