import { Product } from '@/types/product'

export const productList: Product[] = [
  {
    id: '1',
    name: 'Seda',
    description: 'Papel seda em bobina',
    price: 45.99,
    category: 'Papel para Impressão',
    imageUrl: '/seda.png',
    sizeOptions: ['120cm', '160cm', '70cm', '100cm'],
    weight: '20g/m²'
  },
  {
    id: '2',
    name: 'Kraft',
    description: 'Papel Kraft em bobina',
    price: 32.5,
    category: 'Papel para Escritório',
    imageUrl: '/kraft.png',
    sizeOptions: ['120cm', '160cm'],
    weight: '40g/m²'
  }
]
