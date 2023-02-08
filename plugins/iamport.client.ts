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
  const iampCode = config.public.iampCodeApi;

  // @ts-ignore
  const imp = window.IMP;
  console.log("판매코드", iampCode);

  imp.init(iampCode);

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
            pg: "html5_inicis.INIpayTest",
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

              // 성공시 api 호출
              // { 영수증 정보 , 결제정보 }

              // 결제 정보
              // imp_uid: rsp.imp_uid, // imp결제 고유 번호
              // merchant_uid: rsp.merchant_uid // 상품 번호

              // rsp 정보
              // apply_num: "45037015"
              // bank_name: null
              // buyer_addr: "인천 미추홀구 염전로 414,101호"
              // buyer_email: "rlawncks125@naver.com"
              // buyer_name: "adadw"
              // buyer_postcode: "22124"
              // buyer_tel: "0102020131"
              // card_name: "BC카드"
              // card_number: "910003*********9"
              // card_quota: 0
              // currency: "KRW"
              // custom_data: null
              // imp_uid: "imp_806967025766"
              // merchant_uid: "merchant_Nuxt3_1662347966723"
              // name: "[10%+12%]패... 외 1개"
              // paid_amount: 100
              // paid_at: 1662348011
              // pay_method: "card"
              // pg_provider: "html5_inicis"
              // pg_tid: "StdpayISP_INIpayTest20220905122010028068"
              // pg_type: "payment"
              // receipt_url: "https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=StdpayISP_INIpayTest20220905122010028068&noMethod=1"
              // status: "paid"
              // success: true
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
