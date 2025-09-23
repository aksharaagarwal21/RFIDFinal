import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import './config/sqlite.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import authRoleRoutes from './routes/authRoleRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import scanRoutes from './routes/scanRoutes.js';
import classRoutes from './routes/classRoutes.js';
import messRoutes from './routes/messRoutes.js';
import hostelRoutes from './routes/hostelRoutes.js';
import examRoutes from './routes/examRoutes.js';
import locationRoutes from './routes/locationRoutes.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'http://localhost:3001'], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/api', (req, res) => { 
  res.status(200).json({ 
    message: 'RFID University Management System API', 
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      dashboard: '/api/dashboard',
      attendance: '/api/attendance',
      scans: '/api/scans',
      classes: '/api/classes',
      mess: '/api/mess',
      hostel: '/api/hostel',
      exams: '/api/exams',
      location: '/api/location'
    }
  }); 
});

app.get('/api/health', (req, res) => { res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() }); });

app.use('/api/auth', authRoutes);
app.use('/api/auth/roles', authRoleRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/scans', scanRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/mess', messRoutes);
app.use('/api/hostel', hostelRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/location', locationRoutes);

// Serve frontend build in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../../frontend/build');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    // If no API route matched, serve React index
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
