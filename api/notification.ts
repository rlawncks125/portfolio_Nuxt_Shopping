import { ApiServer } from "@/plugins/api-server";

export const registerNotification = async (subscription: any) => {
  // return await useFetch<{ id: number }>(
  //   `${ApiServer.url}/notification/register`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //       "shop-token": ApiServer.userToken.value,
  //     },
  //     body: JSON.stringify({
  //       endPoint: subscription,
  //     }),
  //     pick: ["id"],
  //   }
  // ).then((res) => res.data.value.id);
  return await ApiServer.axios
    .post("/notification/register", { endPoint: subscription })
    .then((res) => res.data.id as number);
};

export const deleteRegister = async (subscription: PushSubscription) => {
  const {
    keys: { auth },
  } = JSON.parse(JSON.stringify(subscription));

  // return await fetch(`${ApiServer.url}/notification/${auth}`, {
  //   method: "DELETE",
  // });
  return await ApiServer.axios.delete(`/notification/${auth}`);
};

export const getPublickey = async () => {
  // return await useFetch<{ key: string }>(
  //   `${ApiServer.url}/notification/publicKey`,
  //   {
  //     pick: ["key"],
  //   }
  // ).then((res) => res.data.value.key);
  return await ApiServer.axios
    .get("/notification/publicKey")
    .then((res) => res.data.key as string);
};
