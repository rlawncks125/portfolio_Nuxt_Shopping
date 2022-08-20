<template>
  <div>
    <h1>
      아이템 판매하기
    </h1>
    <button @click="$router.push('/')">go Home</button>
    <!-- 판매자 등록 -->
    <section v-if="!sellerInfo">
      <SellerRegister />
    </section>
    <!-- 아이템 등록 -->
    <section v-else class="text-[1.6rem]">
      <!-- <button @click="isRegistered = true">변경사항 저장 하기</button> -->
      <div>
        <div>
          <label for="input-title">제목 : </label>
          <input
            type="text"
            name=""
            id="input-title"
            v-model="inputData.title"
          />
        </div>
        <div>
          <label for="input-price">가격 : </label>
          <input
            type="number"
            name=""
            id="input-price"
            v-model="inputData.price"
          />
        </div>
        <div>
          <label for="input-parcel">배송비 : </label>
          <input
            type="number"
            name=""
            id="input-parcel"
            v-model="inputData.parcel"
          />
        </div>
        <div>
          <label for="input-free-parcel">IF 무료 배송비 조건 : </label>
          <input
            type="number"
            name=""
            id="input-free-parcel"
            v-model="inputData.freeParcel"
          />
          <span>이상</span>
        </div>
        <div>
          <label for="input-origin">원산지 : </label>
          <input
            type="text"
            name=""
            id="input-origin"
            v-model="inputData.origin"
          />
        </div>

        <!-- 썸네임 -->
        <div class="flex gap-2 h-[10rem]">
          <div>
            <label for="input-thumbnail">썸네일 추가</label>
            <input
              @change.prevent="onChangeThumbnail"
              class="w-0 h-0 border-0"
              type="file"
              name=""
              id="input-thumbnail"
            />
          </div>
          <!-- 이미지 랜더 -->
          <div class=" border ml-2">
            <img
              v-if="thumbnailFile.data"
              class="h-full"
              :src="thumbnailFile.data"
              alt=""
            />
            <div v-else>이미지 중비중입니다 img 주소...</div>
          </div>
        </div>
      </div>

      <p>옵션 추가</p>
      <div>
        <div class="flex gap-2 text-center">
          <div class="flex flex-col">
            <label for="option-name">옵션 명</label>
            <input
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
                type="number"
                name=""
                id="option-price"
                v-model="inputData.optionPrice"
              />
            </div>
          </div>
          <button class="self-end" @click="onAddOption">옵션 추가</button>
        </div>
        <div v-if="options && options.length > 0">
          <div v-for="(option, index) in options">
            <span>{{ option.name }} - {{ option.price }}</span>
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

      <div class="px-6 mt-4">
        <ToastUi ref="toastUiRef" />
      </div>
      <button @click="onAddItem" class="block text-[2rem]">
        판매 등록하기
      </button>
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

import { AddShopItemInputDto } from "~~/api/swagger";
import { addShopItem } from "@/api/item";

import { getImageURLByFormData } from "@/api/file";

definePageMeta({
  layout: "login-required",
});

export default defineComponent({
  setup() {
    const toastUiRef = useState<InstanceType<typeof ToastUi>>("toastUiRef");
    const isRegistered = ref<boolean>(false);
    const { sellerInfo, userInfo } = storeToRefs(useUser());

    const inputData = reactive({
      title: "",
      price: 0,
      parcel: 0,
      freeParcel: 0,
      origin: "",
      optionName: "",
      optionPrice: 0,
    });

    const thumbnailFile = ref<{ file: File; data: any }>({
      file: null,
      data: null,
    });

    const options = ref<
      {
        name: string;
        price: number;
      }[]
    >([]);

    const onAddOption = () => {
      if (inputData.optionName === "" || inputData.optionPrice === 0) return;

      options.value.push({
        name: inputData.optionName,
        price: +inputData.optionPrice,
      });

      inputData.optionName = "";
      inputData.optionPrice = 0;
    };

    const onChangeThumbnail = (e: any) => {
      const file = (e.target as HTMLInputElement).files[0];

      if (file.type.split("/")[0] !== "image") return;

      thumbnailFile.value.file = file;
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          thumbnailFile.value.data = reader.result;
        }
      };
      reader.readAsDataURL(file);
    };

    const onAddItem = async () => {
      // const inputDto = {
      //   title: "[10%+12%]패션라인신상원피스/팬츠",
      //   price: 43000,
      //   sale: 70,
      //   thumbnailSrc:
      //     "http://image.iacstatic.co.kr/allkill/item/2022/07/20220720100107421r.jpg",
      //   detailHtml: toastUiRef.value.getHTML(),
      //   options: [
      //     {
      //       name: "옵션1",
      //       price: 2000,
      //     },
      //     {
      //       name: "옵션2",
      //       price: 3000,
      //     },
      //     {
      //       name: "옵션3",
      //       price: 4000,
      //     },
      //   ],
      //   parcel: 2500,
      //   freeParcel: 40000,
      //   origin: "상세페이지 참조",
      // } as AddShopItemInputDto;

      const thumbnailSrc = await getImageURLByFormData(
        thumbnailFile.value.file
      );

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

      alert("아이템이 등록되었습니다.");
      isRegistered.value = true;
      useRouter().push("/");
    };

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
    return {
      toastUiRef,
      isRegistered,
      sellerInfo,
      onAddItem,
      inputData,
      options,
      onChangeThumbnail,
      thumbnailFile,
      onAddOption,
    };
  },
});
</script>

<style scoped></style>
