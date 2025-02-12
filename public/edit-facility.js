const API_URL = 'http://localhost:3000/api/fasilitas';

// Ambil parameter ID dari URL
const urlParams = new URLSearchParams(window.location.search);
const facilityId = urlParams.get('id');

// Fungsi untuk memuat data fasilitas berdasarkan ID
async function loadFacility() {
  try {
    const response = await fetch(`${API_URL}/${facilityId}`);
    const facility = await response.json();

    // Isi form dengan data fasilitas
    document.getElementById('facility-id').value = facility.id;
    document.getElementById('nama').value = facility.nama;
    document.getElementById('alamat').value = facility.alamat;
    document.getElementById('no_telepon').value = facility.no_telepon;
    document.getElementById('tipe').value = facility.tipe;
    document.getElementById('latitude').value = facility.latitude;
    document.getElementById('longitude').value = facility.longitude;
    document.getElementById('jam_operasional').value = facility.jam_operasional;
    document.getElementById('rating').value = facility.rating;
    document.getElementById('foto').value = facility.foto;
  } catch (err) {
    console.error('Error loading facility:', err.message);
  }
}

// Fungsi untuk menyimpan perubahan fasilitas
document.getElementById('edit-facility-form').addEventListener('submit', async (event) => {
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
    const response = await fetch(`${API_URL}/${facilityId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(facility),
    });

    if (response.ok) {
      alert('Fasilitas berhasil diperbarui!');
      window.location.href = '/'; // Kembali ke halaman utama
    } else {
      alert('Gagal memperbarui fasilitas.');
    }
  } catch (err) {
    console.error('Error updating facility:', err.message);
  }
});

// Panggil fungsi untuk memuat data saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadFacility);