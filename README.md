# 📘 Chapter Performance Dashboard Backend 

This project is a RESTful API service built with Node.js, Express.js, and MongoDB using Mongoose. It manages chapter performance data and includes features such as filtering, pagination, caching with Redis, and rate limiting to ensure efficient and secure access.

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **Redis** for caching and rate limiting

---

## 🚀 Features

### 1. RESTful API Endpoints

| Method | Endpoint                   | Description                            |
|--------|----------------------------|----------------------------------------|
| GET    | `/api/v1/chapters`         | Fetch all chapters with filters        |
| GET    | `/api/v1/chapters/:id`     | Get a specific chapter by ID           |
| POST   | `/api/v1/chapters`         | Upload chapters via JSON (admin only)  |

#### ✅ Filters Supported on `/api/v1/chapters`
- `class`
- `unit`
- `status`
- `subject`
- `weakChapters`
- Pagination: `page`, `limit`

📌 **Example:**  
`GET /api/v1/chapters?class=class 11&subject=Math&status=completed&page=1&limit=5`

---

### ⚡️ Caching

- ✅ Response is **cached** in **Redis** for **1 hour**
- 🔄 **Cache is invalidated** when new chapters are added

---

### 🛡️ Rate Limiting

- 🚫 Limited to **30 requests per minute** per IP
- ✅ Enforced via **Redis-based rate limiter**

---

### 📤 Responses

- `200 OK` — Returns filtered and paginated chapter data  
- `400 Bad Request` — One or more query parameters are invalid  
- `500 Internal Server Error` — Server or database issue occurred

---

## 📁 Project Folder Structure

```bash

├── controllers/
│   └── chapterController.js     # Contains logic for each route (GET, POST, etc.)
├── middlewares/
│   ├── adminAuth.js             # Middleware to check admin access for uploading
│   └── rateLimiter.js           # Redis-backed rate limiting per IP
├── models/
│   └── Chapter.js               # Mongoose schema for Chapter documents
├── routes/
│   └── chapterRoutes.js         # Defines RESTful endpoints for chapters
├── utils/
│   └── redisClient.js           # Configures and exports Redis client
├── node_modules/                # Project dependencies
├── .gitignore                   # Ignores node_modules, .env, logs, etc.
├── config.env                   # Environment variables (Mongo URI, Redis URL, etc.)
├── db.js                        # MongoDB connection setup using mongoose
├── package.json                 # Project metadata and dependencies
├── package-lock.json            # Dependency tree lock
└── server.js                    # Entry point of the app, initializes server and routes
```

---

## 📬 Submission Checklist

- [x] Public GitHub Repository
- [x] Documented Postman Collection
- [x] Deployed API
- [x] Submitted Google Form

---

## 🌍 Deployment

- 🔗 **Deployed URL**: [view here](https://backendassignment-sumit.onrender.com)  
- 📭 **Postman Collection**: [View on Postman](https://documenter.getpostman.com/view/39896458/2sB2x2KZYp)

---


## 🧪 Testing

Use the provided Postman Collection to test all endpoints with example requests and responses.

---


## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/josum06/BackendAssignment_Sumit.git
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a file named `config.env` in the root directory and add the following:

```env
PORT=3000
MONGODB_URI=your-mongodb-uri
MONGO_PASS = mongo_password
REDIS_URL=redis://localhost:6379

```

### 4. Start MongoDB & Redis

Ensure MongoDB and Redis are running locally (or update the URIs for cloud-hosted DBs).

### 5. Run the Server

```bash
npm run dev
```

---

## 📮 API Testing

Use [Postman](https://www.postman.com/) or any API client to interact with the endpoints. Import the provided Postman Collection to see predefined requests.

---

## 🛠️ Future TODOs

- [ ] Add authentication and role-based access
- [ ] Implement full text search and fuzzy matching
- [ ] Add logging and monitoring


## 📝 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```
