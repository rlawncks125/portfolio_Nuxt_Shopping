<template>
  <!-- 아이템 등록 -->
  <section v-if="item" class="text-[1.6rem] ">
    <div class="form-stlye">
      <div>
        <label for="input-title">제목 </label>
        <input
          class="input-base"
          type="text"
          name=""
          id="input-title"
          v-model="item.title"
        />
      </div>
      <div>
        <label for="input-price">가격 </label>
        <input
          class="input-base"
          type="number"
          name=""
          id="input-price"
          v-model="item.price"
        />
      </div>
      <div>
        <label for="input-sale">할인(%) </label>
        <input
          class="input-base"
          type="number"
          name=""
          id="input-sales"
          v-model="item.sale"
        />
      </div>
      <div>
        <label for="input-parcel">배송비 </label>
        <input
          class="input-base"
          type="number"
          name=""
          id="input-parcel"
          v-model="item.parcel"
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
          v-model="item.freeParcel"
        />
      </div>
      <div>
        <label for="input-origin">원산지 </label>
        <input
          class="input-base"
          type="text"
          name=""
          id="input-origin"
          v-model="item.origin"
        />
      </div>

      <!-- 썸네임 -->
      <!-- <div>
        <p>상품 이미지</p>
        <FileUpload
          ref="fileUploadRef"
          class="w-[15rem] h-[12rem] sm:w-[20rem] sm:h-[16rem] mb-[4rem]"
        />
      </div> -->

      <!-- 옵션 추가 -->
      <div class="my-4">
        <p>옵션 추가</p>
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
                v-model="options.optionName"
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
                  v-model="options.optionPrice"
                />
              </div>
            </div>
          </div>
          <button class="mb:self-end flex-none !p-[.4rem]">
            옵션 추가
          </button>
        </form>
        <!-- 추가 옵션 랜더 -->
        <div v-if="item.options && item.options.length > 0">
          <div v-for="(option, index) in item.options">
            <span>{{ option.name }} - {{ formatToWon(option.price) }}</span>
            <button
              @click="
                () => {
                  item.options = item.options.filter(
                    (v, findex) => findex !== index
                  );
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

    <button
      class="block text-[2rem] mx-6 !bg-green-500 float-right "
      @click="updateItem"
    >
      적용 하기
    </button>
    <div class="clear-both mb-4"></div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getItemById } from "~~/api/item";
import { ShopItem, UpdateItemInputDto, UpdateItemOutPut } from "~~/api/swagger";
import { formatToWon } from "~~/common/format";
import { ApiServer } from "~~/plugins/api-server";
import { useUser } from "~~/sotre/user";

definePageMeta({
  layout: "no-header",
});

useHead({
  title: "아이템 정보 변경",
});

const route = useRoute();
const item = useState<ShopItem>("itemInfo");
const { sellerInfo } = storeToRefs(useUser());
const options = useState("", () => ({ optionName: "", optionPrice: 0 }));

const updateItem = async () => {
  const {
    title,
    price,
    sale,
    parcel,
    freeParcel,
    options,
    origin,
  } = item.value;

  const { ok, item: newItem } = await ApiServer.axios
    .patch(`/shop-item/${+route.params.id}`, {
      title,
      price,
      sale,
      parcel,
      freeParcel,
      options,
      origin,
    } as UpdateItemInputDto)
    .then((res) => res.data as UpdateItemOutPut);

  console.log(ok, newItem);

  if (ok) {
    window.opener.postMessage(
      {
        type: "updateItem",
        data: {
          item: newItem,
        },
      },
      "*"
    );
    window.close();
  }
};

const onAddOption = (e) => {
  const formEl = e.target as HTMLElement;
  const optionName = formEl.querySelector("input");

  if (options.value.optionName === "" || options.value.optionPrice === 0)
    return;
  item.value.options.push({
    name: options.value.optionName,
    price: +options.value.optionPrice,
  });
  options.value.optionName = "";
  options.value.optionPrice = 0;
  optionName.focus();
};

onMounted(async () => {
  const { ok, item: getItem } = await getItemById(+route.params.id);

  if (ok) {
    item.value = getItem;
  }

  if (getItem.sellUserInfo.id !== sellerInfo.value.id) {
    window.close();
  }
});
</script>

<style lang="scss" scoped>
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
