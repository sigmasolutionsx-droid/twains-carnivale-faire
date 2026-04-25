import Link from 'next/link'
import { getFeaturedBooks, getSpotlightEvent, getBooks, getAverageRating, getLowestPrice } from '@/lib/supabase'
import BookCard from '@/components/BookCard'
import SpotlightBanner from '@/components/SpotlightBanner'

export const revalidate = 60

export default async function HomePage() {
  const [featured, spotlight, allBooks] = await Promise.all([
    getFeaturedBooks().catch(() => []),
    getSpotlightEvent().catch(() => null),
    getBooks().catch(() => []),
  ])

  const newReleases = allBooks.slice(0, 4)
  const risingActs = allBooks.filter(b => !b.featured).slice(0, 4)

  return (
    <div className="pt-16">

      {/* HERO — The Grand Entrance */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden curtain-bg">

        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, #c9a84c44, #c9a84c, #c9a84c44, transparent)' }} />

        {/* Background smoke effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #8b0000 0%, transparent 70%)' }} />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full opacity-5 animate-smoke-drift"
            style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Pre-title */}
          <p className="text-xs tracking-[0.5em] uppercase mb-8 animate-fade-up"
            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#c9a84c', animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
            ✦ &nbsp; The curtain rises &nbsp; ✦
          </p>

          {/* Main title */}
          <h1 className="mb-4 leading-none animate-fade-up"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(4rem, 12vw, 9rem)', letterSpacing: '0.08em', color: '#e8e8e8', animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
            TWAIN'S
          </h1>
          <h2 className="mb-8 leading-none animate-fade-up"
            style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: '#c9a84c', animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
            Carnivale Faire
          </h2>

          {/* Divider */}
          <div className="faire-divider max-w-xs mx-auto mb-8 animate-fade-up"
            style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}>
            <span style={{ color: '#c9a84c', fontSize: '1.2rem' }}>✦</span>
          </div>

          {/* Tagline */}
          <p className="mb-12 max-w-xl mx-auto animate-fade-up"
            style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: '#888', lineHeight: 1.8, animationDelay: '1s', opacity: 0, animationFillMode: 'forwards' }}>
            Where stories don't sit on shelves…<br />
            they come alive and take the stage.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
            style={{ animationDelay: '1.2s', opacity: 0, animationFillMode: 'forwards' }}>
            <Link href="/enter-the-faire"
              className="btn-primary px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium rounded-sm inline-block"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', letterSpacing: '0.2em' }}>
              🎪 Enter the Faire
            </Link>
            <Link href="/the-spotlight"
              className="btn-ghost px-10 py-4 text-sm tracking-[0.2em] uppercase rounded-sm inline-block"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', letterSpacing: '0.2em' }}>
              ✦ The Spotlight
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: 'Oswald, sans-serif', color: '#c9a84c' }}>
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-700 to-transparent" />
        </div>
      </section>

      {/* SPOTLIGHT EVENT BANNER */}
      {spotlight && <SpotlightBanner event={spotlight} />}

      {/* HEADLINING TONIGHT */}
      {featured.length > 0 && (
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="faire-divider mb-4">
            <span style={{ color: '#c9a84c' }}>✦</span>
          </div>
          <h2 className="text-center mb-2"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', letterSpacing: '0.2em', color: '#e8e8e8' }}>
            Headlining Tonight
          </h2>
          <p className="text-center mb-16 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#666' }}>
            Our most celebrated performances
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}

      {/* FRESH TO THE FAIRE */}
      {newReleases.length > 0 && (
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="faire-divider mb-4">
            <span style={{ color: '#c9a84c' }}>✦</span>
          </div>
          <h2 className="text-center mb-2"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', letterSpacing: '0.2em', color: '#e8e8e8' }}>
            Fresh to the Faire
          </h2>
          <p className="text-center mb-16 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#666' }}>
            Just stepped onto the stage
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newReleases.map(book => (
              <BookCard key={book.id} book={book} compact />
            ))}
          </div>
        </section>
      )}

      {/* RISING ACTS */}
      {risingActs.length > 0 && (
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="faire-divider mb-4">
            <span style={{ color: '#c9a84c' }}>✦</span>
          </div>
          <h2 className="text-center mb-2"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', letterSpacing: '0.2em', color: '#e8e8e8' }}>
            The Opening Acts
          </h2>
          <p className="text-center mb-16 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#666' }}>
            Rising voices worth watching
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {risingActs.map(book => (
              <BookCard key={book.id} book={book} compact />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/enter-the-faire"
              className="btn-ghost px-10 py-4 rounded-sm inline-block"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', letterSpacing: '0.2em' }}>
              View All Performances →
            </Link>
          </div>
        </section>
      )}

      {/* FORMATS SECTION */}
      <section className="py-24 px-6 border-t border-white/5"
        style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #100505 50%, #0a0a0a 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="faire-divider mb-4">
            <span style={{ color: '#c9a84c' }}>✦</span>
          </div>
          <h2 className="text-center mb-16"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', letterSpacing: '0.2em', color: '#e8e8e8' }}>
            Choose Your Stage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📖',
                label: 'Digital',
                title: 'Read the Manuscript',
                desc: 'Instant download. PDF & ePub formats. Read on any device, anywhere the story calls.',
                color: '#6ab0f5',
              },
              {
                icon: '📚',
                label: 'Physical',
                title: 'Hold the Performance',
                desc: 'Printed and bound. Delivered to your door. A tactile experience for true collectors.',
                color: '#8bc34a',
              },
              {
                icon: '🎧',
                label: 'Audio',
                title: 'Hear the Stage',
                desc: 'Professional narration. MP3 download. Let the story perform for you.',
                color: '#e091c0',
              },
            ].map(format => (
              <div key={format.label}
                className="p-8 border border-white/6 rounded-sm text-center hover:border-amber-700/30 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="text-4xl mb-4">{format.icon}</div>
                <div className={`format-badge format-${format.label.toLowerCase()} mb-4 inline-block`}>
                  {format.label}
                </div>
                <h3 className="mb-3" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: '#e8e8e8' }}>
                  {format.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666', fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
                  {format.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
