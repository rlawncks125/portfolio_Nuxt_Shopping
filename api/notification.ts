import { ApiServer } from "@/plugins/api-server";

export const registerNotification = async (subscription: any) => {
  return await useFetch(`${ApiServer.url}/notification/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      endPoint: subscription,
    }),
  });
};

export const deleteRegister = async (subscription: PushSubscription) => {
  const {
    keys: { auth },
  } = JSON.parse(JSON.stringify(subscription));

  return await useFetch(`${ApiServer.url}/notification/${auth}`, {
    method: "DELETE",
  });
};

export const getPublickey = async () => {
  return await useFetch<{ key: string }>(
    `${ApiServer.url}/notification/publicKey`
  ).then((res) => res.data.value.key);
};
