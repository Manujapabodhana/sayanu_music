# Sayanu Music - Backend API

NestJS backend application with TypeORM and SQLite for the Sayanu Music platform.

## Tech Stack

- **Framework**: NestJS 11
- **Database**: SQLite with TypeORM
- **Language**: TypeScript
- **API**: RESTful

## Features

- ✅ Event management (CRUD operations)
- ✅ Registration handling
- ✅ TypeORM integration with SQLite
- ✅ CORS enabled for frontend
- ✅ Database seeding with TypeORM
- ✅ Environment configuration

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file:

```env
DATABASE_PATH=database.sqlite
PORT=4000
```

## Database Management

### Seed Database with Sample Events

```bash
npm run seed
```

Uses TypeORM to insert 8 sample events into the database.

### Check Database Contents

```bash
npm run db:check
```

Shows all events and registrations using TypeORM.

## Running the Application

```bash
# Development mode (watch)
npm run start:dev

# Standard start
npm start

# Production
npm run build
npm run start:prod
```

Server runs on `http://localhost:4000`

## API Endpoints

- `GET /events` - Get all events
- `POST /events` - Create event
- `POST /registrations` - Register for event

## Project Structure

```
src/
├── events/           # Event module
├── registrations/    # Registration module
├── seed.ts          # TypeORM database seeding
├── check-db.ts      # TypeORM database checker
└── main.ts          # Application entry
```

## TypeORM Integration

All database operations use TypeORM:

- Entities with decorators
- Repository pattern
- NestJS dependency injection
- Auto-sync in development

## Development Commands

```bash
npm run start:dev    # Watch mode
npm run seed         # Seed database (TypeORM)
npm run db:check     # Check database (TypeORM)
npm run lint         # Lint code
npm run test         # Run tests
```

## License

Private
