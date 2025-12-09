-- DFW Furniture Database Schema
-- PostgreSQL Production Database Schema

-- Create database (run this manually)
-- CREATE DATABASE dfw_furniture;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================
-- 🔐 Users and Authentication
-- ================================

-- Main users table (customers)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    gender VARCHAR(10),
    is_verified BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active',
    profile_image TEXT,
    preferences JSONB DEFAULT '{}'
);

-- Admin users table
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(200),
    role VARCHAR(50) DEFAULT 'admin',
    permissions JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User sessions
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    refresh_token_hash VARCHAR(255),
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- OTP verifications
CREATE TABLE otp_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    identifier VARCHAR(255) NOT NULL, -- email or phone
    otp_code VARCHAR(10) NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'email', 'sms', 'login', 'reset'
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- 🛍️ Products and Catalog
-- ================================

-- Product categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES categories(id),
    image_url TEXT,
    banner_image TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    seo_title VARCHAR(200),
    seo_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product subcategories
CREATE TABLE subcategories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    description TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    category_id UUID REFERENCES categories(id),
    subcategory_id UUID REFERENCES subcategories(id),
    sku VARCHAR(100) UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    cost_price DECIMAL(10,2),
    stock_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 5,
    dimensions JSONB, -- {length, width, height, unit}
    weight DECIMAL(8,2),
    material VARCHAR(100),
    color VARCHAR(50),
    brand VARCHAR(100),
    warranty_period VARCHAR(50),
    care_instructions TEXT,
    features JSONB DEFAULT '[]',
    specifications JSONB DEFAULT '{}',
    images JSONB DEFAULT '[]',
    has_360_view BOOLEAN DEFAULT FALSE,
    model_3d_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_customizable BOOLEAN DEFAULT FALSE,
    assembly_required BOOLEAN DEFAULT FALSE,
    average_rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    seo_title VARCHAR(200),
    seo_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product variants (for different colors, sizes, etc.)
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(100),
    sku VARCHAR(100) UNIQUE,
    price DECIMAL(10,2),
    stock_quantity INTEGER DEFAULT 0,
    attributes JSONB, -- {color: 'red', size: 'large'}
    images JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- 🛒 Orders and Sales
-- ================================

-- Customer addresses
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) DEFAULT 'home', -- 'home', 'office', 'other'
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company VARCHAR(100),
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    phone VARCHAR(20),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shopping cart
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    customization_details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    status VARCHAR(30) DEFAULT 'pending',
    payment_status VARCHAR(30) DEFAULT 'pending',
    shipping_status VARCHAR(30) DEFAULT 'not_shipped',
    
    -- Amounts
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    
    -- Customer details (snapshot)
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20),
    customer_name VARCHAR(200),
    
    -- Shipping details
    shipping_address JSONB,
    billing_address JSONB,
    shipping_method VARCHAR(50),
    tracking_number VARCHAR(100),
    
    -- Timestamps
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_date TIMESTAMP,
    shipped_date TIMESTAMP,
    delivered_date TIMESTAMP,
    
    -- Additional details
    notes TEXT,
    admin_notes TEXT,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    
    -- Product snapshot (in case product changes)
    product_name VARCHAR(255) NOT NULL,
    product_sku VARCHAR(100),
    product_image TEXT,
    
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    
    customization_details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- 💳 Payments
-- ================================

-- Payment transactions
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    payment_method VARCHAR(50) NOT NULL, -- 'razorpay', 'payu', 'cod'
    payment_gateway VARCHAR(50),
    transaction_id VARCHAR(255),
    gateway_payment_id VARCHAR(255),
    gateway_order_id VARCHAR(255),
    
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    status VARCHAR(30) DEFAULT 'pending',
    
    gateway_response JSONB,
    failure_reason TEXT,
    
    payment_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- 📞 Customer Interactions
-- ================================

