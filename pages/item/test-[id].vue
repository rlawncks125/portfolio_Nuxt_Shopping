<template>
  <div>
    <!-- <div>아이템 id : {{ params.id }}</div> -->
    <div v-if="item?.value" class="text-[1.1rem]">
      <!-- 상품정보 헤드 -->
      <section class="width-container mb-[3rem]">
        <div class="block sm:flex px-[1rem]">
          <div class="w-auto sm:w-0 sm:flex-auto">
            <NuxtImg
              class="w-full  object-contain object-top"
              :src="item.value.thumbnailSrc"
              alt=""
            />
          </div>
          <div class="p-4 sm:w-[55vw] sm:max-w-[35rem] ">
            <p class="text-[1.5rem]">{{ item.value.title }}</p>
            <div class="flex items-center gap-1">
              <start-fill :star-size="1" :star-num="5" :fill="avgStar" />

              <p class="text-[0.8rem] text-gray-500">
                ({{ item.value.reviews.length }})
              </p>
            </div>
            <!-- 금액 표기 -->
            <p class="text-gray-400 text-[0.8rem] flex items-center">
              <span class="text-red-500 mr-[.5rem] text-[3rem] font-bold"
                >{{ item.value.sale }}%</span
              >

              <span class="flex flex-col">
                <del> {{ formatToWon(item.value.price) }}<span>원</span> </del>
                <p class="font-bold text-[1.5rem] text-black">
                  <span>
                    {{
                      formatToWon(
                        +item.value.price * ((100 - item.value.sale) / 100) + ""
                      )
                    }}
                  </span>
                  <span class="text-[0.9rem]">원</span>
                </p>
              </span>
            </p>
            <!-- 배송료 -->
            <div class="border-t mb-[1rem] py-[1rem]">
              <p v-if="item.value.freeParcel === 0">무료 배송</p>
              <div v-else>
                <p>배송료 : {{ formatToWon(item.value.parcel) }}</p>
                <span>
                  {{ formatToWon(item.value.freeParcel) }}이상 구매시 무료배송
                </span>
              </div>
            </div>

            <!-- 원산지 -->
            <div class="border-t mb-[1rem] py-[1rem]">
              <p>원산지 : {{ item.value.origin }}</p>
            </div>
            <!-- 추가 옵션 선택 -->
            <div class="border-t mb-[1rem] py-[1rem]">
              <select
                v-model="selectOption"
                class="block border text-gray-500 "
              >
                <option disabled value="" class="hidden">추가옵션</option>
                <template v-for="(option, index) in item.value.options">
                  <option :value="option.name"
                    >{{ option.name }} ( {{ formatToWon(option.price) }}원
                    )</option
                  >
                </template>
              </select>
            </div>
            <!-- 추가 옵션 추가 -->
            <div v-if="itemOptions && itemOptions.length > 0">
              <template v-for="(option, index) in itemOptions">
                <div class="border p-2">
                  <div class="flex justify-between">
                    <p>{{ option.name }}</p>
                    <button @click="item.deleteOption(index)">
                      X
                    </button>
                  </div>
                  <div class="flex justify-between">
                    <div class="flex gap-2">
                      <button
                        class="border px-2"
                        @click="
                          itemOptions[index].count =
                            itemOptions[index].count-- > 1
                              ? itemOptions[index].count
                              : 1
                        "
                      >
                        -
                      </button>
                      <p>{{ option.count }}</p>
                      <button
                        class="border px-2"
                        @click="itemOptions[index].count++"
                      >
                        +
                      </button>
                    </div>
                    <p>{{ formatToWon(option.price * option.count) }}원</p>
                  </div>
                </div>
              </template>
            </div>
            <!-- 총금액 표기 -->
            <p class="float-right clear-both">
              총 금액 :{{ formatToWon(totalPrice || 0) }}원
            </p>
            <!-- 구매 버튼 & 장바구니 버튼 -->
            <div class="clear-both flex  justify-end gap-2 ">
              <button
                class=" border py-2 px-4 disable-type-0"
                :disabled="
                  userInfo?.role === EnumUserInfoRole.company ? true : false
                "
                @click="onAddBasketItem"
              >
                장바구니
              </button>
              <button
                class=" border py-2 px-4 disable-type-0"
                :disabled="
                  userInfo?.role === EnumUserInfoRole.company ? true : false
                "
                @click="onClickBuyItem"
              >
                구매하기
              </button>
            </div>
          </div>
        </div>
      </section>
      <br />
      <!-- 탭 메뉴 -->
      <div ref="tapMenuRef" class="h-[4rem] my-2 bg-gray-600 text-[1rem]">
        <div
          class="width-container h-full flex text-white gap-[1rem] px-2 items-center font-bold"
        >
          <template
            v-for="(tabName, index) in [
              '상품설명',
              '구매후기 ',
              '상품문의',
              '교환/반품',
            ]"
            :key="index"
          >
            <div
              class=" cursor-pointer h-full flex items-center transition-all"
              :class="
                showTabMenu === index ? 'border-b-[.4rem] border-red-500' : ''
              "
              @click="changeTabMenuByIndex(index)"
            >
              <p>
                {{ tabName }}
                <span class="text-gray-200 font-medium" v-show="index === 1"
                  >{{ item.value.reviews.length }}
                </span>
              </p>
            </div>
          </template>
        </div>
      </div>
      <!-- 탭 활성화 메뉴 랜더 -->
      <section class="width-container mt-[2rem] px-2">
        <!-- 상품 상세정보 -->
        <div v-show="showTabMenu === 0" v-html="item.value.detailHtml"></div>
        <!-- 구매후기 -->
        <div v-show="showTabMenu === 1">
          <h1 class="text-[2rem] text-center">
            {{ item.value.title }} 구매후기
          </h1>
          <br />

          <!-- 별 평균 & 별 분포도 -->
          <div
            class="grid grid-cols-1 md:grid-cols-2 p-[4rem] border border-gray-200"
          >
            <!-- 별 평균 -->
            <div class="border-b-2 md:border-b-0 md:border-r-2 border-gray-200">
              <p class="text-[3rem] text-center">
                {{ item.getItemStarAvg() }}
              </p>
              <start-fill
                class="mx-auto "
                :star-size="2.5"
                :star-num="5"
                :fill="avgStar"
              />
            </div>
            <!-- 별 분포도 -->
            <div class="star-dist mt-4 h-[11rem] md:h-auto md:mt-0">
              <ul class="flex w-full h-full items-end justify-center gap-2">
                <li>
                  <p>{{ item.getItemStarDistribution(5) }}%</p>
                  <progress
                    max="1"
                    :value="item.getItemStarDistribution(5) / 100"
                  ></progress>
                  <span>
                    5
                  </span>
                </li>
                <li>
                  <p>{{ item.getItemStarDistribution(4) }}%</p>
                  <progress
                    max="1"
                    :value="item.getItemStarDistribution(4) / 100"
                  ></progress>
                  <span>
                    4
                  </span>
                </li>
                <li>
                  <p>{{ item.getItemStarDistribution(3) }}%</p>
                  <progress
                    max="1"
                    :value="item.getItemStarDistribution(3) / 100"
                  ></progress>
                  <span>
                    3
                  </span>
                </li>
                <li>
                  <p>{{ item.getItemStarDistribution(2) }}%</p>
                  <progress
                    max="1"
                    :value="item.getItemStarDistribution(2) / 100"
                  ></progress>
                  <span>
                    2
                  </span>
                </li>
                <li>
                  <p>{{ item.getItemStarDistribution(1) }}%</p>
                  <progress
                    max="1"
                    :value="item.getItemStarDistribution(1) / 100"
                  ></progress>
                  <span>
                    1
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 구매 후기 리스트-->
          <div class="mt-[2rem]">
            <div
              v-for="review in item.value.reviews"
              class="flex flex-col gap-2 pb-4 border-b-2"
            >
              <div class="flex gap-2 text-gray-400">
                <start-fill :star-size="1" :star-num="5" :fill="review.star" />
                <p>{{ review.nickName }}</p>
                <p>
                  {{
                    new Date(review.addDay).toLocaleDateString().slice(0, -1)
                  }}
                </p>
              </div>
              <h2 class="bold text-[1.2rem]">
                {{ review.title }}
              </h2>
              <p
                v-if="
                  review.selectedOptions && review.selectedOptions.length > 0
                "
                class="text-gray-400 text-[.8rem]"
              >
                추가 옵션 : {{ review.selectedOptions }}
              </p>
              <p>
                {{ review.text }}
              </p>
            </div>
          </div>
        </div>
        <!-- 상품문의 -->
        <div v-show="showTabMenu === 2">
          <h1 class="text-[2rem] text-center">{{ item.value.title }}</h1>
          <br />
          <div class="flex  justify-between border-b-2 font-bold">
            <p>상품문의 ({{ item.value.QA.length }})</p>
            <div
              @click="openQA"
              class="border border-b-0 p-1 cursor-pointer hover:text-green-500"
            >
              문의하기
            </div>
          </div>
          <br />
          <div>
            <div class="inquire ">
              <p class="w-[15%]">답변상태</p>
              <p class="w-[15%]">문의유형</p>
              <p class="w-[40%]">문의제목</p>
              <p class="w-[15%]">작성자</p>
              <p class="w-[15%]">작성일자</p>
            </div>
            <!-- 문의 랜더 -->

            <div v-for="(qa, index) in item.value.QA">
              <div class="flex justify-between text-center border-b mt-[1rem] ">
                <p
                  class="w-[15%] "
                  :class="qa.answer ? 'text-gray-500' : 'text-green-600'"
                >
                  {{ qa.status }}
                </p>
                <p class="w-[15%]">{{ qa.type }}</p>
                <button
                  class="w-[40%] hover:underline "
                  @click="openInquiry(index)"
                >
                  {{ qa.title }}
                </button>
                <p class="w-[15%]">
                  {{ qa.nickName.slice(0, qa.nickName.length / 2) }}**
                </p>
                <p class="w-[15%]">
                  {{ new Date(qa.addDay).toLocaleDateString().slice(0, -1) }}
                </p>
              </div>
              <!-- 문의 내용 -->
              <div v-show="openInquiryIndex === index">
                <div class="flex flex-col px-4 gap-6 bg-gray-200 py-4 ">
                  <!-- 질문 -->
                  <div class="flex items-start justify-between gap-2">
                    <div
                      class="w-[1.5rem] h-[1.5rem]  text-center text-white bg-gray-500 mt-[.2rem]"
                      :style="{ borderRadius: '100%', lineHeight: '1.5rem' }"
                    >
                      <p>
                        Q
                      </p>
                    </div>
                    <div class="flex-1">
                      <p v-for="txt in qa.text.split('\n')">
                        {{ txt }}
                      </p>
                    </div>

                    <div
                      v-if="
                        sellerInfo &&
                          item.value.sellUserInfo.id === sellerInfo.id
                      "
                      class="border bg-blue-400 p-2 rounded-md text-white cursor-pointer"
                      @click="answerQA(qa.addDay)"
                    >
                      답변하기
                    </div>
                  </div>

                  <!-- 답변 -->
                  <div v-if="qa.answer" class="flex items-center gap-2">
                    <div
                      class="w-[1.5rem] h-[1.5rem]  text-center text-white bg-green-400"
                      :style="{ borderRadius: '100%', lineHeight: '1.5rem' }"
                    >
                      <p>
                        A
                      </p>
                    </div>
                    <p>
                      {{ qa.answer }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 교환/반품 -->
        <div v-show="showTabMenu === 3">
          교환/반품

          <div>
            <h1 class="text-[2rem]">판매자정보</h1>
            <p>
              <span>상호명 : </span>{{ item.value.sellUserInfo.companyName }}
            </p>
            <p><span>대표자 : </span>{{ item.value.sellUserInfo.represent }}</p>
            <p><span>연락처 : </span>{{ item.value.sellUserInfo.phone }}</p>
            <p>
              <span>상호명 : </span>{{ item.value.sellUserInfo.companyAddress }}
            </p>
            <p><span>이메일 : </span>{{ item.value.sellUserInfo.eMail }}</p>
          </div>
        </div>
      </section>
    </div>
    <!-- 아이템이 존재하지않음 -->
    <div
      v-else
      class="min-h-[60vh] text-center flex flex-col justify-center gap-[1rem] mt-[3rem] text-gray-400"
    >
      <fa-icon
        class="border mx-auto w-[3rem] h-[3rem] p-[2rem] rounded-full "
        icon="exclamation"
        size="3x"
      />

      <p class="text-[1.5rem]">아이템을 찾을수 없습니다.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getItemById } from "~~/api/item";
