import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Card,
  CardBody,
} from '@material-tailwind/react';
import userDefaultImg from '../../assets/icon/profile.jpg';

const HomeAdmin = () => {
  const [totalTransactions, setTotalTransactions] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [activePackages, setActivePackages] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, usersRes, revenueRes, packagesRes, bookingsRes] = await Promise.all([
          axios.get('http://localhost:5000/transactions/total'),
          axios.get('http://localhost:5000/users/total'),
          axios.get('http://localhost:5000/revenue/total'),
          axios.get('http://localhost:5000/packages/active'),
          axios.get('http://localhost:5000/bookings/recent'),
        ]);

        console.log("Data transaksi:", transactionsRes.data);
        console.log("Data pengguna:", usersRes.data);
        console.log("Data pendapatan:", revenueRes.data);
        console.log("Data paket aktif:", packagesRes.data);
        console.log("Data booking terbaru:", bookingsRes.data);

        setTotalTransactions(transactionsRes.data.totalTransactions || 0);
        setTotalUsers(usersRes.data.totalUsers || 0);
        setTotalRevenue(revenueRes.data.totalRevenue ? `$${revenueRes.data.totalRevenue.toFixed(2)}` : "$0");
        setActivePackages(packagesRes.data.activePackages || 0);
        setRecentBookings(Array.isArray(bookingsRes.data.recentBookings) ? bookingsRes.data.recentBookings : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 py-8 container mx-auto font-poppins">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-green-100 via-white to-green-50 p-6 rounded-lg shadow-md mb-8">
        <img src={userDefaultImg} alt="Admin" className="w-28 h-28 rounded-full object-cover mr-6" />
        <div>
          <Typography variant="h4" className="font-bold text-gray-800 mb-2 font-poppins">
            Selamat Datang, <span className="text-customGreen">Admin! 🙌</span>
          </Typography>
          <Typography variant="small" className="text-customGreenslow font-poppins">
            Kelola dan pantau data dari dashboard ini.
          </Typography>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-4 shadow-lg border rounded-lg">
          <Typography variant="h6" className='font-poppins text-customGreenslow'>Total Transaksi</Typography>
          <Typography variant="h4" className="font-bold text-customGreen font-poppins">
            {totalTransactions !== null ? totalTransactions : "Loading..."}
          </Typography>
        </Card>
        <Card className="p-4 shadow-lg border rounded-lg ">
          <Typography variant="h6" className='font-poppins text-customGreenslow'>Jumlah Pengguna</Typography>
          <Typography variant="h4" className="font-bold text-customGreen font-poppins" >
            {totalUsers !== null ? totalUsers : "Loading..."}
          </Typography>
        </Card>
        <Card className="p-4 shadow-lg border rounded-lg">
          <Typography variant="h6" className='font-poppins text-customGreenslow'>Total Pendapatan</Typography>
          <Typography variant="h4" className="font-bold text-customGreen font-poppins">
            {totalRevenue !== null ? totalRevenue : "Loading..."}
          </Typography>
        </Card>
        <Card className="p-4 shadow-lg border rounded-lg">
          <Typography variant="h6" className='font-poppins text-customGreenslow'>Paket Tour Aktif</Typography>
          <Typography variant="h4" className="font-bold text-customGreen font-poppins">
            {activePackages !== null ? activePackages : "Loading..."}
          </Typography>
        </Card>
      </div>

      {/* Pemesanan Terbaru */}
      <Card className="shadow-lg border rounded-lg">
        <CardBody>
          <Typography variant="h6" className="mb-4 font-semibold font-poppins text-customGreenslow">
            Daftar Booking
          </Typography>
          <ul className="divide-y">
            {recentBookings && recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <li key={booking.id_booking} className="py-3 flex justify-between items-center font-poppins">
                  <div>
                    <Typography variant="small" className='font-poppins'>{booking.full_name}</Typography>
                    <Typography variant="small" className='font-poppins text-customGreen'>{booking.package_name}</Typography>
                  </div>
                  <Typography variant="small" className="text-customGreenslow font-poppins">{booking.checkin_date}</Typography>
                </li>
              ))
            ) : (
              <Typography variant="small" className="text-gray-500 text-center py-3">
                Tidak ada pemesanan terbaru
              </Typography>
            )}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
};

export default HomeAdmin;
