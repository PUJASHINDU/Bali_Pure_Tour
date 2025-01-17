import React from 'react';
import FormUpdatePaketTour from '../components/FormUpdatePaketTour'; // Pastikan path ini sesuai dengan struktur folder Anda

const FormUpdatePaketTourpage = () => {
  // Contoh data awal untuk form
  const initialData = {
    title: "Paket Tour Bali",
    about: "Tour menyenangkan ke destinasi terbaik di Bali.",
    programTour: ["Kunjungan ke Pantai Kuta", "Penjelajahan Ubud", "Mengunjungi Tanah Lot"],
    rundownTour: [
      { time: "08:00 - 09.00", activity: "Kedatangan" },
      { time: "10:00", activity: "Aktivitas Tour" },
      { time: "15:00", activity: "Kembali ke hotel" },
    ],
    facilityTour: ["Transportasi", "Penginapan", "Makan", "Tiket Wisata"],
    updateLink: "/paket-tour/list", // Link redirect setelah update
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <FormUpdatePaketTour {...initialData} />
    </div>
  );
};

export default FormUpdatePaketTourpage;
