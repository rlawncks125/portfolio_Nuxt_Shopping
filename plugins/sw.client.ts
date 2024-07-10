import * as Notification from "~~/api/notification";

export default defineNuxtPlugin(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then((regist) => {
      console.log("서비스 워커 준비완료");

      Worker.instance.setRegist(regist);

      regist.addEventListener("updatefound", () => {
        const newWorker = Worker.instance.installing();
        console.log("서비스 워커 업데이트 발견");

        newWorker!.addEventListener("statechange", function () {
          console.log("서비스 워커 상태 변경", this.state);
        });
      });
    })
    .catch(err => {
      console.log("Service Worker Failed",err);
      
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      console.log("서비스워커 컨트롤러 변경");
    });
  }
});

export class Worker {
  // @ts-ignore
  #regist: ServiceWorkerRegistration;

  static instance = new Worker();

  #isSubscribe = ref<boolean>();
  constructor() {}

  get register() {
    return this.#regist;
  }

  get getterIsSubscribe() {
    return this.#isSubscribe.value;
  }

  async setRegist(regist: ServiceWorkerRegistration) {
    this.#regist = regist;
    await this.isSubscribe();

    // 알람 권한 변경으로 기존 구독이 삭제안됐을시 삭제
    if (!this.getterIsSubscribe) {
      Notification.deleteRegisterLocalStorege();
    }
  }

  installing() {
    return this.#regist.installing;
  }

  /** 구독 상태 여부 */
  async isSubscribe() {
    const status = (await this.#regist.pushManager.getSubscription()) !== null;
    this.#isSubscribe.value = status;
    return status;
  }

  /** 구독 하기 */
  async subscribe() {
    return await this.#regist.pushManager
      .subscribe({
        userVisibleOnly: true,
        // 백엔드에서 키받아오기
        applicationServerKey: await Notification.getPublickey(),
      })
      .then(async (subscription) => {
        // console.log(JSON.stringify(subscription));
        // 백엔드 구독 등록

        const ok = await Notification.registerNotification({subscription});
        // 알림 차단을 했을시 이전 구독 정보를 저장하기위한 용도
        localStorage.setItem("subscription", JSON.stringify(subscription));

        console.log(ok);

        return this.isSubscribe();
      })
      .catch((err) => {
        console.log("Failed to subscribe the user: ", err);
      });
  }

  /** 구독 취소 */
  async unSubcribe() {
    if ((await this.isSubscribe()) === null) return;
    return await this.#regist.pushManager
      .getSubscription()
      .then(async (subscription:any) => {
        // 백엔드 구독 삭제
        await Notification.deleteRegister(subscription);

        await subscription?.unsubscribe();

        return this.isSubscribe();
      })
      .catch((err) => {
        console.log("Failed to unSubscribe the user: ", err);
      });
  }

  async getSubcribeAuth() {
    return this.#regist.pushManager.getSubscription().then((subscription) => {
      if (!subscription) return null;
      const {
        keys: { auth },
      } = JSON.parse(JSON.stringify(subscription));

      return auth;
    });
  }

  /** 유저 아이디 등록 */
  async registerByUser(userId: number) {
    const auth = await Worker.instance.getSubcribeAuth();

    if (!auth) return;

    return Notification.registerUser({
      auth,
      userId,
    });
  }

  /** 유저 아이디 제거 */
  async removeRegisterByUser() {
    const auth = await Worker.instance.getSubcribeAuth();

    if (!auth) return;

    return Notification.delteRegisterUser({ auth });
  }

}

// export class Worker {
//   #regist: ServiceWorkerRegistration;

//   static instance = new Worker();
//   constructor() {}

//   setRegist(regist: ServiceWorkerRegistration) {
//     this.#regist = regist;
//   }

//   installing() {
//     return this.#regist.installing;
//   }

//   async isSubscribe() {
//     return (await this.#regist.pushManager.getSubscription()) !== null;
//   }

//   async subscribe() {
//     // 백엔드에서 키받아오기

//     return await this.#regist.pushManager
//       .subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: await getPublickey(),
//       })
//       .then(async (subscriptuon) => {
//         // 백엔드 구독 등록

//         const id = await registerNotification(subscriptuon);

//         console.log(id);

//         return this.isSubscribe();
//       })
//       .catch((err) => {
//         console.log("Failed to subscribe the user: ", err);
//       });
//   }

//   async unSubcribe() {
//     return await this.#regist.pushManager
//       .getSubscription()
//       .then(async (subscription) => {
//         // 백엔드 구독 삭제
//         await deleteRegister(subscription);

//         await subscription.unsubscribe();
//         return this.isSubscribe();
//       })
//       .catch((err) => {
//         console.log("Failed to unSubscribe the user: ", err);
//       });
//   }
// }
