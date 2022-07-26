<template>
  <div class="width-container">
    <!-- 홈으로가기  -->
    <div class="h-[4rem] flex items-center">
      <a href="/" class="h-full">
        <img
          class="h-full object-cover"
          src="http://image.auction.co.kr/hanbando/202110/d337d318-1aeb-4902-abf7-e407d7f0d1a1.png"
          alt="배너 이미지"
        />
      </a>
      <h1 class="text-[1.8rem] font-bold">회원가입</h1>
    </div>
    <!-- 회원가입 진행 UI -->
    <div class="flex items-end justify-between px-2 flex-wrap">
      <p class="text-[3rem]">회원 가입</p>
      <div class="flex text-[1.4rem] gap-[.7rem] font-bold">
        <p :class="userStep === 0 ? 'select-step' : ''">1.회원선택</p>
        <p :class="userStep === 1 ? 'select-step' : ''">2.약관동의</p>
        <p :class="userStep === 2 ? 'select-step' : ''">3.정보입력</p>
        <p :class="userStep === 3 ? 'select-step' : ''">4.가입완료</p>
      </div>
    </div>
    <!-- 개인 회원 & 판매지 회원 -->
    <section v-if="userStep === 0">
      <h1 class="text-[2rem] text-center">오신것을 환영합니다.</h1>
      <div class="flex justify-between gap-[3rem] mx-[1rem] mt-[1rem]">
        <div
          class="w-full border h-[15rem] cursor-pointer"
          @click="onSelectType('개인')"
        >
          <p
            class="h-[2rem] text-center text-[1.5rem] bg-red-400 text-white py-[2rem]"
            :style="{ lineHeight: '.5rem' }"
          >
            개인 회원 가입
          </p>
        </div>
        <div
          class="w-full border h-[15rem] cursor-pointer"
          @click="onSelectType('회원')"
        >
          <p
            class="h-[2rem] text-center text-[1.5rem] bg-cyan-500 text-white py-[2rem]"
            :style="{ lineHeight: '.5rem' }"
          >
            판매자 회원 가입
          </p>
        </div>
      </div>
    </section>
    <!-- 약관동의 -->
    <section v-else-if="userStep === 1">
      <div class="flex gap-5 flex-wrap mt-[2rem] mx-[1rem]">
        <p class="text-center text-[2rem]">2 약관 동의</p>

        <div class="flex-auto flex flex-col gap-2">
          <div class="flex items-center gap-2 border-b-2 mb-[0.5rem]">
            <input
              type="checkbox"
              id="전체동의"
              @click="clauseAllSelcted"
              v-model="clauseAllchked"
              class="w-[1.5rem] h-[1.5rem]"
            />
            <label for="전체동의" class="text-[1.5rem]">전체동의</label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="checkbox"
              name=""
              id="clause1"
              v-model="clauseList.clause1"
            />
            <label for="clause1">이용약관</label>
            <span class="text-gray-400">(필수)</span>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="checkbox"
              name=""
              id="clause2"
              v-model="clauseList.clause2"
            />
            <label for="clause2">전자금융거래 이용약관</label>
            <span class="text-gray-400">(필수)</span>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="checkbox"
              name=""
              id="clause3"
              v-model="clauseList.clause3"
            />
            <label for="clause3">개인정보 수집및 이용</label>
            <span class="text-gray-400">(필수)</span>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="checkbox"
              name=""
              id="clause4"
              v-model="clauseList.clause4"
            />
            <label for="clause4">개인정보 제3자(판매자) 제공</label>
            <span class="text-gray-400">(필수)</span>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="checkbox"
              name=""
              id="clause5"
              v-model="choiceClauseList.clause1"
            />
            <label for="clause5">혜택 알림 이메일, 문자, 앱 푸시 수신</label>
            <span class="text-gray-400">(선택)</span>
          </div>
        </div>
      </div>
    </section>
    <!-- 정보 입력 -->
    <section v-else-if="userStep === 2">
      <div class="flex gap-5 flex-wrap mt-[2rem] mx-[1rem]">
        <p class="text-[1.5rem]">3.정보입력</p>

        <form
          class="user-form flex-auto flex flex-col gap-[1rem]"
          @submit.prevent="onCreateUser"
        >
          <input type="text" name="userName" id="userName" placeholder="이름" />
          <input type="text" name="userId" id="userId" placeholder="아이디" />
          <input
            type="password"
            name="userPassword"
            id="userPassword"
            placeholder="패스워드"
          />
          <input
            type="password"
            name="userRePassword"
            id="userRePassword"
            placeholder="패스워드 재입력"
          />
          <button class="button-type-01">가입</button>
        </form>
      </div>
    </section>
    <section v-else>
      <p class="text-[2rem] text-center">회원가입이 완료되었습니다.</p>
    </section>
    <div
      class="float-right mt-[1rem] mx-[1rem]"
      v-if="userSelect && userStep <= maxStep"
    >
      <button
        :disabled="userStep === 0"
        class="button-type-01"
        @click="userStep--"
      >
        이전
      </button>
      <button
        :disabled="userStep === maxStep"
        class="button-type-01"
        @click="userStep++"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "no-header",
});

