import {
  deleteRegister,
  getPublickey,
  registerNotification,
} from "~~/api/notification";

export default defineNuxtPlugin(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then((regist) => {
      console.log("서비스 워커 준비완료");

      Worker.instance.setRegist(regist);

      regist.addEventListener("updatefound", () => {
        const newWorker = Worker.instance.installing();
        console.log("서비스 워커 업데이트 발견");

        newWorker.addEventListener("statechange", function () {
          console.log("서비스 워커 상태 변경", this.state);
        });
      });
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      console.log("서비스워커 컨트롤러 변경");
    });
  }
});

export class Worker {
  #regist: ServiceWorkerRegistration;

  static instance = new Worker();
  constructor() {}

  setRegist(regist: ServiceWorkerRegistration) {
    this.#regist = regist;
  }

  installing() {
    return this.#regist.installing;
  }

  async isSubscribe() {
    return (await this.#regist.pushManager.getSubscription()) !== null;
  }

  async subscribe() {
    // 백엔드에서 키받아오기

    return await this.#regist.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: await getPublickey(),
      })
      .then(async (subscriptuon) => {
        // 백엔드 구독 등록
        await registerNotification(subscriptuon);

        return this.isSubscribe();
      })
      .catch((err) => {
        console.log("Failed to subscribe the user: ", err);
      });
  }

  async unSubcribe() {
    return await this.#regist.pushManager
      .getSubscription()
      .then(async (subscription) => {
        // 백엔드 구독 삭제
        await deleteRegister(subscription);

        await subscription.unsubscribe();
        return this.isSubscribe();
      })
      .catch((err) => {
        console.log("Failed to unSubscribe the user: ", err);
      });
  }
}
