import { ProductCart } from '@/types/product'
import { create } from 'zustand'

interface Cart {
  itemCount: number
  items: ProductCart[]
  addItem: (item: ProductCart) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
}

const useCartStore = create<Cart>((set) => ({
  itemCount: 0,
  items: [],
  addItem: (item: ProductCart) =>
    set((state) => {
      // Check if item already exists in cart
      const existingItem = state.items.find((i) => i.id === item.id)

      if (existingItem) {
        // If item exists, update quantity
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
          itemCount: state.itemCount + item.quantity
        }
      }

      // If item doesn't exist, add it
      return {
        items: [...state.items, item],
        itemCount: state.itemCount + item.quantity
      }
    }),
  removeItem: (itemId: string) =>
    set((state) => {
      const item = state.items.find((i) => i.id === itemId)
      return {
        items: state.items.filter((i) => i.id !== itemId),
        itemCount: state.itemCount - (item?.quantity || 0)
      }
    }),
  updateQuantity: (itemId: string, quantity: number) =>
    set((state) => {
      const items = state.items.map((item) => (item.id === itemId ? { ...item, quantity } : item))
      const itemCount = items.reduce((total, item) => total + item.quantity, 0)
      return { items, itemCount }
    })
}))

export default useCartStore
