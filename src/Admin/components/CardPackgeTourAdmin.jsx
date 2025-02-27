import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateOptionsModal from "./Modalupdatepakettour"; // Import modal
import DalateOptionsModal from './ModalDalateTour';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
  CardFooter,
  Button,
} from "@material-tailwind/react";

// Import local icons
import user from '../../assets/icon/user.png';
import coin from '../../assets/icon/coin.png';
import view from '../../assets/icon/view.png';
import guide from '../../assets/icon/guide.png';

const CardComponent = ({ id_package, imageUrl, title, location, description, Note, price, tooltips, detailPage, id, onDataChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleEditClick = () => {
    setIsModalOpen(true); // Buka modal saat tombol Edit diklik
  };

  const handleSelectOption = (option) => {
    const route =
      option === "detail"
        ? `/FormUpdatePaketTourpage/${id_package}?id_package=${id_package}&imageUrl=${encodeURIComponent(imageUrl)}`
        : `/FormUpdateCardPaketpage/${id}?id_package=${id_package}&imageUrl=${encodeURIComponent(imageUrl)}`;

    window.location.assign(route);
    onDataChange();
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/card-destination-dalate/${id}`);
      alert("Paket berhasil dihapus!");
      onDataChange(); // Refresh data setelah penghapusan berhasil
    } catch (error) {
      console.error("Gagal menghapus paket:", error);
      alert("Terjadi kesalahan saat menghapus paket.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };





  return (
    <Card className="w-full max-w-[26rem] shadow-lg mt-10">
      <CardHeader floated={false} color="blue-gray">
        <img src={imageUrl} alt={title.second} />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
      </CardHeader>

      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography variant="h4" className="mb-2 font-semibold text-md font-poppins">
            <span className="text-customGreen">{title.first}</span>{" "}
            <span className="text-customGreenslow">{title.second}</span>
          </Typography>
          <div className="flex items-center gap-1.5">
            <Typography className="flex items-center gap-1.5 font-medium font-poppins text-customGreenslow -mt-2">
              <img src={coin} alt="" />
              {price} USD
            </Typography>
          </div>
        </div>
        <Typography className='text-customGreenslow font-poppins font-medium'>
          {location}
        </Typography>
        <Typography className='font-poppins text-customGreenslow'>
          {description}
        </Typography>
        <Typography className='font-poppins mt-2 text-customGreenslow font-semibold'>
          {Note}
        </Typography>
        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
          {tooltips.map((tooltipContent, index) => (
            index === 2 ? (
              <Tooltip key={index} content={tooltipContent}>
                <Link to={detailPage} className="cursor-pointer border rounded-full border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10
                                                hover:!opacity-100 group-hover:opacity-70">
                  <img src={view} alt={`Icon ${index + 1}`} className="h-5 w-5" />
                </Link>
              </Tooltip>
            ) : (
              <Tooltip key={index} content={tooltipContent}>
                <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100
                                                group-hover:opacity-70">
                  <img
                    src={index === 0 ? user : index === 1 ? guide : null}
                    alt={`Icon ${index + 1}`}
                    className="h-5 w-5"
                  />
                </span>
              </Tooltip>
            )
          ))}
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <Button className="bg-customGreen font-poppins text-sm" fullWidth={true} onClick={handleEditClick}>
              Edit
            </Button>
            <Button className="bg-customred font-poppins text-sm" fullWidth={true} onClick={handleDeleteClick}>
              Hapus
            </Button>
          </div>
        </div>
      </CardFooter>
      <UpdateOptionsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={handleSelectOption} />
      {selectedRoute && window.location.assign(selectedRoute)}

      {/* Modal Konfirmasi Hapus */}
      <DalateOptionsModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSelect={handleConfirmDelete}
      />
    </Card>
  );
};

const CardPackageTour = () => {
  const [tours, setTours] = useState([]);
  const [refresh, setRefresh] = useState(false); // State untuk trigger refresh

  // Fungsi untuk fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-card-destinations");
      console.log("Semua Data dari API:", response.data);

      let destinations = response.data;

      const imagesResponse = await axios.get("http://localhost:5000/get-gallery-images");
      const imagesData = imagesResponse.data;

      const formattedData = destinations.map((item) => {
        const matchedImage = imagesData.find((img) => String(img.id_package) === String(item.id_package));
        return {
          id: item.id,
          id_package: item.id_package,
          imageUrl: matchedImage ? matchedImage.img : "https://via.placeholder.com/400",
          title: { first: "BALI PURE", second: item.card_name.replace("Bali Pure ", "").toUpperCase() },
          description: item.about_card,
          location: "Place Penempahan Manukaya",
          Note: item.note_card,
          price: `${item.price}`,
          tooltips: ["Maximal 6 Person", "2 Guide", "View Details"],
          detailPage: `/Detail${item.card_name.replace(/\s/g, '')}`
        };
      });

      setTours(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect akan dipanggil saat pertama kali render & ketika refresh berubah
  useEffect(() => {
    fetchData();
  }, [refresh]);

  // Fungsi untuk memicu refresh setelah create atau update data
  const handleDataChange = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tours.map((data, index) => (
          <CardComponent key={index} {...data} onDataChange={handleDataChange} />
        ))}
      </div>
    </div>
  );
};


export default CardPackageTour;
