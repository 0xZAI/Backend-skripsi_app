const API_URL = 'http://localhost:3000/api/fasilitas';

// Fungsi untuk mengambil dan menampilkan daftar fasilitas
async function fetchFacilities() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const tableBody = document.querySelector('#facility-table tbody');
    tableBody.innerHTML = ''; // Kosongkan tabel sebelum menambahkan data baru

    data.data.forEach((facility) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${facility.id}</td>
        <td>${facility.nama}</td>
        <td>${facility.alamat}</td>
        <td>${facility.no_telepon}</td>
        <td>${facility.tipe}</td>
        <td>${facility.latitude}</td>
        <td>${facility.longitude}</td>
        <td>${facility.jam_operasional}</td>
        <td>${facility.rating}</td>
        <td><img src="${facility.foto}" alt="Foto" style="width:50px;height:50px;"></td>
        <td>
          <button class="edit-button" onclick="editFacility(${facility.id})">Edit</button>
          <button class="delete-button" onclick="deleteFacility(${facility.id})">Hapus</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error('Error fetching facilities:', err.message);
  }
}

// Fungsi untuk menghapus fasilitas
async function deleteFacility(id) {
  if (confirm('Apakah Anda yakin ingin menghapus fasilitas ini?')) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Fasilitas berhasil dihapus.');
        fetchFacilities(); // Refresh tabel setelah penghapusan
      } else {
        alert('Gagal menghapus fasilitas.');
      }
    } catch (err) {
      console.error('Error deleting facility:', err.message);
    }
  }
}

// Fungsi untuk mengedit fasilitas
function editFacility(id) {
  // Redirect ke halaman edit dengan parameter ID
  window.location.href = `/edit-facility.html?id=${id}`;
}

// Jalankan fungsi fetchFacilities saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchFacilities);