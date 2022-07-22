import { ApiServer } from "@/plugins/api-server";

export const registerNotification = async (subscription: any) => {
  return await useFetch<{ id: number }>(
    `${ApiServer.url}/notification/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        endPoint: subscription,
      }),
      pick: ["id"],
    }
  ).then((res) => res.data.value.id);
};

export const deleteRegister = async (subscription: PushSubscription) => {
  const {
    keys: { auth },
  } = JSON.parse(JSON.stringify(subscription));

  return await fetch(`${ApiServer.url}/notification/${auth}`, {
    method: "DELETE",
  });
};

export const getPublickey = async () => {
  return await useFetch<{ key: string }>(
    `${ApiServer.url}/notification/publicKey`,
    {
      pick: ["key"],
    }
  ).then((res) => res.data.value.key);
};
