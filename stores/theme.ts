// stores/theme.ts
import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    dark: false,
  }),
  
  actions: {
    toggleDark() {
      this.dark = !this.dark;
      this.applyTheme();
    },
    
    setDark(isDark: boolean) {
      this.dark = isDark;
      this.applyTheme();
    },
    
    applyTheme() {
      if (process.client) {
        localStorage.setItem("theme", this.dark ? "dark" : "light");
        document.documentElement.classList.toggle("dark", this.dark);
        
        // Optional: Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          metaThemeColor.setAttribute('content', this.dark ? '#1f2937' : '#ffffff');
        }
      }
    },
    
    loadTheme() {
      if (process.client) {
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        
        // Use saved preference, or fall back to system preference
        this.dark = saved ? saved === "dark" : prefersDark;
        this.applyTheme();
        
        // Listen for system theme changes
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
          // Only auto-switch if no manual preference is saved
          if (!localStorage.getItem("theme")) {
            this.setDark(e.matches);
          }
        });
      }
    },
    
    // Reset to system preference
    resetToSystem() {
      if (process.client) {
        localStorage.removeItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        this.setDark(prefersDark);
      }
    }
  },
});