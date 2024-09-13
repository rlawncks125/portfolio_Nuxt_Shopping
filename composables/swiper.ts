import Swiper, { Navigation } from "swiper";

export const useCustomSwiper = () => {
  const { $setSwiper } = useNuxtApp();
  const swiperRef = ref();
  const swiperNextELRef = ref();
  const swiperPrevELRef = ref();
  const swiper = reactive({
    swiper: swiperRef,
    nextEl: swiperNextELRef,
    prevEl: swiperPrevELRef,
  });

  const swiperControl = ref<Swiper>();

  onMounted(() => {
    swiperControl.value = $setSwiper(swiper.swiper!, {
      loop: true,
      allowTouchMove: false,
      navigation: {
        nextEl: swiper.nextEl,
        prevEl: swiper.prevEl,
      },
      modules: [Navigation],
    });
  });

  return {
    swiperRef,
    swiperNextELRef,
    swiperPrevELRef,
    swiperControl,
  };
};
