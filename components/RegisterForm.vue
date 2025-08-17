<script setup lang="ts">
import { ref } from 'vue';

const floating_email = ref("");
const floating_password = ref("");
const floating_first_name = ref("");
const floating_last_name = ref("");
const floating_repeat_password = ref("");

// Get the auth store
const auth = useAuthStore();

const handleRegister = () => {
    if (
        !floating_email.value.trim() ||
        !floating_password.value.trim() ||
        !floating_first_name.value.trim() ||
        !floating_last_name.value.trim() ||
        !floating_repeat_password.value.trim()
    ) {
        alert("All fields are required");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(floating_email.value)) {
        alert("Invalid email address");
        return;
    }

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(floating_password.value)) {
        alert(
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
        return;
    }

    if (floating_password.value !== floating_repeat_password.value) {
        alert("Passwords do not match");
        return;
    }

    // Save credentials for login verification (keep snake_case for backwards compatibility)
    localStorage.setItem("email", floating_email.value);
    localStorage.setItem("password", floating_password.value);
    localStorage.setItem("first_name", floating_first_name.value);
    localStorage.setItem("last_name", floating_last_name.value);

    // Automatically log the user in after successful registration
    auth.login({
        email: floating_email.value,
        firstName: floating_first_name.value,
        lastName: floating_last_name.value
    });

    alert("Registration successful! You are now logged in.");
    
    // Clear form
    floating_email.value = "";
    floating_password.value = "";
    floating_first_name.value = "";
    floating_last_name.value = "";
    floating_repeat_password.value = "";

    // Redirect to profile or dashboard
    navigateTo("/profile");
};
</script>

<template>
    <div class="register-form py-16 px-6">
        <h1 class="text-4xl font-bold text-center mb-12 tracking-wide">Register Now</h1>

        <form @submit.prevent="handleRegister"
            class="max-w-lg mx-auto shadow-2xl rounded-xl bg-white border border-gray-200 p-8 sm:p-10 space-y-6">
            <BaseInput id="floating_email" label="Email address" type="email" v-model="floating_email" />
            <BaseInput id="floating_password" label="Password" type="password" v-model="floating_password" />
            <BaseInput id="floating_repeat_password" label="Confirm password" type="password"
                v-model="floating_repeat_password" />

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <BaseInput id="floating_first_name" label="First name" type="text" v-model="floating_first_name" />
                <BaseInput id="floating_last_name" label="Last name" type="text" v-model="floating_last_name" />
            </div>

            <button type="submit"
                class="w-full rounded-lg bg-gradient-to-r from-blue-900 to-pink-900 px-6 py-3 text-white font-medium hover:opacity-90 transition">
                Submit
            </button>
        </form>
    </div>
</template>

<style scoped>
.register-form {
    background-color: rgb(234, 229, 218);
    min-height: 100vh;
}

.register-form h1 {
    color: rgb(65, 19, 47);
    font-family: 'Lucida Sans', 'Lucida Sans Regular', sans-serif;
}
</style>