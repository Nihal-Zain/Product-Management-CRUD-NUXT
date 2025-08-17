<script setup>
const props = defineProps({
  toggleSidebar: {
    type: Function,
    required: true
  }
});
</script>

<template>
  <header class="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b border-[#eee] dark:border-gray-700 p-4 lg:px-6 flex items-center transition-colors duration-200">
    <button
       @click="toggleSidebar"
       class="p-2 text-[#666] dark:text-gray-400 rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-gray-700 lg:hidden transition-colors duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    <h1 class="ml-2 text-lg font-medium text-[#444] dark:text-gray-200">Dashboard</h1>
  </header>
</template>