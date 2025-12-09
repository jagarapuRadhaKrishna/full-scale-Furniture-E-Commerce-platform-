// Production Database Configuration with PostgreSQL
import { Pool } from 'pg'

interface DatabaseConfig {
  host: string
  port: number
  database: string
  username: string
  password: string
  ssl: boolean
  maxConnections: number
}

class ProductionDatabase {
  private pool: Pool | null = null
  private config: DatabaseConfig

  constructor() {
    this.config = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'dfw_furniture',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      ssl: process.env.NODE_ENV === 'production',
      maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '20')
    }
  }

  async initialize() {
    if (this.pool) return this.pool

    this.pool = new Pool({
      host: this.config.host,
      port: this.config.port,
      database: this.config.database,
      user: this.config.username,
      password: this.config.password,
      ssl: this.config.ssl,
      max: this.config.maxConnections,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })

    // Test connection
    try {
      const client = await this.pool.connect()
      console.log('✅ Database connected successfully')
      client.release()
    } catch (error) {
      console.error('❌ Database connection failed:', error)
      throw error
    }

    return this.pool
  }

  async createTables() {
    if (!this.pool) await this.initialize()

    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) UNIQUE,
        name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255),
        role VARCHAR(50) DEFAULT 'customer',
        is_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    const createBookingsTable = `
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(20) NOT NULL,
        address TEXT,
        preferred_date DATE,
        preferred_time TIME,
        service_type VARCHAR(100),
        message TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        whatsapp_sent BOOLEAN DEFAULT false,
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    const createProductsTable = `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2),
        category_id INTEGER,
        images JSONB,
        specifications JSONB,
        stock_quantity INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    const createOrdersTable = `
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        customer_name VARCHAR(255),
        customer_phone VARCHAR(20),
        customer_email VARCHAR(255),
        items JSONB NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        delivery_address TEXT,
        payment_status VARCHAR(50) DEFAULT 'pending',
        payment_method VARCHAR(50),
        tracking_number VARCHAR(100),
        estimated_delivery DATE,
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    const createContactsTable = `
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(20),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        contact_type VARCHAR(50) DEFAULT 'general',
        status VARCHAR(50) DEFAULT 'new',
        whatsapp_sent BOOLEAN DEFAULT false,
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    const createCategoriesTable = `
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        parent_id INTEGER REFERENCES categories(id),
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
      CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
      CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
      CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
      CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
      CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
      CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
      CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
    `

    try {
      await this.pool?.query('BEGIN')
      
      await this.pool?.query(createUsersTable)
      await this.pool?.query(createBookingsTable)
      await this.pool?.query(createProductsTable)
      await this.pool?.query(createOrdersTable)
      await this.pool?.query(createContactsTable)
      await this.pool?.query(createCategoriesTable)
      await this.pool?.query(createIndexes)
      
      await this.pool?.query('COMMIT')
      console.log('✅ Database tables created successfully')
    } catch (error) {
      await this.pool?.query('ROLLBACK')
      console.error('❌ Error creating tables:', error)
      throw error
    }
  }

  async query(text: string, params?: any[]) {
    if (!this.pool) await this.initialize()
    
    const start = Date.now()
    try {
      const result = await this.pool?.query(text, params)
      const duration = Date.now() - start
      console.log('Executed query', { text, duration, rows: result?.rowCount })
      return result
    } catch (error) {
      console.error('Database query error:', error)
      throw error
    }
  }

  async close() {
    if (this.pool) {
      await this.pool.end()
      this.pool = null
      console.log('📕 Database connection closed')
    }
  }
}

// Singleton instance
export const productionDb = new ProductionDatabase()

// Export for use in API routes
export default productionDb