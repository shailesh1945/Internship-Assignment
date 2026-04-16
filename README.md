# Store Rating Platform

A full-stack role-based web application for managing stores and ratings. Users can browse stores and submit ratings, admins manage users/stores, and store owners monitor ratings analytics.

## Live Project Structure

```text
backend/   NestJS + PostgreSQL + TypeORM + JWT
frontend/  React + TypeScript + Vite + Tailwind CSS v4
```

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS v4
* React Router DOM
* Axios

### Backend

* NestJS
* TypeORM
* PostgreSQL
* JWT Authentication
* bcrypt
* class-validator

---

## Features

## Authentication

* Register
* Login
* JWT based auth
* Role-based route access

## Roles

### 1. Normal User

* Register / Login
* Browse stores
* Search / sort stores
* Submit or update rating (1–5)

### 2. Admin

* Dashboard stats
* Manage users
* Manage stores
* Create stores
* View total users / stores / ratings

### 3. Store Owner

* Owner dashboard
* View owned stores
* View average ratings
* View customer ratings

---

## Frontend Pages

* `/login`
* `/register`
* `/stores`
* `/admin`
* `/admin/users`
* `/admin/stores`
* `/owner`

---

## Backend API Documentation

Base URL:

```text
http://localhost:3000
```

## Auth APIs

### Register

```http
POST /auth/register
```

Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "address": "Pune",
  "password": "Password@123",
  "role": "user"
}
```

### Login

```http
POST /auth/login
```

Body:

```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```

Response:

```json
{
  "access_token": "jwt_token"
}
```

---

## Users APIs (Admin)

### Get Users

```http
GET /users
```

Query params:

* name
* email
* address
* role
* sortBy
* sortOrder

Authorization: Bearer Token (Admin)

---

## Stores APIs

### Get Stores

```http
GET /stores
```

Query params:

* name
* address
* sortBy
* sortOrder

### Create Store (Admin)

```http
POST /stores
```

Body:

```json
{
  "name": "ABC Store",
  "email": "store@example.com",
  "address": "Mumbai"
}
```

### Owner Dashboard

```http
GET /stores/owner/dashboard
```

Authorization: Bearer Token (Store Owner)

---

## Ratings APIs

### Submit Rating

```http
POST /ratings
```

Body:

```json
{
  "storeId": "uuid",
  "value": 5
}
```

### Update Rating

```http
PATCH /ratings/:storeId
```

Body:

```json
{
  "value": 4
}
```

Authorization: Bearer Token (User)

---

## Environment Variables

Create `backend/.env`

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=store_rating
JWT_SECRET=your_secret_key
JWT_EXPIRES=1d
```

---

## Local Setup

## Backend

```bash
cd backend
npm install
npm run start:dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Demo Accounts (Optional)

```text
Admin       admin@example.com
Owner       owner@example.com
User        user@example.com
```

---

## Security Notes

* Passwords hashed with bcrypt
* JWT authentication
* Protected routes by role
* Validation using DTOs

---

## Future Improvements

* Email verification
* Pagination
* Charts dashboard
* Docker deployment
* CI/CD pipeline
* Unit testing

---

## Author

Shailesh
