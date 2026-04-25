import Link from 'next/link'
import { Book, getAverageRating, getLowestPrice } from '@/lib/supabase'

type Props = {
  book: Book
  compact?: boolean
}

export default function BookCard({ book, compact }: Props) {
  const avgRating = getAverageRating(book.reviews || [])
  const lowestPrice = getLowestPrice(book.book_formats || [])
  const formats = book.book_formats || []

  return (
    <Link href={`/book/${book.id}`} className="block">
      <div className={`book-card rounded-sm overflow-hidden ${compact ? '' : ''}`}
        style={{ background: 'rgba(255,255,255,0.02)' }}>

        {/* Cover */}
        <div className={`relative overflow-hidden ${compact ? 'aspect-[2/3]' : 'aspect-[2/3]'} bg-faire-charcoal`}>
          {book.cover_url ? (
            <img src={book.cover_url} alt={book.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1a0505 0%, #0a0a0a 100%)' }}>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3rem', color: '#c9a84c44' }}>
                TCF
              </span>
            </div>
          )}

          {/* Spotlight badge */}
          {book.spotlight && (
            <div className="absolute top-3 left-3 px-2 py-1 text-[10px] tracking-widest uppercase"
              style={{ fontFamily: 'Bebas Neue, sans-serif', background: '#8b0000', color: '#e8b84b', letterSpacing: '0.15em' }}>
              ✦ Spotlight
            </div>
          )}

          {/* Format badges */}
          <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
            {formats.map(f => (
              <span key={f.id} className={`format-badge format-${f.format}`}>
                {f.format === 'digital' ? '📖' : f.format === 'physical' ? '📚' : '🎧'} {f.format}
              </span>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className={`p-4 ${compact ? '' : 'p-6'}`}>
          {book.genre && (
            <p className="text-[10px] tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#c9a84c' }}>
              {book.genre}
            </p>
          )}

          <h3 className={`mb-1 leading-tight ${compact ? 'text-base' : 'text-xl'}`}
            style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
            {book.title}
          </h3>

          {book.subtitle && !compact && (
            <p className="text-sm mb-2" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: '#666' }}>
              {book.subtitle}
            </p>
          )}

          {book.authors && (
            <p className="text-xs mb-3" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300, color: '#555' }}>
              {book.authors.name}
            </p>
          )}

          <div className="flex items-center justify-between mt-3">
            {avgRating > 0 && (
              <div className="flex items-center gap-1">
                {'★'.repeat(Math.round(avgRating)).split('').map((s, i) => (
                  <span key={i} style={{ color: '#c9a84c', fontSize: '0.7rem' }}>★</span>
                ))}
                {'☆'.repeat(5 - Math.round(avgRating)).split('').map((s, i) => (
                  <span key={i} style={{ color: '#333', fontSize: '0.7rem' }}>☆</span>
                ))}
              </div>
            )}
            {lowestPrice > 0 && (
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', color: '#c9a84c', letterSpacing: '0.05em' }}>
                from ${lowestPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
