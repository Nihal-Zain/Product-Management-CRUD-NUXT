// export default defineNuxtRouteMiddleware((to, from) => {
//     const isLogin = localStorage.getItem("isLoggedIn");
//     //if not logged in, redirect to login page
//     if (!isLogin) {
//         return navigateTo("/login");
//     }
//     //if logged in, redirect to dashboard
//     return navigateTo("/");
// })
// export default defineNuxtRouteMiddleware((to, from) => {
//     const isLogin = localStorage.getItem("isLoggedIn");
//     if (!isLogin && to.path !== "/login" && to.path !== "/register") {
//       return navigateTo("/login");
//     }
//   });

export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
      const isLogin = localStorage.getItem("isLoggedIn");
  
      // If not logged in and trying to access protected pages
      if (!isLogin && to.path !== "/login" && to.path !== "/register") {
        return navigateTo("/login");
      }
  
      // If logged in and trying to access login/register pages
      if (isLogin && (to.path === "/login" || to.path === "/register")) {
        return navigateTo("/");
      }
    }
  });
  
  