import { EnumUserInfoRole, ShopitemService } from "~~/api/swagger";
import { storeToRefs } from "pinia";
import { useUser } from "~~/sotre/user";

import { windowFeatures } from "~~/common/popup";
import { useLoading } from "~~/sotre/loading";

import { SellShopItem } from "@/class/SellShopItem";

definePageMeta({
  middleware: ["validator-item-id", "scroll-top"],
});

const { params } = useRoute();
const { userInfo, sellerInfo } = storeToRefs(useUser());

const item = ref<SellShopItem>(new SellShopItem());
const avgStar = ref<number>();
const showTabMenu = useState("showTabMenu", () => 0);

// 옵션  & 계산 & 구매
const itemOptions = computed(() => item.value?.getItemOptions);

// 배송비 포함 비용
const totalPrice = computed(() => item.value?.totalPrice);

// 옵션
const selectOption = ref("");
const handlerCahngeSelectOption = () => {
  if (selectOption.value === "") return;

  if (item.value?.validataionOption(selectOption.value)) {
    alert("이미 선택된 옵션 입니다.");
    selectOption.value = "";
    return;
  }

  // 추가 옵션 추가
  item.value?.addOptionItem(selectOption.value);

  selectOption.value = "";
};
// 옵션 선택 감지
watch(selectOption, handlerCahngeSelectOption);

