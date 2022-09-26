import axios, { Axios } from "axios";
import { serviceOptions } from "@/api/swagger/index";
import { storeToRefs } from "pinia";
import { useUser } from "~~/sotre/user";

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

    const {userToken} = storeToRefs(useUser())

    const instance = axios.create({
      baseURL: url,
      timeout: 2000,
      headers: {
        "shop-token": userToken.value,
        "content-type" : "application/json"
      },      
    });
    
    this.#axios = instance
    // swagger axios 사용시
    serviceOptions.axios =instance
    
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: Axios;
  }
}
