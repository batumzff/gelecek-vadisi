# Gelecek Vadisi API

A RESTful API built with Node.js, Express, and Sequelize for managing users and products.

## Features

- User authentication and authorization
- Product management
- RESTful API endpoints
- SQLite database with Sequelize ORM
- Input validation using Joi
- Redis integration
- Docker support

## Tech Stack

- **Backend Framework:** Express.js
- **Database:** SQLite with Sequelize ORM
- **Authentication:** JWT (JSON Web Tokens)
- **Caching:** Redis
- **Validation:** Joi
- **Containerization:** Docker

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker (optional)
- Redis (optional)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd gelecek-vadisi
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```
SERVER_PORT=3000
JWT_SECRET=your_jwt_secret
```

4. Start the application:
```bash
npm start
```

## Docker Setup

To run the application using Docker:

```bash
docker-compose up
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── database/       # Database configuration
├── middlewares/    # Custom middleware
├── models/         # Database models
├── routes/         # API routes
└── validations/    # Input validation schemas
```

## Development

The application uses nodemon for development, which automatically restarts the server when changes are detected.

## TODO List

| Priority | Task | Description | Status |
|----------|------|-------------|--------|
| High | Add Error Handling Middleware | Implement a global error handling middleware for consistent error responses | - [ ] |
| High | Add Request Logging | Implement request logging middleware for better debugging | - [ ] |
| High | Add API Documentation | Create Swagger/OpenAPI documentation for all endpoints | - [ ] |
| Low | Add Unit Tests | Implement unit tests for controllers and services | - [ ] |
| Low | Add Integration Tests | Implement integration tests for API endpoints | - [ ] |
| Low | Add Rate Limiting | Implement rate limiting for API endpoints | - [ ] |
| Low | Add CORS Configuration | Implement proper CORS configuration | - [ ] |
| Low | Add Health Check Endpoint | Implement health check endpoint for monitoring | - [ ] |
| Low | Add API Versioning | Implement API versioning for future updates | - [ ] |

## License

ISC 