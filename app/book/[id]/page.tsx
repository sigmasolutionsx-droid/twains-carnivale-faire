import { getBook } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import AddToCart from '@/components/AddToCart'

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id).catch(() => null)
  if (!book) notFound()

  const formats = book.book_formats || []
  const avgRating = book.reviews?.length
    ? book.reviews.reduce((s: number, r: any) => s + r.rating, 0) / book.reviews.length
    : 0

  return (
    <div className="pt-24 pb-24 px-6 max-w-6xl mx-auto">

      {/* Breadcrumb */}
      <p className="text-xs tracking-[0.3em] uppercase mb-12"
        style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#444' }}>
        <a href="/" className="hover:text-amber-700 transition-colors">Home</a>
        <span className="mx-3">✦</span>
        <a href="/enter-the-faire" className="hover:text-amber-700 transition-colors">The Faire</a>
        <span className="mx-3">✦</span>
        <span style={{ color: '#666' }}>{book.title}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Cover */}
        <div className="flex justify-center lg:justify-start">
          <div className="w-full max-w-sm">
            <div className="aspect-[2/3] rounded-sm overflow-hidden border"
              style={{ borderColor: 'rgba(201,168,76,0.2)', boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(139,0,0,0.15)' }}>
              {book.cover_url ? (
                <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #1a0505 0%, #0a0a0a 100%)' }}>
                  <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '4rem', color: '#c9a84c33' }}>TCF</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div>
          {book.genre && (
            <p className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#c9a84c' }}>
              {book.genre}
            </p>
          )}

          <h1 className="mb-2 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#e8e8e8' }}>
            {book.title}
          </h1>

          {book.subtitle && (
            <p className="mb-4" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.2rem', color: '#666' }}>
              {book.subtitle}
            </p>
          )}

          {book.authors && (
            <p className="mb-6" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300, color: '#888' }}>
              by {book.authors.name}
            </p>
          )}

          {/* Rating */}
          {avgRating > 0 && (
            <div className="flex items-center gap-2 mb-6">
              {'★'.repeat(Math.round(avgRating)).split('').map((_, i) => (
                <span key={i} style={{ color: '#c9a84c' }}>★</span>
              ))}
              {'☆'.repeat(5 - Math.round(avgRating)).split('').map((_, i) => (
                <span key={i} style={{ color: '#333' }}>☆</span>
              ))}
              <span className="text-xs ml-1" style={{ color: '#555', fontFamily: 'Oswald, sans-serif' }}>
                ({book.reviews?.length} reviews)
              </span>
            </div>
          )}

          {/* Tags */}
          {book.tags && book.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {book.tags.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 border border-white/8 rounded-sm"
                  style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300, color: '#555' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="faire-divider mb-6">
            <span style={{ color: '#c9a84c' }}>✦</span>
          </div>

          {/* Description */}
          {book.description && (
            <p className="mb-8 leading-relaxed"
              style={{ fontFamily: 'IM Fell English, serif', fontSize: '1rem', color: '#888', lineHeight: 1.9 }}>
              {book.description}
            </p>
          )}

          {/* Format selection + Add to cart */}
          <AddToCart book={book} formats={formats} />
        </div>
      </div>

      {/* Reviews */}
      {book.reviews && book.reviews.length > 0 && (
        <div className="mt-24 border-t border-white/5 pt-16">
          <div className="faire-divider mb-4">
            <span style={{ color: '#c9a84c' }}>✦</span>
          </div>
          <h2 className="text-center mb-12"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', letterSpacing: '0.2em', color: '#e8e8e8' }}>
            From the Audience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {book.reviews.map((review: any) => (
              <div key={review.id} className="p-6 border border-white/6 rounded-sm"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="flex gap-1 mb-3">
                  {'★'.repeat(review.rating).split('').map((_, i) => (
                    <span key={i} style={{ color: '#c9a84c', fontSize: '0.8rem' }}>★</span>
                  ))}
                </div>
                {review.review_text && (
                  <p className="text-sm leading-relaxed mb-3"
                    style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#888' }}>
                    "{review.review_text}"
                  </p>
                )}
                {review.customers?.name && (
                  <p className="text-xs tracking-widest"
                    style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#555' }}>
                    — {review.customers.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
