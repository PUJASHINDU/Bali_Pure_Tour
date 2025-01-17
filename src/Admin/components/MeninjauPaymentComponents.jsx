import React, { useState } from 'react';
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = [
  "ID Payment", "Nama Pemesan", "Nama Paket Tour", "Tanggal Pembayaran", "Metode Pembayaran", "Status Pembayaran", "Aksi"
];

const TABLE_ROWS = [
  {
    idPayment: "PM001",
    namaPemesan: "John Michael",
    namaPaket: "Paket Liburan Bali",
    tanggalPembayaran: "23/04/18",
    metodePembayaran: "Transfer Bank",
    statusPembayaran: "Verified",
  },
  {
    idPayment: "PM002",
    namaPemesan: "Alexa Liras",
    namaPaket: "Paket Jelajah Lombok",
    tanggalPembayaran: "23/04/18",
    metodePembayaran: "Kartu Kredit",
    statusPembayaran: "Pending",
  },
  {
    idPayment: "PM003",
    namaPemesan: "Laurent Perrier",
    namaPaket: "Paket Liburan Yogyakarta",
    tanggalPembayaran: "19/09/17",
    metodePembayaran: "Transfer Bank",
    statusPembayaran: "Cancel",
  },
  {
    idPayment: "PM004",
    namaPemesan: "Michael Levi",
    namaPaket: "Paket Eksplorasi Raja Ampat",
    tanggalPembayaran: "24/12/08",
    metodePembayaran: "Kartu Kredit",
    statusPembayaran: "Verified",
  },
  {
    idPayment: "PM005",
    namaPemesan: "Richard Gran",
    namaPaket: "Paket Wisata Kuliner Bandung",
    tanggalPembayaran: "04/10/21",
    metodePembayaran: "Transfer Bank",
    statusPembayaran: "Verified",
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Verified":
      return "bg-customGreen text-white text-sm rounded-[70px] px-3 py-1 w-[78px] h-[38px] flex items-center justify-center ml-8 mt-2";
    case "Pending":
      return "bg-customOrage text-white text-sm rounded-[70px] px-3 py-1 w-[78px] h-[38px] flex items-center justify-center ml-8 mt-2";
    case "Cancel":
      return "bg-customred text-white text-sm rounded-[70px] px-3 py-1 w-[78px] h-[38px] flex items-center justify-center ml-8 mt-2";
    default:
      return "bg-gray-500 text-white text-sm rounded-full px-3 py-1 w-[100px] h-[47px] flex items-center justify-center";
  }
};

const MeninjauPayment = () => {
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const filteredRows = TABLE_ROWS.filter(
    ({ namaPemesan, statusPembayaran }) =>
      namaPemesan.toLowerCase().includes(searchName.toLowerCase()) &&
      statusPembayaran.toLowerCase().includes(searchStatus.toLowerCase())
  );

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
            Pada halaman Manajemen Pembayaran, admin bisa untuk memantau dan mengelola semua transaksi pembayaran yang dilakukan pelanggan, baik yang sedang dalam
            proses verifikasi maupun yang sudah berhasil diverifikasi atau gagal.
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
                  className={`border-b border-blue-gray-100 bg-customGreen p-4 text-white font-poppins font-semibold ${
                    head === "Aksi" ? "text-center" : ""
                  }`}
                >
                  <Typography
                    variant="small"
                    className="font-poppins font-semibold leading-none gap-3"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map(({ idPayment, namaPemesan, namaPaket, tanggalPembayaran, metodePembayaran, statusPembayaran }, index) => {
              const isLast = index === filteredRows.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={idPayment}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-poppins"
                    >
                      {idPayment}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-poppins ml-4"
                    >
                      {namaPemesan}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-poppins"
                    >
                      {namaPaket}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-poppins ml-11"
                    >
                      {tanggalPembayaran}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-poppins ml-8"
                    >
                      {metodePembayaran}
                    </Typography>
                  </td>
                  <td className={`${classes} ${getStatusClass(statusPembayaran)} text-center ml-16`}>
                    <Typography variant="small" className="font-poppins ">
                      {statusPembayaran}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="/FormDetailPesananpage"
                      variant="small"
                      color="blue-gray"
                      className="font-poppins text-center"
                    >
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
