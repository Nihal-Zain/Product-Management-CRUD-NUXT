<script setup lang="ts">
import { ref } from "vue";
const email = ref("");
const password = ref("");

const handleLogin = () => {
  if (!email.value.trim() || !password.value.trim()) {
    alert("All fields are required");
  }
  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");

  if (email.value === storedEmail && password.value === storedPassword) {
    alert("Login successful!");
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "/";
  } else {
    alert("Invalid email or password");
  }
};
</script>

<template>
  <div class="login-form py-16 px-6">
    <h1 class="text-4xl font-bold text-center mb-12 tracking-wide">Login</h1>

    <form
      @submit.prevent="handleLogin"
      class="max-w-lg mx-auto shadow-2xl rounded-xl bg-white border border-gray-200 p-8 sm:p-10 space-y-6"
    >
      <BaseInput id="email" label="Your email" type="email" v-model="email" />
      <BaseInput id="password" label="Your password" type="password" v-model="password" />

      <div class="flex items-center gap-2">
        <input id="remember" type="checkbox" required class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300" />
        <label for="remember" class="text-sm font-medium text-gray-700">Remember me</label>
      </div>

      <button
        type="submit"
        class="w-full rounded-lg bg-gradient-to-r from-blue-900 to-pink-900 px-6 py-3 text-white font-medium hover:opacity-90 transition"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  background-color: rgb(234, 229, 218);
  min-height: 100vh;
}
.login-form h1 {
  color: rgb(65, 19, 47);
  font-family: 'Lucida Sans', 'Lucida Sans Regular', sans-serif;
}
</style>
