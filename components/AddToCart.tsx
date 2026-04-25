'use client'
import { useState } from 'react'
import { Book, BookFormat } from '@/lib/supabase'
import { useCart } from '@/lib/cart'

type Props = {
  book: Book
  formats: BookFormat[]
}

const formatLabels: Record<string, { icon: string; label: string; sublabel: string }> = {
  digital: { icon: '📖', label: 'Digital', sublabel: 'Instant Download • PDF & ePub' },
  physical: { icon: '📚', label: 'Physical', sublabel: 'Printed & Shipped • 5–10 days' },
  audio: { icon: '🎧', label: 'Audio', sublabel: 'MP3 Download • Full Narration' },
}

export default function AddToCart({ book, formats }: Props) {
  const [selected, setSelected] = useState<BookFormat | null>(formats[0] || null)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const handleAdd = () => {
    if (!selected) return
    addItem(book, selected)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (formats.length === 0) {
    return (
      <p style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300, color: '#555' }}>
        Coming soon to the stage.
      </p>
    )
  }

  return (
    <div>
      {/* Format selector */}
      <p className="text-xs tracking-[0.3em] uppercase mb-4"
        style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#666' }}>
        Choose Your Stage
      </p>
      <div className="flex flex-col gap-3 mb-8">
        {formats.map(format => {
          const meta = formatLabels[format.format]
          const isSelected = selected?.id === format.id
          return (
            <button key={format.id}
              onClick={() => setSelected(format)}
              className="flex items-center gap-4 p-4 border rounded-sm text-left transition-all duration-200"
              style={{
                borderColor: isSelected ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.06)',
                background: isSelected ? 'rgba(201,168,76,0.05)' : 'rgba(255,255,255,0.01)',
              }}>
              <span className="text-2xl">{meta.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`format-badge format-${format.format}`}>{meta.label}</span>
                </div>
                <p className="text-xs mt-1" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#555' }}>
                  {meta.sublabel}
                </p>
              </div>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.3rem', color: '#c9a84c', letterSpacing: '0.05em' }}>
                ${format.price.toFixed(2)}
              </span>
            </button>
          )
        })}
      </div>

      {/* CTA */}
      <button onClick={handleAdd}
        disabled={!selected}
        className="w-full py-4 rounded-sm transition-all duration-300 disabled:opacity-40"
        style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '1.1rem',
          letterSpacing: '0.2em',
          background: added ? 'rgba(50,100,50,0.3)' : 'linear-gradient(135deg, #8b0000, #6b0000)',
          color: added ? '#8bc34a' : '#e8e8e8',
          border: `1px solid ${added ? 'rgba(140,195,74,0.4)' : 'rgba(201,168,76,0.3)'}`,
        }}>
        {added ? '✓ Added to Your Programme' : '🎭 Claim Your Seat'}
      </button>

      <p className="text-center mt-4 text-xs"
        style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#444' }}>
        Secure checkout · Instant delivery for digital & audio
      </p>
    </div>
  )
}
