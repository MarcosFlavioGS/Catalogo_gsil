import { Product } from '@/types/product'

export const productList: Product[] = [
  {
    id: '1',
    name: 'Papel Seda',
    description: 'Papel seda em bobina',
    price: 45.99,
    category: 'Seda',
    imageUrl: '/products/Seda4.jpg',
    sizeOptions: ['50cm', '70cm', '120cm', '100cm', '160cm'],
    weight: ['20g/m²']
  },
  {
    id: '2',
    name: 'Papel Kraft',
    description: 'Papel Kraft em bobina',
    price: 32.5,
    category: 'Kraft',
    imageUrl: '/products/kraft.jpg',
    sizeOptions: ['160cm x 250m', '170cm x 250m', '180cm x 250m'],
    weight: ['35g/m²']
  },
  {
    id: '3',
    name: 'Papel Molde',
    description: 'Papel Kraft molde em bobina',
    price: 32.5,
    category: 'Molde',
    imageUrl: '/products/Molde1.jpg',
    sizeOptions: ['120cm'],
    weight: ['80g/m²', '120/m²', '140/m²', '200g/m²', '300g/m²']
  },
  {
    id: '4',
    name: 'Papel Intercalar',
    description: 'Papel de Intercalar em bobina',
    price: 32.5,
    category: 'Intercalar',
    imageUrl: '/products/Intercalar.jpg',
    sizeOptions: ['160cm x 300m', '180cm x 300m'],
    weight: ['24g/m²']
  },
  {
    id: '5',
    name: 'Papel branco',
    description: 'Papel branco sulfite',
    price: 32.5,
    category: 'Branco',
    imageUrl: '/products/branco.jpg',
    sizeOptions: ['91,4cm', '160cm', '180cm', '184cm'],
    weight: ['40g/m²']
  },
  {
    id: '6',
    name: 'Papel Kraft Mix',
    description: 'Papel ecologico kraft mix',
    price: 32.5,
    category: 'Mix',
    imageUrl: '/products/mix.jpg',
    sizeOptions: ['120cm', '160cm', '180cm', '184cm'],
    weight: ['40g/m²', '60g/m²']
  }
]
