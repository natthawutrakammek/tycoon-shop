-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female', 'Unisex')),
    base_price NUMERIC(10, 2) NOT NULL CHECK (base_price >= 0),
    discount_type TEXT CHECK (discount_type IN ('percentage', 'fixed', 'none')) DEFAULT 'none',
    discount_value NUMERIC(10, 2) DEFAULT 0 CHECK (discount_value >= 0),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Product Variants Table
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    color_name TEXT NOT NULL,
    color_hex TEXT,
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (product_id, color_name)
);

-- 3. Create Site Settings Table (Singleton pattern)
CREATE TABLE IF NOT EXISTS site_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    contact_info TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user email is registered in admin_users
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS BOOLEAN SECURITY DEFINER AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_users 
        WHERE email = auth.jwt() ->> 'email'
    );
END;
$$ LANGUAGE plpgsql;

-- Public Read Policies
CREATE POLICY "Allow public read on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read on product_variants" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Allow public read on site_settings" ON site_settings FOR SELECT USING (true);

-- Admin CRUD Policies
CREATE POLICY "Allow admin all on products" ON products FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Allow admin all on product_variants" ON product_variants FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Allow admin all on site_settings" ON site_settings FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Allow admin all on admin_users" ON admin_users FOR ALL TO authenticated USING (is_admin());

-- Insert Default Site Settings
INSERT INTO site_settings (id, contact_info) 
VALUES ('default', '<h3>Contact Us</h3><p>Email: contact@premiumthreads.com</p><p>Phone: +1 (555) 019-2834</p><p>Address: 123 Fashion Blvd, Suite 400, New York, NY</p>')
ON CONFLICT (id) DO NOTHING;
