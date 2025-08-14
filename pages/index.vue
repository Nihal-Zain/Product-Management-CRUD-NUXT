<script setup lang="ts">
import { ref } from "vue";

interface Product {
  name: string;
  price: number;
  category: string;
  description: string;
}

const isEditModalOpen = ref(false);
const selectedProduct = ref<Product | null>(null);
const selectedProductIndex = ref<number | null>(null);
function handleEditProduct(index: number) {
  selectedProductIndex.value = index;
  isEditModalOpen.value = true;
}

function updateProduct(updated: Product) {
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  const index = products.findIndex((p: Product) => p.name === selectedProduct.value?.name);
  if (index !== -1) {
    products[index] = updated;
    localStorage.setItem("products", JSON.stringify(products));
  }
  isEditModalOpen.value = false;
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 py-6 px-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-pink-800 drop-shadow-md">
        Product Management
      </h1>
      <div class="mt-4 sm:mt-0">
        <AddProductModal />
      </div>
    </div>

    <!-- Table Card -->
    <div
      class="bg-white shadow-lg rounded-xl border border-pink-100 p-4 hover:shadow-xl transition-shadow duration-300">
      <ProductTable @edit-product="handleEditProduct" />
    </div>

    <!-- Edit Product Modal -->
    <EditProductModal :isOpen="isEditModalOpen" :productIndex="selectedProductIndex" @close="isEditModalOpen = false" />

  </div>
</template>
