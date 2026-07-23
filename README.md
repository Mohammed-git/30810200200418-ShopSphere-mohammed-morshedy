# Full-Stack E-Commerce Platform

A complete Full-Stack E-Commerce Platform developed as the **Capstone Project** for the **Digital Egypt Cubs Initiative (DECI)**.

The project allows users to browse products, search, filter, add items to the shopping cart, place orders, while providing an Admin Dashboard to manage products.

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Admin & Customer Roles
- Welcome Email

## Product Management

- Create Product
- Update Product
- Delete Product
- Product Search
- Product Filter
- Product Sorting
- Pagination
- Product Image Upload

## Shopping

- Shopping Cart
- Checkout
- Order Management

## Additional Features

- Product Reviews (MongoDB)
- Activity Logs (MongoDB)
- Store Statistics API
- Database Seed

## Testing

- Jest
- Supertest
- Vitest
- React Testing Library
- Mock Service Worker (MSW)

## DevOps

- Docker
- Docker Compose

---

# Technologies Used

## Frontend

- React
- React Router
- React Query
- Axios
- Vite

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- MongoDB
- JWT
- Multer
- Nodemailer
- Bcrypt

## Testing

- Jest
- Supertest
- Vitest
- React Testing Library
- MSW

---

# Project Structure

```text
fullstack-ecommerce-mohammed-morshedy
│
├── frontend
│
├── backend
│
├── docker-compose.yml
│
├── README.md
│
└── README.txt
```

---

# Project URLs

Frontend

http://localhost:5173

Backend API

http://localhost:5000/api

Health Check

http://localhost:5000/

---

# Requirements

Before running the project, make sure you have installed:

- Git
- Docker Desktop

Docker Desktop must be running before starting the project.

---

# Getting Started

## Step 1 - Clone the Repository

Open Terminal (or CMD) and run:

```bash
git clone https://github.com/Mohammed-git/fullstack-ecommerce-mohammed-morshedy.git
```

---

## Step 2 - Open the Project Folder

```bash
cd fullstack-ecommerce-mohammed-morshedy
```

---

## Step 3 - Configure Environment Variables

Inside the backend folder:

1. Copy the file

```
.env.example
```

2. Rename the copied file to

```
.env
```

3. Open the new `.env` file.

4. Replace the placeholder values with your own configuration.

Example:

```env
PORT=5000

DATABASE_URL=postgresql://postgres:postgres@postgres:5432/ecommerce?schema=public

MONGO_URI=mongodb://mongodb:27017/ecommerce

JWT_SECRET=your-secret-key

EMAIL_USER=your-email@example.com

EMAIL_PASS=your-email-password
```

> **Note**
>
> EMAIL_USER and EMAIL_PASS are only required if you want Welcome Emails to be sent.
>
> Placeholder values in `.env.example` are provided for reference only.

---

# Run the Project

From the project root run:

```bash
docker compose up --build
```

The first build may take a few minutes.

Docker will automatically:

- Build Frontend
- Build Backend
- Start PostgreSQL
- Start MongoDB
- Seed the Database

When the process finishes you can open:

Frontend

http://localhost:5173

---

# Seed Data

The database is automatically populated with sample data including:

- Admin Account
- Customer Account
- Sample Products

No manual database setup is required.

---

# Test Accounts

## Admin Account

Email

```
mohamed@test.com
```

Password

```
123456
```

---

## Customer Account

Email

```
ahmed@test.com
```

Password

```
123456
```

---

# Running Tests

## Backend Tests

Open a new terminal.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Run tests.

```bash
npm test
```

---

## Frontend Tests

Open another terminal.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run tests.

```bash
npm test
```

---

# Running Without Docker

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Databases

This project uses two databases.

## PostgreSQL

Stores:

- Users
- Products
- Orders
- Cart

## MongoDB

Stores:

- Product Reviews
- Activity Logs

---

# Docker

The project contains:

- Backend Dockerfile
- Frontend Dockerfile
- docker-compose.yml

Everything can be started using one command:

```bash
docker compose up --build
```

---

# Important Notes

- The project is designed to run using Docker Compose.
- Uploaded images are stored inside `backend/uploads`.
- The database is automatically seeded on first startup.
- Docker Desktop must be running before executing Docker commands.
- Never commit your real `.env` file.
- Use `.env.example` as the environment template.

---

# Repository

https://github.com/Mohammed-git/fullstack-ecommerce-mohammed-morshedy

---

# License

This project was developed for educational purposes as part of the **Digital Egypt Cubs Initiative (DECI)**.