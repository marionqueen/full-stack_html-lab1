# Pixell River Financial - Staff and Organization Page

## Description

Full-stack employee directory application for Pixell River Financial company.

## Lab 1
- Basic HTML page
- Employee List by Department
- Simple Styling

## Lab 2
- Added navigation between pages
- Employee Search
- Organization Page
- Role Descriptions

## Lab 3
- Refactored to hook-service-repository pattern
- Added form validation
- Add new employees and leaders
- Real-time search functionality
- Error handling with validation messages

## Lab 4
- Separated frontend and backend applications
- Built Express REST API with TypeScript
- Implemented route-controller-service pattern
- Created PostgreSQL database with Prisma ORM
- Database seeding with initial data
- Frontend now fetches from backend API

## Architecture

**Frontend (React + TypeScript)**
- Repositories: API calls to backend
- Services: Client-side validation
- Hooks: State management
- Components: UI layer

**Backend (Express + TypeScript)**
- Routes: API endpoints
- Controllers: Request handling
- Services: Business logic & validation
- Database: PostgreSQL with Prisma ORM

## How to Run

### Prerequisites
- Node.js
- Docker

### Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Setup database (with Docker)
docker-compose up -d

# Run migrations
npx prisma migrate dev

# Seed database
npm run db:seed

# Start server
npm run dev
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Backend runs on: `http://localhost:3001`  
Frontend runs on: `http://localhost:5173` or `http://localhost:5176`

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees?search=query` - Search employees
- `POST /api/employees` - Create employee
- `GET /api/employees/departments` - Get departments

### Leaders
- `GET /api/leaders` - Get all leaders
- `GET /api/leaders?search=query` - Search leaders
- `POST /api/leaders` - Create leader

**Submitted by:** Marion Queen Ramos  
**Course:** COMP-4002 FULL STACK DEVELOPMENT