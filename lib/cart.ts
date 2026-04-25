'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BookFormat, Book } from './supabase'

export type CartItem = {
  id: string
  book: Book
  format: BookFormat
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (book: Book, format: BookFormat) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: () => number
  itemCount: () => number
  hasPhysical: () => boolean
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (book, format) => {
        const existing = get().items.find(i => i.format.id === format.id)
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i.format.id === format.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          }))
        } else {
          set(state => ({
            items: [...state.items, {
              id: `${book.id}-${format.id}`,
              book,
              format,
              quantity: 1,
            }]
          }))
        }
      },

      removeItem: (id) => {
        set(state => ({ items: state.items.filter(i => i.id !== id) }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set(state => ({
          items: state.items.map(i => i.id === id ? { ...i, quantity } : i)
        }))
      },

      clearCart: () => set({ items: [] }),

      total: () => get().items.reduce((sum, i) => sum + i.format.price * i.quantity, 0),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      hasPhysical: () => get().items.some(i => i.format.format === 'physical'),
    }),
    { name: 'twains-faire-cart' }
  )
)
