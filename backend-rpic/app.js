require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const pcsRoutes = require('./routes/pcs');
const db = require('./db');  

const app = express();  

db.query('SELECT 1')
  .then(() => {
    console.log('Connected to the MySQL database');
  })
  .catch((err) => {
    console.error('Error connecting to the MySQL database:', err);
  });

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routing
app.use('/api/auth', authRoutes);
app.use('/api/pcs', pcsRoutes);
app.use('/api/booking', bookingRoutes);

console.log('JWT_SECRET:', process.env.JWT_SECRET);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
