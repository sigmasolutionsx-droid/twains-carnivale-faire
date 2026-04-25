import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6"
      style={{ background: 'rgba(5,5,5,0.95)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <p className="font-heading text-2xl tracking-widest"
                style={{ fontFamily: 'Bebas Neue, sans-serif', background: 'linear-gradient(135deg, #c9a84c, #e8b84b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                TWAIN'S
              </p>
              <p className="text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#555' }}>
                Carnivale Faire
              </p>
            </div>
            <p style={{ fontFamily: 'IM Fell English, serif', fontStyle: 'italic', color: '#444', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '280px' }}>
              Where stories don't sit on shelves… they come alive and take the stage.
            </p>
          </div>

          {/* The Faire */}
          <div>
            <h4 className="mb-4 text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 400, color: '#666' }}>
              The Faire
            </h4>
            <div className="space-y-3">
              {[
                { href: '/enter-the-faire', label: 'Enter the Faire' },
                { href: '/the-spotlight', label: 'The Spotlight' },
                { href: '/authors-stage', label: "Author's Stage" },
                { href: '/programme', label: 'Your Programme' },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="block text-xs hover:text-amber-700 transition-colors"
                  style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#444' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="mb-4 text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 400, color: '#666' }}>
              Info
            </h4>
            <div className="space-y-3">
              {[
                { href: '/about', label: 'About' },
                { href: '/faq', label: 'FAQ' },
                { href: '/shipping', label: 'Shipping' },
                { href: '/returns', label: 'Returns' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="block text-xs hover:text-amber-700 transition-colors"
                  style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#444' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#333' }}>
            © {new Date().getFullYear()} TWAIN's Carnivale Faire. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { href: '/privacy', label: 'Privacy' },
              { href: '/terms', label: 'Terms' },
            ].map(link => (
              <Link key={link.href} href={link.href}
                className="text-xs hover:text-amber-700 transition-colors"
                style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#333' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
