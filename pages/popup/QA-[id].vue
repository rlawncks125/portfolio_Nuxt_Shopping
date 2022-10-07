<template>
  <div class="p-2 px-[1rem] grid gap-4">
    <p>
      {{ useRoute().params }}
    </p>

    <div class="flex flex-col">
      <label for="QA-type">유형 </label>
      <select id="QA-type">
        <option value="">s</option>
        <option value="w">w</option>
        <option value="e">e</option>
        <option value="r">r</option>
      </select>
    </div>
    <div class="flex flex-col">
      <label for="QA-title">제목</label>
      <input type="text" name="" id="QA-title" />
    </div>
    <div class="flex flex-col">
      <label for="QA-text">문의 내용</label>
      <textarea ref="textareaRef" @input="textareaAutoHieght" id="QA-text" />
    </div>

    <button @click="onAddQA" class="border p-[1.5rem]">문의 등록</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "no-header",
});

const textareaRef = useState<HTMLElement>("textareaRef");

const textareaAutoHieght = (e) => {
  textareaRef.value.style.height = "auto";

  const scrollHeight = textareaRef.value.scrollHeight + 4;
  textareaRef.value.style.height = scrollHeight + "px";
};

const onAddQA = () => {
  // console.log(input, starNumber.value);
  // 문의 등록
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
