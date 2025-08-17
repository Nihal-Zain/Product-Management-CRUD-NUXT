<!-- pages/profile.vue -->
<script setup lang="ts">
import { ref, onMounted } from "vue";

definePageMeta({
  layout: "admin"
});

const auth = useAuthStore();

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
  avatar: string;
  joinedDate: string;
}

const isEditing = ref(false);
const isLoading = ref(true);
const profile = ref<UserProfile>({
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  bio: '',
  avatar: '',
  joinedDate: ''
});

// Form data for editing
const editForm = ref<UserProfile>({
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  bio: '',
  avatar: '',
  joinedDate: ''
});

// Load profile data
const loadProfile = () => {
  if (process.client) {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        profile.value = { ...parsed };
      } catch (error) {
        console.error("Error parsing profile data:", error);
      }
    } else {
      // Initialize with default data if no profile exists
      profile.value = {
        email: auth.user?.email || 'user@example.com',
        firstName: auth.user?.firstName || '',
        lastName: auth.user?.lastName || '',
        phone: '',
        bio: '',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('John Doe')}&background=3a9cb5&color=fff&size=128`,
        joinedDate: new Date().toISOString()
      };
      saveProfile();
    }
  }
};

// Save profile data
const saveProfile = () => {
  if (process.client) {
    localStorage.setItem("userProfile", JSON.stringify(profile.value));
  }
};

// Start editing
const startEdit = () => {
  editForm.value = { ...profile.value };
  isEditing.value = true;
};

// Cancel editing
const cancelEdit = () => {
  editForm.value = { ...profile.value };
  isEditing.value = false;
};

// Save changes
const saveChanges = () => {
  profile.value = { ...editForm.value };
  // Update avatar URL if name changed
  profile.value.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.value.firstName + ' ' + profile.value.lastName)}&background=3a9cb5&color=fff&size=128`;
  saveProfile();
  isEditing.value = false;
};

// Generate new avatar
const generateAvatar = () => {
  const fullName = `${editForm.value.firstName} ${editForm.value.lastName}`;
  editForm.value.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=3a9cb5&color=fff&size=128`;
};

// Initialize
onMounted(async () => {
  // Make sure auth is initialized
  if (!auth.initialized) {
    auth.loadAuth();
  }
  
  // Small delay to ensure everything is ready
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Final check - if still not authenticated, redirect
  if (!auth.isLoggedIn) {
    await navigateTo('/login');
    return;
  }
  
  loadProfile();
  isLoading.value = false;
});
</script>

<template>
  <div v-if="!isLoading" class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-6 px-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-blue-800 dark:text-blue-400 drop-shadow-md">
          User Profile
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Manage your account information and preferences</p>
      </div>
    </div>

    <!-- Profile Card -->
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-blue-100 dark:border-gray-700 overflow-hidden">
      <!-- Cover Section -->
      <div class="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <div class="absolute inset-0 bg-black/10"></div>
      </div>

      <!-- Profile Content -->
      <div class="relative px-6 pb-6">
        <!-- Avatar -->
        <div class="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 mb-6">
          <div class="relative">
            <img 
              :src="isEditing ? editForm.avatar : profile.avatar" 
              :alt="`${profile.firstName} ${profile.lastName}`"
              class="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg bg-white"
            >
            <div v-if="isEditing" class="absolute bottom-2 right-2">
              <button
                @click="generateAvatar"
                class="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors duration-200"
                title="Generate new avatar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="mt-4 sm:mt-0 flex-1">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ profile.firstName }} {{ profile.lastName }}
                </h2>
                <p class="text-gray-600 dark:text-gray-400">{{ profile.email }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Joined {{ new Date(profile.joinedDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) }}
                </p>
              </div>
              
              <div class="mt-4 sm:mt-0">
                <button
                  v-if="!isEditing"
                  @click="startEdit"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit Profile</span>
                </button>
                
                <div v-else class="flex space-x-2">
                  <button
                    @click="saveChanges"
                    class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save</span>
                  </button>
                  <button
                    @click="cancelEdit"
                    class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Information -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Personal Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Personal Information
            </h3>
            
            <div class="space-y-4">
              <!-- First Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                <input
                  v-if="isEditing"
                  v-model="editForm.firstName"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                <p v-else class="text-gray-900 dark:text-white">{{ profile.firstName }}</p>
              </div>
              
              <!-- Last Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                <input
                  v-if="isEditing"
                  v-model="editForm.lastName"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                <p v-else class="text-gray-900 dark:text-white">{{ profile.lastName }}</p>
              </div>
              
              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  v-if="isEditing"
                  v-model="editForm.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                <p v-else class="text-gray-900 dark:text-white">{{ profile.email }}</p>
              </div>
              
              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <input
                  v-if="isEditing"
                  v-model="editForm.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                <p v-else class="text-gray-900 dark:text-white">{{ profile.phone }}</p>
              </div>
            </div>
          </div>

          <!-- Additional Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              About
            </h3>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
              <textarea
                v-if="isEditing"
                v-model="editForm.bio"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                placeholder="Tell us about yourself..."
              ></textarea>
              <p v-else class="text-gray-900 dark:text-white">{{ profile.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Loading state -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Loading profile...</p>
    </div>
  </div>
</template>