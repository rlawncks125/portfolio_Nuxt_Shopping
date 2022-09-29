export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to, from);
  console.log("router middle test");

  // return abortNavigation(); // 멈춤
});
