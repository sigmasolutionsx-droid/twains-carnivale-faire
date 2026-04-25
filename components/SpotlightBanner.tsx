import Link from 'next/link'
import { SpotlightEvent, getLowestPrice } from '@/lib/supabase'

export default function SpotlightBanner({ event }: { event: SpotlightEvent }) {
  const book = event.books
  if (!book) return null

  const endDate = new Date(event.ends_at)
  const timeLeft = endDate.getTime() - Date.now()
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24))

  return (
    <section className="py-20 px-6 border-t border-b spotlight-glow"
      style={{ background: 'linear-gradient(135deg, #1a0505 0%, #0d0808 50%, #1a0505 100%)', borderColor: 'rgba(201,168,76,0.15)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.5em] uppercase mb-3"
            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#c9a84c' }}>
            ✦ &nbsp; This Week Only &nbsp; ✦
          </p>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3rem', letterSpacing: '0.2em', color: '#e8e8e8' }}>
            The Spotlight
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Book cover */}
          <div className="w-48 shrink-0">
            <div className="aspect-[2/3] rounded-sm overflow-hidden border"
              style={{ borderColor: 'rgba(201,168,76,0.3)', boxShadow: '0 0 40px rgba(139,0,0,0.3), 0 0 80px rgba(201,168,76,0.1)' }}>
              {book.cover_url ? (
                <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #1a0505, #0a0a0a)' }} />
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <p className="text-xs tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#8b0000' }}>
              {event.title}
            </p>
            <h3 className="mb-2" style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#e8e8e8' }}>
              {book.title}
            </h3>
            {book.subtitle && (
              <p className="mb-4" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: '#666' }}>
                {book.subtitle}
              </p>
            )}
            {event.description && (
              <p className="mb-6 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300, color: '#888', fontSize: '0.95rem' }}>
                {event.description}
              </p>
            )}

            <div className="flex items-center gap-6 flex-wrap">
              {event.discount_percent && (
                <div className="px-4 py-2 border"
                  style={{ borderColor: 'rgba(201,168,76,0.4)', background: 'rgba(201,168,76,0.05)' }}>
                  <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', color: '#c9a84c', letterSpacing: '0.1em' }}>
                    {event.discount_percent}% OFF
                  </span>
                </div>
              )}
              {daysLeft >= 0 && (
                <p className="text-xs tracking-widest uppercase"
                  style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300, color: '#555' }}>
                  {daysLeft === 0 ? 'Last day!' : `${daysLeft} days remaining`}
                </p>
              )}
              <Link href={`/book/${book.id}`}
                className="btn-primary px-8 py-3 rounded-sm inline-block"
                style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '0.9rem', letterSpacing: '0.2em' }}>
                Claim Your Seat →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
