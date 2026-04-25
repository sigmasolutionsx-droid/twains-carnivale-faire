import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "TWAIN's Carnivale Faire",
  description: "Where stories don't sit on shelves… they come alive and take the stage.",
  openGraph: {
    title: "TWAIN's Carnivale Faire",
    description: "Where stories don't sit on shelves… they come alive and take the stage.",
    type: 'website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="smoke-overlay" />
        <Navigation />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
