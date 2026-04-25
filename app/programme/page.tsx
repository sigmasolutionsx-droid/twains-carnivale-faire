'use client'
import { useCart } from '@/lib/cart'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProgrammePage() {
  const { items, removeItem, updateQuantity, total, clearCart, hasPhysical } = useCart()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            stripe_price_id: i.format.stripe_price_id,
            quantity: i.quantity,
            format: i.format.format,
            book_title: i.book.title,
            price: i.format.price,
          })),
          hasPhysical: hasPhysical(),
        }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (err) {
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-2xl mx-auto text-center">
        <p className="text-xs tracking-[0.5em] uppercase mb-8"
          style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#c9a84c' }}>
          ✦ &nbsp; Your Programme &nbsp; ✦
        </p>
        <h1 className="mb-6"
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3rem', letterSpacing: '0.2em', color: '#e8e8e8' }}>
          The Stage is Empty
        </h1>
        <p className="mb-10" style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#666' }}>
          Your programme has no acts yet. Enter the Faire and find your next performance.
        </p>
        <Link href="/enter-the-faire" className="btn-primary px-10 py-4 rounded-sm inline-block"
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', letterSpacing: '0.2em' }}>
          🎪 Enter the Faire
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <p className="text-xs tracking-[0.5em] uppercase mb-4"
        style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#c9a84c' }}>
        ✦ &nbsp; Your Programme &nbsp; ✦
      </p>
      <h1 className="mb-16"
        style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3rem', letterSpacing: '0.2em', color: '#e8e8e8' }}>
        Tonight's Selections
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map(item => (
            <div key={item.id} className="flex gap-6 p-6 border border-white/6 rounded-sm"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              {/* Cover thumbnail */}
              <div className="w-16 shrink-0 aspect-[2/3] rounded-sm overflow-hidden bg-faire-charcoal">
                {item.book.cover_url ? (
                  <img src={item.book.cover_url} alt={item.book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #1a0505, #0a0a0a)' }} />
                )}
              </div>

              <div className="flex-1">
                <h3 className="mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
                  {item.book.title}
                </h3>
                <div className={`format-badge format-${item.format.format} mb-3 inline-block`}>
                  {item.format.format}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.format.format === 'physical' && (
                      <>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 border border-white/10 rounded-sm hover:border-amber-700/50 transition-colors"
                          style={{ color: '#888' }}>−</button>
                        <span style={{ fontFamily: 'Oswald, sans-serif', color: '#e8e8e8' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 border border-white/10 rounded-sm hover:border-amber-700/50 transition-colors"
                          style={{ color: '#888' }}>+</button>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.2rem', color: '#c9a84c' }}>
                      ${(item.format.price * item.quantity).toFixed(2)}
                    </span>
                    <button onClick={() => removeItem(item.id)}
                      className="text-xs hover:text-red-400 transition-colors"
                      style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#444' }}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="p-8 border border-white/8 rounded-sm sticky top-24"
            style={{ background: 'rgba(255,255,255,0.02)' }}>
            <h2 className="mb-6 pb-4 border-b border-white/6"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.3rem', letterSpacing: '0.2em', color: '#e8e8e8' }}>
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300, color: '#666' }}>
                    {item.book.title} <span className="text-xs">({item.format.format})</span>
                  </span>
                  <span style={{ color: '#888' }}>${(item.format.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/6 pt-4 mb-8">
              <div className="flex justify-between">
                <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300, color: '#888' }}>Total</span>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', color: '#c9a84c', letterSpacing: '0.05em' }}>
                  ${total().toFixed(2)}
                </span>
              </div>
              {hasPhysical() && (
                <p className="text-xs mt-2" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#555' }}>
                  + Shipping calculated at checkout
                </p>
              )}
            </div>

            <button onClick={handleCheckout} disabled={loading}
              className="w-full py-4 rounded-sm transition-all duration-300 disabled:opacity-60"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '1rem',
                letterSpacing: '0.2em',
                background: 'linear-gradient(135deg, #8b0000, #6b0000)',
                color: '#e8e8e8',
                border: '1px solid rgba(201,168,76,0.3)',
              }}>
              {loading ? 'Opening Curtain...' : '🎭 Claim Your Seat'}
            </button>

            <p className="text-center mt-4 text-xs"
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#444' }}>
              Powered by Stripe · Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
