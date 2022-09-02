import { defineStore } from "pinia";
import { BasketItem } from "~~/api/swagger";

export const useBasketItems = defineStore("basketItems", () => {
  const basketItemList = useCookie<BasketItem[]>("baskitemList", {
    default: () => [],
  });

  const pushBasketItem = (item: BasketItem) => {
    basketItemList.value = [...basketItemList.value, item];
  };

  return {
    basketItemList,
    pushBasketItem,
  };
});
