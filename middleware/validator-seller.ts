import { storeToRefs } from "pinia";
import { EnumUserInfoRole } from "~~/api/swagger";
import { useUser } from "~~/sotre/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const { userInfo, sellerInfo } = storeToRefs(useUser());

  if (!userInfo.value) {
    return navigateTo("/login");
  }

  if (userInfo.value.role !== EnumUserInfoRole.company) {
    return navigateTo("/");
  }

  if (!sellerInfo.value) {
    return navigateTo("/mypage/sellerRegist");
  }

  // return abortNavigation(); // 멈춤
});
