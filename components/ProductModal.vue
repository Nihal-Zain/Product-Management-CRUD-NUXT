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
    <div>
        <h1>hi</h1>
    </div>
</template>