// 장바구니 담기
const onAddBasketItem = async () => {
  if (!userInfo.value || !item.value) {
    alert("로그인을 해야 이용할수 있습니다.");
    return;
  }

  const { ok: baskOk } = await item.value.addBaskItem();

  if (!baskOk) {
    alert("장바구니를 추가하지 못하였습니다.");
    return;
  }

  const ok = confirm(
    "장바구니에 추가하셨습니다. 장바구니 페이지로 이동하시겠습니까?"
  );
  if (ok) {
    useRouter().push("/basket");
  }
};

// 상품 구매하기
const onClickBuyItem = async () => {
  if (!userInfo.value || !item.value) {
    alert("로그인을 해야 이용할수 있습니다.");
    return;
  }

  const ok = confirm("구매 하시겠습니까??");
  if (!ok) {
    return;
  }

  const { ok: baskOk, err } = await item.value.addBaskItem();

  if (baskOk) {
    useRouter().push("/basket");
  } else {
    alert(`오류가 발생하여구매하지 못하였습니다.${err}`);
  }
};

// 탭메뉴
const tapMenuRef = ref<HTMLElement>();

const changeTabMenuByIndex = (index: number) => {
  tapMenuRef.value!.scrollIntoView({ behavior: "auto", block: "start" });

  showTabMenu.value = index;
};

