import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' })
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Session

    // Get or create customer
    const { data: customer } = await supabase
      .from('customers')
      .upsert({
        email: session.customer_email || session.customer_details?.email,
        stripe_customer_id: session.customer as string,
        name: session.customer_details?.name,
      }, { onConflict: 'email' })
      .select()
      .single()

    if (!customer) return NextResponse.json({ received: true })

    // Create order
    const { data: order } = await supabase
      .from('orders')
      .insert({
        customer_id: customer.id,
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent,
        status: 'paid',
        total_amount: (session.amount_total || 0) / 100,
        currency: session.currency || 'usd',
        shipping_address: session.shipping_details,
      })
      .select()
      .single()

    // TODO: Create order items and generate download links
    // This requires matching stripe line items to book_format records
    // That logic depends on having stripe_price_id populated in book_formats

    console.log('Order fulfilled:', order?.id)
  }

  return NextResponse.json({ received: true })
}
