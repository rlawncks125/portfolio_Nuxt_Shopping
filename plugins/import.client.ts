interface impParam {
  merchant_uid: string;
  name: string;
  amount: number;
  buyer_email: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_addr: string;
  buyer_postcode: string;
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
        imp.request_pay(
          {
            // param
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: param.merchant_uid,
            name: param.name,
            amount: param.amount,
            buyer_email: param.buyer_email,
            buyer_name: param.buyer_name,
            buyer_tel: param.buyer_tel,
            buyer_addr: param.buyer_addr,
            buyer_postcode: param.buyer_postcode,
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
