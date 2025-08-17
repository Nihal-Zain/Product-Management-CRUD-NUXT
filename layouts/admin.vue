<script setup>
const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const closeSidebar = () => {
  isOpen.value = false;
};

// Initialize theme on layout mount
const theme = useThemeStore();
onMounted(() => {
  theme.loadTheme();
});
</script>

<template>
  <div class="flex min-h-screen bg-[#fafafa] dark:bg-gray-900 transition-colors duration-200">
    <Sidebar :is-open="isOpen" @close="closeSidebar" />
    
    <!-- Main Content -->
    <div class="flex-1 flex flex-col w-full min-h-screen overflow-hidden">
      <Navbar :toggle-sidebar="toggleSidebar" />
      
      <!-- Page Content -->
      <main class="flex-1 p-4 lg:p-6 bg-[#fafafa] dark:bg-gray-900 transition-colors duration-200">
        <div class="max-w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-[#eee] dark:border-gray-700 p-6 transition-colors duration-200">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>