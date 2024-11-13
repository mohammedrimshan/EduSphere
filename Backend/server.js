const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173',  // Allow requests from the frontend port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use CORS middleware
app.use(cors(corsOptions));

const connectDB = require('./Config/db');
connectDB();

const studentRoutes = require('./Routes/userRoute');

// Set Content-Security-Policy header for added security
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com 'unsafe-inline';"
  );
  next();
});


app.use('/user', (req, res, next) => {
  console.log(`Request to /user${req.path} - Method: ${req.method}`);
  next();
});
app.use('/user', studentRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the EduSphere Platform API');
});


app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});


app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`EduSphere server is running on http://localhost:${PORT}`);
});
