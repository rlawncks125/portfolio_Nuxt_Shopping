import axios from "axios";
import { ShopItem } from "~~/api/swagger";

export default defineEventHandler(async (event) => {
  const id = await useBody(event);

  const url = `https://myapi.kimjuchan97.xyz`;

  // return await fetch(url, {
  //   method: "POST",
  // }).then((res) => res.json());

  return await axios
    .get(`${url}/shop-item/${id}`)
    .then((res) => res.data as { ok: boolean; item: ShopItem });
});
