# Inventory Management System - Backend

The backend service for the Inventory Management System, built with Node.js, Express, and MongoDB. This service provides a robust API for managing products, users, and inventory operations.

## Features

- 🔐 JWT-based authentication
- 👥 Role-based access control
- 📦 RESTful API for product management
- 📊 Real-time inventory tracking
- ⚠️ Low stock monitoring
- 🔄 Automated restock management
- 🛡️ Input validation and error handling
- 🔒 Secure password hashing with bcrypt

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- cors for cross-origin resource sharing
- dotenv for environment variables

## API Documentation

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Body**: `{ "username": "string", "email": "string", "password": "string" }`
- **Response**: `{ "message": "string", "token": "string", "user": { ... } }`

#### Login User
- **POST** `/api/auth/login`
- **Body**: `{ "email": "string", "password": "string" }`
- **Response**: `{ "message": "string", "token": "string", "user": { ... } }`

#### Get Current User
- **GET** `/api/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ "user": { ... } }`

### Product Endpoints

#### Get All Products
- **GET** `/api/products`
- **Response**: `[{ ... }]`

#### Get Single Product
- **GET** `/api/products/:id`
- **Response**: `{ ... }`

#### Create Product (Admin Only)
- **POST** `/api/products`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "name": "string", "description": "string", "price": number, "quantity": number, "category": "string" }`
- **Response**: `{ ... }`

#### Update Product (Admin Only)
- **PUT** `/api/products/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ ... }`
- **Response**: `{ ... }`

#### Delete Product (Admin Only)
- **DELETE** `/api/products/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ "message": "string" }`

#### Restock Product (Admin Only)
- **POST** `/api/products/:id/restock`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "quantity": number }`
- **Response**: `{ ... }`

#### Get Low Stock Products (Admin Only)
- **GET** `/api/products/low-stock`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `[{ ... }]`

## Setup and Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/inventory
JWT_SECRET=your_jwt_secret_here
```

3. Start the development server:
```bash
npm run dev
```

## Development

The project uses nodemon for development, which automatically restarts the server when changes are detected.

```bash
npm run dev
```

## Production

For production deployment:

```bash
npm start
```

## Error Handling

The API uses a centralized error handling middleware that returns appropriate HTTP status codes and error messages:

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Security

- Passwords are hashed using bcrypt
- JWT tokens expire after 24 hours
- CORS is enabled for the frontend domain
- Input validation is implemented for all endpoints
- Role-based access control for admin operations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 