// 상품문의
const openInquiryIndex = ref();
const openInquiry = (index: number) => {
  openInquiryIndex.value === index
    ? (openInquiryIndex.value = null)
    : (openInquiryIndex.value = index);
};

// QA
let QAcallBack: any;
const openQA = () => {
  window.open(
    `${document.location.origin}/popup/QA-${item.value?.value!.id}`,
    "add_QA",
    windowFeatures()
  );
};

const HandlerAddQA = async (d: any) => {
  if (!d.data || d.data.type !== "add-QA") return;

  if (d.data.data.ok) {
    useLoading().on();
    const { ok, item: resItem } = await getItemById(+params.id);
    if (ok) {
      item.value.value = resItem;
      changeTabMenuByIndex(2);
    }

    useLoading().off();
  }
};

// QA 답변
let answerQAcallBack: any;
let answerQAaddDay: any;
const answerQA = (addDay: string) => {
  answerQAaddDay = addDay;
  console.log(answerQAaddDay);

  window.open(
    `${document.location.origin}/popup/answerQA`,
    "answer_QA",
    windowFeatures()
  );
};

const HandlerAnswerQa = async (d: any) => {
  if (!d.data || d.data.type !== "answer-QA") return;

  const { answer } = d.data.data;

  // 답변 데이터 처리
  useLoading().on();
  const { ok, err } = await ShopitemService.shopItemControllerAnswerQa({
    body: {
      addDay: answerQAaddDay,
      answer,
      itemId: item.value!.value.id,
    },
  });
  if (ok) {
    const { ok: gok, item: resItem } = await getItemById(+params.id);
    if (gok) {
      item.value.value = resItem;
      changeTabMenuByIndex(2);
    }
  }

  useLoading().off();

  console.log(d.data.data.answer);
};

