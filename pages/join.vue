<template>
  <div class="width-container">
    <!-- 홈으로가기  -->
    <div class="h-[4rem] flex items-center gap-[1rem] m-[1rem]">
      <a href="/" class="h-full">
        <img
          class="h-full object-cover"
          src="https://res.cloudinary.com/dhdq4v4ar/image/upload/v1661371113/transparent-bg_-no-shadow-designify_wst7my.png"
          alt="로고 이미지"
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
    <section v-show="userStep === 0">
      <h1 class="text-[2rem] text-center">오신것을 환영합니다.</h1>
      <div
        class="flex flex-col sm:flex-row justify-between gap-[3rem] mx-[1rem] mt-[1rem]"
      >
        <div
          class="w-full border h-[15rem] cursor-pointer"
          @click="onSelectType(EnumCreateShopUserInputDtoRole.customer)"
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
          @click="onSelectType(EnumCreateShopUserInputDtoRole.company)"
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
    <section v-show="userStep === 1">
      <div class="block sm:flex gap-5 flex-wrap mt-[2rem] mx-[1rem]">
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
          <div class="flex items-start gap-1">
            <input
              class="mt-[0.2rem]"
              type="checkbox"
              id="clause1"
              v-model="clauseList.clause1"
            />
            <div class="relative flex-auto">
              <label class="absolute left-0 top-0 p-[0.2rem]" for="clause1"
                >이용약관

                <span class="text-gray-400 ml-1">(필수)</span>
              </label>
              <details data-details="Accordion" class="input-details">
                <summary class="p-[0.2rem] px-[.5rem]">
                  <span>자세히보기</span>
                  <span class="custom-marker">▶</span>
                </summary>
                <div class="content">
                  <p>콘텐츠</p>
                  <p>ssaa</p>
                </div>
              </details>
            </div>
          </div>
          <div class="flex items-start gap-1">
            <input
              class="mt-[0.2rem]"
              type="checkbox"
              id="clause2"
              v-model="clauseList.clause2"
            />
            <div class="relative flex-auto">
              <label class="absolute left-0 top-0 p-[0.2rem]" for="clause2"
                >전자금융거래 이용약관

                <span class="text-gray-400 ml-1">(필수)</span>
              </label>
              <details data-details="Accordion" class="input-details">
                <summary class="p-[0.2rem] px-[.5rem]">
                  <span>자세히보기</span>
                  <span class="custom-marker">▶</span>
                </summary>
                <div class="content">
                  <p>콘텐츠</p>
                  <p>ssaa</p>
                </div>
              </details>
            </div>
          </div>
          <div class="flex items-start gap-1">
            <input
              class="mt-[0.2rem]"
              type="checkbox"
              id="clause3"
              v-model="clauseList.clause3"
            />
            <div class="relative flex-auto">
              <label class="absolute left-0 top-0 p-[0.2rem]" for="clause3"
                >개인정보 수집및 이용

                <span class="text-gray-400 ml-1">(필수)</span>
              </label>
              <details data-details="Accordion" class="input-details">
                <summary class="p-[0.2rem] px-[.5rem]">
                  <span>자세히보기</span>
                  <span class="custom-marker">▶</span>
                </summary>
                <div class="content">
                  <p>콘텐츠</p>
                  <p>ssaa</p>
                </div>
              </details>
            </div>
          </div>
          <div class="flex items-start gap-1">
            <input
              class="mt-[0.2rem]"
              type="checkbox"
              id="clause4"
              v-model="clauseList.clause4"
            />
            <div class="relative flex-auto">
              <label class="absolute left-0 top-0 p-[0.2rem]" for="clause4"
                >개인정보 제3자(판매자) 제공

                <span class="text-gray-400 ml-1">(필수)</span>
              </label>
              <details data-details="Accordion" class="input-details">
                <summary class="p-[0.2rem] px-[.5rem]">
                  <span>자세히보기</span>
                  <span class="custom-marker">▶</span>
                </summary>
                <div class="content">
                  <p>콘텐츠</p>
                  <p>ssaa</p>
                </div>
              </details>
            </div>
          </div>
          <div class="flex items-start gap-1">
            <input
              class="mt-[0.2rem]"
              type="checkbox"
              id="choiceClause1"
              v-model="choiceClauseList.clause1"
            />
            <div class="relative flex-auto">
              <label
                class="absolute left-0 top-0 p-[0.2rem]"
                for="choiceClause1"
                >혜택 알림 이메일,문자,앱 푸시 수신

                <span class="text-gray-400 ml-1">(선택)</span>
              </label>
              <details data-details="Accordion" class="input-details">
                <summary class="p-[0.2rem] px-[.5rem]">
                  <span>자세히보기</span>
                  <span class="custom-marker">▶</span>
                </summary>
                <div class="content">
                  <p>콘텐츠</p>
                  <p>ssaa</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 정보 입력 -->
    <section v-show="userStep === 2">
      <div
        class="flex flex-col sm:flex-row gap-5 flex-wrap mt-[2rem] mx-[1rem] font-bold text-[.8rem]"
      >
        <p class="text-[1.5rem] text-center">3.정보입력</p>

        <form
          class="user-form flex-auto flex flex-col gap-[1rem]"
          @submit.prevent="onCreateUser"
        >
          <!-- 닉네임 -->
          <label for="nickName">닉네임</label>
          <input
            type="text"
            name="nickName"
            id="nickName"
            placeholder="닉네임"
          />
          <!-- 아이디 -->
          <label for="userId">아이디</label>
          <input type="text" name="userId" id="userId" placeholder="아이디" />
          <!-- 패스워드 -->
          <label for="userPassword"
            >패스워드
            <span class="text-gray-600">
              ( 특수문자,영문,숫자를 포함한 6자리 이상 )
            </span>
          </label>
          <input
            type="password"
            name="userPassword"
            id="userPassword"
            placeholder="패스워드"
            v-model="infoForm.password"
          />
          <span v-if="useFormErrorLists.password" class="form-error-text">
            {{ useFormErrorLists.password }}
          </span>
          <!-- 패스워드 재입력 -->
          <label for="userRePassword">패스워드 재입력</label>
          <input
            type="password"
            name="userRePassword"
            id="userRePassword"
            placeholder="패스워드 재입력"
          />
          <span v-if="useFormErrorLists.rePassword" class="form-error-text">
            {{ useFormErrorLists.rePassword }}
          </span>
          <!-- 이메일 -->
          <label for="email">이메일</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="이메일"
            v-model="infoForm.email"
          />
          <span v-if="useFormErrorLists.email" class="form-error-text">
            {{ useFormErrorLists.email }}
          </span>
          <!-- 연락처  -->
          <label for="tel">연락처</label>
          <input
            type="tel"
            name="tel"
            id="tel"
            placeholder="연락처 '-'를 포함해도 되고 안해도됨"
            v-model="infoForm.tel"
          />
          <span v-if="useFormErrorLists.tel" class="form-error-text">
            {{ useFormErrorLists.tel }}
          </span>
          <!-- 주소 & 우편번호 -->
          <label for="addr">
            <span>
              주소
            </span>
            <span class="cursor-pointer" @click.prevent="findAddr">찾기</span>
          </label>
          <input
            disabled
            type="text"
            name="postcode"
            id="postcode"
            placeholder="우편번호"
            v-model="infoForm.postcode"
          />
          <input
            disabled
            type="text"
            name="addr"
            id="addr"
            placeholder="주소"
            v-model="infoForm.addr"
          />
          <input
            type="text"
            name="addrDetail"
            id="addrDetail"
            placeholder="주소 상세"
            v-model="infoForm.addrDetail"
          />
          <button class="button-type-01">가입</button>
        </form>
      </div>
    </section>
    <section v-show="userStep > 2">
      <p class="text-[2rem] text-center">회원가입이 완료되었습니다.</p>
    </section>
    <!-- 이전 & 다음 버튼 -->
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
import { EnumCreateShopUserInputDtoRole } from "~~/api/swagger";
import { userCreate } from "~~/api/user";
import { Accordion } from "~~/assets/animation/Accordion";
import {
  HangulValidation,
  PasswordValidation,
  EmailValidation,
  TelValidation,
} from "~~/common/Validation";

