import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 import close from '../../assets/icon/close.png'

// Fungsi untuk menutup form
const closeForm = () => {
  setIsFormOpen(false);
};
const FormDetailPesanan = ({
  title = { first: "Deskripsi ", second: "Pesanan" },
  Name = "-",
  EmailAddres = "-",
  PhoneNumber = "-",
  PaketTour= "-",
  TanggalTour     = "-",
  TanggalPesan   = "-",
  Price   = "-",
  JumlahPeserta = "-",
  StatusPayment = "-",

  information= "Hallo admin ada pesanan yang menunggu konfirmasi untuk update informasi pemesanan tour nya silahkan klik Konfirmasi Pesanan jika status payment Verified, jika status payment Fail silahkah cek di halaman manajemen payment untuk melihat detail payment...   🙌",
  bookingLink = "#",
}) => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-4 overflow-hidden">
      <Card className="w-full max-w-screen-sm">
       <img
                src={close}
                alt="Close"
                className="absolute -top-2 -right-4 w-12 h-12 cursor-pointer"
                onClick={closeForm}
              />
        <CardBody>
          {/* Title and About */}
          <Typography
            variant="h4"
            className="mb-2  text-xl font-poppins text-center"
          >
            <span className="text-customGreen font-medium">{title?.first}</span>{" "}
            <span className="text-customGreenslow font-semibold">{title?.second}</span>
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
              Name
          </h1>
            {Name}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
            Email Addres
          </h1>
            {EmailAddres}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
            Phone Number
          </h1>
            {PhoneNumber}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
            Paket Tour
          </h1>
            {PaketTour}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
            Tanggal Tour
          </h1>
            {TanggalTour}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
          Tanggal Pesanan
          </h1>
            {TanggalPesan}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
          Price
          </h1>
            {Price}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
          Jumlah Peserta
          </h1>
            {JumlahPeserta}
          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-base font-semibold">
          Status Payment
          </h1>
          <div className="bg-customGreen text-white text-sm rounded-[70px] px-3 py-1 w-[78px] h-[38px] flex items-center justify-center mt-2">  {StatusPayment}</div>

          </Typography>

          <Typography className="font-poppins text-justify mb-2">
          <h1 className="text-lg font-semibold text-customGreen">
          Information :
          </h1>
            {information}
          </Typography>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <Button className="bg-customGreen font-poppins text-sm" fullWidth={true}>
                Konfirmasi Pesanan
              </Button>
              <Button className="bg-customred font-poppins text-sm" fullWidth={true}>
              Batalkan Pesanan
              </Button>
            </div>
          </div>
        </CardBody>

      </Card>
    </div>
  );
};

export default FormDetailPesanan;
