# Sayanu Music Platform

A comprehensive music education platform with event management and registration system.

## Project Structure

```
sayanu_music/
├── frontend/          # Next.js 16 frontend application
│   ├── app/          # Next.js app directory (pages & layouts)
│   ├── components/   # React components
│   ├── lib/          # Utilities and API clients
│   └── public/       # Static assets
│
├── backend/          # NestJS backend API
│   ├── src/          # Source code
│   │   ├── events/   # Events module
│   │   └── registrations/  # Registrations module
│   └── database.sqlite     # SQLite database
│
└── README.md         # This file
```

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn

### Installation

1. **Install Frontend Dependencies**

```bash
cd frontend
npm install
```

2. **Install Backend Dependencies**

```bash
cd backend
npm install
```

### Running the Application

1. **Start the Backend** (runs on port 4000)

```bash
cd backend
npm start
```

2. **Start the Frontend** (runs on port 3000)

```bash
cd frontend
npm run dev
```

3. **Access the Application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Events API: http://localhost:4000/events

## Features

### Frontend

- Event browsing and filtering
- Event registration with Stripe payment integration
- Responsive design with Tailwind CSS
- Modern animations with Framer Motion

### Backend

- RESTful API with NestJS
- SQLite database with TypeORM
- Event management
- Registration handling
- CORS enabled for frontend integration

## Tech Stack

**Frontend:**

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Stripe.js

**Backend:**

- NestJS
- TypeORM
- SQLite (better-sqlite3)
- TypeScript

## Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Backend (.env)

```env
DATABASE_PATH=database.sqlite
PORT=4000
```

## Database

The backend uses SQLite for data persistence. To seed the database with sample events:

```bash
cd backend
node seed-db.js
```

## API Endpoints

- `GET /events` - Fetch all events
- `POST /events` - Create a new event
- `POST /registrations` - Register for an event

## Development

To run both frontend and backend concurrently, open two terminal windows:

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

## License

Private - All rights reserved
