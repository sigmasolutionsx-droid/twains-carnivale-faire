import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' })
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function POST(req: Request) {
  try {
    const { items, hasPhysical } = await req.json()

    // Build line items - if no stripe_price_id, create price on the fly
    const lineItems = await Promise.all(
      items.map(async (item: any) => {
        if (item.stripe_price_id) {
          return { price: item.stripe_price_id, quantity: item.quantity }
        }
        // Create a one-time price dynamically
        const price = await stripe.prices.create({
          unit_amount: Math.round(item.price * 100),
          currency: 'usd',
          product_data: {
            name: `${item.book_title} (${item.format})`,
          },
        })
        return { price: price.id, quantity: item.quantity }
      })
    )

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${appUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/programme`,
      shipping_address_collection: hasPhysical
        ? { allowed_countries: ['US', 'CA', 'GB', 'AU', 'NZ'] }
        : undefined,
      custom_text: {
        submit: {
          message: "Welcome to TWAIN's Carnivale Faire — your story awaits on stage.",
        },
      },
      metadata: { source: 'twains_carnivale_faire' },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
