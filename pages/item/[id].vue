<template>
  <div>
    <div>아이템 id : {{ params.id }}</div>
    <div v-if="item" class="text-[1.1rem]">
      <!-- 상품정보 헤드 -->
      <section class="width-container mb-[3rem]">
        <div class="block sm:flex px-[1rem]">
          <div class="w-auto sm:flex-auto">
            <img
              class="w-full h-full object-contain object-top"
              :src="item.thumbnailSrc"
              alt=""
            />
          </div>
          <div class="p-4 sm:w-[30rem] sm:flex-initial">
            <p class="text-[1.5rem]">{{ item.title }}</p>
            <div class="flex items-center gap-1">
              <start-fill :star-size="1" :star-num="5" :fill="avgStar" />
              <p class="text-[0.8rem] text-gray-500">
                ({{ item.reviews.length }})
              </p>
            </div>
            <!-- 금액 표기 -->
            <p class="text-gray-400 text-[0.8rem] flex items-center">
              <span class="text-red-500 mr-[.5rem] text-[3rem] font-bold"
                >{{ item.sale }}%</span
              >

              <span class="flex flex-col">
                <del> {{ formatToWon(item.price) }}<span>원</span> </del>
                <p class="font-bold text-[1.5rem] text-black">
                  <span>
                    {{
                      formatToWon(+item.price * ((100 - item.sale) / 100) + "")
                    }}
                  </span>
                  <span class="text-[0.9rem]">원</span>
                </p>
              </span>
            </p>
            <!-- 배송료 -->
            <p>배송료 : {{ item.parcel }}</p>
            <!-- 원산지 -->
            <p>원산지 : {{ item.origin }}</p>
            <!-- 추가 옵션 선택 -->
            <select v-model="selectOption" class="block border text-gray-500">
              <option disabled value="" class="hidden">추가옵션</option>
              <template v-for="(option, index) in item.options">
                <option :value="option.name"
                  >{{ option.name }} ( {{ option.price }}원 )</option
                >
              </template>
            </select>
            <!-- 추가 옵션 추가 -->
            <div v-if="itemOptions.length > 0">
              <template v-for="(option, index) in itemOptions">
                <div class="border p-2">
                  <div class="flex justify-between">
                    <p>{{ option.name }}</p>
                    <button @click="deleteOption(index)">
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
                    <p>{{ option.price * option.count }}</p>
                  </div>
                </div>
              </template>
            </div>
            <!-- 총금액 표기 -->
            <p class="float-right clear-both">
              총 금액 :{{ formatToWon(optionPriceSum) }}원
            </p>
            <!-- 구매 버튼 & 장바구니 버튼 -->
            <button
              class="block clear-both float-right border py-2 px-4"
              @click="onClickBuyItem"
            >
              구매하기
            </button>
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
                  >{{ item.reviews.length }}
                </span>
              </p>
            </div>
          </template>
        </div>
      </div>
      <!-- 탭 활성화 메뉴 랜더 -->
      <section class="width-container mt-[2rem] px-2">
        <!-- 상품 상세정보 -->
        <div v-show="showTabMenu === 0" v-html="item.detailHtml"></div>
        <!-- 구매후기 -->
        <div v-show="showTabMenu === 1">
          <h1 class="text-[2rem] text-center">{{ item.title }} 구매후기</h1>
          <br />

          <!-- 별 평균 & 별 분포도 -->
          <div
            class="grid grid-cols-1 md:grid-cols-2 p-[4rem] border border-gray-200"
          >
            <!-- 별 평균 -->
            <div class="border-b-2 md:border-b-0 md:border-r-2 border-gray-200">
              <p class="text-[3rem] text-center">
                {{ avgStar }}
              </p>
              <start-fill
                class="mx-auto"
                :star-size="2.5"
                :star-num="5"
                :fill="avgStar"
              />
            </div>
            <!-- 별 분포도 -->
            <div class="star-dist mt-4 h-[11rem] md:h-auto md:mt-0">
              <ul class="flex w-full h-full items-end justify-center gap-4">
                <li>
                  <p>{{ starDist.five * 100 }}%</p>
                  <progress max="1" :value="starDist.five"></progress>
                  <span>
                    5
                  </span>
                </li>
                <li>
                  <p>{{ starDist.four * 100 }}%</p>
                  <progress max="1" :value="starDist.four"></progress>
                  <span>
                    4
                  </span>
                </li>
                <li>
                  <p>{{ starDist.three * 100 }}%</p>
                  <progress max="1" :value="starDist.three"></progress>
                  <span>
                    3
                  </span>
                </li>
                <li>
                  <p>{{ starDist.two * 100 }}%</p>
                  <progress max="1" :value="starDist.two"></progress>
                  <span>
                    2
                  </span>
                </li>
                <li>
                  <p>{{ starDist.one * 100 }}%</p>
                  <progress max="1" :value="starDist.one"></progress>
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
              v-for="review in item.reviews"
              class="flex flex-col gap-2 pb-4 border-b-2"
            >
              <div class="flex gap-2 text-gray-400">
                <start-fill :star-size="1" :star-num="5" :fill="review.star" />
                <p>{{ review.nickName }}</p>
                <p>{{ review.addDay }}</p>
              </div>
              <p class="text-gray-400">선택 : {{ review.title }}</p>
              <p>
                {{ review.text }}
              </p>
            </div>
          </div>
        </div>
        <!-- 상품문의 -->
        <div v-show="showTabMenu === 2">
          <h1 class="text-[2rem] text-center">{{ item.title }}</h1>
          <br />
          <p class="font-bold border-b-2">상품문의 ({{ item.QA.length }})</p>
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
            <div v-for="(qa, index) in item.QA">
              <div class="flex justify-between text-center border-b">
                <p class="w-[15%] text-green-600">{{ qa.status }}</p>
                <p class="w-[15%]">{{ qa.type }}</p>
                <button
                  class="w-[40%] hover:underline"
                  @click="openInquiry(index)"
                >
                  {{ qa.title }}
                </button>
                <p class="w-[15%]">
                  {{ qa.nickName.slice(0, qa.nickName.length / 2) }}**
                </p>
                <p class="w-[15%]">{{ qa.addDay }}</p>
              </div>
              <!-- 문의 내용 -->
              <div v-show="openInquiryIndex === index">
                <div class="flex flex-col px-4 gap-6 bg-gray-200 py-4 ">
                  <!-- 질문 -->
                  <div class="flex items-center gap-2">
                    <div
                      class="w-[1.5rem] h-[1.5rem]  text-center text-white bg-gray-500"
                      :style="{ borderRadius: '100%', lineHeight: '1.5rem' }"
                    >
                      <p>
                        Q
                      </p>
                    </div>
                    <p>
                      {{ qa.text }}
                    </p>
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
            <p><span>상호명 : </span>{{ item.sellUserInfo.companyName }}</p>
            <p><span>대표자 : </span>{{ item.sellUserInfo.represent }}</p>
            <p><span>연락처 : </span>{{ item.sellUserInfo.phone }}</p>
            <p><span>상호명 : </span>{{ item.sellUserInfo.companyAddress }}</p>
            <p><span>이메일 : </span>{{ item.sellUserInfo.eMail }}</p>
          </div>
        </div>
      </section>
      <div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatToWon } from "@/common/format";
