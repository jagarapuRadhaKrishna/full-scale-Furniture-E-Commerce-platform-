# DFW Furniture - Spring Boot Backend

Complete Java Spring Boot + PostgreSQL backend for DFW Furniture e-commerce platform.

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.8+
- PostgreSQL 12+
- Redis (optional, for caching)

### Installation

```bash
# Navigate to backend directory
cd backend-springboot

# Create PostgreSQL database
createdb dfw_furniture

# Update application.properties with your database credentials

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

## 📁 Project Structure

```
backend-springboot/
├── src/main/java/com/dfw/furniture/
│   ├── config/              # Configuration classes
│   ├── controller/          # REST controllers
│   ├── dto/                 # Data Transfer Objects
│   ├── exception/           # Exception handlers
│   ├── model/               # JPA entities
│   ├── repository/          # JPA repositories
│   ├── security/            # Security & JWT
│   ├── service/             # Business logic
│   └── FurnitureApplication.java
├── src/main/resources/
│   └── application.properties
├── pom.xml
└── README.md
```

## 🔑 Configuration

Update `src/main/resources/application.properties`:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/dfw_furniture
spring.datasource.username=your-username
spring.datasource.password=your-password

# JWT Secret (minimum 256 bits)
jwt.secret=your-secret-key-here

# Other configurations...
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get single product
- `GET /api/products/slug/{slug}` - Get product by slug
- `GET /api/products/featured` - Get featured products
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/{id}` - Update product (Admin only)
- `DELETE /api/products/{id}` - Delete product (Admin only)

### Health Check
- `GET /health` - Application health status
- `GET /api` - API information

## 🛠️ Maven Commands

```bash
mvn clean                 # Clean build artifacts
mvn compile               # Compile source code
mvn test                  # Run tests
mvn package               # Package as JAR
mvn spring-boot:run       # Run application
mvn spring-boot:build-image  # Build Docker image
```

## 🔐 Security

- JWT-based authentication
- BCrypt password hashing
- Role-based access control (USER, ADMIN)
- CORS configuration
- Request validation

## 🗄️ Database Schema

Uses JPA/Hibernate for ORM with the following entities:
- **User** - User accounts
- **Product** - Product catalog
- **Category** - Product categories
- **Order** - Customer orders
- **Cart** - Shopping carts

## 📦 Key Dependencies

- **Spring Boot 3.2.0** - Framework
- **Spring Data JPA** - Database access
- **Spring Security** - Authentication & authorization
- **PostgreSQL** - Database
- **JWT (JJWT)** - Token generation
- **Lombok** - Reduce boilerplate
- **Redis** - Caching
- **MapStruct** - DTO mapping

## 🚀 Deployment

### Build JAR

```bash
mvn clean package
java -jar target/furniture-backend-1.0.0.jar
```

### Docker

```bash
docker build -t dfw-springboot-backend .
docker run -p 8080:8080 dfw-springboot-backend
```

### Production Settings

Set environment variables:
```bash
export SPRING_PROFILES_ACTIVE=prod
export DATABASE_URL=your-production-db-url
export JWT_SECRET=your-production-secret
```

## 📝 Testing

```bash
# Run all tests
mvn test

# Run specific test
mvn test -Dtest=UserServiceTest

# Generate coverage report
mvn test jacoco:report
```

## 🤝 API Authentication

Include JWT token in requests:

```
Authorization: Bearer <your-jwt-token>
```

## 📄 License

Private - DFW Furniture

## 📧 Support

For issues, contact the development team.
