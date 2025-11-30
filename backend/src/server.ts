import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import employeeRoutes from './routes/employeeRoutes';
import leaderRoutes from './routes/leaderRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5176'],
    credentials: true
  })
);
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/leaders', leaderRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pixell River Financial API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});