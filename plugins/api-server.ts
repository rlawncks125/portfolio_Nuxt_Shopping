import axios, { Axios } from "axios";

export default defineNuxtPlugin(() => {
  ApiServer.instance.init();

  return {
    provide: {
      axios: ApiServer.axios,
    },
  };
});

export class ApiServer {
  static instance = new ApiServer();

  #axios: Axios;

  constructor() {}

  static get axios() {
    return this.instance.#axios;
  }

  init() {
    const config = useRuntimeConfig();
    const url = config.public.apiServer;

    this.#axios = axios.create({
      baseURL: url,
      headers: {
        "shop-token": useCookie("userToken", { default: () => null }).value,
      },
      // cors 정책 문제
      withCredentials: true,
    });
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: Axios;
  }
}
