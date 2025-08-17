// plugins/auth.client.ts
export default defineNuxtPlugin(async () => {
    const auth = useAuthStore();
    const router = useRouter();
    
    // Initialize auth state from localStorage
    auth.loadAuth();
    
    // Handle route changes after hydration
    router.afterEach(async (to) => {
      const publicRoutes = ['/login', '/register'];
      
      // Wait a tick to ensure everything is ready
      await nextTick();
      
      // Only redirect if we're not on a public route and not authenticated
      if (!publicRoutes.includes(to.path) && !auth.isLoggedIn) {
        await navigateTo('/login');
      }
    });
  });