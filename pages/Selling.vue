<template>
  <div>
    <h1>
      아이템 판매하기
    </h1>
    <div class="px-6 mt-4">
      <ToastUi ref="toastUiRef" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ToastUi } from "~~/.nuxt/components";
import { deleteImageUrl } from "@/api/file";
import { onBeforeRouteLeave } from "vue-router";

// thumbnailSrc: string;
// detailHtml: string;
// title: string;
// price: string;
// sale: number;

definePageMeta({
  layout: "login-required",
});

export default defineComponent({
  setup() {
    const toastUiRef = useState<InstanceType<typeof ToastUi>>("toastUiRef");

    onBeforeRouteLeave(async (to, form, next) => {
      console.log("라우트 이동 감지");

      const isLeave = confirm(
        "페이지 작성 중입니다 .정말로 이페이지를 나가실건가요?"
      );
      if (!isLeave) {
        next(false);
        return;
      }

      const deleteImages = toastUiRef.value.uploadImageUrlLists() as string[];
      console.log(deleteImages);
      // 작성중에 포함된 이미지 삭제
      let deletePromiseAll = [];
      deleteImages.forEach((v) => {
        deletePromiseAll.push(deleteImageUrl(v));
      });
      if (deletePromiseAll.length > 0) {
        await Promise.all(deletePromiseAll);
      }

      next();
    });
    return { toastUiRef };
  },
});
</script>

<style scoped></style>
