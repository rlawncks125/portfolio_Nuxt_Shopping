<template>
  <div>
    <div>아이템 id : {{ params.id }}</div>
    <div v-if="item" class="text-[1.1rem]">
      <!-- 상품정보 헤드 -->
      <section class="width-container">
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
              <start-fill
                :star-size="1"
                :star-num="5"
                :fill="item.reviews.avgStar"
              />
              <p class="text-[0.8rem] text-gray-500">
                ({{ item.reviews.count }})
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
                  <p>{{ option.name }}</p>
                  <div class="flex justify-between">
                    <div class="flex gap-2">
                      <button
                        class="border px-2"
                        @click="itemOptions[index].count--"
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
            <p class="float-right">
              총 금액 :{{ formatToWon(optionPriceSum) }}원
            </p>
            <!-- 구매 버튼 & 장바구니 버튼 -->
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
            v-for="(item, index) in [
              '상품설명',
              '구매후기',
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
              <p>{{ item }}</p>
            </div>
          </template>
        </div>
      </div>
      <!-- 탭 활성화 메뉴 랜더 -->
      <section class="width-container">
        <!-- 상품 상세정보 -->
        <div v-show="showTabMenu === 0" v-html="item.detailHtml"></div>
        <!-- 구매후기 -->
        <div v-show="showTabMenu === 1">구매후기</div>
        <!-- 상품문의 -->
        <div v-show="showTabMenu === 2">상품문의</div>
        <!-- 교환/반품 -->
        <div v-show="showTabMenu === 3">교환/반품</div>
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
import { getItem } from "~~/api/item";
import { Iitem } from "@/api/item";

export default defineComponent({
  setup() {
    const { params } = useRoute();
    const item = ref<Iitem>();

    const showTabMenu = useState("showTabMenu", () => 0);

    // 옵션 선택 & 계산
    const itemOptions = ref([]);

    // 총합 액수 계산
    const optionPriceSum = computed(() => {
      const salePrice = +item.value.price * ((100 - item.value.sale) / 100);
      // 옵션 총합 계산
      const optionSum = itemOptions.value.reduce((a, b) => {
        const ra = (a.price * a.count) | a;
        const rb = b.price * b.count;

        return toRaw(ra) + toRaw(rb);
      }, 0);

      return salePrice + item.value.parcel + optionSum;
    });
    // 옵션 선택
    const selectOption = ref("");
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

    // 탭메뉴
    const tapMenuRef = ref<HTMLElement>();

    const changeTabMenuByIndex = (index: number) => {
      tapMenuRef.value.scrollIntoView({ behavior: "auto", block: "start" });

      showTabMenu.value = index;
    };

    onMounted(async () => {
      const { ok, item: resItem } = await getItem(+params.id);
      if (ok) {
        item.value = resItem;
      }
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
      optionPriceSum,
      tapMenuRef,
      changeTabMenuByIndex,
    };
  },
});
</script>

<style scoped></style>
