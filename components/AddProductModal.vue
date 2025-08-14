<template>
    <!-- Modal toggle -->
    <button @click="toggleModal" class="flex items-center gap-2 text-white bg-gradient-to-r from-blue-900 to-pink-900 focus:ring-4 focus:outline-none
             focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2.5 my-4
             dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add Product
    </button>

    <!-- Main modal -->
    <div v-show="isOpen" @click.self="closeModal"
        class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black/50">
        <div class="relative p-4 w-full max-w-2xl">
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <!-- Header -->
                <div class="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Create New Product
                    </h3>
                    <button type="button" @click="closeModal"
                        class="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>

                <!-- Body -->
                <form class="p-4" @submit.prevent="addProduct">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <ProductInput id="name" label="Product Name" type="text" v-model="name" />
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <ProductInput id="price" label="Product Price" type="number" v-model.number="price" />
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Category
                            </label>
                            <select id="category" v-model="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 
                         dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 
                         dark:text-white">
                                <option value="" disabled>Select category</option>
                                <option value="TV">TV/Monitors</option>
                                <option value="PC">PC</option>
                                <option value="GA">Gaming/Console</option>
                                <option value="PH">Phones</option>
                            </select>
                        </div>
                        <div class="col-span-2">
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Product Description
                            </label>
                            <textarea v-model="description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg 
                         border border-gray-300 focus:ring-blue-500 focus:border-blue-500 
                         dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 
                         dark:text-white" placeholder="Write product description here"></textarea>
                        </div>
                    </div>
                    <button type="submit" class="flex items-center gap-2 text-white bg-gradient-to-r from-blue-900 to-pink-900 focus:ring-4 focus:outline-none
             focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2.5 my-4
             dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
                        Add new product
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const store = useProductStore()

const isOpen = ref(false)
const name = ref('')
const price = ref<number | null>(null)
const category = ref('')
const description = ref('')

const toggleModal = () => (isOpen.value = !isOpen.value)
const closeModal = () => (isOpen.value = false)

const addProduct = () => {
  store.addProduct({
    name: name.value,
    price: price.value || 0,
    category: category.value,
    description: description.value
  })

  closeModal()

  name.value = ''
  price.value = null
  category.value = ''
  description.value = ''
}
</script>
