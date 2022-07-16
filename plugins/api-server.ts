export default defineNuxtPlugin(() => {
  ApiServer.instance.init();
});

export class ApiServer {
  static instance = new ApiServer();

  #config;
  constructor() {}

  static get url() {
    return ApiServer.instance.#config;
  }

  init() {
    const config = useRuntimeConfig();
    this.#config = config.public.apiServer;
  }
}
