import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // 🔐 Import Helmet
import dotenv from 'dotenv';
import connectDb from './db.js';
import chapterRoutes from './routes/chapterRoutes.js';
import rateLimiter from './middlewares/rateLimiter.js';

dotenv.config({ path: './config.env' });
const app = express();

// Connect to MongoDB
connectDb();

// Middleware
app.use(cors());
app.use(helmet()); // 🔐 Secure HTTP headers
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use('/api/v1/chapters', chapterRoutes);

// Handler for unmatched routes Ex:- 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error(' Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
