import { defineStore } from "pinia";
import { ShopUserSeller, UserInfo } from "~~/api/swagger";
import { userGetMyInfo } from "@/api/user";

export const useUser = defineStore("userState", () => {
  // 유저 토큰
  const userToken = useCookie("userToken", { default: () => null });

  const setUserToken = (token: string) => {
    userToken.value = token;
  };
  // 유저 정보
  const userInfo = useCookie<UserInfo>("userInfo", { default: () => null });

  const setUser = (user: UserInfo) => {
    userInfo.value = user;
    console.log(userInfo.value);
  };

  // 판매자 정보
  const sellerInfo = useCookie<ShopUserSeller>("sellerInfo", {
    default: () => null,
  });

  const setSeller = (seller: ShopUserSeller) => {
    sellerInfo.value = seller;
    console.log(sellerInfo.value);
  };

  // 정보 새로고침
  const reFresh = async () => {
    const { ok, userInfo, sellerInfo } = await userGetMyInfo();
    if (ok) {
      setUser(userInfo);
      setSeller(sellerInfo);
    }
  };

  // 로그아웃
  const userLogOut = () => {
    userToken.value = null;
    userInfo.value = null;
    sellerInfo.value = null;
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
});
