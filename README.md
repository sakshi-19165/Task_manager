# TaskFlow — Task Management Application

A full-stack task manager built with **React**, **Express.js**, and **MongoDB**.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- 🔴🟡🟢 Priority levels — High / Medium / Low
- 📅 Due date and specific time tracking with overdue highlighting
- 🔄 Status management — Todo / In Progress / Done
- 📂 Category-based filtering (Work, Personal, Health, Finance, Education, General)
- 🗄️ MongoDB persistence
- 🛡️ Input validation (frontend + backend)
- 🎨 Dark & Light themes with glassmorphism design

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community) running locally on port 27017
  - OR a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

## Setup & Run

### 1. Install dependencies

```bash
# Install all (root + server + client)
npm run install:all
```

Or install separately:
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure environment

Edit `server/.env` if needed:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
NODE_ENV=development
```

For MongoDB Atlas, replace `MONGODB_URI` with your connection string.

### 3. Start MongoDB

```bash
# Windows — start MongoDB service
mongod
```

### 4. Run the app

```bash
# From the root — runs both server and client concurrently
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health check**: http://localhost:5000/api/health

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List tasks (supports `?status=&priority=&category=&sortBy=&order=`) |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/:id` | Get a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/tasks/stats` | Dashboard statistics |

## Project Structure

```
TaskManager/
├── client/          # React + Vite frontend
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── utils/
└── server/          # Express + MongoDB backend
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    └── routes/
```
