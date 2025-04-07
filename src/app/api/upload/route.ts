import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Create a unique filename
    const timestamp = Date.now()
    const originalName = file.name
    const fileName = `${timestamp}-${originalName}`

    // Convert the file to a buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure the products directory exists
    const productsDir = path.join(process.cwd(), 'public/products')
    if (!fs.existsSync(productsDir)) {
      fs.mkdirSync(productsDir, { recursive: true })
    }

    // Write the file to the products directory
    const filePath = path.join(productsDir, fileName)
    fs.writeFileSync(filePath, buffer)

    // Return the URL path to the uploaded file
    return NextResponse.json({
      success: true,
      url: `/products/${fileName}`
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
