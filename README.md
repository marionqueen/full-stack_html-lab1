# Pixell River Financial - Employee Directory

Full-stack employee directory application with authentication and cloud deployment.

## Live Application

**Deployed App:** https://full-stackhtml-lab1-b8zkq9m77-marion-queens-projects.vercel.app

## Features

- User authentication (Clerk)
- Employee directory with search
- Organization structure
- Add employees and leaders
- Protected routes - login required

## Tech Stack

**Frontend:** React, TypeScript, Vite, Clerk
**Backend:** Express, TypeScript, Prisma, PostgreSQL
**Deployment:** Vercel

## Local Setup

### Backend
```bash
cd backend
npm install
docker-compose up -d
npx prisma migrate dev
npm run db:seed
npm run dev
```
Runs on: http://localhost:3001

### Frontend
```bash
cd frontend
npm install
# Add VITE_CLERK_PUBLISHABLE_KEY to .env.local
npm run dev
```
Runs on: http://localhost:5173

## API Endpoints

- `GET /api/employees` - All employees
- `GET /api/employees?search=query` - Search
- `POST /api/employees` - Add employee
- `GET /api/leaders` - All leaders
- `POST /api/leaders` - Add leader

## Labs Completed

1. Static HTML/CSS
2. React conversion with routing
3. Validation and forms
4. Express API + PostgreSQL
5. Clerk auth + Vercel deployment

