<template>
  <div class="p-2 px-[1rem] grid gap-4">
    <h2 class="text-[2rem] font-bold">문의 하기</h2>

    <div class="flex flex-col">
      <label for="QA-type">유형 </label>
      <select id="QA-type" v-model="input.type">
        <option value="" class="hidden" disabled>유형을 선택하세요</option>
        <option
          v-for="qaType in Object.values(QAtype).splice(0, 5)"
          :value="qaType"
          >{{ qaType }}</option
        >
      </select>
    </div>
    <div class="flex flex-col">
      <label for="QA-title">제목</label>
      <input type="text" name="" id="QA-title" v-model="input.title" />
    </div>
    <div class="flex flex-col">
      <label for="QA-text">문의 내용</label>
      <textarea
        ref="textareaRef"
        @input="textareaAutoHieght"
        id="QA-text"
        v-model="input.text"
      />
    </div>

    <button @click="onAddQA" class="border p-[1.5rem]">문의 등록</button>
  </div>
</template>

<script setup lang="ts">
import { ShopitemService } from "~~/api/swagger";
import { useLoading } from "~~/sotre/loading";

definePageMeta({
  layout: "no-header",
});

enum QAtype {
  "환불 요청",
  "주문 취소",
  "오배송",
  "상품 파손",
  "상품 정보 상이",
}

const input = reactive({
  type: "",
  title: "",
  text: "",
});
const textareaRef = useState<HTMLElement>("textareaRef");

const textareaAutoHieght = (e: any) => {
  textareaRef.value.style.height = "auto";

  const scrollHeight = textareaRef.value.scrollHeight + 4;
  textareaRef.value.style.height = scrollHeight + "px";
};

const onAddQA = async () => {
  // 문의 등록

  useLoading().on();
  const { ok } = await ShopitemService.shopItemControllerAddQa({
    body: {
      itemId: +useRoute().params.id,
      text: input.text,
      title: input.title,
      type: input.type,
    },
  });
  useLoading().off();

  if (!ok) {
    alert("잘못된 접근입니다.");
    window.close();
    return;
  }

  window.opener.postMessage(
    {
      type: "add-QA",
      data: {
        ok: true,
      },
    },
    "*"
  );
  window.close();
};
</script>

<style scoped lang="scss">
input,
select,
textarea {
  @apply border p-1;
}
</style>
