<template>
  <div>
    <div>아이템 id : {{ params.id }}</div>
    <div
      v-if="item"
      class="w-[10rem] border border-gray-200 cursor-pointer hover:border-gray-400"
    >
      <img class="w-full" :src="item.src" alt="" />
      <div class="p-4">
        <p>{{ item.title }}</p>
        <div class="flex gap-2 items-center">
          <span class="text-red-500">{{ item.sale }}%</span>
          <p>
            <span class="font-bold">
              {{
                formatToWon(+item.price * ((100 - item.sale) / 100) + "")
              }}</span
            ><span class="text-[0.9rem]">원</span>
          </p>
          <p class="text-gray-400 text-[0.8rem]">
            <del> {{ formatToWon(item.price) }}<span>원</span> </del>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatToWon } from "@/common/format";

interface Iitem {
  src: string;
  title: string;
  price: string;
  sale: number;
  itemId: number;
}

export default defineComponent({
  setup() {
    const { params } = useRoute();
    const item = ref();

    onMounted(async () => {
      item.value = await getItem(+params.id);
    });

    // og데이터
    const ogTitle = useState("ogTitle");
    const ogSrc = useState("ogSrc");
    const ogDesc = useState("ogDesc");
    useLazyAsyncData("ogData", () =>
      getItem(+params.id).then((res) => {
        ogTitle.value = `타이틀 : ${res.title}`;
        ogSrc.value = res.src;
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

const getItem = async (id: number) => {
  return new Promise<Iitem>((res, rej) => {
    setTimeout(() => {
      if (id === 6) {
        const mockItme2 = {
          src: "https://image.iacstatic.co.kr/allkill/item/2022/07/20220720095501441r.jpg",
          title: "[10%+12%]패션라인신상원피스/팬츠",
          price: "43000",
          sale: 70,
          itemId: 6,
        };
        res(mockItme2);
      } else {
        const mockItme = {
          src: "https://image.iacstatic.co.kr/allkill/item/2022/07/20220720100107421r.jpg",
          title: "휠라 퐁 쏭 4종 택1",
          price: "29000",
          sale: 30,
          itemId: 4,
        };
        res(mockItme);
      }
    }, 100);
  });
};
</script>

<style scoped></style>
