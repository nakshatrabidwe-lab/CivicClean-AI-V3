import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import reportsRouter from './routes/reports.js';
import adminRouter from './routes/admin.js';
import cctvRouter from './routes/cctv.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/reports', reportsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/cctv', cctvRouter);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', system: 'CivicClean AI Local Backend (No DB)' });
});

// Start Server Direct (No Database Needed)
app.listen(PORT, () => {
  console.log(`🚀 CivicClean Local Backend active on http://localhost:${PORT}`);
});