onMounted(async () => {
  const { item: resItem } = await getItemById(+params.id);
  item.value.value = resItem;
  avgStar.value = item.value.getItemStarAvg();

  showTabMenu.value = 0;

  QAcallBack = HandlerAddQA;
  window.addEventListener("message", QAcallBack);

  answerQAcallBack = HandlerAnswerQa;
  window.addEventListener("message", answerQAcallBack);
});

onUnmounted(() => {
  window.removeEventListener("message", QAcallBack);
  window.removeEventListener("message", answerQAcallBack);
});

// og데이터
const ogData = toRefs(
  reactive({
    title: "title",
    src:
      "https://www.kogl.or.kr/upload_recommend/2018/DMZ/thumb_B008-C001-0052-09_L.jpg",
    desc: "desc",
  })
);
// 서버에서 렌더링되기 전 호출할 비동기
onServerPrefetch(async () => {
  // 아이템 정보 가져오기 처리
  const {
    data: { value: data },
    error,
  } = await useLazyAsyncData("ogMetaData", () => getItemById(+params.id));
  if (data?.ok) {
    ogData.title.value = `타이틀 : ${data.item.title}`;
    ogData.src.value = data.item.thumbnailSrc;
    ogData.desc.value = `${data.item.title}의 가격은 ${data.item.price}입니다.`;
  }
});

useHead({
  title: `아이템 :  ${params.id}`,
  meta: [
    {
      name: "description",
      content: `쇼핑 데이터 ${params.id}`,
    },
    {
      name: "og:title",
      property: "og:title",
      content: ogData.title,
    },
    {
      name: "og:description",
      property: "og:description",
      content: ogData.desc,
    },
    {
      name: "og:image",
      property: "og:image",
      content: ogData.src,
    },
  ],
});
</script>

<style lang="scss">
.star-dist {
  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2.5rem;
    align-items: center;
    height: 100%;
    width: 100%;

    progress {
      transform: rotate(-90deg);
      height: 1rem;
      width: 8vh;
      border-radius: 1rem;
      overflow: hidden;

      &::-webkit-progress-bar {
        @apply bg-gray-400;
      }

      &::-webkit-progress-value {
        @apply bg-red-600;
      }
    }
  }
}

.inquire {
  @apply flex justify-between p-1 text-center border-t border-b border-gray-400 bg-gray-200;

  p {
    @apply overflow-hidden overflow-ellipsis whitespace-nowrap;
  }

  p ~ p {
    @apply border-l border-gray-400;
  }
}
</style>
