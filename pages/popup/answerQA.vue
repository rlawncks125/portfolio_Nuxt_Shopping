<template>
  <div class="my-[1rem]">
    <div class="flex flex-col px-4 gap-4">
      <h2 class="text-[2rem] font-bold">답변 하기</h2>
      <textarea ref="answer" class="border " @input="textareaAutoHieght" />

      <button
        @click="onAnswerQA"
        class="border w-[10rem] p-4 bg-blue-400 cursor-pointer"
      >
        답변 달기
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "no-header",
});

const answer = useState<HTMLTextAreaElement>("answerQA");

const textareaAutoHieght = (e) => {
  answer.value.style.height = "auto";

  const scrollHeight = answer.value.scrollHeight + 4;
  answer.value.style.height = scrollHeight + "px";
};

const onAnswerQA = () => {
  // console.log(input, starNumber.value);
  window.opener.postMessage(
    {
      type: "answer-QA",
      data: {
        answer: answer.value.value,
      },
    },
    "*"
  );
  window.close();
};
</script>

<style scoped></style>
