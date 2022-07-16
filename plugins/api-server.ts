export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  ApiServer.instance.setServer(
    config.public.apiServer || "http://localhost:3030"
  );
});

export class ApiServer {
  #serverURL;

  static instance = new ApiServer();

  constructor() {}

  get url() {
    return this.#serverURL;
  }

  setServer(url) {
    this.#serverURL = url;
    console.log(this.#serverURL);
  }
}
