import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
  import image from '../../assets/pure tour/Bannerpuretour.jpg'
  import close from '../../assets/icon/close.png'

  const toggleModal = () => {
  setIsModalOpen(!isModalOpen);
};
const FormUpdateCardPaket = ({
  title,
  location,
  DeskripsiCard,
  price,
  Note,
  Maximal_Jointour,
  Jumlah_Guide,
  updatelink,
}) => {
  // State untuk menyimpan nilai form
  const [formData, setFormData] = useState({
    title: title || "",
    location: location || "",
    DeskripsiCard: DeskripsiCard || "",
    price: price || "",
    Maximal_Jointour: Maximal_Jointour || "",
    Jumlah_Guide:  Jumlah_Guide || "",
    Note: Note || "",
  });

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

// Fungsi untuk menutup form
const closeForm = () => {
  setIsFormOpen(false);
};

// if (!isFormOpen) {
//   return null; // Jangan render form jika sudah ditutup
// }
  return (
    <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-7 overflow-hidden">
      <Card className="w-full max-w-screen-sm">
      <img
          src={close}
          alt="Close"
          className="absolute -top-2 -right-4 w-12 h-12 cursor-pointer"
          onClick={closeForm}
        />
        <CardBody>

          <div className="mb-4 sm:mt-10 lg:mt-6">
          <Typography variant="h4" className="text-customGreenslow  font-poppins" >
            Hallo Admin  🙌
          </Typography>
          <Typography variant="h4" className="text-customGreenslow font-medium font-poppins text-sm" >
            Silahkan update deskripsi card peket tour, update dengan jelas dan sesuai yaa !
          </Typography>
          </div>

          <div className="mb-6 flex flex-col items-center sm:mt-8 md:items-start">
            <img
            src={image}
              alt="Profil"
              className="w-48 h-48 rounded-lg object-cover mb-4"
            />
            <Button onClick={toggleModal} size="sm"
              variant="outlined" // Tombol hanya border
              className="border-gray-600 text-customGreenslow hover:bg-gray-100 font-poppins mt-2 md:ml-4 lg:ml-10">
              Pilih foto
            </Button>
            <Typography variant="small" className="text-customGreenslow font-normal mt-2 font-poppins">
              <p className='mt-2'> File size: maximum 10 Megabytes (MB).</p>
              <p> Allowed file extensions: .JPG .JPEG .PNG</p>
            </Typography>
          </div>

          <div className="mb-4 ">
            <Typography
              variant="h6"
              className="text-customGreenslow mb-1 font-poppins"
            >
              Nama Tour
            </Typography>
            <Input
              size="lg"
              value={formData.title}
              onChange={handleChange}
              name="title"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900  !font-poppins"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-4">
            <Typography
              variant="h6"
              className="text-customGreenslow mb-1 font-poppins"
            >
              Lokasi Tour
            </Typography>
            <Input
              size="lg"
              value={formData.location}
              onChange={handleChange}
              name="location"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900  !font-poppins"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-4">
            <Typography
              variant="h6"
              className="text-customGreenslow mb-1 font-poppins"
            >
              Deskripsi Card Tour
            </Typography>
            <Input
              size="lg"
              value={formData.DeskripsiCard}
              onChange={handleChange}
              name="DeskripsiCard"
               className="!border-t-blue-gray-200 focus:!border-t-gray-900  !font-poppins"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-4">
            <Typography
              variant="h6"
              className="text-customGreenslow mb-1 font-poppins"
            >
              Harga Tour
            </Typography>
            <Input
              size="lg"
              value={formData.price}
              onChange={handleChange}
              name="price"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-4">
            <Typography
              variant="h6"
              className="text-customGreenslow mb-1 font-poppins"
            >
              Note Tour
            </Typography>
            <Input
              size="lg"
              value={formData.Note}
              onChange={handleChange}
              name="Note"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900  !font-poppins"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-4">
            <Typography
              variant="h6"
              className="text-customGreenslow mb-1 font-poppins"
            >
              Maximal Join Tour
            </Typography>
            <Input
              size="lg"
              value={formData.Maximal_Jointour}
              onChange={handleChange}
              name="Note"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900  !font-poppins"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-4">
            <Typography
              variant="h6"
              className="text-customGreenslow mb-1 font-poppins"
            >
              Jumlah Guide
            </Typography>
            <Input
              size="lg"
              value={formData.Jumlah_Guide}
              onChange={handleChange}
              name="Note"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900  !font-poppins"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
        </CardBody>

        {/* Booking Button */}
        <CardFooter className="pt-0">
          <Button
            size="lg"
            variant="text"
            className="flex items-center gap-2 font-semibold font-poppins bg-customGreen text-white"
            onClick={() => {
              console.log("Updated Data:", formData);
              window.location.href = updatelink; // Redirect ke link
            }}
          >
            Simpan Update !!
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormUpdateCardPaket;
