import Link from 'next/link'

export default function OrderSuccess() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-2xl mx-auto text-center">
      <div className="mb-8 text-6xl animate-flicker">🎭</div>

      <p className="text-xs tracking-[0.5em] uppercase mb-6"
        style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 200, color: '#c9a84c' }}>
        ✦ &nbsp; The curtain rises &nbsp; ✦
      </p>

      <h1 className="mb-4"
        style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3.5rem', letterSpacing: '0.15em', color: '#e8e8e8' }}>
        Your Seat is Claimed!
      </h1>

      <p className="mb-6"
        style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '1.2rem', color: '#888', lineHeight: 1.8 }}>
        Welcome to the performance. Your order has been received<br />
        and the stage is being prepared for you.
      </p>

      <div className="p-8 border border-white/8 rounded-sm mb-10 text-left"
        style={{ background: 'rgba(255,255,255,0.02)' }}>
        <h2 className="mb-4"
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.2rem', letterSpacing: '0.2em', color: '#e8e8e8' }}>
          What Happens Next
        </h2>
        <div className="space-y-4">
          {[
            { icon: '📧', text: 'A confirmation email is heading your way with your order details.' },
            { icon: '📖', text: 'Digital & Audio: Download links will arrive in your inbox within minutes.' },
            { icon: '📚', text: 'Physical books: Your order will be printed and shipped within 3–5 business days.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-xl shrink-0">{item.icon}</span>
              <p className="text-sm leading-relaxed"
                style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300, color: '#666' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/enter-the-faire"
          className="btn-primary px-10 py-4 rounded-sm inline-block"
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', letterSpacing: '0.2em' }}>
          🎪 Back to the Faire
        </Link>
        <Link href="/"
          className="btn-ghost px-10 py-4 rounded-sm inline-block"
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', letterSpacing: '0.2em' }}>
          Return Home
        </Link>
      </div>
    </div>
  )
}
