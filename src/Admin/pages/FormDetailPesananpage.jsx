import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

const FormDetailPesananPage = () => {
  const { id_booking } = useParams(); // 🔥 Ambil id_booking dari URL
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null); // ✅ State untuk menyimpan data booking

  useEffect(() => {
    console.log("🛠️ ID Booking dari URL:", id_booking);
    if (!id_booking) {
      console.error("ID Booking tidak ditemukan di URL!");
      return;
    }

    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/booking/${id_booking}`);
        setBooking(response.data.data);
      } catch (error) {
        console.error("❌ Gagal mengambil detail booking:", error.response?.data || error.message);
      }
    };

    fetchBookingDetails();
  }, [id_booking]);

  const updateBookingStatus = async (status) => {
    try {
      await axios.put(`http://localhost:5000/admin/updateBookingStatus/${id_booking}`, { status });
      setBooking((prev) => ({ ...prev, status }));
      alert(`✅ Status booking berhasil diupdate ke "${status}"`);
    } catch (error) {
      console.error("❌ Gagal memperbarui status:", error.response?.data || error.message);
    }
  };

  if (!booking) {
    return <p className="text-center text-gray-500">🔄 Loading detail booking...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-lg shadow-lg border">
        <CardBody className="p-6">
          <Typography variant="h4" className="text-center font-semibold text-lg text-customGreen">
            Detail Booking
          </Typography>

          <div className="mt-4">
            <DetailRow label="Nama" value={booking.full_name} />
            <DetailRow label="Email" value={booking.email} />
            <DetailRow label="No. Telepon" value={booking.phone_number} />
            <DetailRow label="Nama Paket" value={booking.package_name} />
            <DetailRow label="Jumlah Peserta" value={`${booking.num_participants} Orang`} />
            <DetailRow label="Tanggal Tour" value={booking.checkin_date} />
            <DetailRow label="Total Harga" value={`Rp ${booking.price.toLocaleString()}`} />
            <DetailRow label="Status" value={booking.status} />
          </div>

          {/* Tombol Konfirmasi & Cancel */}
          <div className="mt-6 flex justify-center gap-4">
            <Button
              className="bg-green-500 text-white px-4 py-2 rounded font-poppins hover:bg-green-600"
              onClick={() => updateBookingStatus("confirmed")}
            >
              Konfirmasi
            </Button>
            <Button
              className="bg-red-500 text-white px-4 py-2 rounded font-poppins hover:bg-red-600"
              onClick={() => updateBookingStatus("canceled")}
            >
              Cancel
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => navigate("/admin/manajemen-transaksi")}>
              Kembali
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

// Komponen kecil untuk menampilkan data
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center gap-x-4 mb-2">
    <h1 className="text-base font-semibold font-poppins w-1/2">{label}</h1>
    <Typography className="font-poppins w-1/2">{value}</Typography>
  </div>
);

export default FormDetailPesananPage;
