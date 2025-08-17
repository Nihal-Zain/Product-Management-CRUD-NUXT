// middleware/auth.ts
import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();
  
  // Always initialize auth store
  await auth.initAuth();
  
  // Define public routes that don't require authentication
  const publicRoutes = ['/login', '/register'];
  
  if (publicRoutes.includes(to.path)) {
    return;
  }
  
  // On server side, we need to check localStorage differently
  if (process.server) {
    // Skip authentication check on server-side
    // The client will handle the redirect if needed
    return;
  }
  
  // Client-side authentication check
  if (!auth.isLoggedIn) {
    return navigateTo("/login");
  }
});