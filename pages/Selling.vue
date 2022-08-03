<template>
  <div>
    <h1>
      아이템 판매하기
    </h1>
    <button @click="$router.push('/')">go Home</button>
    <button @click="isRegistered = true">등록하기</button>
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
    const isRegistered = ref<boolean>(false);

    onBeforeRouteLeave(async (to, form, next) => {
      console.log("라우트 이동 감지");

      // 판매 등록을 했을시
      if (isRegistered.value) {
        next();
        return;
      }

      const isLeave = confirm(
        "변경사항이 저장되지 않습니다. 정말로 페이지를 나가실건가요?"
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

    

    return { toastUiRef, isRegistered };
  },
});
</script>

<style scoped></style>
