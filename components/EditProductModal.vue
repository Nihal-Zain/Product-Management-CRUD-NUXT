<script setup lang="ts">
import { ref, watch } from "vue";
import { useProductStore } from "@/stores/products";

interface Product {
  name: string;
  price: number;
  category: string;
  description: string;
}

const props = defineProps<{
  isOpen: boolean;
  productIndex: number | null; // index of product in store
}>();

const emit = defineEmits(["close"]);

const store = useProductStore();

const form = ref<Product>({
  name: "",
  price: 0,
  category: "",
  description: ""
});

watch(
  () => props.productIndex,
  (newIndex) => {
    if (newIndex !== null && store.products[newIndex]) {
      form.value = { ...store.products[newIndex] };
    }
  },
  { immediate: true }
);

function closeModal() {
  emit("close");
}

function submitForm() {
  if (props.productIndex !== null) {
    store.updateProduct(props.productIndex, form.value);
  }
  closeModal();
}
</script>

<template>
  <div v-show="props.isOpen" @click.self="closeModal" class="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
    <div class="bg-white dark:bg-gray-700 rounded-lg shadow-lg w-full max-w-2xl p-5">
      <!-- Header -->
      <div class="flex items-center justify-between border-b pb-3">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Update Product</h3>
        <button type="button" @click="closeModal" class="text-gray-400 hover:bg-gray-200 rounded-lg p-1.5">✕</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="mt-4 space-y-4">
        <div>
          <label class="block text-sm font-medium">Name</label>
          <input v-model="form.name" type="text" class="w-full p-2 border rounded-lg" required />
        </div>
        <div>
          <label class="block text-sm font-medium">Price</label>
          <input v-model.number="form.price" type="number" class="w-full p-2 border rounded-lg" required />
        </div>
        <div>
          <label class="block text-sm font-medium">Category</label>
          <select v-model="form.category" class="w-full p-2 border rounded-lg">
            <option value="TV">TV/Monitors</option>
            <option value="PC">PC</option>
            <option value="GA">Gaming/Console</option>
            <option value="PH">Phones</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium">Description</label>
          <textarea v-model="form.description" rows="4" class="w-full p-2 border rounded-lg"></textarea>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>
