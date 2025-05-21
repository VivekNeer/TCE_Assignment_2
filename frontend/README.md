# Inventory Management System

A modern, full-stack inventory management system built with React, Node.js, and MongoDB. This application provides a comprehensive solution for managing product inventory, user authentication, and real-time stock monitoring.

## Features

- 🔐 Secure user authentication with JWT
- 👥 Role-based access control (Admin/User)
- 📦 Complete product management (CRUD operations)
- 📊 Real-time inventory tracking
- ⚠️ Low stock alerts
- 🔄 Automated restock management
- 🎨 Modern, responsive UI with Tailwind CSS
- 🛠️ Built with TypeScript for better type safety

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd inventory-management-system
```

2. Install frontend dependencies:
```bash
cd cart-savvy-inventory-system
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/inventory
JWT_SECRET=your_jwt_secret_here
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd cart-savvy-inventory-system
npm run dev
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user info

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (admin only)
- PUT `/api/products/:id` - Update product (admin only)
- DELETE `/api/products/:id` - Delete product (admin only)
- POST `/api/products/:id/restock` - Restock product (admin only)
- GET `/api/products/low-stock` - Get low stock products (admin only)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
