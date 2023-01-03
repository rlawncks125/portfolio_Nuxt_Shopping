<template>
  <div>
    <LoadingBar :size="2" :is-show="false"></LoadingBar>

    <!-- 배너 -->
    <section
      id="category"
      class="border-t-2 border-black font-bold text-[0.76rem]"
    >
      <div class="width-container relative flex">
        <!-- 배너( 스와이프 ) -->
        <div ref="swiper" class="swiper flex-auto w-0">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <!-- Slides -->
            <div v-for="item in swiperItems" class="swiper-slide">
              <picture>
                <source media="(min-width : 640px)" :srcset="item.src" />
                <img class="w-full h-full" :src="item.mbSrc" alt="" />
              </picture>
            </div>
          </div>

          <!-- If we need navigation buttons -->
          <div ref="prevEl" class="swiper-button-prev swiper-prev"></div>
          <div ref="nextEl" class="swiper-button-next swiper-next"></div>

          <!-- pagination -->
          <div
            class="banner-pagination text-center absolute z-[10]  bottom-[1rem] left-[1rem] border p-[.5rem] px-[1.5rem] rounded-full bg-white"
          >
            <span>{{ bannerActiveIndex }} / {{ swiperItems.length }}</span>
          </div>
          <!-- <div
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
            </div>
          </div> -->
        </div>

        <!-- 왼쪽 광고 -->
        <div
          class="hidden xl:block absolute top-0 w-[12rem] left-[-12.5rem] border"
        >
          <Adsense :width="12" :height="30" :slot="5147197541" />
        </div>
        <!-- 오른쪽 광고 -->
        <div
          class="hidden xl:block absolute top-0 w-[12rem] right-[-12.5rem] border"
        >
          <Adsense :width="12" :height="30" :slot="5147197541" />
        </div>
      </div>
    </section>

    <!-- 추천 상품 1-->
    <section id="recommend1" class="width-container">
      <h2 class="text-center text-[3rem] my-[1rem]">추천 아이템</h2>
    </section>
    <!-- 추천 상품 2-->
    <section id="recommend2" class="width-container">
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[1.1rem]">
        <div
          class="border border-gray-200 cursor-pointer hover:border-gray-400"
          v-for="(item, index) in productItems"
          @click="() => useRouter().push(`/item/${item.id}`)"
          :key="index"
        >
          <DesignItemDesign :item="item" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Swiper, { Navigation } from "swiper";
import { defineComponent } from "vue";
import { formatToWon } from "@/common/format";
import { getItemById, searchItems } from "~~/api/item";
import { ShopItem, ShopitemService } from "~~/api/swagger";

export default defineComponent({
  setup() {
    // const swiperRef = ref();
    const { $setSwiper } = useNuxtApp();
    let swiperControl: Swiper;
    const bannerActiveIndex = ref(1);
    const swiper = reactive({
      swiper: null,
      nextEl: null,
      prevEl: null,
    });
    const swiperItems = [
      {
        src:
          "https://www.museum.go.kr/uploadfile/ecms/visual/650242.jpg?_=1661443337446",
        mbSrc:
          "https://www.museum.go.kr/uploadfile/ecms/visual/650242_m.jpg?_=1661443337446",
      },
      {
        src:
          "https://www.museum.go.kr/uploadfile/ecms/visual/773161.jpg?_=166144333744",
        mbSrc:
          "https://www.museum.go.kr/uploadfile/ecms/visual/773161_m.jpg?_=1661443337447",
      },
      {
        src:
          "https://www.museum.go.kr/uploadfile/ecms/visual/650047.jpg?_=1661443337447",
        mbSrc:
          "https://www.museum.go.kr/uploadfile/ecms/visual/650047_m.jpg?_=1661443337447",
      },
      {
        src:
          "https://www.museum.go.kr/uploadfile/ecms/visual/826493.png?_=1661443337447",
        mbSrc:
          "https://www.museum.go.kr/uploadfile/ecms/visual/826493_m.png?_=1661443337447",
      },
    ];

    const fakeItems = {
      thumbnailSrc:
        "https://res.cloudinary.com/dhdq4v4ar/image/upload/v1664593520/back-Portfolio/hihuwcqoqqjafvshekmq.jpg",
      title: "title",
      sale: 0,
      price: 0,
    } as ShopItem;

    const productItems = ref<ShopItem[]>([
      fakeItems,
      fakeItems,
      fakeItems,
      fakeItems,
    ]);
    onMounted(async () => {
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
        bannerActiveIndex.value = swiperControl.realIndex + 1;
      });

      // 아이템 불러오기
      // const { ok, items } = await searchItems({});
      const { ok, items } = await ShopitemService.shopItemControllerSearchItems(
        {
          title: "",
          take: 10,
          createTimeOrder: "ASC",
        }
      );

      if (ok) {
        productItems.value = items;
      }
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
  background: url(https://pics.auction.co.kr/pc/common/header/header.png)
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
  background: url(https://pics.auction.co.kr/pc/hp/new_homepage.png) no-repeat -797px -256px;
}
.swiper-next {
  background: url(https://pics.auction.co.kr/pc/hp/new_homepage.png) no-repeat -835px -258px;
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
