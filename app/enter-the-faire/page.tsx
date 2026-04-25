import { getBooks } from '@/lib/supabase'
import BookCard from '@/components/BookCard'

export const revalidate = 60

const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Thriller', 'Fantasy', 'Biography', 'Self-Help']

export default async function EnterTheFairePage({
  searchParams
}: {
  searchParams: { genre?: string; format?: string; search?: string }
}) {
  const books = await getBooks().catch(() => [])

  const filtered = books.filter(book => {
    if (searchParams.genre && book.genre !== searchParams.genre) return false
    if (searchParams.format && !book.book_formats?.some(f => f.format === searchParams.format)) return false
    if (searchParams.search) {
      const q = searchParams.search.toLowerCase()
      return book.title.toLowerCase().includes(q) || book.description?.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="pt-24 pb-24 px-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="text-center py-16">
        <p className="text-xs tracking-[0.5em] uppercase mb-6"
          style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#c9a84c' }}>
          ✦ &nbsp; All Performances &nbsp; ✦
        </p>
        <h1 className="mb-4"
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '0.15em', color: '#e8e8e8' }}>
          Enter the Faire
        </h1>
        <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: '#666' }}>
          Every story is a performance waiting for its audience.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center">
        <a href="/enter-the-faire"
          className={`px-4 py-2 text-xs tracking-[0.2em] uppercase border rounded-sm transition-all duration-200 ${!searchParams.genre && !searchParams.format ? 'border-amber-700/60 text-amber-600' : 'border-white/8 text-faire-mist hover:border-white/20'}`}
          style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
          All Stages
        </a>
        {['digital', 'physical', 'audio'].map(fmt => (
          <a key={fmt} href={`/enter-the-faire?format=${fmt}`}
            className={`px-4 py-2 text-xs tracking-[0.2em] uppercase border rounded-sm transition-all duration-200 ${searchParams.format === fmt ? 'border-amber-700/60 text-amber-600' : 'border-white/8 text-faire-mist hover:border-white/20'}`}
            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
            {fmt === 'digital' ? '📖' : fmt === 'physical' ? '📚' : '🎧'} {fmt}
          </a>
        ))}
      </div>

      {/* Genre pills */}
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {genres.map(genre => (
          <a key={genre} href={`/enter-the-faire?genre=${genre}`}
            className={`px-3 py-1 text-xs border rounded-sm transition-all duration-200 ${searchParams.genre === genre ? 'border-amber-700/50 text-amber-700' : 'border-white/5 text-zinc-600 hover:border-white/15'}`}
            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200 }}>
            {genre}
          </a>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: '#555', fontSize: '1.2rem' }}>
            No performances match your search.<br />The stage awaits its next act.
          </p>
          <a href="/enter-the-faire" className="btn-ghost px-8 py-3 rounded-sm inline-block mt-8"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '0.9rem', letterSpacing: '0.2em' }}>
            Clear Filters
          </a>
        </div>
      ) : (
        <>
          <p className="text-xs tracking-[0.2em] uppercase mb-8"
            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#444' }}>
            {filtered.length} performance{filtered.length !== 1 ? 's' : ''} on stage
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
