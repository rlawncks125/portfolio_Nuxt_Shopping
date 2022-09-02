import lottie, { AnimationItem } from "lottie-web";

enum LottiePath {
  "loding" = "https://assets8.lottiefiles.com/packages/lf20_b88nh30c.json",
  "paper" = "https://assets9.lottiefiles.com/packages/lf20_x62chJ.json",
  "loading2" = "https://assets10.lottiefiles.com/packages/lf20_p8bfn5to.json",
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      lottieLoadAnimation: (el: HTMLElement, path: keyof typeof LottiePath) => {
        return lottie.loadAnimation({
          container: el,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: LottiePath[path],
        });
      },
    },
  };
});

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $lottieLoadAnimation(
      el: HTMLElement,
      path: keyof typeof LottiePath
    ): AnimationItem;
  }
}
