import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes Imports
import authRoutes from './modules/auth/Auth.routes';

dotenv.config();

const app: Express = express();

// Custom error interface
interface CustomError extends Error {
  status?: number;
  message: string;
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check route
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'Server is running' });
});

// 404 handler for unknown routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    status: 404,
  });
});

// Routes 
app.use('/api/v1/auth', authRoutes);

// Error handling middleware (must be last)
app.use((err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] Status: ${status}, Message: ${message}`);

  res.status(status).json({
    success: false,
    message,
    status,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;

