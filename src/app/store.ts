import { create } from 'zustand'

interface Kart {
  itemCount: number
  items: string[]
  addItem: (item: string) => void
  removeItem: (item: string) => void
}

const useKartStore = create<Kart>((set) => ({
  itemCount: 0,
  items: [],
  addItem: (item: string) =>
    set((state) => ({
      items: [...state.items, item],
      itemCount: state.itemCount + 1
    })),
  removeItem: (item: string) =>
    set((state) => ({
      items: state.items.filter((i) => i !== item),
      itemCount: state.itemCount - 1
    }))
}))

export default useKartStore
