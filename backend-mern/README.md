# DFW Furniture - MERN Backend

Complete Node.js + Express + MongoDB backend for DFW Furniture e-commerce platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB 5.0+
- Redis (optional, for caching)

### Installation

```bash
# Navigate to backend directory
cd backend-mern

# Install dependencies
npm install

# Copy environment file
copy .env.example .env

# Update .env with your configuration

# Start MongoDB
mongod

# Start Redis (optional)
redis-server

# Run development server
npm run dev
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
backend-mern/
├── src/
│   ├── config/          # Database, Redis, Cloudinary config
│   ├── models/          # Mongoose models
│   ├── controllers/     # Route controllers
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, validation middleware
│   ├── services/        # Business logic services
│   ├── utils/           # Helper functions
│   └── app.js           # Express app setup
├── server.js            # Entry point
├── package.json
└── .env.example
```

## 🔑 Environment Variables

See `.env.example` for all required variables:
- MongoDB connection string
- JWT secrets
- Cloudinary credentials
- Payment gateway keys
- Email/SMS service credentials

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/refresh` - Refresh token

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item
- `DELETE /api/cart/remove/:itemId` - Remove from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run tests
npm run lint         # Run ESLint
```

## 🔐 Authentication

Uses JWT (JSON Web Tokens) for authentication. Include token in requests:

```
Authorization: Bearer <your-token>
```

## 🗄️ Database Models

- **User** - User accounts and profiles
- **Product** - Product catalog
- **Category** - Product categories
- **Order** - Customer orders
- **Cart** - Shopping carts
- **Review** - Product reviews
- **Wishlist** - User wishlists
- **DemoBooking** - Demo appointments

## 📦 Key Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **redis/ioredis** - Caching
- **cloudinary** - Image upload
- **razorpay/stripe** - Payments
- **nodemailer** - Email service
- **winston** - Logging

## 🚀 Deployment

### Using Docker

```bash
docker build -t dfw-mern-backend .
docker run -p 5000:5000 dfw-mern-backend
```

### Manual Deployment

```bash
# Build (if needed)
npm install --production

# Start with PM2
pm2 start server.js --name dfw-backend

# Monitor
pm2 monit
```

## 📝 Notes

- Set `NODE_ENV=production` for production
- Use strong JWT secrets
- Enable HTTPS in production
- Set up MongoDB replica set for production
- Configure Redis for session storage
- Set up proper CORS policies

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Write tests
4. Submit pull request

## 📄 License

Private - DFW Furniture
