# Quick Start Guide

## Project Structure

```
sayanu_music/
├── frontend/    # Next.js application (Port 3000)
├── backend/     # NestJS API (Port 4000)
└── README.md
```

## Running the Application

### Option 1: Two Separate Terminals

**Terminal 1 - Backend:**

```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Events Page**: http://localhost:3000/events

## Quick Commands

### Backend Commands

```bash
cd backend

# Start backend
npm start

# Start in development mode (watch)
npm run start:dev

# Seed database with sample events
node seed-db.js

# Check database contents
node check-db.js
```

### Frontend Commands

```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Database

The SQLite database is located at:

```
backend/database.sqlite
```

It contains:

- ✅ 6 sample events
- ✅ Registration records
- ✅ Auto-synced with TypeORM

## Environment Variables

**frontend/.env.local**

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key_here
STRIPE_SECRET_KEY=your_secret_key_here
```

**backend/.env**

```env
DATABASE_PATH=database.sqlite
PORT=4000
```

## Current Status

- ✅ Backend API: Running on port 4000
- ✅ Frontend App: Running on port 3000
- ✅ Database: 6 events loaded
- ✅ SQLite: Connected and working
- ✅ Stripe: Configured for payments

## Troubleshooting

**Backend won't start:**

```bash
cd backend
rm -rf dist
npm run build
npm start
```

**Frontend won't start:**

```bash
cd frontend
rm -rf .next
npm run dev
```

**Database is empty:**

```bash
cd backend
node seed-db.js
```
