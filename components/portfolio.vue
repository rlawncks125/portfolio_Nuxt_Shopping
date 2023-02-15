<template>
  <h2 class="text-center font-bold text-[2rem] my-8">포트폴리오 소개</h2>
  <!-- 비디오 -->
  <div class="flex flex-col-reverse md:flex-row md:justify-between gap-2 px-2">
    <!-- 타임라인 -->
    <div class="w-full md:w-[35vw] flex-initial px-2">
      <h2 class="text-center text-[1.5rem] font-bold">타임라인</h2>

      <ol class="border-l border-gray-300">
        <li v-for="(item, index) in videoTimeLine" :key="index">
          <div class="flex flex-start items-center pt-3">
            <div class="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
            <p
              class="text-gray-500 text-sm cursor-pointer"
              @click="setVideoTime(item.time)"
            >
              {{ item.time }}
            </p>
          </div>
          <div class="mt-0.5 ml-4 mb-6">
            <h4 class="text-gray-800 font-semibold text-xl mb-1.5">
              {{ item.title }}
            </h4>
            <template v-if="item.contents.length > 0">
              <p
                class="text-gray-500 mb-3"
                v-for="(content, ci) in item.contents"
                :key="ci"
              >
                {{ content }}
              </p>
            </template>
          </div>
        </li>
      </ol>
    </div>
    <div class="flex-1">
      <video class="w-full px-2" ref="videoRef" controls>
        <source
          src="https://res.cloudinary.com/dhdq4v4ar/video/upload/v1676287371/nuxt-shop_lkx3qp.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TimeLineData {
  time: string;
  title: string;
  contents: string[];
}

const videoRef = ref<HTMLVideoElement>();

const setVideoTime = (time: string) => {
  const [min, sec] = time.split(":");
  const moveTime = +min * 60 + +sec;
  videoRef.value!.currentTime = moveTime;
  videoRef.value?.scrollIntoView({ behavior: "smooth" });
  // videoRef.value!.autoplay = true;
};

const videoTimeLine: TimeLineData[] = [
  {
    time: "0:00",
    title: "회원가입",
    contents: ["- 고객 , 판매자 회원가입"],
  },
  {
    time: "0:40",
    title: "로그인",
    contents: ["- 봇 방지를 위한 reCAPTCHA를 사용했습니다."],
  },
  {
    time: "0:52",
    title: "물품 등록",
    contents: [
      "- 라우터 가드 기능을 넣어 페이지 이탈시 확인할수 있게하였습니다.",
      "- 상세설명 form은 toastui 라이브러리를 이용하였습니다.",
    ],
  },
  {
    time: "2:10",
    title: "물품 정보 변경",
    contents: [""],
  },
  {
    time: "2:31",
    title: "검색",
    contents: [""],
  },
  {
    time: "2:40",
    title: "장바구니 , 결제 , 구매 내역",
    contents: [
      "- 포트원(아임포트) 결제 모듈을 사용하여 결제환경을 구축하였습니다.",
    ],
  },
  {
    time: "3:43",
    title: "배송 상태 변경",
    contents: [
      "- Notification 활용하여 배송상태 변경을 알람으로 알수있습니다.",
    ],
  },
  {
    time: "4:12",
    title: "구매후기",
    contents: [""],
  },
  {
    time: "4:37",
    title: "문의",
    contents: [""],
  },
  {
    time: "5:26",
    title: "비밀번호 찾기",
    contents: [
      "nodeMailer 라이브러리를 활용한 임시 비밀번호를 메일로 받습니다.",
    ],
  },
  {
    time: "6:12",
    title: "OG META",
    contents: [
      "Open Graph태그를 이용하여 SNS,블로그 등 콘텐츠를 보여줄수있게 했습니다.",
    ],
  },
];
</script>

<style scoped></style>
