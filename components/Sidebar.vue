
<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

// Handle Logout from auth pinia
const auth = useAuthStore();
auth.loadAuth();

// Handle Theme from theme pinia
const theme = useThemeStore();

// Load theme on component mount
onMounted(() => {
  theme.loadTheme();
});

const handleLogout = () => {
  auth.logout();
};

const toggleDarkMode = () => {
  theme.toggleDark();
};
</script>

<template>
  <!-- Mobile sidebar overlay -->
  <div
     v-if="isOpen"
     @click="emit('close')"
     class="fixed inset-0 bg-black/20 lg:hidden z-30 backdrop-blur-sm"
  ></div>

  <!-- Sidebar -->
  <aside :class="[
    'fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 text-[#333] dark:text-gray-100 transform transition-all duration-300 ease-in-out border-r border-[#eee] dark:border-gray-700',
    isOpen ? 'translate-x-0' : '-translate-x-full',
    'lg:translate-x-0 lg:transform-none'
  ]">
    <div class="flex flex-col p-6 h-full space-y-8">
      <div class="flex items-center space-x-3">
        <div class="w-9 h-9 rounded-lg bg-[#e8f5f9] dark:bg-blue-900/50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#3a9cb5] dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 class="text-xl font-medium">My App</h2>
      </div>
           
      <nav class="flex-1">
        <ul class="space-y-1">
          <li>
            <NuxtLink
               to="/"
               class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-gray-800 transition-colors duration-200 text-[#555] dark:text-gray-300"
              active-class="bg-[#f0f7ff] dark:bg-blue-900/30 text-[#3a9cb5] dark:text-blue-400 font-medium border-l-4 border-[#3a9cb5] dark:border-blue-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Dashboard</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
               to="/profile"
               class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-gray-800 transition-colors duration-200 text-[#555] dark:text-gray-300"
              active-class="bg-[#f0f7ff] dark:bg-blue-900/30 text-[#3a9cb5] dark:text-blue-400 font-medium border-l-4 border-[#3a9cb5] dark:border-blue-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Profile</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <footer class="mt-auto space-y-2">
        <!-- Dark Mode Toggle Button -->
        <button
           @click="toggleDarkMode"
           class="w-full flex items-center justify-between space-x-2 py-2.5 px-4 rounded-lg bg-[#f5f5f5] dark:bg-gray-800 hover:bg-[#eee] dark:hover:bg-gray-700 transition-colors duration-200 text-[#555] dark:text-gray-300 hover:text-[#333] dark:hover:text-white"
        >
          <div class="flex items-center space-x-2">
            <!-- Light Mode Icon -->
            <svg v-if="theme.dark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <!-- Dark Mode Icon -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <span>{{ theme.dark ? 'Light Mode' : 'Dark Mode' }}</span>
          </div>
          <!-- Toggle indicator -->
          <div class="flex items-center">
            <div :class="[
              'w-10 h-5 rounded-full p-0.5 transition-colors duration-200',
              theme.dark ? 'bg-blue-600' : 'bg-gray-300'
            ]">
              <div :class="[
                'w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200',
                theme.dark ? 'translate-x-5' : 'translate-x-0'
              ]"></div>
            </div>
          </div>
        </button>

        <!-- Logout Button -->
        <button
           @click="handleLogout"
           class="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg bg-[#f5f5f5] dark:bg-gray-800 hover:bg-[#eee] dark:hover:bg-gray-700 transition-colors duration-200 text-[#555] dark:text-gray-300 hover:text-[#333] dark:hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </footer>
    </div>
  </aside>
</template>