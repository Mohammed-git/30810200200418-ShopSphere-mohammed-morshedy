# Full-Stack E-Commerce Platform

A full-stack E-Commerce platform developed as the **First Term Capstone Project** for the **Digital Egypt Cubs Initiative**.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Customer & Admin Roles
* Welcome Email

### Product Management

* Product CRUD Operations
* Product Search
* Product Filtering
* Product Sorting
* Pagination
* Product Image Upload

### Shopping

* Shopping Cart
* Checkout System
* Order Management

### Additional Backend Features

* Product Reviews (MongoDB)
* Activity Logs (MongoDB)
* Store Statistics API
* Database Seed Script

### Testing

* Jest Unit Tests
* Supertest Integration Tests
* React Testing Library
* Mock Service Worker (MSW)

### DevOps

* Docker
* Docker Compose

---

# Tech Stack

## Frontend

* React
* React Router
* React Query
* Axios
* Vite

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* MongoDB
* JWT
* Multer
* Bcrypt
* Nodemailer

## Testing

* Jest
* Supertest
* React Testing Library
* MSW

## DevOps

* Docker
* Docker Compose

---

# Project Structure

```text
ecommerce-platform
├── backend
├── frontend
├── docker-compose.yml
└── README.md
```

---

# Getting Started

## Clone the Repository

```bash
git clone https://github.com/Mohammed-git/fullstack-ecommerce-mohammed-morshedy
cd ecommerce-platform
```

## Run with Docker (Recommended)

```bash
docker compose up --build
```

The application will be available at:

* Frontend: http://localhost:5173
* Backend API: http://localhost:5000/api

---

## Run Without Docker

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Running Tests

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

---

# Database

The project uses two databases:

* **PostgreSQL** with Prisma ORM for application data.
* **MongoDB** for Product Reviews and Activity Logs.

---

# Docker

The project includes:

* Dockerfile for Backend
* Dockerfile for Frontend
* Docker Compose configuration

Run everything using:

```bash
docker compose up --build
```

---

# Repository

GitHub Repository:

https://github.com/Mohammed-git/fullstack-ecommerce-mohammed-morshedy

---

# License

This project was developed for educational purposes as part of the **Digital Egypt Cubs Initiative**.
