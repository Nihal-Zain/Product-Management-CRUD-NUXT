import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[]
  }),

  actions: {
    loadProducts() {
      const saved = localStorage.getItem('products')
      if (saved) {
        this.products = JSON.parse(saved)
      }
    },
    addProduct(product: Product) {
      this.products.push(product)
      localStorage.setItem('products', JSON.stringify(this.products))
    },
    updateProduct(index: number, updated: Product) {
      this.products[index] = updated
      localStorage.setItem('products', JSON.stringify(this.products))
    },
    deleteProduct(index: number) {
      this.products.splice(index, 1)
      localStorage.setItem('products', JSON.stringify(this.products))
    }
  }
})

interface Product {
  name: string
  price: number
  category: string
  description: string
}