import { getItem, basketItem } from "~~/api/item";
import { Iitem } from "@/api/item";

export default defineComponent({
  setup() {
    const { params } = useRoute();
    const item = ref<Iitem>();

    const avgStar = ref<number>();

    const showTabMenu = useState("showTabMenu", () => 0);

    // 옵션  & 계산 & 구매
    const itemOptions = ref<
      {
        name: string;
        price: number;
        count: number;
      }[]
    >([]);

    // 총합 액수 계산
    const optionPriceSum = computed(() => {
      const salePrice = +item.value.price * ((100 - item.value.sale) / 100);
      // 옵션 총합 계산
      const optionSum = itemOptions.value.reduce(
        (a, b) => a + toRaw(b.price * b.count),
        0
      );

      return salePrice + optionSum + item.value.parcel;
    });
    // 옵션
    const selectOption = ref("");
    const deleteOption = (index: number) => {
      itemOptions.value = itemOptions.value.filter((v, i) => i !== index);
    };
    // 옵션 선택
    watch(selectOption, () => {
      if (selectOption.value === "") return;

      if (
        itemOptions.value.findIndex((v) => v.name === selectOption.value) !== -1
      ) {
        alert("이미 선택된 옵션 입니다.");
        selectOption.value = "";
        return;
      }

      // 아이템 추가
      const findItem = item.value.options.find(
        (v) => v.name === selectOption.value
      );
      // itemOptions.value = [
      //   ...itemOptions.value,
      //   { ...toRaw(findItem), count: 1 },
      // ];
      itemOptions.value.push({ ...toRaw(findItem), count: 1 });

      selectOption.value = "";
    });

    // 장바구니 담기
    const onAddBasketItem = () => {
      const basketItem: basketItem = {
        itemId: item.value.id,
        title: item.value.title,
        thumbnailSrc: item.value.thumbnailSrc,
        parcel: item.value.parcel,
        sale: item.value.sale,
        price: item.value.price,
        options: itemOptions.value,
        totalPrice: optionPriceSum.value,
      };
    };

    // 상품 구매하기
    const onClickBuyItem = () => {
      console.log("아이템 정보 :", item.value);
      console.log("선택 옵션 : ", itemOptions.value);
      console.log("총합 : ", optionPriceSum.value);

      const { $impPayment } = useNuxtApp();

      $impPayment(
        {
          amount: 500, // 결제할 금액
          name: item.value.title,
          merchant_uid: `merchant_F${item.value.id}_${Date.now()}`,
          buyer_addr: "테스트 주소",
          buyer_email: "rlawnks125@naver.com",
          buyer_name: "사용자",
          buyer_tel: "010-7115-9176",
          buyer_postcode: "123-456",
        },
        (rsp) => {
          alert("결제 성공");
          // 성공시 api 호출
          // { 영수증 정보 , 결제정보 }

          // 결제 정보
          // imp_uid: rsp.imp_uid, // imp결제 고유 번호
          // merchant_uid: rsp.merchant_uid // 상품 번호

          console.log(rsp);
          // apply_num: "53795311";
          // bank_name: null
          // buyer_addr: "테스트 주소"
          // buyer_email: "rlawnks125@naver.com"
          // buyer_name: "사용자"
          // buyer_postcode: "123-456"
          // buyer_tel: "010-7115-9176"
          // card_name: "BC카드"
          // card_number: "910003*********9"
          // card_quota: 0
          // currency: "KRW"
          // custom_data: null
          // imp_uid: "imp_653448500730"
          // merchant_uid: "merchant_F6_1659888448609"
          // name: "[10%+12%]패션라인신상원피스/팬츠"
          // paid_amount: 500
          // paid_at: 1659888494
          // pay_method: "card"
          // pg_provider: "html5_inicis"
          // pg_tid: "StdpayISP_INIpayTest20220808010813776666"
          // pg_type: "payment"
          // receipt_url: "https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=StdpayISP_INIpayTest20220808010813776666&noMethod=1"
          // status: "paid"
        },
        (rsp) => {
          console.log(rsp);
          alert(rsp.error_msg);
        }
      );
    };

    // 탭메뉴
    const tapMenuRef = ref<HTMLElement>();

    const changeTabMenuByIndex = (index: number) => {
      tapMenuRef.value.scrollIntoView({ behavior: "auto", block: "start" });

      showTabMenu.value = index;
    };

    // 구매후기
    const starDist = reactive({
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
    });

    // 상품문의
    const openInquiryIndex = ref();
    const openInquiry = (index: number) => {
      if (openInquiryIndex.value === index) {
        openInquiryIndex.value = null;
        return;
      }

      openInquiryIndex.value = index;
    };

    onMounted(async () => {
      const { ok, item: resItem } = await getItem(+params.id);
      if (ok) {
        item.value = resItem;
      }

      // 평균 별점
      avgStar.value =
        resItem.reviews.reduce((a, b) => a + b.star, 0) /
        resItem.reviews.length;

      // 별점 분포도
      starDist.five =
        resItem.reviews.filter((v) => v.star === 5).length /
        resItem.reviews.length;
      starDist.four =
        resItem.reviews.filter((v) => v.star === 4).length /
        resItem.reviews.length;
      starDist.three =
        resItem.reviews.filter((v) => v.star === 3).length /
        resItem.reviews.length;
      starDist.two =
        resItem.reviews.filter((v) => v.star === 2).length /
        resItem.reviews.length;
      starDist.one =
        resItem.reviews.filter((v) => v.star === 1).length /
        resItem.reviews.length;
    });

    // og데이터
    const ogTitle = useState("ogTitle");
    const ogSrc = useState("ogSrc");
    const ogDesc = useState("ogDesc");
    useLazyAsyncData("ogData", () =>
      // 아이템 정보 가져오기 처리
      getItem(+params.id).then(({ ok, item }) => {
        if (ok) {
          ogTitle.value = `타이틀 : ${item.title}`;
          ogSrc.value = item.thumbnailSrc;
          ogDesc.value = `${item.title}의 가격은 ${item.price}입니다.`;
        }
      })
    );

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
          content: ogTitle,
        },
        {
          name: "og:description",
          property: "og:description",
          content: ogDesc,
        },
        {
          name: "og:image",
          property: "og:image",
          content: ogSrc,
        },
      ],
    });
    return {
      params,
      item,
      formatToWon,
      showTabMenu,
      selectOption,
      itemOptions,
      deleteOption,
      optionPriceSum,
      tapMenuRef,
      changeTabMenuByIndex,
      onClickBuyItem,
      avgStar,
      starDist,
      openInquiry,
      openInquiryIndex,
    };
  },
});
</script>

<style lang="scss">
.star-dist {
  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;

    progress {
      transform: rotate(-90deg);
      height: 1rem;
      width: 100%;
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
