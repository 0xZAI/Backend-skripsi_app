const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');
const rekomendasiRoutes = require('./routes/rekomendasi');

const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk session
app.use(
  session({
    secret: 'your-secret-key', // Ganti dengan kunci rahasia Anda
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware untuk melayani file statis
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk memastikan pengguna login (jika diperlukan)
app.use((req, res, next) => {
  if (!req.session.user && req.path !== '/login' && !req.path.startsWith('/api')) {
    return res.redirect('/login');
  }
  next();
});

// Rute untuk halaman login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rute untuk API
app.use('/api', authRoutes);
app.use('/api', rekomendasiRoutes);

// Rute untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});