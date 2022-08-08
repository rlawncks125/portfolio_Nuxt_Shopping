<template>
  <div>
    <!-- 카테고리 & 배너 -->
    <section
      id="category"
      class="border-t-2 border-black font-bold text-[0.76rem]"
    >
      <div class="width-container relative flex">
        <!-- 왼쪽 카테고리 -->
        <div class="w-[10rem] hidden md:block">
          <ul class="category-warp flex flex-col gap-2 bg-black text-white">
            <li>브랜드 패션</li>
            <li>의류</li>
            <li>뷰티 잡화</li>
            <li>식품 마트 유아</li>
            <li>가구 생활 건강 렌탈</li>
            <li>디지털 가전 컴퓨터</li>
            <li>스포츠 레저 자동차</li>
            <li>도서 티켓 여행 e쿠폰</li>
            <li class="flex justify-between h-[2.6rem] !p-0">
              <div class="img-biz-plus w-[50%] cursor-pointer"></div>
              <div class="img-pet-plus w-[50%] cursor-pointer"></div>
            </li>
          </ul>
        </div>

        <!-- 배너( 스와이프 ) -->
        <div ref="swiper" class="swiper flex-auto w-0">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <!-- Slides -->
            <div v-for="item in swiperItems" class="swiper-slide">
              <img class="h-full" :src="item.src" alt="" />
            </div>
          </div>

          <!-- If we need navigation buttons -->
          <div ref="prevEl" class="swiper-button-prev swiper-prev"></div>
          <div ref="nextEl" class="swiper-button-next swiper-next"></div>

          <!-- pagination -->
          <div
            class="hidden sm:flex justify-between text-center h-[2.5rem] absolute z-[10] banner-pagination bottom-[1rem] left-0 right-0  border py-2 mx-6 bg-white"
          >
            <div
              v-for="(item, index) in swiperItems"
              class=" relative flex-auto cursor-pointer"
              :class="bannerActiveIndex === index ? 'text-red-600' : ''"
              :key="index"
              @click="moveSlideByIndex(index)"
            >
              <p class="three-dot">
                {{ item.promotionName }}
              </p>
              <div class="absolute bottom-[1.7rem] left-0 border w-full">
                <p>팝업</p>
              </div>
            </div>

            <div class="three-dot">제휴 이벤트</div>
            <div class="three-dot">추천 이벤트</div>
          </div>
        </div>

        <!-- 왼쪽 광고 -->
        <div
          class="hidden md:block absolute top-0 w-[8rem] left-[-8.5rem] border"
        >
          <p>왼쪽광고</p>
        </div>
        <!-- 오른쪽 광고 -->
        <div
          class="hidden md:block absolute top-0 w-[8rem] right-[-8.5rem] border"
        >
          <p>오른쪽 광고</p>
        </div>
      </div>
    </section>

    <!-- 추천 상품 1-->
    <section id="recommend1" class="width-container">
      <div>ㅁㄴㅇㅁㅇ</div>
    </section>
    <!-- 추천 상품 2-->
    <section id="recommend2" class="width-container">
      <div class="grid grid-cols-3 gap-3 text-[1.1rem]">
        <div
          class="border border-gray-200 cursor-pointer hover:border-gray-400"
          v-for="(item, index) in productItems"
          @click="() => useRouter().push(`/item/${item.itemId}`)"
          :key="index"
        >
          <img class="w-full" :src="item.src" alt="" />
          <div class="p-4">
            <p>{{ item.title }}</p>
            <div class="flex gap-2 items-center">
              <span class="text-red-500">{{ item.sale }}%</span>
              <p>
                <span class="font-bold">
                  {{
                    formatToWon(+item.price * ((100 - item.sale) / 100) + "")
                  }}</span
                ><span class="text-[0.9rem]">원</span>
              </p>
              <p class="text-gray-400 text-[0.8rem]">
                <del> {{ formatToWon(item.price) }}<span>원</span> </del>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Swiper, { Navigation } from "swiper";
import { defineComponent } from "vue";
import { formatToWon } from "@/common/format";

