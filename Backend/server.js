// Load environment variables at the top
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const authRoutes = require('./Routes/authRoute');
const studentRoutes = require('./Routes/userRoute');
const connectDB = require('./Config/db');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from your frontend port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// Log incoming requests (for debugging)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Content-Security-Policy Header (for added security)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com 'unsafe-inline';"
  );
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/user', studentRoutes);

// Root Route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the EduSphere Platform API');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// 404 Not Found Route
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`EduSphere server is running on http://localhost:${PORT}`);

  // Log environment variables to ensure they're loaded correctly (for debugging)
  console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
  console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
  console.log('MONGO_URI:', process.env.MONGO_URI);
});
