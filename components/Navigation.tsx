'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/cart'

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const count = itemCount()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md"
      style={{ background: 'rgba(10,10,10,0.92)' }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-heading text-2xl tracking-widest text-gold-gradient"
            style={{ fontFamily: 'Bebas Neue, sans-serif', background: 'linear-gradient(135deg, #c9a84c, #e8b84b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            TWAIN'S
          </span>
          <span className="text-[10px] tracking-[0.3em] text-faire-mist uppercase font-light"
            style={{ fontFamily: 'Oswald, sans-serif' }}>
            Carnivale Faire
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '/enter-the-faire', label: 'Enter the Faire' },
            { href: '/the-spotlight', label: 'The Spotlight' },
            { href: '/authors-stage', label: "Author's Stage" },
            { href: '/about', label: 'About' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              className="text-xs tracking-[0.2em] uppercase text-faire-mist hover:text-faire-gold transition-colors duration-300"
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart */}
        <div className="flex items-center gap-4">
          <Link href="/programme" className="relative group">
            <div className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-sm hover:border-amber-700/50 transition-all duration-300"
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.15em', fontSize: '0.75rem', color: '#c9a84c' }}>
              🎭 Your Programme
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: '#8b0000', color: '#e8e8e8', fontFamily: 'Oswald, sans-serif' }}>
                  {count}
                </span>
              )}
            </div>
          </Link>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-faire-mist">
            <div className="w-5 h-px bg-current mb-1.5" />
            <div className="w-5 h-px bg-current mb-1.5" />
            <div className="w-5 h-px bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 py-4 px-6 space-y-4"
          style={{ background: 'rgba(10,10,10,0.98)' }}>
          {[
            { href: '/enter-the-faire', label: 'Enter the Faire' },
            { href: '/the-spotlight', label: 'The Spotlight' },
            { href: '/authors-stage', label: "Author's Stage" },
            { href: '/about', label: 'About' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm tracking-widest uppercase text-faire-mist hover:text-amber-400 transition-colors"
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
