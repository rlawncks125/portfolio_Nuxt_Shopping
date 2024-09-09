import { ApiServer } from "@/plugins/api-server";
import { Worker } from "~~/plugins/sw.client";
import type {
    RegistersubscriptionInputDto,
   ClearRegisterUserInputDto,
   PatchListerNotificationOutPutDto,
   PatchListerNotificationInputDto,
   RegistersubscriptionUserInputDto,
   RegistersubscriptionUserOutPutDto,
} from "@/api/swagger/index";

/** 알람 등록 */
export const registerNotification = async (
  data: RegistersubscriptionInputDto
) => {
  return await ApiServer.axios
    .post("/notification/register", data)
    .then((res) => res.data as number);
};

/** 알람 삭제 */
export const deleteRegister = async (subscription: PushSubscription) => {
  const {
    keys: { auth },
  } = JSON.parse(JSON.stringify(subscription));

  // return await fetch(`${ApiServer.url}/notification/${auth}`, {
  //   method: "DELETE",
  // });
  return await ApiServer.axios.delete(`/notification/${auth}`);
};

/** 공개키 받아오기 */
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

/** 알림 설정 받아오기 */
export async function isPush() {
  const auth = await Worker.instance.getSubcribeAuth();
  if (!auth) return false;

  return await ApiServer.axios
    .get(`/notification/shopispush/${auth}`)
    .then((res) => res.data as boolean);
}

/** 알림 설정 여부 변경 */
export async function pathIsPush(): Promise<PatchListerNotificationOutPutDto> {
  const auth = await Worker.instance.getSubcribeAuth();
  if (!auth)
    return {
      ok: false,
      err: "저장된 값이 없음",
    };

  const data: PatchListerNotificationInputDto = {
    auth,
  };

  return await ApiServer.axios
    .patch(`/notification/shop`, data)
    .then((res) => res.data as PatchListerNotificationOutPutDto);
}

/** 유저 아이디 등록 */
export async function registerUser(data: RegistersubscriptionUserInputDto) {
  return await ApiServer.axios
    .post("/notification/register-shop-user", data)
    .then((res) => res.data as RegistersubscriptionUserOutPutDto);
}

/** 유저 아이디 제거 */
export async function delteRegisterUser({ auth }: ClearRegisterUserInputDto) {
  return await ApiServer.axios
    .post("/notification/register-shop-user-remove", {
      auth,
    })
    .then((res) => res.data as number);
}

/** 로컬스토리지 구독 삭제 */
export async function deleteRegisterLocalStorege() {
  const subscription = localStorage.getItem("subscription");

  if (!subscription) return;

  const {
    keys: { auth },
  } = JSON.parse(subscription);

  if (!auth) return;

  const ok = await ApiServer.axios.delete(`/notification/${auth}`);

  localStorage.removeItem("subscription");
  return ok;
}
