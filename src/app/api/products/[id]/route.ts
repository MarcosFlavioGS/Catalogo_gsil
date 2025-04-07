import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Product } from '@/types/product'

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: productId } = await params

    // Read the current products
    const filePath = path.join(process.cwd(), 'src/data/products.json')
    const productsData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    // Find the product to delete
    const productIndex = productsData.findIndex((product: Product) => product.id === productId)

    if (productIndex === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Get the product to check if it has an image
    const product = productsData[productIndex]

    // Remove the product from the array
    productsData.splice(productIndex, 1)

    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(productsData, null, 2))

    // If the product has an image in the public/products directory, delete it
    if (product.imageUrl && product.imageUrl.startsWith('/products/')) {
      const imagePath = path.join(process.cwd(), 'public', product.imageUrl)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
