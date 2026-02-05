const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-me';

app.get('/', (req, res) => {
  res.json({ status: 'AtmaRekha backend running' });
});

app.post('/admin/login', (req, res) => {
  const { email, password } = req.body || {};

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ success: true, role: 'admin' });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`AtmaRekha backend started on port ${process.env.PORT || 5000}`);
});
