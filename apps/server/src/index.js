import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './core/errors/index.js';
import { logger } from './core/logger/index.js';

import { ClerkAuthMiddleware } from './core/middleware/auth.middleware.js';
import apiRouter from './routes/index.js';

// Load config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(ClerkAuthMiddleware);

// Core health route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    service: 'eunoia-os-server',
    timestamp: new Date().toISOString() 
  });
});

// API Routes
app.use('/api', apiRouter);

// Fallback path handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`EUNOIA OS Core Server active on port ${PORT}`);
});
