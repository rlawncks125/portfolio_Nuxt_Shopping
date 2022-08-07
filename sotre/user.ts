import { defineStore } from "pinia";
import { ShopUser } from "~~/api/swagger";

export const useUser = defineStore("userInfo", () => {
  // 유저 정보
  const userInfo = useCookie<ShopUser>("userInfo", { default: () => null });

  const setUser = (user: any) => {
    userInfo.value = user;
    console.log(userInfo.value);
  };
  // 유저 토큰
  const userToken = useCookie("userToken", { default: () => null });

  const setUserToken = (token: string) => {
    userToken.value = token;
  };

  const userLogOut = () => {
    userToken.value = null;
    userInfo.value = null;
  };

  return { userToken, setUserToken, userLogOut, userInfo, setUser };
});
