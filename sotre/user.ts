import { defineStore } from "pinia";
import type { ShopUserSeller, UserInfo } from "~~/api/swagger";
import { userGetMyInfo } from "@/api/user";
import { ApiServer } from "~~/plugins/api-server";
import { registerUser, delteRegisterUser } from "@/api/notification";
import { Worker } from "~~/plugins/sw.client";


export const useUser = defineStore("userState", () => {
  // 유저 토큰
  const userToken = ref<string>();

  const setUserToken = (token: string) => {
    userToken.value = token;
    ApiServer.instance.init();
  };
  // 유저 정보
  const userInfo = ref<UserInfo>();

  const setUser = async (user: UserInfo) => {
    userInfo.value = user;

    await Worker.instance.registerByUser(user.id);
  };

  // 판매자 정보
  const sellerInfo = ref<ShopUserSeller>();

  const setSeller = (seller: ShopUserSeller) => {
    sellerInfo.value = seller;
    // console.log(sellerInfo.value);
  };

  // 정보 새로고침
  const reFresh = async () => {
    const { ok, userInfo, sellerInfo } = await userGetMyInfo();
    if (ok) {
      setUser(userInfo);
      setSeller(sellerInfo!);
    }
  };

  // 로그아웃
  const userLogOut = async () => {
    userToken.value = undefined;
    userInfo.value = undefined;
    sellerInfo.value = undefined;

    await Worker.instance.removeRegisterByUser();
  };

  return {
    userToken,
    setUserToken,
    userLogOut,
    userInfo,
    setUser,
    sellerInfo,
    setSeller,
    reFresh,
  };
},{
  persist : {
    storage : piniaPluginPersistedstate.localStorage()
  }
});
