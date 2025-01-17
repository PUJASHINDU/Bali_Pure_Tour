import React from 'react';
import {
  Typography,
  Card,
  CardBody,
} from '@material-tailwind/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import userDefaultImg from '../../assets/icon/profile.jpg';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HomeAdmin = () => {
  // Data dummy untuk statistik
  const totalTransactions = 120;
  const totalUsers = 45;
  const totalRevenue = "$12,340";
  const activePackages = 8;

  // Data dummy untuk grafik penjualan
  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [5, 12, 8, 15, 20],
        fill: false,
        borderColor: '#4CAF50',
        backgroundColor: '#A5D6A7',
        tension: 0.4,
        pointBackgroundColor: '#4CAF50',
        pointBorderColor: '#ffffff',
        pointRadius: 5,
      },
    ],
  };

  const recentBookings = [
    { id: 1, user: 'John Doe', package: 'Bali Adventure', date: '2025-01-12' },
    { id: 2, user: 'Jane Smith', package: 'Island Hopping', date: '2025-01-11' },
    { id: 3, user: 'Adam Brown', package: 'Cultural Tour', date: '2025-01-10' },
  ];

  return (
    <div className="px-4 py-8 container mx-auto font-poppins">
      {/* Header Selamat Datang */}
      <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-green-100 via-white to-green-50 p-6 rounded-lg shadow-md mb-8 font-poppins">
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

      {/* Ringkasan Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-4 shadow-lg hover:shadow-xl border rounded-lg">
          <Typography variant="h6" className="text-customGreenslow font-poppins">
            Total Transaksi
          </Typography>
          <Typography variant="h4" className="font-bold text-customGreen font-poppins mt-2 text-[19px]">
            {totalTransactions}
          </Typography>
        </Card>
        <Card className="p-4 shadow-lg hover:shadow-xl border rounded-lg">
          <Typography variant="h6" className="text-customGreenslow font-poppins ">
            Jumlah Pengguna
          </Typography>
          <Typography variant="h4" className="font-bold text-customGreen font-poppins mt-2 text-[19px]">
            {totalUsers}
          </Typography>
        </Card>
        <Card className="p-4 shadow-lg hover:shadow-xl border rounded-lg">
          <Typography variant="h6" className="text-customGreenslow font-poppins">
            Total Pendapatan
          </Typography>
          <Typography variant="h4" className="font-bold text-customGreen font-poppins mt-2 text-[19px]">
            {totalRevenue}
          </Typography>
        </Card>
        <Card className="p-4 shadow-lg hover:shadow-xl border rounded-lg">
          <Typography variant="h6" className="text-customGreenslow font-poppins">
            Paket Tour Aktif
          </Typography>
          <Typography variant="h4" className="font-bold text-customGreen font-poppins mt-2 text-[19px]">
            {activePackages}
          </Typography>
        </Card>
      </div>

      {/* Grafik Penjualan */}
      <div className="mb-8">
        <Card className="shadow-lg border rounded-lg">
          <CardBody>
            <Typography variant="h6" className="mb-4 font-semibold text-customGreenslow font-poppins">
              Grafik Penjualan
            </Typography>
            <Line data={salesData} />
          </CardBody>
        </Card>
      </div>

      {/* Ringkasan Pemesanan Terbaru */}
      <div>
        <Card className="shadow-lg border rounded-lg">
          <CardBody>
            <Typography variant="h6" className="mb-4 font-semibold text-customGreenslow font-poppins">
              Pemesanan Terbaru
            </Typography>
            <ul className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <li key={booking.id} className="py-3 flex justify-between items-center">
                  <div>
                    <Typography variant="small" className="text-customGreenslow font-poppins">
                      {booking.user}
                    </Typography>
                    <Typography variant="small" className="text-customGreenslow font-poppins">
                      {booking.package}
                    </Typography>
                  </div>
                  <Typography variant="small" className="text-gray-400 font-poppins">
                    {booking.date}
                  </Typography>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default HomeAdmin;
