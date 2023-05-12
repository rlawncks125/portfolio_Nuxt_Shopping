<template>
  <div class="max-w-container mx-auto">
    <!-- 아이템 있을시  -->
    <div v-if="items.length > 0" class="lg:flex">
      <div>
        <!-- 배송 주소 -->
        <div>
          <div class="border mx-[1rem] lg:mx-auto my-[2rem] p-[1rem]">
            <!-- 주소 입력 -->
            <div class="flex gap-1">
              <div
                @click="findAdress"
                class="cursor-pointer border p-[1rem] m-[.2rem]"
              >
                주소찾기
              </div>
              <div
                @click="userAdress"
                class="cursor-pointer border p-[1rem] m-[.2rem]"
              >
                주문자 동일 정보
              </div>
            </div>
            <!--  -->
            <div class="flex flex-col gap-[.5rem]">
              <input
                class="py-[1rem] px-[.5rem]"
                type="text"
                disabled
                placeholder="우편번호"
                v-model="address.postcode"
              />
              <input
                class="py-[1rem] px-[.5rem]"
                type="text"
                disabled
                placeholder="주소"
                v-model="address.address"
              />
              <input
                class="py-[1rem] px-[.5rem]"
                type="text"
                placeholder="주소 상세"
                v-model="address.detail"
              />
            </div>
          </div>
        </div>
        <!-- 장바구니 아이템 정보-->
        <div
          v-for="(v, index) in items"
          class="border mx-[1rem] lg:mx-auto my-[2rem]"
        >
          <!-- 정보 표시 -->
          <div class="p-2 px-[1rem]">
            <div
              class="flex justify-between my-[.5rem] font-bold text-[1.5rem]"
            >
              <p>
                {{ v.item.sellUserInfo.companyName }}
              </p>
              <LazyFaIcon
                class="cursor-pointer"
                icon="xmark"
                size="1x"
                @click="removeBaskItem(index)"
              />
            </div>
            <div class="h-[2px] bg-gray-400"></div>
            <div
              class="flex flex-wrap md:flex-nowrap px-[2rem]  gap-[1rem] py-[2rem]"
            >
              <div class="w-[10rem] order-0">
                <img :src="v.item.thumbnailSrc" alt="" />
              </div>
              <div class="flex-1 order-1">
                <p class="font-bold text-[1.5rem]">{{ v.item.title }}</p>
                <div v-for="option in v.selectedOptions" class="text-gray-400">
                  <span
                    >{{ option.name }}( {{ formatToWon(option.price) }}원 ) -
                  </span>
                  <span>{{ option.count }}개 구매</span>
                </div>
              </div>
              <div
                class="flex flex-wrap md:!w-auto gap-2 order-0 md:order-2 "
                :style="{ width: 'calc(100% - 11rem)' }"
              >
                <p class="text-[1.5rem] font-bold text-red-600">
                  {{ v.item.sale }}%
                </p>
                <div class="font-bold text-[1.5rem]">
                  <del class="text-gray-300"
                    >{{ formatToWon(v.item.price) }}원</del
                  >
                  <p>
                    {{
                      formatToWon(v.item.price * ((100 - v.item.sale) / 100))
                    }}원
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- 금액 계산 -->
          <div
            class="border-t-2 text-center py-[2rem] px-[2rem] md:px-[3rem] flex justify-between items-center"
          >
            <div>
              <p class="text-[.8rem] text-gray-400">상품금액</p>
              <p class="font-bold">{{ formatToWon(v.item.price) }}원</p>
            </div>

            <LazyFaIcon class="text-gray-400" icon="minus" size="1x" />
            <div>
              <p class="text-[.8rem] text-gray-400">할인 금액</p>
              <p class="font-bold text-red-500">
                {{ formatToWon(v.item.price * (v.item.sale / 100)) }}원
              </p>
            </div>

            <template v-if="v.selectedOptions.length > 0">
              <LazyFaIcon class="text-gray-400" icon="plus" size="1x" />
              <div>
                <p class="text-[.8rem] text-gray-400">추가 옵션</p>
                <p class="font-bold">
                  {{ formatToWon(getOptionsTotalPrice(v.selectedOptions)) }}원
                </p>
              </div>
            </template>

            <LazyFaIcon class="text-gray-400" icon="plus" size="1x" />
            <div>
              <p class="text-[.8rem] text-gray-400">배송비</p>

              <p class="font-bold" v-if="itemPriceSum(v) < v.item.freeParcel">
                {{ formatToWon(v.item.parcel) }}원
              </p>
              <p class="font-bold" v-else>0원</p>
            </div>

            <LazyFaIcon class="text-gray-400" icon="equals" size="1x" />
            <div>
              <p class="text-[.8rem] text-gray-400">총 금액</p>
              <p class="font-bold">{{ formatToWon(getTotalPrice(v)) }}원</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 결제 정보  -->
      <div class="m-[1rem] flex-none lg:mt-[2rem]">
        <div class="border p-[1rem]">
          <p class="font-bold text-[1.5rem]">결제 정보</p>
          <br />
          <hr />
          <div class="flex flex-col gap-1 my-[1rem]">
            <div class="flex justify-between">
              <p>상품수</p>
              <p class="font-bold">{{ items.length }}개</p>
            </div>
            <div class="flex justify-between">
              <p>상품금액</p>

              <p class="font-bold">{{ formatToWon(paymentInfo.price) }}원</p>
            </div>
            <div class="flex justify-between">
              <p>할인 금액</p>
              <p class="font-bold">{{ formatToWon(paymentInfo.sale) }}원</p>
            </div>
            <div class="flex justify-between">
              <p>배송비</p>
              <p class="font-bold">{{ formatToWon(paymentInfo.parcel) }}원</p>
            </div>
          </div>
          <hr />
          <div
            class="my-[1rem] text-[1.2rem] font-bold flex justify-between gap-6"
          >
            <p>총결제금액</p>
            <p class="font-bold">{{ formatToWon(paymentInfo.total) }}원</p>
          </div>
          <button
            @click="onPayItem"
            class="w-full bg-blue-600 p-[1.5rem] text-center text-[1.3rem] font-bold text-white rounded-lg"
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
    <!-- 아이템 없을시 -->
    <div v-else class="mx-auto h-[60vh] flex justify-center items-center">
      <div class="text-center text-gray-600">
        <LazyFaIcon icon="cloud-arrow-down" size="5x" />
        <p>장바구니에 추가된 아이템이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ShopitemService,
  BaksetItemSelectedOptions,
  BasketItemInfo,
  ShopUserService,
  ShopSoldItem,
} from "~~/api/swagger";

