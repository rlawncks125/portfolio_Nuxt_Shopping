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
    const Publickey =
      "BFLHBvpUcFLzAvMYrSzt3T9tGCvurGrpQseVkFyiJx2TU2gTQez7Idf20pP13PWSZmDWBpU5Fv7aGgIxAoBFjd8";
    return await this.#regist.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: Publickey,
      })
      .then(async (subscriptuon) => {
        // 백엔드 구독 등록
        // ...
        return subscriptuon;
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
        // ...
        return subscription.unsubscribe();
      })
      .catch((err) => {
        console.log("Failed to unSubscribe the user: ", err);
      });
  }
}

export default defineNuxtPlugin(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then((regist) => {
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
