import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card, CardBody, CardFooter, Typography, Button, Input, Textarea
} from "@material-tailwind/react";
import defaultImage from '../../assets/icon/deafult_img.png';
import BerhasilTambahModal from "./ModalBerhasilMenambahCard";

const FormAddCardPaket = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const packageName = queryParams.get("package_name") || "";

  const [formData, setFormData] = useState({
    package_name: packageName,
    card_name: "",
    about_card: "",
    location: "",
    price: "",
    note_card: "",
    imageUrl: defaultImage,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const imageURL = URL.createObjectURL(file);
    setFormData((prevData) => ({ ...prevData, imageUrl: imageURL }));
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("package_name", formData.package_name);
    formDataToSend.append("card_name", formData.card_name);
    formDataToSend.append("about_card", formData.about_card);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("note_card", formData.note_card);
    if (selectedFile) {
      formDataToSend.append("image", selectedFile);
    }

    try {
      const response = await axios.post("http://localhost:5000/card-tour", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Perbaiki kondisi sukses dengan status 200 atau 201
      if (response.status === 200 || response.status === 201) {
        setShowModal(true); // ✅ Tampilkan modal sukses

        // ✅ Navigasi setelah beberapa detik
        setTimeout(() => {
          setShowModal(false);
          navigate(`/ManajemenPackageTour`);
        }, 9000); // ⏳ Modal tampil 3 detik sebelum redirect
      } else {
        throw new Error(response.data.message || "Server Error");
      }
    } catch (error) {
      alert("Gagal mengirim data! Cek konsol untuk detail.");
      console.error("Error:", error);
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen px-4 mb-10 mt-7 overflow-hidden">
      <Card className="w-full max-w-screen-sm relative">
        <CardBody>
          <div className="mb-4 sm:mt-10 lg:mt-6">
            <Typography variant="h4" className="text-customGreenslow  font-poppins" >
              Hallo Admin  🙌
            </Typography>
            <Typography variant="h4" className="text-customGreenslow font-medium font-poppins text-sm" >
              Silahkan inputkan deskripsi card peket tour, inputkan dengan jelas dan sesuai yaa !!
            </Typography>
          </div>


          <div className="mb-6 flex flex-col items-center">
            <img
              src={formData.imageUrl}
              alt="Profil"
              className="w-48 h-48 rounded-lg object-cover mb-4 border-2 border-gray-300 shadow-md"
            />

            {/* Input file disembunyikan dan dikontrol via useRef */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />

            {/* Button dengan animasi hover */}
            <Button
              size="sm"
              variant="outlined"
              className="border-gray-600 text-customGreenslow
              hover:bg-gray-200 hover:shadow-md transition duration-300 font-poppins"
              onClick={openFilePicker} // Ketika diklik, buka input file
            >
              Pilih Foto
            </Button>
          </div>


          {/* <Input label="Nama Paket Tour" size="lg" value={formData.package_name} name="package_name" disabled /> */}

          <div className="mb-4 ">
            <Typography
              variant="h6"
              className="text-customGreenslow mb-1 font-poppins"
            >
              Nama Tour
            </Typography>
            <Input
              size="lg"
              value={formData.package_name}
              // onChange={handleChange}
              // name="title"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900  !font-poppins"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* <Input label="Nama Card" size="lg" value={formData.card_name} onChange={handleChange} name="card_name" className="mb-4" /> */}

          <div className="mb-4">
            <Typography
              variant="h6"
              className="text-customGreenslow mb-1 font-poppins"
            >
              Nama Card Tour
            </Typography>
            <Input
              size="lg"
              value={formData.card_name}
              onChange={handleChange}
              name="card_name"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900  !font-poppins"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>




          {/* <Input label="Deskripsi" size="lg" value={formData.about_card} onChange={handleChange} name="about_card" className="mb-4" /> */}

          {/* <div className="mb-4">
            <Typography
              variant="h6"
              className="text-customGreenslow mb-1 font-poppins"
            >
              About Card Tour
            </Typography>
            <Input
              size="lg"
              value={formData.about_card}
              onChange={handleChange}
              name="DeskripsiCard"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900  !font-poppins"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div> */}

          <div className="mb-4">
            <Typography variant="h6" className="font-poppins font-semibold mb-1 text-customGreenslow">
              Deskripsi
            </Typography>
            <Textarea
              name="about_card"
              value={formData.about_card}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 !font-poppins"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* <Input label="Lokasi" size="lg" value={formData.location} onChange={handleChange} name="location" className="mb-4" /> */}

          <div className="mb-4">
            <Typography
              variant="h6"
              className="text-customGreenslow mb-1 font-poppins"
            >
              Location
            </Typography>
            <Input
              size="lg"
              value={formData.location}
              onChange={handleChange}
              name="location"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* <Input label="Harga" size="lg" value={formData.price} onChange={handleChange} name="price" className="mb-4" /> */}
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

          {/* <Input label="Catatan" size="lg" value={formData.note_card} onChange={handleChange} name="note_card" className="mb-4" /> */}

          <div className="mb-4">
            <Typography
              variant="h6"
              className="text-customGreenslow mb-1 font-poppins"
            >
              Note Tour
            </Typography>
            <Input
              size="lg"
              value={formData.note_card}
              onChange={handleChange}
              name="note_card"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900  !font-poppins"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
        </CardBody>

        <CardFooter className="pt-0">
          <div className="pt-0 flex justify-center items-center mt-5">
            <Button
              size="md"
              variant="text"
              className="flex items-center gap-2 font-semibold font-poppins bg-customGreen text-white normal-case w-80 text-center justify-center"
              onClick={handleSubmit}
            >
              Simpan Card Paket Tour !!
            </Button>
          </div>
          {showModal && <BerhasilTambahModal onClose={() => setShowModal(false)} />}
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormAddCardPaket;
