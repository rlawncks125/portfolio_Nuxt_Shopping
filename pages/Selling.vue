<template>
  <div>
    <h1>
      아이템 판매하기
    </h1>
    <button @click="$router.push('/')">go Home</button>
    <!-- 판매자 등록 -->
    <section v-if="!sellerInfo">
      <h1>판매자 등록이 필요합니다.</h1>
    </section>
    <!-- 아이템 등록 -->
    <section v-else>
      <button @click="isRegistered = true">등록하기</button>
      <div class="px-6 mt-4">
        <ToastUi ref="toastUiRef" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ToastUi } from "~~/.nuxt/components";
import { deleteImageUrl } from "@/api/file";
import { onBeforeRouteLeave } from "vue-router";
import { storeToRefs } from "pinia";
import { useUser } from "~~/sotre/user";
import { EnumUserInfoRole } from "~~/api/swagger";

definePageMeta({
  layout: "login-required",
});

export default defineComponent({
  setup() {
    const toastUiRef = useState<InstanceType<typeof ToastUi>>("toastUiRef");
    const isRegistered = ref<boolean>(false);
    const { sellerInfo, userInfo } = storeToRefs(useUser());

    onMounted(() => {
      // 판매자가 아닐시 홈페이지로 리다렉트
      if (userInfo.value.role !== EnumUserInfoRole.company) {
        alert("판매자가 아닙니다.");
        isRegistered.value = true;
        useRouter().push("/");
      }
    });

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

    return { toastUiRef, isRegistered, sellerInfo };
  },
});
</script>

<style scoped></style>
