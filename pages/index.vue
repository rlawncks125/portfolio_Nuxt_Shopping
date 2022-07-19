<template>
  <div>
    <!-- 네비 아이템 -->
    <nav class="width-container my-1">
      <ul class="warp-items flex justify-end">
        <li>
          <a href="#"> 로그인 </a>
        </li>
        <li>
          <a href="#"> 회원가입 </a>
        </li>
        <li>
          <a href="#"> 장바구니 </a>
        </li>
        <li>
          <a href="#"> 주문배송 </a>
        </li>
        <li>
          <a href="#"> 내정보 </a>
        </li>
        <li>
          <a href="#"> 고객센터 </a>
        </li>
        <li>
          <a href="#"> 판매하기 </a>
        </li>
      </ul>
    </nav>

    <!-- 검색 -->
    <section id="serch" class="relative my-2">
      <div class="width-container h-[5rem] flex items-center">
        <img
          class="h-full object-cover"
          src="http://image.auction.co.kr/hanbando/202110/d337d318-1aeb-4902-abf7-e407d7f0d1a1.png"
          alt="배너 이미지"
        />
        <div
          class="w-[25rem] border-b-4 border-red-500 flex justify-between text-3xl"
        >
          <input class="outline-none" type="text" name="" id="" />
          <LazyFaIcon
            icon="magnifying-glass"
            size="sm"
            class="text-red-600 cursor-pointer"
          />
        </div>
      </div>
      <div class="absolute top-0 right-0 border w-[5rem] h-[5rem]">ad</div>
    </section>

    <!-- 포인트 & 혜택   -->
    <section id="point" class="border-t font-bold text-[0.8rem]">
      <!-- 서비스 -->
      <div class="width-container flex justify-between my-4">
        <!-- 배송 & 혜택 -->
        <div class="flex">
          <div class="pr-[2rem] cursor-pointer">
            <LazyFaIcon icon="align-justify" size="sm" />
            <span> 전체 카테고리 </span>
          </div>
          <ul class="warp-items flex">
            <li>
              <a href="#">쿠폰포인트</a>
            </li>
            <li>
              <a href="#">옥션베스트</a>
            </li>
            <li>
              <a href="#">스마일배송</a>
            </li>
            <li>
              <a href="#">스마일클럽</a>
            </li>
            <li>
              <a href="#">스마일클럽비즈</a>
            </li>
          </ul>
        </div>
        <!-- 서비스 & 최근 본 상품 -->
        <div class="flex gap-4">
          <div class="hover-arrow-event flex gap-1">
            <p>멤버십 서비스</p>
            <div class="arrow-wrap">
              <LazyFaIcon class="up" icon="angle-up" size="lg" />
              <LazyFaIcon class="down" icon="angle-down" size="lg" />
            </div>
          </div>
          <div class="hover-arrow-event flex gap-1">
            <p>최근 본 상품/코너</p>
            <div class="arrow-wrap">
              <LazyFaIcon class="up" icon="angle-up" size="lg" />
              <LazyFaIcon class="down" icon="angle-down" size="lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 카테고리 & 배너 -->

    <section
      id="category"
      class="border-t-2 border-black font-bold text-[0.76rem]"
    >
      <div class="width-container relative flex">
        <div class="w-[10rem]">
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
            class="absolute z-[10] banner-pagination bottom-[1rem] left-0 right-0 flex justify-between border py-2 mx-6 bg-white"
          >
            <div
              class="relative flex-auto cursor-pointer"
              :class="bannerActiveIndex === 0 ? 'text-red-600' : ''"
              @click="moveSlideByIndex(0)"
            >
              <p>스페셜 이벤트</p>
              <div class="absolute bottom-[1.7rem] left-0 border w-full">
                <p>팝업</p>
              </div>
            </div>
            <div
              class="relative flex-auto cursor-pointer"
              :class="bannerActiveIndex === 1 ? 'text-red-600' : ''"
              @click="moveSlideByIndex(1)"
            >
              <p>스마일 쇼핑</p>
              <div class="absolute bottom-[1.7rem] left-0 border w-full">
                <p>팝업</p>
              </div>
            </div>
            <div
              class="relative flex-auto cursor-pointer"
              :class="bannerActiveIndex === 2 ? 'text-red-600' : ''"
              @click="moveSlideByIndex(2)"
            >
              <p>마트 장보기</p>
              <div class="absolute bottom-[1.7rem] left-0 border w-full">
                팝업
              </div>
            </div>
            <div
              class="relative flex-auto cursor-pointer"
              :class="bannerActiveIndex === 3 ? 'text-red-600' : ''"
              @click="moveSlideByIndex(3)"
            >
              <p>인기 브랜드</p>
              <div class="absolute bottom-[1.7rem] left-0 border w-full">
                팝업
              </div>
            </div>
            <div
              class="relative flex-auto cursor-pointer"
              :class="bannerActiveIndex === 4 ? 'text-red-600' : ''"
              @click="moveSlideByIndex(4)"
            >
              <p>추천 라이프</p>
              <div class="absolute bottom-[1.7rem] left-0 border w-full">
                팝업
              </div>
            </div>

            <div>제휴 이벤트</div>
            <div>추천 이벤트</div>
          </div>
        </div>

        <!-- 왼쪽 광고 -->
        <div class="absolute top-0 w-[8rem] left-[-8.5rem] border">
          <p>왼쪽광고</p>
        </div>
        <!-- 오른쪽 광고 -->
        <div class="absolute top-0 w-[8rem] right-[-8.5rem] border">
          <p>오른쪽 광고</p>
        </div>
      </div>
    </section>

    <section id="AllKill" class="width-container">
      <div>ㅁㄴㅇㅁㅇ</div>
    </section>
  </div>
</template>

<script lang="ts">
import Swiper, { Navigation } from "swiper";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const swiper = reactive({
      swiper: null,
      nextEl: null,
      prevEl: null,
    });
    const swiperItems = [
      {
        src: "https://ad-img.ebaykorea.com/ADS/Contents_/2022_07_15_11_40_44/d7d179fa6c3c47d3.JPG",
      },
      {
        src: "https://ad-img.ebaykorea.com/ADS/Contents_/2022_07_15_11_42_00/c8bd0aadd1b74f72.JPG",
      },
      {
        src: "https://ad-img.ebaykorea.com/ADS/Contents_/2022_07_15_11_42_00/c8bd0aadd1b74f72.JPG",
      },
      {
        src: "https://ad-img.ebaykorea.com/ADS/Contents_/2022_07_15_03_56_07/02e8c0e4d5404977.JPG",
      },
      {
        src: "https://ad-img.ebaykorea.com/ADS/Contents_/2022_07_14_11_43_58/1e5c00efa7e446ca.JPG",
      },
    ];

    // const swiperRef = ref();
    const { $setSwiper } = useNuxtApp();
    let swiperControl: Swiper;
    const bannerActiveIndex = ref(0);

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
