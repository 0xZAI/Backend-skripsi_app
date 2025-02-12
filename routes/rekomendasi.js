const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Pastikan jalur ini sesuai dengan struktur direktori Anda

// Mendapatkan semua fasilitas
router.get('/fasilitas', (req, res) => {
  db.all('SELECT * FROM fasilitas', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ data: rows });
    }
  });
});

// Menambahkan fasilitas baru
router.post('/fasilitas', (req, res) => {
  const {
    nama,
    alamat,
    no_telepon,
    tipe,
    latitude,
    longitude,
    jam_operasional,
    rating,
    foto,
  } = req.body;

  const query = `
    INSERT INTO fasilitas (nama, alamat, no_telepon, tipe, latitude, longitude, jam_operasional, rating, foto)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [nama, alamat, no_telepon, tipe, latitude, longitude, jam_operasional, rating, foto],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID });
      }
    }
  );
});

// Memperbarui fasilitas berdasarkan ID
router.put('/fasilitas/:id', (req, res) => {
  const { id } = req.params;
  const { nama, alamat, no_telepon, tipe, latitude, longitude, jam_operasional, rating, foto } = req.body;

  const query = `
    UPDATE fasilitas
    SET nama = ?, alamat = ?, no_telepon = ?, tipe = ?, latitude = ?, longitude = ?, jam_operasional = ?, rating = ?, foto = ?
    WHERE id = ?
  `;

  db.run(
    query,
    [nama, alamat, no_telepon, tipe, latitude, longitude, jam_operasional, rating, foto, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Fasilitas berhasil diperbarui' });
      }
    }
  );
});

// Menghapus fasilitas berdasarkan ID
router.delete('/fasilitas/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM fasilitas WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Fasilitas berhasil dihapus' });
    }
  });
});

// Mendapatkan fasilitas berdasarkan ID
router.get('/fasilitas/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM fasilitas WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Fasilitas tidak ditemukan' });
    } else {
      res.json(row);
    }
  });
});

module.exports = router;