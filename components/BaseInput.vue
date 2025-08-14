<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  type?: string;
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="relative">
    <input
      :id="id"
      :type="type || 'text'"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="peer block w-full border-b-2 border-gray-300 bg-transparent px-0 py-3 text-sm text-gray-900 placeholder-transparent focus:border-blue-600 focus:outline-none"
      :placeholder="label"
    />
    <label
      :for="id"
      class="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-blue-600"
    >
      {{ label }}
    </label>
  </div>
</template>
