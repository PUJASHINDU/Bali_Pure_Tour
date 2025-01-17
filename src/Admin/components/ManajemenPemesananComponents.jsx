import React from "react";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["ID Tour", "Nama Pelanggan", "Nama Paket Tour", "Tanggal Pemesanan", "Status Booking", "Aksi"];

const TABLE_ROWS = [
  {
    idTour: "TR001",
    namaPelanggan: "John Michael",
    namaPaket: "Paket Liburan Bali",
    tanggal: "23/04/18",
    status: "Verified",
  },
  {
    idTour: "TR002",
    namaPelanggan: "Alexa Liras",
    namaPaket: "Paket Jelajah Lombok",
    tanggal: "23/04/18",
    status: "Verified",
  },
  {
    idTour: "TR003",
    namaPelanggan: "Laurent Perrier",
    namaPaket: "Paket Liburan Yogyakarta",
    tanggal: "19/09/17",
    status: "Pending",
  },
  {
    idTour: "TR004",
    namaPelanggan: "Michael Levi",
    namaPaket: "Paket Eksplorasi Raja Ampat",
    tanggal: "24/12/08",
    status: "Cancel",
  },
  {
    idTour: "TR005",
    namaPelanggan: "Richard Gran",
    namaPaket: "Paket Wisata Kuliner Bandung",
    tanggal: "04/10/21",
    status: "Verified",
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



const ManajemenPemesananComponents = () => {
  return (
    <div className="px-4 py-10 container mx-auto">
      <div className="md:ml-4">
        <Typography
          variant="small"
          className="text-customGreenslow font-medium font-poppins"
        >
          <h3 className="md:mt-1 lg:mt-3 text-xl mb-1 round">
            Hallo Selamat Datang <span className="text-customGreen">Admin</span> 🙌
          </h3>
          Manajemen Pemesanan Tour ini digunakan melihat daftar pesanan yang masuk dari pelanggan. Di halaman ini, admin bisa melihat status pemesanan dan mengelola
           detail pemesanan.
        </Typography>
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
            {TABLE_ROWS.map(({ idTour, namaPelanggan, namaPaket, tanggal, status }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={idTour}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-poppins"
                    >
                      {idTour}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-poppins ml-4"
                    >
                      {namaPelanggan}
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
                      {tanggal}
                    </Typography>
                  </td>
                  <td className={`${classes} ${getStatusClass(status)} text-center`}>
                    <Typography variant="small" className="font-poppins ">
                      {status}
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

export default ManajemenPemesananComponents;