-- Demo bookings
CREATE TABLE demo_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Customer details
    customer_name VARCHAR(200) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20) NOT NULL,
    
    -- Booking details
    preferred_date DATE,
    preferred_time TIME,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    
    -- Product interest
    products_interested JSONB DEFAULT '[]',
    budget_range VARCHAR(50),
    room_type VARCHAR(50),
    message TEXT,
    
    -- Status and assignment
    status VARCHAR(30) DEFAULT 'pending',
    assigned_to UUID REFERENCES admin_users(id),
    completed_at TIMESTAMP,
    
    -- Admin notes
    admin_notes TEXT,
    follow_up_date DATE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact inquiries
CREATE TABLE contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    
    inquiry_type VARCHAR(50) DEFAULT 'general',
    priority VARCHAR(20) DEFAULT 'normal',
    status VARCHAR(30) DEFAULT 'new',
    
    assigned_to UUID REFERENCES admin_users(id),
    responded_at TIMESTAMP,
    response_message TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customer support tickets
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    
    user_id UUID REFERENCES users(id),
    order_id UUID REFERENCES orders(id),
    
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50),
    priority VARCHAR(20) DEFAULT 'normal',
    status VARCHAR(30) DEFAULT 'open',
    
    assigned_to UUID REFERENCES admin_users(id),
    resolved_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Support ticket messages
CREATE TABLE support_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
    
    sender_type VARCHAR(20) NOT NULL, -- 'customer', 'admin'
    sender_id UUID, -- user_id or admin_id
    sender_name VARCHAR(200),
    
    message TEXT NOT NULL,
    attachments JSONB DEFAULT '[]',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- ⭐ Reviews and Ratings
-- ================================

-- Product reviews
CREATE TABLE product_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    order_id UUID REFERENCES orders(id),
    
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    review_text TEXT,
    
    pros TEXT,
    cons TEXT,
    
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    
    helpful_count INTEGER DEFAULT 0,
    reported_count INTEGER DEFAULT 0,
    
    reviewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP,
    approved_by UUID REFERENCES admin_users(id)
);

-- Review helpfulness votes
CREATE TABLE review_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID REFERENCES product_reviews(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    is_helpful BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(review_id, user_id)
);

-- ================================
-- 📊 Analytics and Tracking
-- ================================

-- Website visitors
CREATE TABLE visitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    
    -- Location data
    country VARCHAR(100),
    region VARCHAR(100),
    city VARCHAR(100),
    
    -- Device info
    device_type VARCHAR(20), -- 'mobile', 'desktop', 'tablet'
    browser VARCHAR(50),
    os VARCHAR(50),
    
    -- Visit details
    page_visited VARCHAR(500),
    referrer TEXT,
    time_spent INTEGER, -- in seconds
    
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Page views
CREATE TABLE page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visitor_id UUID REFERENCES visitors(id),
    page_path VARCHAR(500) NOT NULL,
    page_title VARCHAR(255),
    time_spent INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- 🎨 Custom Designs
-- ================================

-- Custom design requests
CREATE TABLE custom_designs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_number VARCHAR(50) UNIQUE NOT NULL,
    
    user_id UUID REFERENCES users(id),
    
    -- Customer details
    customer_name VARCHAR(200) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20),
    
    -- Design requirements
    room_type VARCHAR(50),
    room_dimensions VARCHAR(100),
    style_preference VARCHAR(100),
    color_preference VARCHAR(100),
    budget_range VARCHAR(50),
    
    description TEXT,
    inspiration_images JSONB DEFAULT '[]',
    
    -- Status and assignment
    status VARCHAR(30) DEFAULT 'received',
    assigned_to UUID REFERENCES admin_users(id),
    estimated_cost DECIMAL(10,2),
    estimated_timeline VARCHAR(100),
    
    -- Files and designs
    design_files JSONB DEFAULT '[]',
    quotation_file TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- 🔔 Notifications
-- ================================

