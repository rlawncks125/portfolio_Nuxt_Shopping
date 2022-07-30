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
      timeout: 2000,
      headers: {
        "shop-token": useCookie("userToken", { default: () => null }).value,
      },
    });
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: Axios;
  }
}
