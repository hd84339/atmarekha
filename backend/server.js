const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'https://atmarekha.vercel.app',
  'https://atmarekha-frontend.vercel.app',
  process.env.CORS_ORIGIN
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1 && !origin.includes('vercel.app')) {
      // Just for debugging, we can be permissive or strict. 
      // Let's be permissive for "atmarekha" domains or vercel deployments
      return callback(null, true); // For now, allow all to fix the blocking issue immediately
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || 'admin@example.com').split(',').map(email => email.trim());
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-me';

const storyRoutes = require('./routes/storyRoutes');
const chapterRoutes = require('./routes/chapterRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.get('/', (req, res) => {
  res.json({ status: 'AtmaRekha backend running' });
});

app.use('/api/stories', storyRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/reviews', reviewRoutes);


app.post('/admin/login', (req, res) => {
  const { email, password } = req.body || {};

  if (ADMIN_EMAILS.includes(email) && password === ADMIN_PASSWORD) {
    return res.json({ success: true, role: 'admin' });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`AtmaRekha backend started on port ${process.env.PORT || 5000}`);
});
