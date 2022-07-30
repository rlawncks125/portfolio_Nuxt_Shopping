<template>
  <div>
    <div>아이템 id : {{ params.id }}</div>
    <div
      v-if="item"
      class="border border-gray-200 cursor-pointer hover:border-gray-400"
    >
      <div class="block sm:flex px-[1rem]">
        <img class="w-full sm:w-[45%]" :src="item.thumbnailSrc" alt="" />
        <div class="p-4">
          <p class="text-[1.5rem]">{{ item.title }}</p>
          <p class="text-gray-400 text-[0.8rem]">
            <del> {{ formatToWon(item.price) }}<span>원</span> </del>
            <span class="text-red-500 ml-[.5rem] text-[1.2rem]"
              >{{ item.sale }}%</span
            >
          </p>
          <span class="font-bold text-[1.5rem]">
            {{
              formatToWon(+item.price * ((100 - item.sale) / 100) + "")
            }}</span
          ><span class="text-[0.9rem]">원</span>
        </div>
      </div>
      <br />
      <div v-html="item.detailHtml"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatToWon } from "@/common/format";
import { getItem } from "~~/api/item";
import { Iitem } from "@/api/item";

export default defineComponent({
  setup() {
    const { params } = useRoute();
    const item = ref<Iitem>();

    onMounted(async () => {
      item.value = await getItem(+params.id);
    });

    // og데이터
    const ogTitle = useState("ogTitle");
    const ogSrc = useState("ogSrc");
    const ogDesc = useState("ogDesc");
    useLazyAsyncData("ogData", () =>
      // 아이템 정보 가져오기 처리
      getItem(+params.id).then((res) => {
        ogTitle.value = `타이틀 : ${res.title}`;
        ogSrc.value = res.thumbnailSrc;
        ogDesc.value = `${res.title}의 가격은 ${res.price}입니다.`;
      })
    );

    useHead({
      title: `아이템 :  ${params.id}`,
      meta: [
        {
          name: "description",
          content: `쇼핑 데이터 ${params.id}`,
        },
        {
          name: "og:title",
          property: "og:title",
          content: ogTitle,
        },
        {
          name: "og:description",
          property: "og:description",
          content: ogDesc,
        },
        {
          name: "og:image",
          property: "og:image",
          content: ogSrc,
        },
      ],
    });
    return { params, item, formatToWon };
  },
});
</script>

<style scoped></style>
