import { Product } from '@/types/product'

export const productList: Product[] = [
  {
    id: '1',
    name: 'Papel Seda',
    description: 'Papel seda em bobina',
    price: 45.99,
    category: 'Seda',
    imageUrl: '/seda.png',
    sizeOptions: ['120cm', '160cm', '50cm', '70cm', '100cm'],
    weight: '20g/m²'
  },
  {
    id: '2',
    name: 'Papel Kraft',
    description: 'Papel Kraft em bobina',
    price: 32.5,
    category: 'Kraft',
    imageUrl: '/kraft.png',
    sizeOptions: ['120cm', '160cm'],
    weight: '40g/m²'
  },
  {
    id: '3',
    name: 'Papel Molde',
    description: 'Papel Kraft molde em bobina',
    price: 32.5,
    category: 'Molde',
    imageUrl: '/kraft.png',
    sizeOptions: ['100cm', '120cm', '160cm'],
    weight: '40g/m²'
  },
  {
    id: '4',
    name: 'Papel Intercalar',
    description: 'Papel de Intercalar em bobina',
    price: 32.5,
    category: 'Intercalar',
    imageUrl: '/kraft.png',
    sizeOptions: ['160cm', '180cm'],
    weight: '40g/m²'
  },
  {
    id: '5',
    name: 'Papel branco',
    description: 'Papel branco sulfite',
    price: 32.5,
    category: 'Branco',
    imageUrl: '/seda.png',
    sizeOptions: ['160cm', '180cm', '184cm'],
    weight: '40g/m²'
  },
  {
    id: '6',
    name: 'Papel Kraft Mix',
    description: 'Papel ecologico kraft mix',
    price: 32.5,
    category: 'Mix',
    imageUrl: '/kraft.png',
    sizeOptions: ['120cm', '160cm', '180cm', '184cm'],
    weight: '40g/m²'
  }
]
