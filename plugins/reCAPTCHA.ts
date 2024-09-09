export default defineNuxtPlugin(() => {
  const {
    public: { reCAPTCHA_SITE_KEY },
  } = useRuntimeConfig();

  return {
    provide: {
      reCAPTCHA: (el: HTMLElement, result: (res: any) => void) => {
        const verifyCallback = async (response: any) => {
          // cors 정책 걸려서
          // server/api 폴더 위치가 서버 역할하는 위치 므로
          // useFetch를 이용해서 호출
          await useFetch("/api/reCAPTCHA_verify", {
            method: "POST",
            body: { response },
          }).then((res) => result(res.data.value));
        };

        // @ts-ignore
        grecaptcha.render(el, {
          sitekey: reCAPTCHA_SITE_KEY,
          callback: verifyCallback,
          theme: "light",
        });
      },
    },
  };
});

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $reCAPTCHA(el: HTMLElement, result: (res: any) => void): void;
  }
}
