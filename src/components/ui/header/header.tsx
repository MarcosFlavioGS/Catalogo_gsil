import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

export function Header() {
  return (
    <header className='bg-white shadow-sm'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo and Main Navigation */}
          <div className='flex items-center gap-8'>
            {/* Logo */}
            <Link
              href='/'
              className='flex items-center gap-2'>
              <span className='text-2xl font-bold text-primary'>GSil Papéis</span>
            </Link>

            {/* Navigation Links */}
            <nav className='hidden md:flex items-center gap-6'>
              <Link
                href='/'
                className='text-sm font-medium text-gray-700 hover:text-primary transition-colors'>
                Início
              </Link>
              <Link
                href='/about'
                className='text-sm font-medium text-gray-700 hover:text-primary transition-colors'>
                Sobre Nós
              </Link>
              <Link
                href='/contact'
                className='text-sm font-medium text-gray-700 hover:text-primary transition-colors'>
                Contato
              </Link>
            </nav>
          </div>

          {/* External Link and Cart */}
          <div className='flex items-center gap-4'>
            {/* External Link */}
            <Button
              asChild
              variant='outline'>
              <Link
                href='https://www.gsilpapeis.com'
                target='_blank'
                rel='noopener noreferrer'>
                Visite Nosso Site
              </Link>
            </Button>

            {/* Shopping Cart (Optional) */}
            <Button
              variant='ghost'
              size='icon'
              className='relative'>
              <ShoppingCart className='h-5 w-5' />
              <span className='sr-only'>Carrinho</span>
              {/* Cart Item Count (Optional) */}
              <span className='absolute top-0 right-0 bg-primary text-white rounded-full text-xs px-1.5 py-0.5'>
                3
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
