export default defineNuxtPlugin(() => {
  ApiServer.instance.init();
});

export class ApiServer {
  static instance = new ApiServer();

  #url;

  constructor() {}

  static get url() {
    return ApiServer.instance.#url;
  }

  static get userToken() {
    return useCookie("userToken") || null;
  }

  init() {
    const config = useRuntimeConfig();
    this.#url = config.public.apiServer;
  }
}