definePageMeta({
  layout: "no-header",
});

const maxStep = 2;
const userStep = useState("useStep", () => 0);
watch(userStep, () => {
  if (userStep.value < 0) userStep.value = 0;
  if (userStep.value > maxStep + 1) userStep.value = maxStep;
});

// 1.회원선택
const userSelect = useState("useSelect", () => null);

const onSelectType = (type: EnumCreateShopUserInputDtoRole) => {
  userSelect.value = type;
  userStep.value++;
};

// 2.약관동의
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

onMounted(() => {
  // 디테일 아코디언 애니메이션
  const details = document.querySelectorAll("[data-details='Accordion']");

  details.forEach((el) => {
    new Accordion(el as HTMLElement);
  });
});

watch(clauseList, () => {
  // 약관 전체 동의
  isClause.value =
    Object.values(clauseList).findIndex((v) => v === false) === -1;
  const isChoiceClause =
    Object.values(choiceClauseList).findIndex((v) => v === false) === -1;

  const isFullCheck = isClause.value && isChoiceClause;

  isFullCheck ? (clauseAllchked.value = true) : (clauseAllchked.value = false);
});

// 3.정보입력
const useFormErrorLists = reactive({
  password: null as String | null,
  rePassword: null as String | null,
  tel: null as String | null,
  email: null as String | null,
});