-- System notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    recipient_type VARCHAR(20) NOT NULL, -- 'user', 'admin'
    recipient_id UUID NOT NULL,
    
    type VARCHAR(50) NOT NULL, -- 'order', 'payment', 'booking', etc.
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    action_url TEXT,
    
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- 📧 Communication Logs
-- ================================

-- Email logs
CREATE TABLE email_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    to_email VARCHAR(255) NOT NULL,
    from_email VARCHAR(255),
    subject VARCHAR(255),
    template_name VARCHAR(100),
    
    status VARCHAR(30) DEFAULT 'sent',
    error_message TEXT,
    
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SMS logs
CREATE TABLE sms_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    to_phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    template_name VARCHAR(100),
    
    status VARCHAR(30) DEFAULT 'sent',
    gateway_response JSONB,
    error_message TEXT,
    
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- WhatsApp logs
CREATE TABLE whatsapp_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    to_phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'text',
    
    status VARCHAR(30) DEFAULT 'sent',
    gateway_response JSONB,
    error_message TEXT,
    
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- 🔍 INDEXES FOR PERFORMANCE
-- ================================

-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Product indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_subcategory ON products(subcategory_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_rating ON products(average_rating);
CREATE INDEX idx_products_featured ON products(is_featured);

-- Order indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_order_date ON orders(order_date);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);

-- Session indexes
CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_admin_id ON user_sessions(admin_id);
CREATE INDEX idx_sessions_token_hash ON user_sessions(token_hash);
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at);

-- Visitor tracking indexes
CREATE INDEX idx_visitors_session_id ON visitors(session_id);
CREATE INDEX idx_visitors_ip_address ON visitors(ip_address);
CREATE INDEX idx_visitors_visited_at ON visitors(visited_at);

-- ================================
-- 📊 VIEWS FOR ANALYTICS
-- ================================

-- Popular products view
CREATE VIEW popular_products AS
SELECT 
    p.id,
    p.name,
    p.price,
    p.average_rating,
    p.total_reviews,
    p.total_sales,
    c.name as category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.is_active = true
ORDER BY p.total_sales DESC, p.average_rating DESC;

-- Order analytics view
CREATE VIEW order_analytics AS
SELECT 
    DATE(order_date) as order_day,
    COUNT(*) as total_orders,
    SUM(total_amount) as total_revenue,
    AVG(total_amount) as average_order_value,
    COUNT(DISTINCT user_id) as unique_customers
FROM orders
WHERE status != 'cancelled'
GROUP BY DATE(order_date)
ORDER BY order_day DESC;

-- Customer analytics view
CREATE VIEW customer_analytics AS
SELECT 
    u.id,
    u.email,
    u.created_at as registration_date,
    COUNT(o.id) as total_orders,
    COALESCE(SUM(o.total_amount), 0) as lifetime_value,
    MAX(o.order_date) as last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.status != 'cancelled'
GROUP BY u.id, u.email, u.created_at;

-- ================================
-- 🎯 INITIAL DATA INSERTS
-- ================================

-- Insert default admin user
INSERT INTO admin_users (username, email, password_hash, full_name, role, permissions)
VALUES (
    'admin',
    'admin@dfwfurniture.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj5J8KlEQ7k2', -- 'admin123'
    'DFW Administrator',
    'super_admin',
    '["all"]'
);

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
('Bedroom', 'bedroom', 'Bedroom furniture including beds, wardrobes, and nightstands'),
('Living Room', 'living-room', 'Living room furniture including sofas, tables, and entertainment units'),
('Dining', 'dining', 'Dining room furniture including tables, chairs, and storage'),
('Office', 'office', 'Office furniture including desks, chairs, and storage solutions'),
('Kids', 'kids', 'Kids furniture including beds, study tables, and storage'),
('Outdoor', 'outdoor', 'Outdoor furniture including garden sets and patio furniture');

-- Update timestamps trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_demo_bookings_updated_at BEFORE UPDATE ON demo_bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Database schema complete ✅