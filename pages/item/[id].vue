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
  async setup() {
    const { params } = useRoute();
    const item = ref();

    onMounted(async () => {
      item.value = await getItem(+params.id);
    });

    const { data: ogItem } = await useAsyncData("ogImteInfo", () =>
      getItem(+params.id)
    );
    useHead({
      title: `아이템 :  ${params.id}`,
      meta: [
        {
          name: "description",
          content: "쇼핑 데이터",
        },
        {
          name: "og:title",
          property: "og:title",
          content: `${ogItem.value.title || "tile Null"}`,
        },
        {
          name: "og:description",
          property: "og:description",
          content: `${ogItem.value.title || "tile Null"} 내용 입니다.`,
        },
        {
          name: "og:image",
          property: "og:image",
          content: ogItem.value.src || "img null",
        },
      ],
    });

    return { params, item, formatToWon };
  },
});

const getItem = async (id: number) => {
  await setTimeout(() => {}, 1000);

  return new Promise<Iitem>((res, rej) => {
    switch (id) {
      case 4:
        const mockItme = {
          src: "http://image.iacstatic.co.kr/allkill/item/2022/07/20220720100107421r.jpg",
          title: "휠라 퐁 쏭 4종 택1",
          price: "29000",
          sale: 30,
          itemId: 4,
        };
        res(mockItme);
        break;
      case 6:
        const mockItme2 = {
          src: "http://image.iacstatic.co.kr/allkill/item/2022/07/20220720095501441r.jpg",
          title: "[10%+12%]패션라인신상원피스/팬츠",
          price: "43000",
          sale: 70,
          itemId: 6,
        };
        res(mockItme2);
        break;
      default:
        break;
    }
  });
};
</script>

<style scoped></style>
