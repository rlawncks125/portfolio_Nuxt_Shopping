import Swiper, { SwiperOptions } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      setSwiper: (el: HTMLElement, options: SwiperOptions) => {
        return new Swiper(el, options);
      },
    },
  };
});

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $setSwiper(el: HTMLElement): Swiper;
  }
}