import { formatToWon } from "@/common/format";
import { useUser } from "~~/sotre/user";

definePageMeta({
  layout: "login-required",
});

const items = useState<BasketItemInfo[]>("baskItem", () => []);

const paymentInfo = reactive({
  price: 0,
  sale: 0,
  parcel: 0,
  total: 0,
});

const address = reactive({
  postcode: "",
  address: "",
  detail: "",
});

const findAdress = () => {
  const { $daumAddress } = useNuxtApp();
  $daumAddress((data) => {
    address.address = data.address;
    address.postcode = data.zonecode;
    address.detail = "";
  });
};
const userAdress = () => {
  const { userInfo } = useUser();
  if (!userInfo) return;
  address.postcode = userInfo.postcode;
  address.address = userInfo.address;
  address.detail = userInfo.addressDetail;
};

const getBaskItemsInfo = async (): Promise<BasketItemInfo[]> => {
  const {
    ok,
    items,
  } = await ShopitemService.shopItemControllerGetBasketItems();
  if (!ok) {
    console.log("불러오지 못했습니다");
  }
  return items || [];
};

const removeBaskItem = async (itemIndex: number) => {
  const {
    ok,
    removeIndex,
  } = await ShopUserService.shopUserControllerRemoveBasketItem({
    body: {
      itemIndex: [itemIndex],
    },
  });
  if (ok) {
    items.value = items.value.filter(
      (v, index) => !removeIndex.includes(index)
    );
  }
};

