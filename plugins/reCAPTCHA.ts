import axios from "axios";

export default defineNuxtPlugin(() => {
  const {
    public: { reCAPTCHA_SECRET_KEY, reCAPTCHA_SITE_KEY },
  } = useRuntimeConfig();

  return {
    provide: {
      reCAPTCHA: (el: HTMLElement, result: (res: any) => void) => {
        const verifyCallback = async (response: any) => {
          console.log(response);
          const res = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            {
              secret: reCAPTCHA_SECRET_KEY,
              response,
            }
          );

          result(res);
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
