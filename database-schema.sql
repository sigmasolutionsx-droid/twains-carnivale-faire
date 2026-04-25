-- ================================================
-- TWAIN'S CARNIVALE FAIRE — Database Schema
-- Run this in Supabase SQL Editor
-- ================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- AUTHORS
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BOOKS
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  author_id UUID REFERENCES authors(id),
  description TEXT,
  cover_url TEXT,
  genre TEXT,
  tags TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  spotlight BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'coming_soon', 'retired')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BOOK FORMATS (digital / physical / audio)
CREATE TABLE book_formats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  format TEXT NOT NULL CHECK (format IN ('digital', 'physical', 'audio')),
  price NUMERIC(10,2) NOT NULL,
  stripe_price_id TEXT,
  stripe_product_id TEXT,
  file_url TEXT,
  file_size_mb NUMERIC(6,2),
  duration_minutes INTEGER,
  stock_count INTEGER,
  isbn TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CUSTOMERS
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORDERS
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'fulfilled', 'refunded', 'cancelled')),
  total_amount NUMERIC(10,2),
  currency TEXT DEFAULT 'usd',
  shipping_name TEXT,
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORDER ITEMS
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  book_format_id UUID REFERENCES book_formats(id),
  quantity INTEGER DEFAULT 1,
  unit_price NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DOWNLOADS (secure time-limited links)
CREATE TABLE downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_item_id UUID REFERENCES order_items(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id),
  token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  download_count INTEGER DEFAULT 0,
  max_downloads INTEGER DEFAULT 5,
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '7 days',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SPOTLIGHT EVENTS (weekly featured)
CREATE TABLE spotlight_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  book_id UUID REFERENCES books(id),
  discount_percent NUMERIC(5,2),
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  banner_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- REVIEWS
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CART ITEMS
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT,
  customer_id UUID REFERENCES customers(id),
  book_format_id UUID REFERENCES book_formats(id),
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_books_featured ON books(featured);
CREATE INDEX idx_books_spotlight ON books(spotlight);
CREATE INDEX idx_books_genre ON books(genre);
CREATE INDEX idx_books_status ON books(status);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_downloads_token ON downloads(token);
CREATE INDEX idx_downloads_customer ON downloads(customer_id);
CREATE INDEX idx_cart_session ON cart_items(session_id);

-- SEED: Add your author
INSERT INTO authors (name, bio) VALUES (
  'Your Name Here',
  'Author at TWAIN''s Carnivale Faire — where stories come alive and take the stage.'
);

-- SEED: Add your first book (update cover_url and author_id after running)
-- INSERT INTO books (title, subtitle, author_id, description, genre, featured)
-- VALUES ('F*ck What When & Where', 'Your Answer Is Why!', '<author_id_here>', 'Your description here', 'Non-Fiction', true);
