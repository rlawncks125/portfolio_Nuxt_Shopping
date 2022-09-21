import { useUser } from "~~/sotre/user";

interface impParam {
  name: string;
  amount: number;
  postcode?: string;
  address?: string;
  addressDetail?: string;
  // buyer_email: string;
  // buyer_name: string;
  // buyer_tel: string;
  // buyer_addr: string;
  // buyer_postcode: string;
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const impCode = config.public.impCodeApi;

  // @ts-ignore
  const imp = window.IMP;

  imp.init(impCode);

  return {
    provide: {
      impPayment: (
        param: impParam,
        success: (rsp: any) => void,
        fail: (rsp: any) => void
      ) => {
        const { userInfo } = useUser();
        console.log("유저 정보: ", userInfo);
        if (!userInfo) {
          alert("로그인후 이용해주시기 바랍니다.");
          return;
        }
        imp.request_pay(
          {
            // param
            pg: "html5_inicis",
            pay_method: "card",
            name: param.name,
            amount: param.amount,
            // merchant_uid: param.merchant_uid,
            merchant_uid: `merchant_Nuxt3_${Date.now()}`,
            // 사용자 정보
            buyer_addr:
              param.address + "," + param.addressDetail ||
              userInfo.address + "," + userInfo.addressDetail,
            buyer_postcode: param.postcode || userInfo.postcode,
            buyer_email: userInfo.email,
            buyer_name: userInfo.nickName,
            buyer_tel: userInfo.tel,
          },
          function(rsp) {
            // callback
            if (rsp.success) {
              // 결제 성공 시 로직,
              success(rsp);
            } else {
              // 결제 실패 시 로직,
              fail(rsp);
            }
          }
        );
      },
    },
  };
});

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $impPayment(
      param: impParam,
      success: (rsp: any) => void,
      fail: (rsp: any) => void
    ): void;
  }
}
