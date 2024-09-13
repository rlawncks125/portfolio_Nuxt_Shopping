export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return;

  if (to.path !== from.path && process.client) {
    onPrehydrate(() => {
      window.scrollTo({
        top: 0,
        left: 0,
      });
    });
  }
});
