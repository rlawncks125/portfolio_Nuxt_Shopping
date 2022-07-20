import { defineStore } from "pinia";

export const useUser = defineStore("userInfo", () => {
  const userToken = useCookie("userToken", { default: () => null });

  const setUserToken = (token: string) => {
    userToken.value = token;
  };

  const userLogOut = () => {
    userToken.value = null;
  };

  return { userToken, setUserToken, userLogOut };
});
