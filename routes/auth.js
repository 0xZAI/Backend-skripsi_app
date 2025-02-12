const express = require('express');
const router = express.Router();

// Dummy pengguna
const users = [
  { username: 'admin', password: '1234' },
];

// Rute login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    req.session.user = user;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Username atau password salah' });
  }
});

// Rute logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;