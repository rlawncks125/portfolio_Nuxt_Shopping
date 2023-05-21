<template>
  <div class="max-w-container mx-auto px-4">
    <h1 class="text-[2rem] font-bold text-center mt-4">
      아이템 판매
    </h1>

    <!-- 판매자 등록 -->
    <section v-if="!sellerInfo">
      <SellerRegister />
    </section>
    <!-- 아이템 등록 -->
    <section v-else class="text-[1.6rem] ">
      <!-- <button @click="isRegistered = true">변경사항 저장 하기</button> -->
      <div class="form-stlye">
        <div>
          <label for="input-title">제목</label>
          <input
            class="input-base"
            type="text"
            name=""
            id="input-title"
            v-model="inputData.title"
          />
        </div>
        <div>
          <label for="input-price">가격 </label>
          <input
            class="input-base"
            type="number"
            name=""
            id="input-price"
            v-model="inputData.price"
          />
        </div>
        <div>
          <label for="input-parcel">배송비 </label>
          <input
            class="input-base"
            type="number"
            name=""
            id="input-parcel"
            v-model="inputData.parcel"
          />
        </div>
        <div>
          <label for="input-free-parcel"
            >IF 무료 배송비 조건 <span> (금액 이상)</span>
          </label>
          <input
            class="input-base"
            type="number"
            name=""
            id="input-free-parcel"
            v-model="inputData.freeParcel"
          />
        </div>
        <div>
          <label for="input-origin">원산지 </label>
          <input
            class="input-base"
            type="text"
            name=""
            id="input-origin"
            v-model="inputData.origin"
          />
        </div>

        <!-- 썸네임 -->
        <div>
          <p>상품 이미지</p>
          <FileUpload
            ref="fileUploadRef"
            class="w-[15rem] h-[12rem] sm:w-[20rem] sm:h-[16rem] mb-[4rem]"
          />
        </div>

        <!-- 옵션 추가 -->
        <p>옵션 추가</p>
        <div>
          <form
            @submit.prevent="onAddOption"
            class="flex flex-col mb:flex-row gap-2 text-center"
          >
            <div class="flex flex-col mb:flex-row gap-2">
              <div class="flex flex-col">
                <label for="option-name">옵션 명</label>
                <input
                  class="input-base"
                  type="text"
                  name=""
                  id="option-name"
                  v-model="inputData.optionName"
                />
              </div>
              <div>
                <div class="flex flex-col">
                  <label for="option-price">가격</label>
                  <input
                    class="input-base"
                    type="number"
                    name=""
                    id="option-price"
                    v-model="inputData.optionPrice"
                  />
                </div>
              </div>
            </div>
            <button class="mb:self-end flex-none !p-[.4rem]">
              옵션 추가
            </button>
          </form>
          <!-- 추가 옵션 랜더 -->
          <div v-if="options && options.length > 0">
            <div v-for="(option, index) in options">
              <span>{{ option.name }} - {{ formatToWon(option.price) }}</span>
              <button
                @click="
                  () => {
                    options = options.filter((v, findex) => findex !== index);
                  }
                "
                class="ml-2 bg-slate-500 px-3 rounded-full"
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="px-6 mt-4">
        <ToastUi ref="toastUiRef" />
      </div>

      <button
        @click="onAddItem"
        class="block text-[2rem] mx-6 !bg-green-500 float-right "
      >
        판매 등록하기
      </button>
      <div class="clear-both mb-4"></div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ToastUi } from "~~/.nuxt/components";
import { deleteImageUrl } from "@/api/file";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import { storeToRefs } from "pinia";
import { useUser } from "~~/sotre/user";
import { EnumUserInfoRole } from "~~/api/swagger";

import { AddShopItemInputDto } from "~~/api/swagger";
import { addShopItem } from "@/api/item";

import { formatToWon } from "~~/utils/format";
import FileUpload from "~~/components/file-upload.vue";
import { useLoading } from "~~/sotre/loading";

definePageMeta({
  layout: "login-required",
  middleware: ["scroll-top"],
});

export default defineComponent({
  setup() {
    const { sellerInfo, userInfo } = storeToRefs(useUser());
    const toastUiRef = useState<InstanceType<typeof ToastUi>>("toastUiRef");
    const fileUploadRef = useState<InstanceType<typeof FileUpload>>(
      "fileUploadRef"
    );

    const isRegistered = ref<boolean>(false);

    const inputData = reactive({
      title: "",
      price: 0,
      parcel: 0,
      freeParcel: 0,
      origin: "",
      optionName: "",
      optionPrice: 0,
    });

    const thumbnailFile = ref<{
      file: File | null;
      data: any;
    }>({
      file: null,
      data: null,
    });
    const options = ref<
      {
        name: string;
        price: number;
      }[]
    >([]);
    const onAddOption = (e: any) => {
      const formEl = e.target as HTMLElement;
      const optionName = formEl.querySelector("input");

      if (inputData.optionName === "" || inputData.optionPrice === 0) return;
      options.value.push({
        name: inputData.optionName,
        price: +inputData.optionPrice,
      });
      inputData.optionName = "";
      inputData.optionPrice = 0;
      optionName?.focus();
    };
    const onAddItem = async () => {
      useLoading().on();
      const thumbnailSrc = await fileUploadRef.value.onUpload();

      if (!thumbnailSrc) {
        useLoading().off();
        alert("상품 이미지를 등록하세요");
        return;
      }

      const inputDto = {
        title: inputData.title,
        price: +inputData.price,
        sale: 0,
        thumbnailSrc,
        detailHtml: toastUiRef.value.getHTML(),
        freeParcel: +inputData.freeParcel,
        options: toRaw(options.value),
        origin: inputData.origin,
        parcel: +inputData.parcel,
      } as AddShopItemInputDto;
      const { ok, item, err } = await addShopItem(inputDto);
      if (!ok) {
        alert(err);
        return;
      }
      useLoading().off();
      alert("아이템이 등록되었습니다.");
      isRegistered.value = true;
      useRouter().push("/");
    };

    const reFreshGuard = async (event: any) => {
      // F5 새로고침을 RouteLeave가 감지를 못해서
      // 키입력 반응을 이벤트를설정

      // F5
      if (event.keyCode == 116) {
        event.preventDefault();

        useRouter().push("/");
      }
    };

    onMounted(() => {
      // 판매자가 아닐시 홈페이지로 리다렉트
      if (userInfo.value!.role !== EnumUserInfoRole.company) {
        alert("판매자가 아닙니다.");
        isRegistered.value = true;
        useRouter().push("/");
      }

      window.addEventListener("keydown", reFreshGuard);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", reFreshGuard);
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
      let deletePromiseAll: any[] = [];
      deleteImages.forEach((v) => {
        deletePromiseAll.push(deleteImageUrl(v));
      });
      if (deletePromiseAll.length > 0) {
        useLoading().on();
        await Promise.all(deletePromiseAll);
        useLoading().off();
      }
      next();
    });
    return {
      toastUiRef,
      fileUploadRef,
      isRegistered,
      sellerInfo,
      onAddItem,
      inputData,
      options,
      // onChangeThumbnail,
      thumbnailFile,
      onAddOption,
      formatToWon,
    };
  },
});
</script>

<style scoped lang="scss">
.form-stlye {
  @apply mx-auto bg-white rounded px-8 pt-6 pb-8 mb-4;
}

label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
.input-base {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-red-400;
}

button {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2;
}
</style>
