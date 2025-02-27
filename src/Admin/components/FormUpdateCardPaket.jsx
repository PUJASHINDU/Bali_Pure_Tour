import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import {
  Card, CardBody, CardFooter, Typography, Button, Input
} from "@material-tailwind/react";
import defaultImage from '../../assets/pure tour/Bannerpuretour.jpg';
import BerhasilUpdateModal from "./ModalBerhasilUpdateCard";


const FormUpdateCardPaket = ({ updatelink }) => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Ambil nilai dari query parameter
  const id_package = queryParams.get("id_package"); // Pastikan id_package ada
  const imageUrlFromQuery = queryParams.get("imageUrl");

  const [formData, setFormData] = useState({
    title: "",
    DeskripsiCard: "",
    location: "",
    price: "",
    Note: "",
    imageUrl: imageUrlFromQuery ? decodeURIComponent(imageUrlFromQuery) : defaultImage,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-card-destination/${id}`);
        if (response.status === 200) {
          setFormData({
            title: response.data.card_name || "",
            DeskripsiCard: response.data.about_card || "",
            location: response.data.location || "",
            price: response.data.price || "",
            Note: response.data.note_card || "",
            imageUrl: response.data.img || defaultImage,
          });

          if (response.data.id_package) {
            fetchGalleryImage(response.data.id_package);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Gagal mengambil data, periksa koneksi API!");
      }
    };

    const fetchGalleryImage = async (idPackage) => {
      try {
        const imagesResponse = await axios.get("http://localhost:5000/get-gallery-images");

        if (imagesResponse.status === 200) {
          const imagesData = imagesResponse.data;
          const matchedImage = imagesData.find((img) => Number(img.id_package) === Number(idPackage));

          if (matchedImage) {
            setFormData((prevData) => ({
              ...prevData,
              imageUrl: matchedImage.img || defaultImage,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };

    fetchData();
  }, [id]);

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

    // Menampilkan gambar yang dipilih sebelum upload
    const imageURL = URL.createObjectURL(file);
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: imageURL,
    }));
  };

  // **🔹 Fungsi untuk mengupdate galeri**
  const handleGalleryUpdate = async () => {
    if (!selectedFile) return; // Jika tidak ada gambar baru, tidak perlu update

    const formDataToSend = new FormData();
    formDataToSend.append("id_package", id_package);
    formDataToSend.append("category", "tour-gallery"); // Folder untuk menyimpan gambar
    formDataToSend.append("images", selectedFile); // Upload gambar baru

    try {
      const response = await axios.put(`http://localhost:5000/update-gallery/${id_package}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        console.log("Galeri berhasil diperbarui");
      }
    } catch (error) {
      console.error("Error updating gallery:", error);
      alert("Gagal memperbarui galeri. Periksa koneksi API!");
    }
  };

  // **🔹 Fungsi untuk mengupdate data card package**
  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("card_name", formData.title);
    formDataToSend.append("about_card", formData.DeskripsiCard);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("note_card", formData.Note);

    try {
      const response = await axios.put(`http://localhost:5000/card-destination-update/${id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 || response.status === 201) {
        setShowModal(true); // ✅ Tampilkan modal sukses

        await handleGalleryUpdate(); // 🔹 Update galeri setelah update card

        // ✅ Navigasi setelah beberapa detik
        setTimeout(() => {
          setShowModal(false);
          navigate(`/ManajemenPackageTour`);
        }, 4000); // ⏳ Modal tampil 3 detik sebelum redirect
      } else {
        throw new Error(response.data.message || "Server Error");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Gagal memperbarui data. Periksa koneksi API!");
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
              Silahkan update deskripsi card peket tour, update dengan jelas dan sesuai yaa !
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
              className="border-gray-600 text-customGreenslow hover:bg-gray-200 hover:shadow-md transition duration-300 font-poppins"
              onClick={openFilePicker} // Ketika diklik, buka input file
            >
              Pilih Foto
            </Button>
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

        </CardBody>

        {/* Update Button */}
        <CardFooter className="pt-0">
        <div className="">
          <Button
            size="lg"
            variant="text"
            className="flex items-center gap-2 font-semibold font-poppins bg-customGreen text-white"
            onClick={handleSubmit}
          >
            Simpan Update !!
          </Button>
          {showModal && <BerhasilUpdateModal onClose={() => setShowModal(false)} />}
        </div>
        </CardFooter>

      </Card>
    </div>
  );
};

export default FormUpdateCardPaket;
