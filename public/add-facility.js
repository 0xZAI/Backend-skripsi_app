const API_URL = 'http://localhost:3000/api/fasilitas';

document.getElementById('add-facility-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const facility = {
    nama: document.getElementById('nama').value,
    alamat: document.getElementById('alamat').value,
    no_telepon: document.getElementById('no_telepon').value,
    tipe: document.getElementById('tipe').value,
    latitude: parseFloat(document.getElementById('latitude').value),
    longitude: parseFloat(document.getElementById('longitude').value),
    jam_operasional: document.getElementById('jam_operasional').value,
    rating: parseFloat(document.getElementById('rating').value),
    foto: document.getElementById('foto').value,
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(facility),
    });

    if (response.ok) {
      alert('Fasilitas berhasil ditambahkan!');
      window.location.href = '/'; // Kembali ke halaman utama
    } else {
      alert('Gagal menambahkan fasilitas!');
    }
  } catch (err) {
    console.error('Error adding facility:', err.message);
  }
});