<template>
  <div class="sticky top-0 bg-white z-10">
    <input
      class="hidden"
      type="checkbox"
      name=""
      id="home-toggle"
      v-model="isToggle"
    />

    <!-- 네비 아이템 -->
    <nav class="width-container hidden sm:block my-1 px-1 text-[0.8rem]">
      <ul class="warp-items flex justify-end">
        <li>
          <button v-if="isToken" @click="userLogOut">
            로그아웃
          </button>
          <NuxtLink v-else to="/login">로그인</NuxtLink>
        </li>
        <li v-if="!isToken">
          <NuxtLink to="/join"> 회원가입 </NuxtLink>
        </li>
        <template
          v-if="userInfo && userInfo.role === EnumUserInfoRole.customer"
        >
          <li>
            <NuxtLink to="/basket"> 장바구니 </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/orderDelivery">주문배송</NuxtLink>
          </li>
        </template>
        <template v-if="userInfo && userInfo.role === EnumUserInfoRole.company">
          <li>
            <NuxtLink to="/soldItems">판매한 아이템</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/registeredItem">등록한 아이템</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/selling">판매하기</NuxtLink>
          </li>
        </template>

        <li>
          <NuxtLink to="/mypage">내정보</NuxtLink>
        </li>
        <li>
          <SbuscriptionNotification />
        </li>
      </ul>
    </nav>

    <!-- 검색 -->
    <section id="search" class="relative my-2 px-2">
      <div class="width-container h-[5rem] flex items-center gap-[.5rem]">
        <NuxtLink to="/" class="flex-none h-full">
          <NuxtImg
            class="h-full object-cover "
            src="https://res.cloudinary.com/dhdq4v4ar/image/upload/v1661371113/transparent-bg_-no-shadow-designify_wst7my.webp"
            alt="로고 이미지"
            width="165 md:124"
            height="80 md:60"
          />
        </NuxtLink>

        <!-- 서치바 -->
        <form
          class="flex-auto max-w-[30rem] border  rounded-full p-[0.7rem] px-5  flex justify-between text-sm"
          :style="{ borderColor: '#D8D1CF' }"
          @submit.prevent="$router.push(`/search?title=${searchTitle}`)"
        >
          <input
            class="outline-none w-full"
            type="text"
            name=""
            id=""
            v-model="searchTitle"
          />
          <button>
            <FaIcon
              icon="magnifying-glass"
              size="2x"
              class=" cursor-pointer"
              :style="{ color: '#D8D1CF' }"
            />
          </button>
        </form>
      </div>
      <!-- 광고 블럭 -->
      <!-- <div
        class=" w-[13rem] h-[5rem] hidden lg:block absolute top-0 right-4 border"
      >
        
        <Adsense :width="10" :height="5" :ad-slot="9305972397" />
      </div> -->
    </section>

    <!-- 카테고리  -->
    <section
      id="category"
      class="border-t font-bold text-[1rem] hidden sm:block "
    >
      <div class="relative" @mouseleave="hoverCategoryIndex = null">
        <div class="category-bg z-[101] "></div>
        <div>
          <ul class="flex gap-2 justify-center  ">
            <li
              class="my-[1rem] text-center relative min-w-[4rem] "
              v-for="(category, index) in categoryLists"
              :key="index"
              @mouseenter="hoverCategoryIndex = index"
            >
              <!-- 카테고리 -->
              <NuxtLink :to="category.link">{{ category.name }}</NuxtLink>
              <div
                class="absolute z-[102] text-center left-0 overflow-hidden w-full flex flex-col gap-[.5rem] "
                :class="hoverCategoryIndex === index ? 'h-[8rem]' : 'h-0'"
                :style="{ top: 'calc(100% + 1rem)' }"
              >
                <!-- 상세 카테고리 -->
                <NuxtLink
                  v-for="sub in category.subLists"
                  :to="sub.link"
                  class="hover:text-red-300"
                >
                  {{ sub.name }}
                </NuxtLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 모바일 하단 -->
    <div
      class="sm:hidden z-[1000] fixed bottom-0 left-0 right-0 p-[1rem] border bg-blue-300"
    >
      <label for="home-toggle" class="cursor-pointer">
        <FaIcon icon="bars" size="2x" />
      </label>
    </div>

    <!-- toggle 콘텐츠 -->
    <div class="toggle-content text-[1.5rem]">
      <div
        class="relative ml-[10vw] mt-[2vh] h-[calc(100vh-2vh)] bg-white overflow-auto border-blue-400 rounded-tl-[2rem]  "
      >
        <!-- 헤더 -->
        <div class="bg-blue-400 p-[1rem] sticky right-0 top-0  ">
          <label
            class="text-[2rem] float-right text-white cursor-pointer"
            for="home-toggle"
          >
            <FaIcon icon="xmark" size="lg" />
          </label>
          <div class="clear-both text-white ">
            <div>
              <FaIcon icon="bacon" size="lg" class="mr-[1rem]" />

              <NuxtLink
                v-if="userInfo"
                class="hover:text-blue-500"
                to="/mypage"
                @click="isToggle = false"
              >
                <span>
                  {{ userInfo.nickName }}
                  <span class="text-white">
                    님 환영합니다.
                  </span>
                </span>
              </NuxtLink>
              <NuxtLink v-else to="/login" @click="isToggle = false">
                로그인 해주세요
              </NuxtLink>
            </div>
            <div class="flex justify-end gap-1 py-4">
              <!-- <p>
                내정보를 볼수있습니다. 내정보를 볼수있습니다.
              </p> -->
              <div
                class="text-[1.2rem] text-center w-[7rem] h-[3rem] border rounded-md p-[0.4rem] flex-none cursor-pointer hover:bg-blue-600"
              >
                <div v-if="userInfo" @click="userLogOut">로그 아웃</div>
                <NuxtLink v-else @click="isToggle = false" to="/join"
                  >회원 가입
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="flex justify-end text-[1.5rem]">
            <SbuscriptionNotification class="gap-2" />
          </div>
        </div>
        <!-- 네비 아이템 -->
        <div
          class="flex gap-[3rem] justify-center text-[1.2rem] py-[1rem] border-b text-center flex-wrap"
        >
          <template
            v-if="userInfo && userInfo.role === EnumUserInfoRole.customer"
          >
            <NuxtLink to="/basket" @click="isToggle = false">
              <FaIcon
                class="border p-[1rem] rounded-full"
                icon="magnifying-glass"
                size="3x"
              />
              <p>장바구니</p>
            </NuxtLink>

            <NuxtLink to="/orderDelivery" @click="isToggle = false">
              <FaIcon
                class="border p-[1rem] rounded-full"
                icon="magnifying-glass"
                size="3x"
              />
              <p>주문배송</p>
            </NuxtLink>
          </template>
          <template
            v-if="userInfo && userInfo.role === EnumUserInfoRole.company"
          >
            <NuxtLink to="/soldItems" @click="isToggle = false">
              <FaIcon
                class="border p-[1rem] rounded-full"
                icon="bars"
                size="3x"
              />

              <p>판매한 아이템</p>
            </NuxtLink>
            <NuxtLink to="/registeredItem" @click="isToggle = false">
              <FaIcon
                class="border p-[1rem] rounded-full"
                icon="magnifying-glass"
                size="3x"
              />

              <p>등록한 아이템</p>
            </NuxtLink>
            <NuxtLink to="/selling" @click="isToggle = false">
              <FaIcon
                class="border p-[1rem] rounded-full"
                icon="plus"
                size="3x"
              />

              <p>판매하기</p>
            </NuxtLink>
          </template>

          <NuxtLink to="/mypage" @click="isToggle = false">
            <FaIcon
              class="border p-[1rem] rounded-full"
              icon="exclamation"
              size="3x"
            />

            <p>내정보</p>
          </NuxtLink>
        </div>
        <!-- 카테고리 -->
        <div class="flex">
          <div class="border-r">
            <ul class="flex flex-col  justify-center">
              <li
                class="border-b p-[1rem] cursor-pointer"
                :class="visitCategoryIndex === index ? 'bg-gray-200' : ''"
                v-for="(category, index) in categoryLists"
                :key="index"
              >
                <div @click="onChangeCategory(index)">
                  {{ category.name }}
                </div>
              </li>
            </ul>
          </div>
          <!-- 상세 카테고리 -->
          <div class="flex-1 ">
            <ul class="mx-[1rem] flex flex-col">
              <li
                v-if="
                  visitCategoryIndex !== null &&
                    categoryLists[visitCategoryIndex]
                "
                class="border-b p-[1rem] cursor-pointer"
                v-for="subCategory in categoryLists[visitCategoryIndex]
                  .subLists"
              >
                <NuxtLink :to="subCategory.link" @click="isToggle = false">
                  {{ subCategory.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { EnumUserInfoRole } from "~~/api/swagger";
import { useUser } from "~~/sotre/user";

const { userToken: isToken, userInfo, sellerInfo } = storeToRefs(useUser());
const { userLogOut } = useUser();

const searchTitle = useState("searchTitle");

const isToggle = useState<boolean>("home-toggle");

const visitCategoryIndex = useState<number | null>(
  "visitCategoryIndex",
  () => null
);
const onChangeCategory = (index: number) => {
  visitCategoryIndex.value = index;
};

const hoverCategoryIndex = useState<number | null>(
  "hoverCategoryIndex",
  () => null
);

const categoryLists = [
  {
    name: "브랜드 패션",
    link: "/search?category=Brand",
    subLists: [
      {
        name: "브랜드1",
        link: "/search?category=Brand",
      },
      {
        name: "브랜드2",
        link: "/search?category=Brand",
      },
    ],
  },
  {
    name: "뷰티",
    link: "/search?category=Beauty",
    subLists: [
      {
        name: "뷰티1",
        link: "/search?category=Beauty",
      },
    ],
  },
  {
    name: "의류",
    link: "/search?category=Clothing",
    subLists: [
      {
        name: "의류1",
        link: "/search?category=Clothing",
      },
    ],
  },
  {
    name: "식품",
    link: "/search?category=Food",
    subLists: [
      {
        name: "식품",
        link: "/search?category=Food",
      },
    ],
  },
  {
    name: "유아",
    link: "/search?category=infant",
    subLists: [
      {
        name: "유아",
        link: "/search?category=infant",
      },
    ],
  },
  {
    name: "가구",
    link: "/search?category=Furniture",
    subLists: [
      {
        name: "가구",
        link: "/search?category=Furniture",
      },
    ],
  },
  {
    name: "생활",
    link: "/search?category=Life",
    subLists: [
      {
        name: "생활",
        link: "/search?category=Life",
      },
    ],
  },
  {
    name: "스포츠",
    link: "/search?category=Sports",
    subLists: [
      {
        name: "스포츠",
        link: "/search?category=Sports",
      },
    ],
  },
  {
    name: "특가",
    link: "/search?category=specialPrice",
    subLists: [
      {
        name: "특가",
        link: "/search?category=specialPrice",
      },
    ],
  },
  {
    name: "쿠폰",
    link: "/search?category=Coupon",
    subLists: [
      {
        name: "쿠폰",
        link: "/search?category=Coupon",
      },
    ],
  },
  {
    name: "이벤트/기획전",
    link: "/search?category=Event",
    subLists: [
      {
        name: "이벤트/기획전",
        link: "/search?category=Event",
      },
    ],
  },
];
</script>

<style scoped lang="scss">
#home-toggle {
  & ~ .toggle-content {
    @apply z-[101] fixed inset-0 bg-black;
    @apply translate-x-[100%] bg-opacity-0;
    max-width: 0;
    transition: transform 0.4s, background-color 0.2s 0.4s;
  }
}

#home-toggle:checked {
  & ~ .toggle-content {
    @apply block;
    @apply translate-x-0 bg-opacity-40;
    max-width: 100%;
  }
}
#category {
  .category-bg {
    @apply absolute left-0 top-[100%] text-black bg-white w-full  h-0 border-b;
    transition: height 0.2s;
  }

  &:hover {
    .category-bg {
      @apply text-red-300 h-[10rem];
    }
  }
}
</style>
