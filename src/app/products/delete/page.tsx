'use client'

import { Header } from '@/components/ui/header/header'
import Footer from '@/components/ui/footer/footer'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Product } from '@/types/product'

export default function DeleteProductPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
        toast.error('Falha ao carregar produtos. Por favor, tente novamente.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (productId: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
      return
    }

    setIsDeleting(productId)
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      // Remove the product from the state
      setProducts(products.filter((product) => product.id !== productId))
      toast.success('Produto excluído com sucesso!')
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Falha ao excluir produto. Por favor, tente novamente.')
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className='bg-white min-h-screen'>
      <Header />

      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold'>Gerenciar Produtos</h1>
          <div className='flex gap-4'>
            <Button onClick={() => router.push('/products/new')}>Adicionar Novo Produto</Button>
            <Button
              variant='outline'
              onClick={() => router.push('/catalog')}>
              Voltar ao Catálogo
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className='text-center py-12'>
            <p className='text-muted-foreground'>Carregando produtos...</p>
          </div>
        ) : products.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-muted-foreground'>Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products.map((product) => (
              <Card
                key={product.id}
                className='overflow-hidden'>
                <div className='relative h-48'>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className='object-contain p-4'
                  />
                </div>
                <CardContent className='p-4'>
                  <div className='flex justify-between items-start mb-2'>
                    <h3 className='text-lg font-semibold'>{product.name}</h3>
                    <Badge variant='outline'>{product.category}</Badge>
                  </div>
                  <p className='text-sm text-muted-foreground mb-4 line-clamp-2'>{product.description}</p>
                  <div className='flex justify-between items-center'>
                    <p className='font-medium'>R$ {product.price.toFixed(2)}</p>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => handleDelete(product.id)}
                      disabled={isDeleting === product.id}>
                      {isDeleting === product.id ? 'Excluindo...' : 'Excluir'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
