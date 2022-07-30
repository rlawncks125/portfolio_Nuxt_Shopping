<template>
  <div>
    <!-- 네비 아이템 -->
    <nav class="width-container my-1">
      <ul class="warp-items flex justify-end">
        <li>
          <button v-if="isToken" @click="userLogOut">로그아웃</button>
          <NuxtLink v-else to="/login">로그인</NuxtLink>
        </li>
        <li>
          <a href="/join"> 회원가입 </a>
        </li>
        <li>
          <a href="/basket"> 장바구니 </a>
        </li>
        <li>
          <NuxtLink to="#">주문배송</NuxtLink>
        </li>
        <li>
          <NuxtLink to="#">내정보</NuxtLink>
        </li>
        <li>
          <NuxtLink to="#">고객센터</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/selling">판매하기</NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- 검색 -->
    <section id="serch" class="relative my-2">
      <div class="width-container h-[5rem] flex items-center">
        <a href="/" class="h-full">
          <img
            class="h-full object-cover"
            src="http://image.auction.co.kr/hanbando/202110/d337d318-1aeb-4902-abf7-e407d7f0d1a1.png"
            alt="배너 이미지"
          />
        </a>
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
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useUser } from "~~/sotre/user";

const { userToken: isToken } = storeToRefs(useUser());
const { userLogOut } = useUser();
</script>

<style scoped></style>
