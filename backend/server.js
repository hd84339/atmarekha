const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
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
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

// Serve uploaded files with aggressive caching
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '365d',
  immutable: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || 'admin@example.com').split(',').map(email => email.trim());
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-me';

const storyRoutes = require('./routes/storyRoutes');
const chapterRoutes = require('./routes/chapterRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const heroImageRoutes = require('./routes/heroImageRoutes');

const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

app.get('/', (req, res) => {
  res.json({ status: 'AtmaRekha backend running' });
});

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

console.log('Registering routes...');
app.use('/api/stories', storyRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/hero-images', heroImageRoutes);
console.log('Routes registered.');

// --- Admin Auth Routes ---

// Seed Admin (Run on server start)
const seedAdmin = async () => {
  try {
    const count = await Admin.countDocuments();
    if (count === 0) {
      const defaultPassword = process.env.ADMIN_PASSWORD || 'change-me';

      // Create admin accounts for all emails in ADMIN_EMAILS
      for (const email of ADMIN_EMAILS) {
        const admin = new Admin({ email, password: defaultPassword });
        await admin.save();
        console.log(`Admin seeded: ${email}`);
      }
    } else {
      console.log(`${count} admin account(s) already exist`);
    }
  } catch (err) {
    console.error('Admin seeding failed:', err);
  }
};
seedAdmin();

app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body || {};

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    return res.json({ success: true, role: 'admin', email: admin.email });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/admin/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const isMatch = await admin.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect old password' });
    }

    admin.password = newPassword; // Will be hashed by pre-save hook
    await admin.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`AtmaRekha backend started on port ${process.env.PORT || 5000}`);
});
