<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
    id: string;
    label: string;
    type?: string;
    modelValue: string | number;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="w-full">
        <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {{ label }}
        </label>
        <input :id="id" :type="type || 'text'" :value="modelValue"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
             dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 
             dark:text-white" :placeholder="label" required />
    </div>
</template>