// 배송비를 제외한 총 금액
const itemPriceSum = (bask: BasketItemInfo) => {
  const salePrice = +bask.item.price * ((100 - bask.item.sale) / 100);
  // 옵션 총합 계산
  const optionSum = getOptionsTotalPrice(bask.selectedOptions);

  return salePrice + optionSum;
};

// 선택 옵션 총 합 계산
const getOptionsTotalPrice = (options: BaksetItemSelectedOptions[]) => {
  return options.reduce((a, b) => a + toRaw(b.price * b.count), 0);
};

const getTotalPrice = (bask: BasketItemInfo) => {
  // 배송비 포함 최종 비용

  if (itemPriceSum(bask) < bask.item.freeParcel) {
    return itemPriceSum(bask) + bask.item.parcel;
  } else {
    return itemPriceSum(bask);
  }
};

const onPayItem = () => {
  if (address.address === "" || address.postcode === "") {
    alert("주소를 입력해주세요");
    return;
  }
  // console.log("결제 ", paymentInfo.total, items.value, address);

  const paymentName =
    items.value.length > 1
      ? `${items.value[0].item.title.slice(0, 10)}... 외 ${items.value.length -
          1}개`
      : items.value[0].item.title;

  const { $impPayment } = useNuxtApp();
  $impPayment(
    {
      // amount : paymentInfo.total,
      amount: 100,
      name: paymentName,
      address: address.address,
      addressDetail: address.detail,
      postcode: address.postcode,
    },
    // 결제 성공시
    async (rsp) => {
      await ShopitemService.shopItemControllerCreateIreceipt({
        body: {
          paymentInfo: {
            card_name: rsp.card_name,
            card_number: rsp.card_number,
            pay_method: rsp.pay_method,
            paymentPrice: paymentInfo.total,
          },
          soldItems: items.value.map((v) => {
            return {
              soldItemsInfo: {
                item: v.item,
                selectedOptions: v.selectedOptions,
              },
              payment: getTotalPrice(v),
              shipInfo: {
                address: address.address,
                addressDetail: address.detail,
                postcode: address.postcode,
              },
            };
          }),
          totalPrice: paymentInfo.total,
        },
      });

      items.value = [];
      alert("구매에 성공하였습니다.");

      useRouter().push("/orderDelivery");
    },
    async (fail) => {
      alert("실패하였습니다.");
      console.log(fail);
      const ok = confirm("영수증을 발급하시 겠습니까?");
      if (ok) {
        await ShopitemService.shopItemControllerCreateIreceipt({
          body: {
            paymentInfo: {
              card_name: "BC카드",
              card_number: "910003*********9",
              pay_method: "card",
              paymentPrice: paymentInfo.total,
            },
            soldItems: items.value.map((v) => {
              return {
                soldItemsInfo: {
                  item: v.item,
                  selectedOptions: v.selectedOptions,
                },
                payment: getTotalPrice(v),
                shipInfo: {
                  address: address.address,
                  addressDetail: address.detail,
                  postcode: address.postcode,
                },
              };
            }),
            totalPrice: paymentInfo.total,
          },
        });
      }
    }
  );
};

onMounted(async () => {
  items.value = await getBaskItemsInfo();

  console.log(items.value);
});

watch(items, () => {
  paymentInfo.price = 0;
  paymentInfo.sale = 0;
  paymentInfo.parcel = 0;
  paymentInfo.total = 0;

  items.value.forEach((v) => {
    const sumPrice = itemPriceSum(v);
    paymentInfo.price += sumPrice;
    paymentInfo.sale += +v.item.price * (v.item.sale / 100);
    if (sumPrice < v.item.freeParcel) {
      paymentInfo.parcel += v.item.parcel;
    }
    paymentInfo.total += getTotalPrice(v);
  });
});
</script>

<style lang="scss" scoped></style>
