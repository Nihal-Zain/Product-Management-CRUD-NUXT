import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: null as { email: string; firstName: string; lastName: string } | null,
    initialized: false,
    isHydrating: true,
  }),

  actions: {
    loadAuth() {
        if (process.client) {
          const saved = localStorage.getItem("auth");
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              this.isLoggedIn = parsed.isLoggedIn;
              this.user = {
                email: parsed.user?.email || '',
                firstName: parsed.user?.firstName || '',
                lastName: parsed.user?.lastName || ''
              };
            } catch (error) {
              console.error("Error parsing auth data:", error);
              localStorage.removeItem("auth");
            }
          }
        }
        this.initialized = true;
        this.isHydrating = false;
      },

    async initAuth() {
      if (!this.initialized) {
        this.loadAuth();
      }
      return Promise.resolve();
    },

    login(user: { email: string; firstName: string; lastName: string }) {
        this.isLoggedIn = true;
        this.user = user;
        
        if (process.client) {
            localStorage.setItem(
                "auth",
                JSON.stringify({
                    isLoggedIn: true,
                    user: {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                })
            );
            
            // Create initial user profile if it doesn't exist
            const existingProfile = localStorage.getItem("userProfile");
            if (!existingProfile) {
                localStorage.setItem("userProfile", JSON.stringify({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: '',
                    bio: 'Software developer passionate about creating amazing user experiences.',
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + ' ' + user.lastName)}&background=3a9cb5&color=fff&size=128`,
                    joinedDate: new Date().toISOString()
                }));
            }
        }
    },

    logout() {
      this.isLoggedIn = false;
      this.user = null;

      if (process.client) {
        localStorage.removeItem("auth");
      }

      return navigateTo("/login");
    },

    hasStoredAuth() {
      if (!process.client) return false;

      const saved = localStorage.getItem("auth");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.isLoggedIn === true;
        } catch {
          return false;
        }
      }
      return false;
    },
  },
});
