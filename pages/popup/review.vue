<template>
  <div class="p-4">
    <h2 class="text-[2rem] font-bold">
      리뷰 작성하기
    </h2>
    <star-dynamic
      :star-num="5"
      :star-size="3"
      :fill="3"
      @change-star="changeStar"
    />
    <div class="flex flex-col">
      <label for="pop-review-title">제목</label>
      <input
        class="border "
        type="text"
        id="pop-review-title"
        v-model="input.title"
      />
    </div>
    <div class="flex flex-col">
      <label for="pop-review-text">내용</label>
      <textarea
        ref="textareaRef"
        @input="textareaAutoHieght"
        class="border "
        id="pop-review-text"
        v-model="input.text"
      />
    </div>

    <button @click="onAddReview" class="border p-2 bg-violet-500 text-white">
      리뷰달기
    </button>
  </div>
</template>

<script setup lang="ts">
import { AddReviewInputDto } from "~~/api/swagger";

definePageMeta({
  layout: "no-header",
});

const textareaRef = useState<HTMLElement>("textareaRef");

const textareaAutoHieght = (e: any) => {
  textareaRef.value.style.height = "auto";

  const scrollHeight = textareaRef.value.scrollHeight + 4;
  textareaRef.value.style.height = scrollHeight + "px";
};

const input = reactive({
  text: "",
  title: "",
});

const starNumber = useState<number>("review-star", () => 0);

const changeStar = (star: number) => {
  starNumber.value = star;

  console.log(starNumber.value);
};

const onAddReview = () => {
  // console.log(input, starNumber.value);
  window.opener.postMessage(
    {
      type: "addReview",
      data: {
        star: starNumber.value,
        text: input.text,
        title: input.title,
      } as AddReviewInputDto,
    },
    "*"
  );
  window.close();
};
</script>

<style scoped></style>
