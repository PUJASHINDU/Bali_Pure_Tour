import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = [
  "ID Payment", "Nama Pemesan", "Nama Paket Tour", "Tanggal Pembayaran", "Metode Pembayaran", "Status Pembayaran", "Aksi"
];

const getStatusClass = (status) => {
  switch (status) {
    case "paid":
      return "bg-customGreen text-white text-sm rounded-[70px] px-3 py-1 w-[78px] h-[38px] flex items-center justify-center ml-8 mt-2";
    case "Pending":
      return "bg-customOrange text-white text-sm rounded-[70px] px-3 py-1 w-[78px] h-[38px] flex items-center justify-center ml-8 mt-2";
    case "Cancel":
      return "bg-customRed text-white text-sm rounded-[70px] px-3 py-1 w-[78px] h-[38px] flex items-center justify-center ml-8 mt-2";
    default:
      return "bg-gray-500 text-white text-sm rounded-full px-3 py-1 w-[100px] h-[47px] flex items-center justify-center";
  }
};


const MeninjauPayment = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const navigate = useNavigate(); // 🔄 Untuk navigasi

  // Fetch data dari API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllTransactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Filter transaksi berdasarkan nama pemesan dan status pembayaran
  const filteredTransactions = transactions.filter(
    ({ full_name, payment_status }) =>
      full_name.toLowerCase().includes(searchName.toLowerCase()) &&
      payment_status.toLowerCase().includes(searchStatus.toLowerCase())
  );

  // Fungsi navigasi ke halaman yang sesuai


  return (
    <div className="px-4 py-10 container mx-auto">
      <div className="md:ml-4">
        <Typography
          variant="small"
          className="text-customGreenslow font-medium font-poppins"
        >
          <h3 className="md:mt-1 lg:mt-1 text-xl mb-1 round">
            Hallo Selamat Datang <span className="text-customGreen">Admin</span> 🙌
          </h3>
          Pada halaman Manajemen Pembayaran, admin bisa untuk memantau dan mengelola semua transaksi pembayaran yang dilakukan pelanggan.
        </Typography>
        <div className="mt-4 flex gap-4">
          <input
            type="text"
            placeholder="Cari Nama Pelanggan"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="p-2 border rounded w-64"
          />
          <select
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
            className="p-2 border rounded w-72"
          >
            <option value="">Semua Status</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Cancel">Cancel</option>
          </select>
        </div>
      </div>

      <Card className="h-full w-full mt-6 overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className={`border-b border-blue-gray-100 bg-customGreen p-4 text-white font-poppins font-semibold ${head === "Aksi" ? "text-center" : ""}`}
                >
                  <Typography variant="small" className="font-poppins font-semibold leading-none gap-3">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(({ id_transaction, full_name, package_name, transaction_date, payment_method, payment_status, order_id }, index) => {
              const isLast = index === filteredTransactions.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id_transaction}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-poppins">
                      {id_transaction}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-poppins ml-4">
                      {full_name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-poppins">
                      {package_name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-poppins ml-11">
                      {transaction_date}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-poppins ml-8">
                      {payment_method}
                    </Typography>
                  </td>
                  <td className={`${classes} ${getStatusClass(payment_status)} text-center ml-16`}>
                    <Typography variant="small" className="font-poppins ">
                      {payment_status}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography as="a" href={`/payment-success/${order_id}`} variant="small" color="blue-gray" className="font-poppins text-center">
                      Lihat Detail
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default MeninjauPayment;