const maxStep = 2;

const userStep = useState("useStep", () => 0);
const userSelect = useState("useSelect", () => null);

const isClause = useState("isClause", () => false);
const clauseAllchked = useState("clauseAll", () => false);
const clauseList = reactive({
  clause1: false,
  clause2: false,
  clause3: false,
  clause4: false,
});
const choiceClauseList = reactive({
  clause1: false,
});

const clauseAllSelcted = (e) => {
  const el = e.target as HTMLInputElement;

  if (el.checked) {
    for (const item in clauseList) {
      clauseList[item] = true;
    }
    for (const item in choiceClauseList) {
      choiceClauseList[item] = true;
    }
  } else {
    for (const item in clauseList) {
      clauseList[item] = false;
    }
    for (const item in choiceClauseList) {
      choiceClauseList[item] = false;
    }
  }
};

const onSelectType = (type: "개인" | "회원") => {
  userSelect.value = type;
  userStep.value++;
};

const onCreateUser = (e: SubmitEvent) => {
  const el = e.target as HTMLElement;

  let obj = <
    {
      userId: string;
      userName: string;
      userPassword: string;
      userRePassword: string;
    }
  >{};
  el.childNodes.forEach((v) => {
    const element = v as HTMLInputElement;
    obj = { ...obj, [element.id]: [element.value] };
  });

  const { userId, userName, userPassword, userRePassword } = obj;
  console.log("회원 유형 : " + userSelect.value);
  console.log("userName : " + userName);
  console.log("userId : " + userId);
  console.log("userPassword : " + userPassword);
  console.log("userRePassword : " + userRePassword);

  // 항목체크
  if (!isClause.value) {
    alert("필수 항목을 체크해주세요.");
    return;
  }

  // 비밀번호 유효성 체크 & 재입력 확인

  // 회원가입
  userStep.value++;
};

watch(clauseList, () => {
  isClause.value =
    Object.values(clauseList).findIndex((v) => v === false) === -1;
  const isChoiceClause =
    Object.values(choiceClauseList).findIndex((v) => v === false) === -1;

  const isFullCheck = isClause.value && isChoiceClause;

  isFullCheck ? (clauseAllchked.value = true) : (clauseAllchked.value = false);
});

watch(userStep, () => {
  if (userStep.value < 0) userStep.value = 0;
  if (userStep.value > maxStep + 1) userStep.value = maxStep;
});
</script>

<style lang="scss">
.clause {
  @apply border w-full h-[10rem] overflow-y-auto;
}

button.button-type-01 {
  @apply border border-blue-500 p-2;
  @apply disabled:border-gray-500 disabled:text-gray-400;
}

.select-step {
  @apply text-blue-400 border-t-2 border-blue-400;
}

.user-form {
  input {
    @apply border p-2;
  }
}
</style>
