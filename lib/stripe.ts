import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export async function createCheckoutSession({
  items,
  customerEmail,
  successUrl,
  cancelUrl,
  shippingRequired,
}: {
  items: { stripe_price_id: string; quantity: number; format: string }[]
  customerEmail?: string
  successUrl: string
  cancelUrl: string
  shippingRequired: boolean
}) {
  const lineItems = items.map(item => ({
    price: item.stripe_price_id,
    quantity: item.quantity,
  }))

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    customer_email: customerEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
    shipping_address_collection: shippingRequired
      ? { allowed_countries: ['US', 'CA', 'GB', 'AU'] }
      : undefined,
    metadata: {
      source: 'twains_carnivale_faire',
    },
    custom_text: {
      submit: {
        message: 'Welcome to TWAIN\'s Carnivale Faire — your story awaits.',
      },
    },
  })

  return session
}