export default defineComponent({
  setup() {
    // const swiperRef = ref();
    const { $setSwiper } = useNuxtApp();
    let swiperControl: Swiper;
    const bannerActiveIndex = ref(0);

    const swiper = reactive({
      swiper: null,
      nextEl: null,
      prevEl: null,
    });
    const swiperItems = [
      {
        promotionName: "스페셜 이벤트",
        src:
          "https://ad-img.ebaykorea.com/ADS/Contents_/2022_07_15_11_40_44/d7d179fa6c3c47d3.JPG",
      },
      {
        promotionName: "유튜브 프리미엄",
        src:
          "https://ad-img.ebaykorea.com/ADS/Contents_/2022_07_15_11_42_00/c8bd0aadd1b74f72.JPG",
      },
      {
        promotionName: "방구석 마트",
        src:
          "https://ad-img.ebaykorea.com/ADS/Contents_/2022_07_15_11_55_12/6b6b1b2885b149af.JPG",
      },
      {
        promotionName: "생필품워크",
        src:
          "https://ad-img.ebaykorea.com/ADS/Contents_/2022_07_15_03_56_07/02e8c0e4d5404977.JPG",
      },
      {
        promotionName: "그랜드 세일",
        src:
          "https://ad-img.ebaykorea.com/ADS/Contents_/2022_07_14_11_43_58/1e5c00efa7e446ca.JPG",
      },
    ];

    const mockItme = {
      src:
        "http://image.iacstatic.co.kr/allkill/item/2022/07/20220720100107421r.jpg",
      title: "휠라 퐁 쏭 4종 택1",
      price: "29000",
      sale: 30,
      itemId: 4,
    };
    const mockItme2 = {
      src:
        "http://image.iacstatic.co.kr/allkill/item/2022/07/20220720095501441r.jpg",
      title: "[10%+12%]패션라인신상원피스/팬츠",
      price: "43000",
      sale: 70,
      itemId: 6,
    };

    const productItems = [mockItme, mockItme2, mockItme, mockItme2];

    onMounted(() => {
      swiperControl = $setSwiper(swiper.swiper, {
        loop: true,
        allowTouchMove: false,

        navigation: {
          nextEl: swiper.nextEl,
          prevEl: swiper.prevEl,
        },
        modules: [Navigation],
      });

      swiperControl.on("slideChange", () => {
        bannerActiveIndex.value = swiperControl.realIndex;
      });
    });

    const moveSlideByIndex = (index: number) => {
      swiperControl.slideTo(index + 1, 1000);
    };

    return {
      ...toRefs(swiper),
      bannerActiveIndex,
      moveSlideByIndex,
      swiperItems,
      productItems,
      formatToWon,
    };
  },
});
</script>

<style lang="scss">
.warp-items {
  * {
    padding: 0 0.4rem;
  }
  * ~ * {
    position: relative;
    &::after {
      display: block;
      content: "";
      position: absolute;
      left: 0;
      top: 15%;
      width: 1px;
      height: 70%;
      background-color: rgba(191, 191, 191, 0.8);
    }
  }
}

.hover-arrow-event {
  .arrow-wrap {
    .up {
      display: none;
    }
    .down {
      display: inline-block;
    }
  }
  &:hover {
    .arrow-wrap {
      .up {
        display: inline-block;
      }
      .down {
        display: none;
      }
    }
  }
}

.category-warp {
  li ~ li {
    border-top: 1px solid rgba(#d5d5d5, $alpha: 0.5);
  }
  li {
    padding: 0.5rem 0.5rem;
  }
}

.img-sprite {
  background: url(http://pics.auction.co.kr/pc/common/header/header.png)
    no-repeat 0 0;
}

.img-biz-plus {
  @extend .img-sprite;
  background-position: -0px -700px;

  &:hover {
    background-position: -153px -700px;
  }
}
.img-pet-plus {
  @extend .img-sprite;
  background-position: -76px -700px;
  &:hover {
    background-position: -229px -700px;
  }
}

// swiper
.swiper-button-prev::after,
.swiper-button-next::after {
  display: none;
}
.swiper-prev {
  background: url(http://pics.auction.co.kr/pc/hp/new_homepage.png) no-repeat -797px -256px;
}
.swiper-next {
  background: url(http://pics.auction.co.kr/pc/hp/new_homepage.png) no-repeat -835px -258px;
}

.banner-pagination {
  div {
    padding: 0 1rem;
  }
  div ~ div {
    position: relative;
    &::before {
      display: block;
      content: "";
      position: absolute;
      left: 0;
      top: 25%;
      width: 1px;
      height: 0.5rem;
      background-color: black;
    }
  }
}
</style>
