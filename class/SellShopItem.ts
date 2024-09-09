import type {
  ShopUserService,
   BaksetItemSelectedOptions,
   BasketItem,
   ShopItem,
} from "@/api/swagger/index";

export class SellShopItem {
  // @ts-ignore
  item: ShopItem;
  itemOptions: BaksetItemSelectedOptions[] = [];

  constructor() {}

  get value() {
    return this.item;
  }

  set value(item: ShopItem) {
    this.item = item;
  }

  get getItemOptions() {
    return this.itemOptions;
  }

  // 총합 액수 계산
  get optionPriceSum() {
    const salePrice = +this.item.price * ((100 - this.item.sale) / 100);
    // 옵션 총합 계산
    const optionSum = this.itemOptions.reduce(
      (a, b) => a + toRaw(b.price * b.count),
      0
    );

    return salePrice + optionSum;
  }
  // 배송비 포함 비용
  get totalPrice() {
    if (this.optionPriceSum < this.item.freeParcel) {
      return this.optionPriceSum + this.item.parcel;
    } else {
      return this.optionPriceSum;
    }
  }

  validataionOption(selectOption: string) {
    return this.itemOptions.findIndex((v) => v.name === selectOption) !== -1;
  }

  addOptionItem(selectOption: string) {
    // 아이템 추가
    const findItem = this.item!.options.find((v) => v.name === selectOption);

    findItem && this.itemOptions.push({ ...toRaw(findItem), count: 1 });
  }

  deleteOption(index: number) {
    this.itemOptions = this.itemOptions.filter((v, i) => i !== index);
  }

  /**
   * 별점 분포도 얻기
   * @param item ShopItem
   * @param starNumber number
   */
  getItemStarDistribution(starNumber: number) {
    const avg =
      this.item.reviews.filter(
        (v) => v.star > starNumber - 1 && v.star <= starNumber
      ).length / this.item.reviews.length || 0;

    return floatFixed(avg * 100, 0);
  }

  getItemStarAvg() {
    return floatFixed(
      this.item.reviews.reduce((a, b) => a + b.star, 0) /
        this.item.reviews.length || 0,
      2
    );
  }

  // 장바구니 추가 ( 서버에 추가 )
  async addBaskItem() {
    const basketItem: BasketItem = {
      itemId: this.item.id,
      selectedOptions: this.itemOptions,
    };

    return await ShopUserService.shopUserControllerAddBasketItem({
      body: {
        basketItem,
      },
    });
  }
}
