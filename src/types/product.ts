export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  sizeOptions?: string[]
  weight?: string[]
}

export type ProductCart = Omit<Product, 'sizeOptions' | 'weight'> & {
  size: string
  weight: string
}