const infoForm = reactive({
  addr: "" as string,
  addrDetail: "" as string,
  postcode: "" as string,
  password: "" as string,
  tel: "" as string,
  email: "" as string,
});

const findAddr = () => {
  console.log("주소 찾기");

  const { $daumAddress } = useNuxtApp();

  $daumAddress((data) => {
    infoForm.addr = data.address;
    infoForm.postcode = data.zonecode;
  });
};

const onCreateUser = async (e: SubmitEvent) => {
  const elForm = e.target as HTMLElement;

  let obj: {
    userId: string;
    nickName: string;
    userPassword: string;
    userRePassword: string;
    email: string;
    tel: string;
    postcode: string;
    addr: string;
    addrDetail: string;
  };
  // id값 찾아서 추가
  elForm.childNodes.forEach((v) => {
    const element = v as HTMLInputElement;
    obj = { ...obj, [element.id]: element.value };
  });

  const {
    userId,
    nickName,
    userPassword,
    userRePassword,
    email,
    tel,
    addr,
    addrDetail,
    postcode,
  } = obj;
  console.log("회원 유형 : " + userSelect.value);
  console.log("nickName : " + nickName);
  console.log("userId : " + userId);
  console.log("email : " + email);
  console.log("tel : " + tel);
  console.log("userPassword : " + userPassword);
  console.log("postcode : " + postcode);
  console.log("addr : " + addr);
  console.log("addrDetail : " + addrDetail);

  // 아이디에 한글이 포함됐을시
  if (HangulValidation(userId)) {
    alert("유효하지 않은 아이디 형식 입니다.");
    return;
  }

  // 비밀번호 재입력 확인
  if (userPassword !== userRePassword) {
    useFormErrorLists.rePassword = "비밀번호가 다릅니다.";
    return;
  } else {
    useFormErrorLists.rePassword = null;
  }

  // 이메일 입력 & 이메일 유효성 체크
  if (email.length === 0) {
    alert("이메일을 입력해주세요");
    return;
  }

  // 항목체크
  if (!isClause.value) {
    alert("필수 항목을 체크해주세요.");
    return;
  }
  // 회원가입
  const { ok, err } = await userCreate(
    { username: userId, password: userPassword },
    {
      nickName,
      role: userSelect.value,
      email,
      addr: `${addr} ${addrDetail}`,
      postcode,
      tel,
    }
  );
  if (!ok) {
    alert(err);
    return;
  }

  userStep.value++;
};

// 정보 입력 유효성 체크
watch(
  () => infoForm.password,
  () => {
    if (!PasswordValidation(infoForm.password)) {
      useFormErrorLists.password = "유효하지않은 패스워드 입니다.";
    } else {
      useFormErrorLists.password = null;
    }
  }
);

watch(
  () => infoForm.tel,
  () => {
    if (!TelValidation(infoForm.tel)) {
      useFormErrorLists.tel = "유효하지않은 연락처 형식 입니다.";
    } else {
      useFormErrorLists.tel = null;
    }
  }
);

watch(
  () => infoForm.email,
  () => {
    if (!EmailValidation(infoForm.email)) {
      useFormErrorLists.email = "유효하지않은 이메일 형식 입니다.";
    } else {
      useFormErrorLists.email = null;
    }
  }
);
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

.form-error-text {
  @apply text-red-500 text-[0.7rem];
}

details.input-details {
  border: 1px solid black;

  summary {
    cursor: pointer;

    width: 100px;
    margin-right: 0px;
    margin-left: auto;
    background: gray;
    color: white;

    & ~ .content {
      padding: 0.5rem;
      border-top: 1px solid black;
    }

    // 마커 없애기
    list-style: none;
    &::-webkit-details-marker {
      display: none;
    }

    .custom-marker {
      float: right;
      clear: both;
      pointer-events: auto;
      transform: rotate(0deg);
      transition: transform 0.1s;
    }
  }

  &[open] summary {
    .custom-marker {
      transform: rotate(90deg);
    }
  }
}
</style>
