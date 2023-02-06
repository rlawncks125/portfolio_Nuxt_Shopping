export default defineNuxtRouteMiddleware((to, from) => {
  if (!Number.isInteger(+to.params.id)) {
    // 정수 값이아닌 값이왔을시 홈화면으로 이동
    return navigateTo("/");
  }
  // return abortNavigation(); // 멈춤
});
