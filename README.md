Personal Finance Tracker - Backend

This project is the backend API for a personal finance tracker application. It is built using Node.js, Express, and MongoDB and supports user authentication, transaction tracking, and monthly summaries.

Features
- User registration and login with JWT authentication
- Add, view, update, and delete transactions
- Monthly summary of income, expenses, and balance
- Transaction filtering by date, category, and description
- Secure API endpoints using middleware
- Tested with Postman

Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- dotenv for environment variables
- Helmet and CORS for security

Prerequisites
- Node.js and npm
- MongoDB installed and running locally

 Installation
1. Clone the repository
bash
git clone https://github.com/yourusername/finance-tracker-backend.git
cd finance-tracker-backend

Install dependencies
npm install

To run the server:-
npm run dev

The server will start on http://localhost:5000

API Endpoints
| Method | Endpoint                        | Description                       |
|--------|---------------------------------|----------------------------------|
| POST   | /api/auth/register              | Register a new user               |
| POST   | /api/auth/login                 | Login and receive a token         |
| GET    | /api/summary?month=&year=       | Get monthly summary               |
| GET    | /api/transactions               | View or filter transactions       |
| POST   | /api/transactions               | Add a new transaction             |
| PUT    | /api/transactions/:id           | Update a transaction              |
| DELETE | /api/transactions/:id           | Delete a transaction              |





