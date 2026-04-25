import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Book = {
  id: string
  title: string
  subtitle?: string
  author_id: string
  description: string
  cover_url: string
  genre: string
  tags: string[]
  featured: boolean
  spotlight: boolean
  status: 'active' | 'coming_soon' | 'retired'
  created_at: string
  authors?: Author
  book_formats?: BookFormat[]
  reviews?: Review[]
}

export type BookFormat = {
  id: string
  book_id: string
  format: 'digital' | 'physical' | 'audio'
  price: number
  stripe_price_id?: string
  stripe_product_id?: string
  file_url?: string
  file_size_mb?: number
  duration_minutes?: number
  stock_count?: number
  isbn?: string
}

export type Author = {
  id: string
  name: string
  bio?: string
  avatar_url?: string
}

export type Customer = {
  id: string
  email: string
  name?: string
  stripe_customer_id?: string
}

export type Order = {
  id: string
  customer_id: string
  stripe_session_id: string
  status: 'pending' | 'paid' | 'fulfilled' | 'refunded' | 'cancelled'
  total_amount: number
  currency: string
  shipping_address?: any
  created_at: string
}

export type Review = {
  id: string
  book_id: string
  customer_id: string
  rating: number
  review_text?: string
  created_at: string
}

export type SpotlightEvent = {
  id: string
  title: string
  description?: string
  book_id?: string
  discount_percent?: number
  starts_at: string
  ends_at: string
  banner_url?: string
  books?: Book
}

// Fetch all active books with formats
export async function getBooks() {
  const { data, error } = await supabase
    .from('books')
    .select(`*, authors(*), book_formats(*), reviews(rating)`)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Book[]
}

// Fetch featured books (Headlining Tonight)
export async function getFeaturedBooks() {
  const { data, error } = await supabase
    .from('books')
    .select(`*, authors(*), book_formats(*), reviews(rating)`)
    .eq('featured', true)
    .eq('status', 'active')
    .limit(6)
  if (error) throw error
  return data as Book[]
}

// Fetch a single book
export async function getBook(id: string) {
  const { data, error } = await supabase
    .from('books')
    .select(`*, authors(*), book_formats(*), reviews(*, customers(*))`)
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Book
}

// Fetch active spotlight event
export async function getSpotlightEvent() {
  const { data, error } = await supabase
    .from('spotlight_events')
    .select(`*, books(*, authors(*), book_formats(*))`)
    .lte('starts_at', new Date().toISOString())
    .gte('ends_at', new Date().toISOString())
    .single()
  if (error) return null
  return data as SpotlightEvent
}

// Get books by genre
export async function getBooksByGenre(genre: string) {
  const { data, error } = await supabase
    .from('books')
    .select(`*, authors(*), book_formats(*), reviews(rating)`)
    .eq('genre', genre)
    .eq('status', 'active')
  if (error) throw error
  return data as Book[]
}

// Average rating helper
export function getAverageRating(reviews: { rating: number }[]): number {
  if (!reviews || reviews.length === 0) return 0
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
}

// Lowest price for a book
export function getLowestPrice(formats: BookFormat[]): number {
  if (!formats || formats.length === 0) return 0
  return Math.min(...formats.map(f => f.price))
}
