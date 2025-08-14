<script setup lang="ts">
import { ref, onMounted } from 'vue'

const store = useProductStore()

const showDescriptionModal = ref(false)
const selectedDescription = ref("")

onMounted(() => {
  store.loadProducts()
})

const emit = defineEmits(['edit-product'])

function openEditModal(index: number) {
  emit('edit-product', index)
}

function openDescriptionModal(description: string) {
  selectedDescription.value = description
  showDescriptionModal.value = true
}

function closeDescriptionModal() {
  showDescriptionModal.value = false
}
</script>

<template>
  <div class="relative overflow-x-auto shadow-lg rounded-xl mt-6 border border-gray-200 dark:border-gray-700">
    <table class="w-full text-sm text-left text-gray-600 dark:text-gray-300">
      <thead
        class="text-xs uppercase bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300">
        <tr>
          <th class="px-6 py-4">Product Name</th>
          <th class="px-6 py-4">Price</th>
          <th class="px-6 py-4">Category</th>
          <th class="px-6 py-4">Description</th>
          <th class="px-6 py-4 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(product, index) in store.products"
          :key="index"
          class="transition hover:bg-blue-50 dark:hover:bg-gray-800"
        >
          <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {{ product.name }}
          </td>
          <td class="px-6 py-4 text-green-600 font-semibold">
            ${{ product.price }}
          </td>
          <td class="px-6 py-4">
            <span
              class="px-3 py-1 text-xs font-medium rounded-full"
              :class="{
                'bg-blue-100 text-blue-800': product.category === 'TV',
                'bg-green-100 text-green-800': product.category === 'PC',
                'bg-purple-100 text-purple-800': product.category === 'GA',
                'bg-yellow-100 text-yellow-800': product.category === 'PH'
              }"
            >
              {{ product.category }}
            </span>
          </td>
          <td class="px-6 py-4 text-gray-500 dark:text-gray-400 max-w-xs whitespace-normal break-words">
            <span>
              {{ product.description.length > 50
                ? product.description.slice(0, 50) + '...'
                : product.description }}
            </span>
            <button
              v-if="product.description.length > 50"
              @click="openDescriptionModal(product.description)"
              class="text-blue-500 text-xs ml-2 underline hover:text-blue-700"
            >
              Read more
            </button>
          </td>

          <td class="px-6 py-4 text-center">
            <button
              class="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              @click="openEditModal(index)"
            >
              Edit
            </button>
            <button
              class="ml-2 px-3 py-1 mt-2.5 md:mt-0 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
              @click="store.deleteProduct(index)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Description Modal -->
  <div
    v-if="showDescriptionModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-80 "
    @click.self="closeDescriptionModal"
  >
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] flex flex-col">
      <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Full Description</h3>
      <div class="overflow-y-auto pr-2 text-gray-700 dark:text-gray-300 whitespace-pre-line" style="max-height: 60vh;">
        {{ selectedDescription }}
      </div>
      <div class="mt-4 text-right">
        <button
          @click="closeDescriptionModal"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
