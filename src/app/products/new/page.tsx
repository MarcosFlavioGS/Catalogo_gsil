'use client'

import { Header } from '@/components/ui/header/header'
import Footer from '@/components/ui/footer/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'sonner'

export default function NewProductPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    sizeOptions: '',
    weight: '',
    lengthOptions: ''
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // Convert comma-separated strings to arrays
      const sizeOptions = formData.sizeOptions.split(',').map((option) => option.trim())
      const weight = formData.weight.split(',').map((w) => w.trim())
      const lengthOptions = formData.lengthOptions ? formData.lengthOptions.split(',').map((l) => l.trim()) : []

      const newProduct = {
        id: Date.now().toString(), // Simple ID generation
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        imageUrl: formData.imageUrl,
        sizeOptions,
        weight,
        lengthOptions
      }

      // Send the new product to the API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      })

      if (!response.ok) {
        throw new Error('Failed to add product')
      }

      // Redirect to the catalog page
      router.push('/')
    } catch (error) {
      console.error('Error adding product:', error)
      toast.error('Falha ao adicionar produto. Por favor, tente novamente.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a preview URL
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    // Upload the file
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()
      
      // Update the form data with the uploaded image URL
      setFormData(prev => ({
        ...prev,
        imageUrl: data.url
      }))
      
      toast.success('Imagem enviada com sucesso!')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Falha ao enviar imagem. Por favor, tente novamente.')
      setPreviewUrl(null)
    } finally {
      setIsUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='bg-white'>
      <Header />

      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Adicionar Novo Produto</h1>

        <form
          onSubmit={handleSubmit}
          className='space-y-6 max-w-2xl'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Nome do Produto</Label>
            <Input
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Descrição</Label>
            <Textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='price'>Preço</Label>
            <Input
              id='price'
              name='price'
              type='number'
              step='0.01'
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='category'>Categoria</Label>
            <Input
              id='category'
              name='category'
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label>Imagem do Produto</Label>
            <div className='flex flex-col gap-4'>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                accept='image/*'
                className='hidden'
              />
              
              <div className='flex items-center gap-4'>
                <Button 
                  type='button' 
                  variant='outline' 
                  onClick={triggerFileInput}
                  disabled={isUploading}>
                  {isUploading ? 'Enviando...' : 'Selecionar Imagem'}
                </Button>
                
                {formData.imageUrl && (
                  <span className='text-sm text-muted-foreground'>
                    Imagem selecionada: {formData.imageUrl}
                  </span>
                )}
              </div>
              
              {previewUrl && (
                <div className='relative h-48 w-48 border rounded-md overflow-hidden'>
                  <Image
                    src={previewUrl}
                    alt='Preview'
                    fill
                    className='object-contain'
                  />
                </div>
              )}
              
              <div className='text-sm text-muted-foreground'>
                <p>Ou insira a URL da imagem manualmente:</p>
                <Input
                  id='imageUrl'
                  name='imageUrl'
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder='/products/nome-da-imagem.jpg'
                  className='mt-1'
                />
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='sizeOptions'>Opções de Tamanho (separadas por vírgula)</Label>
            <Input
              id='sizeOptions'
              name='sizeOptions'
              value={formData.sizeOptions}
              onChange={handleChange}
              placeholder='Ex: 50cm, 70cm, 120cm'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='weight'>Gramaturas (separadas por vírgula)</Label>
            <Input
              id='weight'
              name='weight'
              value={formData.weight}
              onChange={handleChange}
              placeholder='Ex: 20g/m², 35g/m²'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='lengthOptions'>Opções de Metragem (separadas por vírgula)</Label>
            <Input
              id='lengthOptions'
              name='lengthOptions'
              value={formData.lengthOptions}
              onChange={handleChange}
              placeholder='Ex: 100m, 200m, 300m'
            />
            <p className='text-sm text-muted-foreground'>Deixe em branco se o produto não tiver opções de metragem</p>
          </div>

          <div className='flex gap-4'>
            <Button type='submit'>Adicionar Produto</Button>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.push('/catalog')}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
