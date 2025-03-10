import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = [
  "ID Tour",
  "Nama Pelanggan",
  "Nama Paket Tour",
  "Tanggal Pemesanan",
  "Status Booking",
  "Aksi",
];

const getStatusClass = (status) => {
  switch (status.toLowerCase()) { // Pastikan case-nya tidak masalah
    case "confirmed":
      return "bg-customGreen text-white text-sm rounded-full px-3 py-1 w-[90px] h-[38px] flex items-center justify-center";
    case "pending":
      return "bg-customOrage text-white text-sm rounded-full px-3 py-1 w-[90px] h-[38px] flex items-center justify-center";
    case "cancel":
      return "bg-customred text-white text-sm rounded-full px-3 py-1 w-[90px] h-[38px] flex items-center justify-center";
    default:
      return "bg-gray-500 text-white text-sm rounded-full px-3 py-1 w-[90px] h-[38px] flex items-center justify-center";
  }
};


const ManajemenPemesananComponents = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getAllBookings", {
          withCredentials: true,
        });

        console.log("✅ Data Booking:", response.data);

        // Pastikan data bookings berbentuk array
        const data = response.data?.data || response.data;
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Gagal mengambil semua data booking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();

    // ⏳ Auto refresh setiap 10 detik biar update terus
    const interval = setInterval(fetchBookings, 90000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 py-10 container mx-auto">
      <div className="md:ml-4">
        <Typography variant="small" className="text-customGreenslow font-medium font-poppins">
          <h3 className="md:mt-1 lg:mt-3 text-xl mb-1 round">
            Hallo Selamat Datang <span className="text-customGreen">Admin</span> 🙌
          </h3>
          Manajemen Pemesanan Tour ini digunakan untuk melihat daftar pesanan yang masuk dari pelanggan.
        </Typography>
      </div>

      <Card className="h-full w-full mt-6 overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className={`border-b border-blue-gray-100 bg-customGreen p-4 text-white font-poppins font-semibold ${head === "Aksi" ? "text-center" : ""}`}>
                  <Typography variant="small" className="font-poppins font-semibold leading-none gap-3">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  <Typography variant="small">Loading...</Typography>
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  <Typography variant="small">Tidak ada data pemesanan.</Typography>
                </td>
              </tr>
            ) : (
              bookings.map(({ id_booking, full_name, package_name, checkin_date, status }, index) => {
                const isLast = index === bookings.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id_booking}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-poppins ml-4">
                        {id_booking}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-poppins -ml-1">
                        {full_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-poppins ml-4">
                        {package_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-poppins ml-8">
                        {checkin_date}
                      </Typography>
                    </td>
                    <td className={`${classes} ${getStatusClass(status)} text-center mt-1 ml-5`}>
                      <Typography variant="small" className="font-poppins ">
                        {status}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography as="a" href={`/FormDetailPesananpage/${id_booking}`}  variant="small" color="blue-gray" className="font-poppins text-center">
                        Lihat Detail
                      </Typography>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ManajemenPemesananComponents;
