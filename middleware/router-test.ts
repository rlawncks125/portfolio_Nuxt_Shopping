export default defineNuxtRouteMiddleware((to, form) => {
  console.log(to, form);
  console.log("router middle test");
  // return abortNavigation(); // 멈춤
});
