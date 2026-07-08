require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const githubRoutes = require('./routes/githubRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();

// ===== SECURITY MIDDLEWARE =====

// Helmet: Sets secure HTTP headers (XSS, Clickjacking, MIME sniffing protection)
app.use(helmet());

// Rate Limiting: Prevents DDoS and brute-force attacks (100 requests per 15 minutes)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});
app.use('/api/', apiLimiter);

// Body parsing with size limit to prevent payload-based memory exhaustion
app.use(express.json({ limit: '10kb' }));

// CORS: Restrict allowed origins in production
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:5001'];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy violation: Origin not allowed.'));
  },
  credentials: true
}));

// Mongo Sanitize: Prevents NoSQL injection by stripping $ and . from req.body/params
app.use(mongoSanitize());

// HPP: Protects against HTTP Parameter Pollution attacks
app.use(hpp());

// XSS sanitizer middleware: strips dangerous <script> payloads from request bodies
const sanitizeStrings = (obj) => {
  if (typeof obj === 'string') {
    return obj.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      obj[key] = sanitizeStrings(obj[key]);
    }
  }
  return obj;
};
app.use((req, res, next) => {
  if (req.body) req.body = sanitizeStrings(req.body);
  next();
});

// ===== DATABASE =====

// Connect to MongoDB using an environment variable for the cloud, falling back to local
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/os-tracker';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB error:', err));

// ===== ROUTES =====

app.use('/api/github', githubRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Health check endpoint for monitoring
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Serve frontend
app.use(express.static(path.join(__dirname, '../os-tracker-frontend/dist')));

// Catch-all to serve React app for unknown routes
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../os-tracker-frontend/dist', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Use the dynamic port provided by the cloud host, or fallback to 5001 locally
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));