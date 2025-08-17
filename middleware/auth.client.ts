// middleware/auth.client.ts
export default defineNuxtRouteMiddleware((to) => {
    // Skip middleware on server-side completely
    if (process.server) return;
    
    const auth = useAuthStore();
    
    // Public routes that don't require authentication
    const publicRoutes = ['/login', '/register'];
    
    if (publicRoutes.includes(to.path)) {
      return;
    }
    
    // Initialize auth if not done already
    if (!auth.initialized) {
      auth.loadAuth();
    }
    
    // Only redirect if we're sure there's no stored auth
    if (!auth.hasStoredAuth()) {
      return navigateTo("/login");
    }
  });